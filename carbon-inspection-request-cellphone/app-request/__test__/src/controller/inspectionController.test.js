const MOCKS = require('../../mocks/src/controller/inspectionController.mock')
const controller = require('../../../src/controller')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const api = require('../../../src/api')
const CONSTANTS = require('../../../src/property')
const service = require('../../../src/service/')
const errors = require('../../../src/error')
const logger = require('../../../config/logger')

const paymentDAtalayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')

const FAKE_TOKEN = '123456'
const FAKE_CERTIFICATES = ['`-----BEGIN CERTIFICATE-----<CERTIFICATE>-----END CERTIFICATE-----']

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

beforeAll(() => {
	token.getMulesoftTokenHubInternal = jest.fn(async () => {
		return FAKE_TOKEN
	})
	token.getPortoCertificates = jest.fn(async () => {
		return FAKE_CERTIFICATES
	})
	paymentDAtalayer.savePaymentData = jest.fn(async () => {
		return {}
	})
})

describe('Cenários com testes de sucesso', () => {
	test('Deve chamar o serviço de proposta e postar uma mensagem na fila do google-analytics', async () => {
		const spyApiProposal = jest
			.spyOn(api.proposal, 'integration')
			.mockImplementation(() => {
				return MOCKS.VALID_API_RESPONSE()
			})

		const spyServiceSendMessage = jest
			.spyOn(service.sqs.queueService, 'sendMessage')
			.mockImplementation(() => {
				return '1'
			})

		const response = await controller.inspection.process(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST()
		)
		expect(response).toEqual(
			MOCKS.CONTROLLER_SUCCESS_RESPONSE({ body: 'Success' })
		)
		expect(spyApiProposal).toHaveBeenCalledWith(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST().integrationData,
			FAKE_TOKEN,
			FAKE_CERTIFICATES
		)
		expect(spyServiceSendMessage).toHaveBeenCalledWith(
			MOCKS.VALID_GOOGLE_ANALYTICS_MESSAGE,
			CONSTANTS.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL
		)
	})

	test('Dado input sem dados de analytics, deve chamar o serviço de proposta e NÃO postar uma mensagem na fila do google-analytics', async () => {
		const spyApiProposal = jest
			.spyOn(api.proposal, 'integration')
			.mockImplementation(() => {
				return MOCKS.VALID_API_RESPONSE()
			})

		const spyServiceSendMessage = jest.spyOn(
			service.sqs.queueService,
			'sendMessage'
		)

		const response = await controller.inspection.process(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST_WITHOU_ANALYTICS_DATA()
		)
		expect(response).toEqual(
			MOCKS.CONTROLLER_SUCCESS_RESPONSE({ body: 'Success' })
		)
		expect(spyApiProposal).toHaveBeenCalledWith(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST_WITHOU_ANALYTICS_DATA()
				.integrationData,
			FAKE_TOKEN,
			FAKE_CERTIFICATES
		)
		expect(spyServiceSendMessage).not.toHaveBeenCalled()
	})
})

describe('Cenários com testes de erro', () => {
	test('Deve retornar esquema de erro de validação', async () => {
		jest.spyOn(service.validation, 'inputData').mockImplementationOnce(() => {
			throw new errors.ValidationError('validation')
		})
		const jestApi = jest.spyOn(api.proposal, 'integration')
		const spyServiceSendMessage = jest.spyOn(
			service.sqs.queueService,
			'sendMessage'
		)

		await expect(
			controller.inspection.process(MOCKS.VALID_CONTROLLER_INPUT_REQUEST())
		).rejects.toThrow('validation')

		expect(jestApi).not.toHaveBeenCalled()
		expect(spyServiceSendMessage).not.toHaveBeenCalled()
	})

	test('Deve retornar erro na chamada da API', async () => {
		const jestApi = jest
			.spyOn(api.proposal, 'integration')
			.mockImplementationOnce(() => {
				throw new Error('Error call api')
			})

		const spyServiceSendMessage = jest.spyOn(
			service.sqs.queueService,
			'sendMessage'
		)

		await expect(
			controller.inspection.process(MOCKS.VALID_CONTROLLER_INPUT_REQUEST())
		).rejects.toThrow('Error call api')

		expect(jestApi).toHaveBeenCalledWith(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST().integrationData,
			FAKE_TOKEN,
			FAKE_CERTIFICATES
		)
		expect(spyServiceSendMessage).not.toHaveBeenCalled()
	})

	test('Deve retornar erro quando serviço de proposta não retornar o numeroProposta', async () => {
		const spyApiProposal = jest
			.spyOn(api.proposal, 'integration')
			.mockImplementation(() => {
				return {}
			})

		const spyServiceSendMessage = jest.spyOn(
			service.sqs.queueService,
			'sendMessage'
		)

		await expect(
			controller.inspection.process(MOCKS.VALID_CONTROLLER_INPUT_REQUEST())
		).rejects.toThrow('idTransaction não localizado.')

		expect(spyApiProposal).toHaveBeenCalledWith(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST().integrationData,
			FAKE_TOKEN,
			FAKE_CERTIFICATES
		)
		expect(spyServiceSendMessage).not.toHaveBeenCalled()
	})

	test('Deve logar erro se não conseguir postar mensagem na fila do goole-analytics', async () => {
		const spyApiProposal = jest
			.spyOn(api.proposal, 'integration')
			.mockImplementation(() => {
				return MOCKS.VALID_API_RESPONSE()
			})

		const exception = new Error('erro ao postar msg na fila')
		const spyServiceSendMessage = jest
			.spyOn(service.sqs.queueService, 'sendMessage')
			.mockImplementation(() => {
				throw exception
			})

		const spyLogger = jest.spyOn(logger, 'error')

		await controller.inspection.process(MOCKS.VALID_CONTROLLER_INPUT_REQUEST())

		expect(spyApiProposal).toHaveBeenCalledWith(
			MOCKS.VALID_CONTROLLER_INPUT_REQUEST().integrationData,
			FAKE_TOKEN,
			FAKE_CERTIFICATES
		)
		expect(spyServiceSendMessage).toHaveBeenCalledWith(
			MOCKS.VALID_GOOGLE_ANALYTICS_MESSAGE,
			CONSTANTS.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL
		)

		expect(spyLogger).toHaveBeenCalledWith(
			exception,
			'erro ao enviar mensagem para a fila que faz envio dos dados de tagueamento para o google-analytics'
		)
	})
})
