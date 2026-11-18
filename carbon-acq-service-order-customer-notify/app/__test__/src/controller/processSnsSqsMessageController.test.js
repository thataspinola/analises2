const MOCKS = require('../../../__test__/mocks/index.mock')
const factory = require('../../../src/factory')
const service = require('../../../src/service')
const api = require('../../../src/api')
const serviceOrderLayer = require('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')
const controller = require('../../../src/controller')
const ERRORS = require('../../../src/error')

jest.mock('../../../src/factory')
jest.mock('../../../src/service')
jest.mock('../../../src/api')
jest.mock('@porto-seguro/hub-vendas.carbon-acq-service-order-layer')

afterEach(function () {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	factory.controller.processSqsMessage.receivedDataReport.getDataReport.mockImplementation(
		(parsedSnsSqsMessagePayload) => {
			return MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT.GETDATAREPORT_VALID_RETURN()
		}
	)

	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})

	service.validation.inputData.mockImplementation((payload, schema) => {
		//Do nothing (no validation errors)
	})

	factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload.mockImplementation(
		(parsedSnsMessagePayload) => {
			return MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.GETPAYLOAD_VALID_RETURN()
		}
	)

	api.sendgrid.v3.mail.postSendEndpoint.mockImplementation(
		async (payload, carbonTraceId) => {
			return MOCKS.API_SENDGRID_V3_MAIL.POSTSENDENDPOINT_VALID_RETURN()
		}
	)

	factory.controller.setServiceOrderCustomerNotifyData.getPayload.mockImplementation(
		(parsedSnsSqsMessagePayload) => {
			return MOCKS.FACTORY_CONTROLLER_SETSERVICEORDERCUSTOMERNOTIFYDATA.GETPAYLOAD_VALID_RETURN()
		}
	)

	serviceOrderLayer.setCustomerNotifyData.mockImplementation(async () => {
		return MOCKS.SERVICE_ORDER_LAYER.SETCUSTOMERNOTIFYDATA_VALID_RETURN()
	})

	serviceOrderLayer.getServiceOrderData.mockImplementation(async (payload) => {
		return MOCKS.SERVICE_ORDER_LAYER.GETSERVICEORDERDATA_VALID_RETURN()
	})

	factory.controller.processSqsMessage.processedDataReport.getDataReport.mockImplementation(
		(
			customerAlreadyNotified,
			customerNotifyRequestSent,
			updateCustomerNotifyStatusReturn
		) => {
			return MOCKS.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_VALID_RETURN()
		}
	)
})

describe('process', () => {
	test('It should process the message successfully', async () => {
		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_INPUT(),
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_CARBONTRACEID_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
		)
	})
	test('It should get an exception when receive an input parameter that generates a ValidationError exception', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const validationErrorMessage = 'Some validation error'
		const validationError = new ERRORS.ValidationError(validationErrorMessage)
		service.validation.inputData.mockImplementationOnce(() => {
			throw validationError
		})
		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_INVALID_PARSEDJSONQUEUEMESSAGE_INPUT(),
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_CARBONTRACEID_INPUT()
			)
		).rejects.toThrow(validationErrorMessage)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_OBJECT(
				validationError
			),
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_MESSAGE(
				validationErrorMessage
			)
		)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_VALIDATIONERROR_MESSAGE(
				validationErrorMessage
			)
		)
	})
	test('It should get an exception when occurs any error not related with validation', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const genericErrorMessage = 'Some general error'
		const genericError = new Error(genericErrorMessage)
		service.validation.inputData.mockImplementationOnce(() => {
			throw genericError
		})
		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_INPUT(),
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_CARBONTRACEID_INPUT()
			)
		).rejects.toThrow(genericErrorMessage)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_OBJECT(
				genericError
			),
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_MESSAGE(
				genericErrorMessage
			)
		)
		expect(spyServiceLoggerError).not.toHaveBeenCalledWith(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_VALIDATIONERROR_MESSAGE(
				genericErrorMessage
			)
		)
	})
	test('It should get an exception when input payload includes expected value to simulate exception', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const genericErrorMessage = 'Simulação de falha'
		const genericError = new Error(genericErrorMessage)
		await expect(
			controller.processSnsSqsMessage.process(
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_EXCEPTION_SIMULATE_INPUT(),
				MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_CARBONTRACEID_INPUT()
			)
		).rejects.toThrow(genericErrorMessage)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_OBJECT(
				genericError
			),
			MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_LOG_ERROR_MESSAGE(
				genericErrorMessage
			)
		)
	})
})
