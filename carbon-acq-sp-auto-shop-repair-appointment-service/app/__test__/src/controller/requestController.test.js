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
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})

	service.validation.inputData.mockImplementation((payload, schema) => {
		//Do nothing (no validation errors)
	})

	token.getMulesoftTokenHubInternal = jest.fn(() =>
		MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().mulesoftToken
	)
	token.getPortoCertificates = jest.fn(() =>
		MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().ca
	)
	api.servicoResolve.orcamentoCore.v1.agendamentoApi.getAppointmentService.mockImplementationOnce(
		async () => {
			return MOCKS.API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1.VALID_RETURN()
		}
	)

	factory.api.servicoResolve.orcamentoCore.v1.AgendamentoApiPayloadRequest.getPayload.mockImplementationOnce(
		() => {
			return MOCKS.FACTORY_API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1_APPOINTMENTSERVICEREQUEST.GETPAYLOAD_VALID_RETURN()
		}
	)

	factory.response.badRequestError.mockImplementation((apiResult) => {
		return MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
	})
	factory.response.error.mockImplementation((apiResult) => {
		return MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
	})
})

beforeEach(() => {
	factory.response.success.mockImplementation((apiResult) => {
		return MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
	})
})

describe('Suite de teste de requestController.js', () => {
	describe('Quando sucesso', () => {
		test('It should pass with no validation errors and return success', async () => {
			const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN())

			expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.CONTROLLER_PROCESS_SUCCESS_INFO_MESSAGE()
			)
		})
	})

	describe('Quando falha', () => {
		test('It should return bad request response when receives a structure input that not follows the expected schema', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new errors.ValidationError('Validation')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_BADREQUEST_RETURN())
			expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_ERROR_WARNING_MESSAGE()
			)
		})
		test('It should return internal error response when an unexpected exception occur during input validation', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE()
			)
		})
		test('It should return internal error response when receives a structure with data that fires exception simulation and log data', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.EXCEPTION_SIMULATION_ERROR_MESSAGE()
			)
		})
		test('It should return internal error response when an exception occur during proccess of buid success return', async () => {
			const errorMessage =
				'Any controller returnValue factory getReturnValue unexpected error'

			factory.response.success.mockImplementation((apiResult) => {
				throw new Error(errorMessage)
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})
		test('It should return internal error response when an exception occur during API Gateway token retrieve', async () => {
			const errorMessage = 'Any token getMulesoftTokenHub unexpected error'
			token.getMulesoftTokenHubInternal.mockImplementationOnce(async () => {
				throw new Error(errorMessage)
			})
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})
		test('It should return internal error response when an exception occur during API getAppointmentService Endpoint payload generation', async () => {
			const errorMessage =
				'Any getAppointmentServiceEndpoint payload generation unexpected error'
			factory.api.servicoResolve.orcamentoCore.v1.AgendamentoApiPayloadRequest.getPayload.mockImplementationOnce(
				() => {
					throw new Error(errorMessage)
				}
			)
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})
		test('It should return internal error response when an exception occur during API getAppointmentService Endpoint call', async () => {
			const errorMessage = 'Any getAppointmentServiceEndpoint unexpected error'
			api.servicoResolve.orcamentoCore.v1.agendamentoApi.getAppointmentService.mockImplementationOnce(
				async () => {
					throw new Error(errorMessage)
				}
			)
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})
		test('It should return internal error response when an exception occur during API getAppointmentServiceg Endpoint call', async () => {
			const errorMessage = 'Any getAppointmentServiceEndpoint unexpected error'
			api.servicoResolve.orcamentoCore.v1.agendamentoApi.getAppointmentService.mockImplementationOnce(
				async () => {
					throw new Error(errorMessage)
				}
			)
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})
	})
})
