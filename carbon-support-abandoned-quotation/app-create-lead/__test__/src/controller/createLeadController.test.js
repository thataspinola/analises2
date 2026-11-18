const MOCKS = require('../../mocks/index.mock')

const dynamicsLayer = require('@porto-seguro/hub-vendas.carbon-service-connector-dynamics')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-service-connector-dynamics')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}
	api.carbonRegisterCompleteApi.getPesCod.mockImplementation(async () => {
		return { data: { success: true } }
	})
	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})
	tokenLayer.getSensediaTokenCarbonCloudInternal.mockImplementation(async () => {
		return 'token'
	})
	tokenLayer.getSensediaTokenHubCloudInternal.mockImplementation(async () => {
		return 'token'
	})
	tokenLayer.getPortoCertificates.mockImplementation(async () => {
		return ['certificate']
	})
	tokenLayer.getMulesoftImpersonalTokenHub.mockImplementation(async () => {
		return 'token'
	})
	api.governancaDados.dadosPessoa.v1.pessoa.documentoIdentificacao.get.mockImplementation(
		async () => {
			return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_V1_PESSOA_DOCUMENTOIDENTIFICACAOENDPOINT.GET_EXISTS_RETURN()
		}
	)
	factory.createLead.makeCreateLeadPayload.mockImplementation(() => {
		return MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE()
	})
	dynamicsLayer.createLead.mockImplementation(async () => {
		return MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE()
	})
	factory.dynamoDb.makePayloadLeadInProgress.mockImplementation(() => {
		return MOCKS.VALID_PUT_ITEM()
	})
	service.dynamoDb.leadInProgress.putItem.mockImplementation(async () => {
		return MOCKS.PUTCOMMAND_VALID_RETURN()
	})
	factory.response.createLeadSuccess.mockImplementation(() => {
		return MOCKS.CONTROLLER_SUCCESS_RESPONSE()
	})
	factory.service.sns.registerUpdate.getPayload.mockImplementation(() => {
		return MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN()
	})
	service.sns.registerUpdateSnsService.sendSnsMessage.mockImplementation(() => {
		return MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDPROCESSMESSAGE_VALID_RETURN()
	})
})

describe('Suite de testes de controller.createLeadController.js', () => {
	test('Deve invocar a layer de token somente uma vez', async () => {
		jest
			.spyOn(dynamicsLayer, 'createLead')
			.mockReturnValueOnce(MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE())

		const spyLayer = jest.spyOn(tokenLayer, 'getSensediaTokenCarbonCloudInternal')

		api.carbonRegisterCompleteApi.getPesCod = jest.fn(() => {
			return MOCKS.RESPONSE_REGISTER_COMPLETE()
		})

		await controller.createLeadController.process(MOCKS.VALID_INPUT_DATA())

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	test('Deve invocar a layer do dynamics somente uma vez', async () => {
		const tokenCarbon = 'tokenFake'
		const tokenHub = 'tokenFake'
		const certificates = ['certificate']
		jest
			.spyOn(tokenLayer, 'getSensediaTokenCarbonCloudInternal')
			.mockReturnValueOnce(tokenCarbon)
		jest
			.spyOn(tokenLayer, 'getSensediaTokenHubCloudInternal')
			.mockReturnValueOnce(tokenHub)

		jest
			.spyOn(factory.createLead, 'makeCreateLeadPayload')
			.mockReturnValueOnce(MOCKS.DYNAMICS_PAYLOAD())

		api.carbonRegisterCompleteApi.getPesCod = jest.fn(() => {
			return MOCKS.RESPONSE_REGISTER_COMPLETE()
		})

		const spyLayer = jest
			.spyOn(dynamicsLayer, 'createLead')
			.mockReturnValueOnce(MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE())

		await controller.createLeadController.process(MOCKS.VALID_INPUT_DATA())

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
		expect(spyLayer).toHaveBeenCalledWith(
			MOCKS.DYNAMICS_PAYLOAD(),
			tokenCarbon,
			tokenHub,
			certificates
		)
	})

	test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
		jest
			.spyOn(dynamicsLayer, 'createLead')
			.mockReturnValueOnce(MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE())

		jest
			.spyOn(factory.response, 'createLeadSuccess')
			.mockReturnValueOnce(MOCKS.CONTROLLER_SUCCESS_RESPONSE())

		api.carbonRegisterCompleteApi.getPesCod = jest.fn(() => {
			return MOCKS.RESPONSE_REGISTER_COMPLETE()
		})
		const response = await controller.createLeadController.process(
			MOCKS.VALID_INPUT_DATA()
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('susepCode')
		expect(response).toHaveProperty('idLead')
		expect(response).toHaveProperty('vdoCode')
	})

	test("Deve retornar um objeto de resposta de sucesso no padrão esperado quando susepCode for a string 'undefined'", async () => {
		const inputDataSpy = jest.spyOn(service.validation, 'inputData')
		const input = JSON.parse(JSON.stringify(MOCKS.VALID_INPUT_DATA()))
		input.susepCode = 'null'
		await expect(
			controller.createLeadController.process(input)
		).resolves.toEqual(MOCKS.CONTROLLER_SUCCESS_RESPONSE())
		expect(inputDataSpy.mock.lastCall[0]).toHaveProperty('susepCode', null)
	})

	test("Deve retornar um objeto de resposta de sucesso no padrão esperado quando origem tiver o valor relativo ao SIMULADOR_LEAD que é a string '35'", async () => {
		const factoryDynamoDbMakePayloadLeadInProgressSpy = jest.spyOn(
			factory.dynamoDb,
			'makePayloadLeadInProgress'
		)
		const serviceDynamoDbLeadInProgressPutItemSpy = jest.spyOn(
			service.dynamoDb.leadInProgress,
			'putItem'
		)
		const input = JSON.parse(JSON.stringify(MOCKS.VALID_INPUT_DATA()))
		input.origin = '35'
		await expect(
			controller.createLeadController.process(input)
		).resolves.toEqual(MOCKS.CONTROLLER_SUCCESS_RESPONSE())

		expect(factoryDynamoDbMakePayloadLeadInProgressSpy).toHaveBeenCalled()
		expect(serviceDynamoDbLeadInProgressPutItemSpy).toHaveBeenCalled()
	})

	it('Deve retornar uma exceção ao receber erro ao buscar o token', async () => {
		jest
			.spyOn(tokenLayer, 'getSensediaTokenCarbonCloudInternal')
			.mockImplementationOnce(() => {
				throw new Error('Error')
			})

		await expect(
			controller.createLeadController.process(MOCKS.VALID_INPUT_DATA())
		).rejects.toThrow('Error')
	})

	test('Deve retornar uma exceção ao receber um erro ao invocar a layer do dynamics', async () => {
		jest.spyOn(dynamicsLayer, 'createLead').mockImplementationOnce(() => {
			throw new Error('Error')
		})

		api.carbonRegisterCompleteApi.getPesCod = jest.fn(() => {
			return MOCKS.RESPONSE_REGISTER_COMPLETE()
		})

		await expect(
			controller.createLeadController.process(MOCKS.VALID_INPUT_DATA())
		).rejects.toThrow('Error')
	})
})
