const MOCKS = require('../../mocks/index.mock')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../src/controller')
const errors = require('../../../src/error')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info.mockImplementation(() => {})
	service.logger.error.mockImplementation(() => {})
	service.logger.warn.mockImplementation(() => {})
	service.logger.debug.mockImplementation(() => {})

	service.validation.inputData.mockImplementation((payload, schema) => {
		// Do nothing (no validation errors)
	})

	token.getImpersonalUserCarbon = jest.fn(
		() => MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().impersonalUserToken
	)

	token.getPortoCertificates = jest.fn(
		() => MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().ca
	)

	factory.api.serviceAppointmentApi.serviceAppointmentRequestPayload.getPayload.mockImplementation(
		() => MOCKS.FACTORY_REQUEST_API.GETPAYLOAD_VALID_RETURN()
	)

	api.serviceAppointmentApi.postServiceAppointment.mockImplementation(() =>
		MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_RETURN()
	)

	factory.requestControllerResponse.badRequestError.mockImplementation(() =>
		MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
	)

	factory.requestControllerResponse.error.mockImplementation(() =>
		MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
	)

	factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload.mockImplementation(
		() => MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
	)

	factory.requestControllerResponse.noContent.mockImplementation(() =>
		MOCKS.FACTORY_RESPONSE.NO_CONTENT_RETURN_FACTORY()
	)
})

beforeEach(() => {
	factory.requestControllerResponse.success.mockImplementation(() =>
		MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
	)
})

describe('Suite de teste de requestController.js', () => {
	describe('Quando sucesso', () => {
		test('Deve passar sem erros de validação e retornar sucesso', async () => {
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
		})
	})

	describe('Quando falha', () => {
		test('Deve retornar resposta de bad request quando recebe uma estrutura de input que não segue o schema esperado', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new errors.ValidationError('Validation')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN())

			expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_ERROR_WARNING_MESSAGE()
			)
		})
		test('Deve retornar resposta de erro interno quando ocorre uma exceção inesperada durante a validação de input', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE()
			)
		})
		test('Deve retornar uma resposta de erro interno ao receber uma estrutura com dados que dispara simulação de exceção e dados de log', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.EXCEPTION_SIMULATION_ERROR_MESSAGE()
			)
		})
		test('Deve retornar resposta de erro interno quando ocorre uma exceção durante o processo de construir retorno de sucesso', async () => {
			const errorMessage =
				'Any controller dummy returnValue factory getReturnValue unexpected error'

			factory.requestControllerResponse.success.mockImplementationOnce(() => {
				throw new Error(errorMessage)
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})
		test('Deve retornar resposta de erro interno quando ocorre uma exceção durante a recuperação do token da API Gateway', async () => {
			token.getImpersonalUserCarbon.mockImplementationOnce(() => {
				throw new Error('API Gateway Token Retrieve Error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})
		test('Deve retornar resposta de erro interno quando ocorre uma exceção durante a chamada do endpoint da API', async () => {
			const errorMessage =
				'Any dummy postServiceAppointmentEndpoint unexpected error'
			api.serviceAppointmentApi.postServiceAppointment.mockImplementationOnce(
				async () => {
					throw new Error(errorMessage)
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})
		test('Deve retornar resposta de bad request quando nenhuma data é retornada', async () => {
			factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload
				.mockImplementationOnce(() => [])
				.mockImplementationOnce(() => [])

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
			)
		})
		test('Deve retornar noContent quando response está vazio', async () => {
			api.serviceAppointmentApi.postServiceAppointment.mockImplementationOnce(
				async () => {
					return MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_EMPTY_REGULACOESSAPS()
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.FACTORY_RESPONSE.NO_CONTENT_RETURN_FACTORY())
		})
	})
})
