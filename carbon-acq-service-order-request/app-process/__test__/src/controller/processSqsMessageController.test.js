const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')
const controller = require('../../../src/controller')
const errors = require('../../../../app-common/nodejs/carbon-acq-service-order-request-common/src/errors')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const serviceOrderLayer = require('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')
const token = require('@porto-seguro/hub-vendas.carbon-token')

jest.mock('@aws-sdk/client-sqs')
jest.mock('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')

let spyServiceValidationInputData

afterEach(() => {
	jest.clearAllMocks()

	if (spyServiceValidationInputData) {
		spyServiceValidationInputData.mockRestore()
	}
})

beforeAll(() => {
	service.logger.info = jest.fn((message) => {})
	service.logger.error = jest.fn((message) => {})
	service.logger.warn = jest.fn((message) => {})
	service.logger.debug = jest.fn((message) => {})

	spyServiceValidationInputData = jest
		.spyOn(service.validation, 'inputData')
		.mockImplementation((payload, schema) => {})

	token.getImpersonalUserCarbon = jest.fn(async () =>
		MOCKS.IMPERSONAL_USER_CARBON()
	)
	token.getSensediaTokenCarbonCloud = jest.fn(async () =>
		MOCKS.SENSEDIA_HUB_TOKEN()
	)

	serviceOrderLayer.createServiceOrderData = jest.fn(async () =>
		MOCKS.CREATESERVICEORDERDATA_VALID_RETURN()
	)

	api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder =
		jest.fn(async () =>
			MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.VALID_RETURN()
		)

	factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload =
		jest.fn(() => MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN())

	factory.service.sns.serviceOrderRequested.getPayload = jest.fn(() =>
		MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_RETURN()
	)

	factory.service.sns.serviceOrderRequested.getSendMessageAttributes = jest.fn(
		() =>
			MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.GETSENDMESSAGEATTRIBUTES_VALID_RETURN()
	)

	factory.controller.createServiceOrderDataRequest.getPayload = jest.fn(() =>
		MOCKS.FACTORY_CONTROLLER_CREATESERVICEORDERDATAREQUEST.VALID_RETURN()
	)

	service.sns.processSnsService.sendSnsMessage = jest.fn(async () =>
		MOCKS.SERVICE_SNS_PROCESS.VALID_RESPONSE()
	)
})

beforeEach(() => {
	service.sns.processSnsService.sendSnsMessage = jest.fn(
		(processSqsMessagePayload) => {
			return MOCKS.SERVICE_SNS_PROCESS.VALID_RETURN()
		}
	)
})

describe('Suite de teste do requestController', () => {
	describe('Quando sucesso', () => {
		test('It should pass with no validation errors and return success', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT(),
					MOCKS.HANDLER.VALID_GENERATED_CARBONTRACEID()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_RETURN())
		})
	})

	describe('Quando falha', () => {
		test('It should log an error and return internal error response when receives a structure with data that fires exception simulation and log data (general error)', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})
			factory.controller.createServiceOrderDataRequest.getPayload.mockImplementationOnce(
				() => {
					throw new Error('General error')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(
				MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.GENERIC_EXCEPTION_MESSAGE_BEGINNING()
			)
		})

		test('It should log an error and return internal error response when an exception occurs during API createServiceOrder call', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})
			const errorMessage =
				'Any postServiceProvisionPaymentCheckoutEndpoint unexpected error'

			api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder.mockImplementationOnce(
				async () => {
					throw new Error(errorMessage)
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(errorMessage)
		})

		test('It should return bad request response when receives a structure input that not follows the expected schema (validation error)', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			spyServiceValidationInputData.mockImplementationOnce(() => {
				throw new errors.ValidationError('Validation')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(`Validation`)

			expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.ERROR_VALIDATION_ERROR_MESSAGE()
			)
		})

		test('It should return internal error response when an unexpected exception occur during input validation', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			spyServiceValidationInputData.mockImplementationOnce(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(`Unexpected validation error`)

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				{ rawError: expect.any(Error) },
				expect.stringContaining(
					MOCKS.SERVICE_LOGGER.ERROR_GENERIC_MESSAGE_BEGINNING()
				)
			)
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				`Erro interno. Dados: ${JSON.stringify(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)}`
			)
		})

		test('It should return internal error response when receives a structure with data that fires exception simulation and log data (exception simulation)', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_EXCEPTION_SIMULATE_INPUT()
				)
			).resolves.toEqual(MOCKS.SERVICE_SNS_PROCESS.VALID_RETURN())
		})

		test('It should return internal error response when an exception occur during API Gateway token retrieve', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})
			const errorMessage = 'Any token getTokens unexpected error'
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			token.getSensediaTokenCarbonCloud.mockImplementationOnce(async () => {
				throw new Error(errorMessage)
			})
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(`Any token getTokens unexpected error`)
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				{ rawError: expect.any(Error) },
				expect.stringContaining(
					MOCKS.SERVICE_LOGGER.ERROR_GENERIC_MESSAGE_BEGINNING()
				)
			)
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				`Erro interno. Dados: ${JSON.stringify(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)}`
			)
		})

		test('It should return internal error response and log generic message when parsedSqsMessage causes JSON stringify error in catch block', async () => {
			spyServiceValidationInputData.mockImplementationOnce(() => {})
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder.mockImplementationOnce(
				async () => {
					throw new Error('Estrutura ou dado inválido: Validation')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(`Estrutura ou dado inválido: Validation`)

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				{ rawError: expect.any(Error) },
				expect.stringContaining(
					MOCKS.SERVICE_LOGGER.ERROR_GENERIC_MESSAGE_BEGINNING()
				)
			)
		})
	})
})
