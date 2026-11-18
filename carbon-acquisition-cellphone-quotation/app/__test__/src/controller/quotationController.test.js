const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const { quotationController } = require('../../../src/controller')
const { quotationFactory } = require('../../../src/factory')
const { cellphoneApi, couponApi } = require('../../../src/api')
const { logger } = require('../../../src/service')
const MOCKS = require('../../mocks/index.mock')
const ExternalApiError = require('../../../src/common/errors/ExternalApiError')
const { CouponApiError } = require('../../../src/common/errors')
const activity = require('../../../src/controller/activity')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/service', () => ({
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
	validationService: {
		inputData: jest.fn(),
	},
	xss: {
		sanitizeInput: jest.fn((input) => input),
	},
	sqs: {
		queue: {
			sendMessage: jest.fn(),
		},
	},
}))
jest.mock('../../../src/factory')
jest.mock('../../../src/api')
jest.mock('../../../src/service/sqs')
jest.mock('../../../src/controller/activity')
jest.mock('../../../src/service/sqs', () => ({
	queue: {
		sendMessage: jest.fn(),
	},
}))

const sqsService = require('../../../src/service/sqs')

beforeAll(() => {
	tokenLayer.getPortoCertificates = jest.fn(async () => {
		return MOCKS.FAKE_CERTIFICATES
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

beforeEach(() => {
	jest.spyOn(activity.couponHandler, 'execute').mockResolvedValue(null)
})

describe('Suite de testes de quotationController.js', () => {
	test('Deve invocar a layer de token somente uma vez', async () => {
		const spyLayer = jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	test('Deve invocar a layer de token somente uma vez quando tem cupom', async () => {
		jest.spyOn(activity.couponHandler, 'execute').mockResolvedValue({
			codigo: 'COUPON10',
			percentualDesconto: 10,
		})
		const spyLayer = jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		await quotationController.process(MOCKS.VALID_INPUT_DATA_WITH_CUPOM)

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	it('Deve retornar uma exceção ao receber erro ao buscar o token', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockImplementationOnce(() => {
			throw new Error()
		})

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow(MOCKS.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	})

	it('Deve logar um erro ao receber erro ao buscar o token', async () => {
		const spyLogger = jest.spyOn(logger, 'error')

		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockImplementationOnce(() => {
			throw new Error()
		})

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow()

		expect(spyLogger).toHaveBeenCalled()
		expect(spyLogger).toHaveBeenCalledTimes(1)
	})

	test('Deve invocar a API de quotationRequest somente uma vez e com o payload montado pela Factory', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		const spycellphoneApi = jest.spyOn(cellphoneApi, 'quotationRequest')

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spycellphoneApi).toHaveBeenCalled()
		expect(spycellphoneApi).toHaveBeenCalledTimes(1)
		expect(spycellphoneApi).toHaveBeenCalledWith(
			MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE,
			'fakeToken',
			MOCKS.FAKE_CERTIFICATES
		)
	})

	test('Deve retornar uma exceção ao invocar o quotationRequest e o hash não for retornado', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest.spyOn(cellphoneApi, 'quotationRequest').mockReturnValue({})

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow(
			'Não foi retornado o resultado esperado'
		)
	})

	test('Deve retornar uma exceção ao invocar o quotationRequest e a API retornar um ExternalApiError', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest.spyOn(cellphoneApi, 'quotationRequest').mockImplementationOnce(() => {
			throw new ExternalApiError(
				JSON.stringify(MOCKS.POST_CELLPHONE_API_ERROR_500_RESPONSE),
				500
			)
		})

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow(
			JSON.stringify(MOCKS.POST_CELLPHONE_API_ERROR_500_RESPONSE.mensagemError.errorMessage.payload)
		)
	})

	test('Deve invocar a API de getCalculoResponse três vezes e com o payload montado pela Factory', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce('Aguarde, processando calculo!')
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(
				MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE_WITHOUT_INSTALLMENT
			)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		const spycellphoneApi = jest.spyOn(cellphoneApi, 'getCalculoResponse')

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spycellphoneApi).toHaveBeenCalled()
		expect(spycellphoneApi).toHaveBeenCalledTimes(3)
		expect(spycellphoneApi).toHaveBeenCalledWith(
			MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE.hash,
			MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE.codigoCanal,
			'fakeToken',
			MOCKS.FAKE_CERTIFICATES
		)
	})

	test('Deve retornar uma exceção ao invocar o getCouponData e a API retornar um CouponApiError', async () => {
		jest.spyOn(activity.couponHandler, 'execute').mockImplementationOnce(() => {
			throw new CouponApiError()
		})

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA_WITH_INEXISTENT_CUPOM)
		).rejects.toThrow('invalid coupon')
	})

	test('Deve executar a activity de lead negado quando o risco for aceito false', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(
				MOCKS.GET_CELLPHONE_API_RISCO_NAO_ACEITO_RESPONSE()
			)

		const spyPublishMessageDenyLead = jest.spyOn(
			activity.publishMessageDenyLead,
			'execute'
		).mockResolvedValue()

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spyPublishMessageDenyLead).toHaveBeenCalled()
		expect(spyPublishMessageDenyLead).toHaveBeenCalledTimes(1)
		expect(spyPublishMessageDenyLead).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA.idLead
		)
	})

	test('Não deve executar a activity de lead negado quando riscoAceito for false mas não houver idLead', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_RISCO_NAO_ACEITO_RESPONSE())

		const spyPublishMessageDenyLead = jest.spyOn(
			activity.publishMessageDenyLead,
			'execute'
		).mockResolvedValue()

		const inputWithoutIdLead = { ...MOCKS.VALID_INPUT_DATA, idLead: undefined }
		await quotationController.process(inputWithoutIdLead)

		expect(spyPublishMessageDenyLead).not.toHaveBeenCalled()
	})

	test('Deve continuar o fluxo mesmo quando o envio para a fila SQS falhar', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')
		sqsService.queue.sendMessage.mockRejectedValueOnce(new Error('SQS unavailable'))

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		await expect(
			quotationController.process(MOCKS.VALID_INPUT_DATA)
		).resolves.not.toThrow()

		expect(logger.error).toHaveBeenCalledWith('Ocorreu um erro na requisição da mensagem')
	})

	test('Deve logar o payload enviado e a cotação retornada', async () => {
		jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal').mockReturnValue('fakeToken')

		jest
			.spyOn(quotationFactory, 'makePayload')
			.mockReturnValue(MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'quotationRequest')
			.mockReturnValue(MOCKS.POST_CELLPHONE_API_SUCCESS_RESPONSE)
		jest
			.spyOn(cellphoneApi, 'getCalculoResponse')
			.mockReturnValueOnce(MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE)

		const spyLogger = jest.spyOn(logger, 'info')

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spyLogger).toHaveBeenCalledWith(
			MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE,
			'Payload enviado ao produto, para solicitar o hash de cotação'
		)
		expect(spyLogger).toHaveBeenCalledWith(
			MOCKS.GET_CELLPHONE_API_SUCCESS_RESPONSE,
			'Cotação retornada pelo produto.'
		)
	})
})
