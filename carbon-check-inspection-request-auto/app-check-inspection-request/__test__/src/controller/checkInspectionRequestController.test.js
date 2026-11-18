const MOCKS = require('../../mocks/index.mock')
const { checkInspectionRequest } = require('../../../src/controller')
const api = require('../../../src/api')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const CONSTANT =require('../../../src/property')
const { ValidationError, PaymentApiError } = require('../../../src/error');

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/property')

afterEach(() => {
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

beforeAll(() => {
	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	token.getSensediaTokenHubCloud.mockImplementation(async () => {
		return MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
	})

	token.getSensediaTokenHub.mockImplementation(async () => {
		return MOCKS.CONTROLLER.SENSEDIA_HUB_TOKEN()
	})

	api.autoQuotations.getProtocols.mockImplementation(async () => {
		return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN()
	})

	factory.status.getInspectionStatus.mockImplementation(() => {
		return MOCKS.STATUS_FACTORY.GET_OK_STATUS()
	})

	factory.putPaymentRegister.getPayload.mockImplementation(() => {
		return MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN()
	})

	api.payment.putPaymentRegister.mockImplementation(async () => {
		return MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_APPROVED_VALID_RETURN()
	})

	service.dynamoDb.deleteItemIfExists.mockImplementation(async () => {
		return MOCKS.DYNAMODB.DELETECOMMAND_VALID_RETURN()
	})

	service.dynamoDb.putItem.mockImplementation(async () => {
		return MOCKS.DYNAMODB.PUTCOMMAND_VALID_RETURN()
	})
})

beforeEach(() => {
	factory.ttl.getMinutesSinceInspectionRequest.mockImplementation(() => {
		return MOCKS.TTL_FACTORY.GET_MINUTES_ABOVE_THE_MAX_LIMIT()
	})

	factory.ttl.getTtlInMinutes.mockImplementation(() => {
		return MOCKS.TTL_FACTORY.TTL_ABOVE_THE_MAX_LIMIT()
	})
})

describe('Given a valid input', () => {
	test('It should pass with no validation errors and succeed', async () => {

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(4)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{  inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				payload: { ...MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PAYLOAD_SENT_TO_PAYMENTREGISTER()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			4,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				putPaymentRegisterResponse: { ...MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_APPROVED_VALID_RETURN() },
			},
			MOCKS.LOGGER.INFO_PAYMENTREGISTER_API_RESPONSE()
		)
	})

	test('It should pass with no validation errors and succeed when received from db', async () => {
		const spyLoggerInfo = jest.spyOn(service.logger, 'info')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(4)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_DYNAMODB_TTL()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN() },
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				payload: { ...MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PAYLOAD_SENT_TO_PAYMENTREGISTER()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			4,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				putPaymentRegisterResponse: { ...MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_APPROVED_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PAYMENTREGISTER_API_RESPONSE()
		)
	})

	test('It should pass without validation errors and return nothing when status is refused', async () => {
		api.autoQuotations.getProtocols.mockImplementationOnce(async () => {
			return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data
		})

		factory.status.getInspectionStatus.mockImplementationOnce(() => {
			return MOCKS.STATUS_FACTORY.GET_REFUSED_STATUS()
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyGetInspectionStatus = jest.spyOn(factory.status, 'getInspectionStatus')
		const spyGetPayload = jest.spyOn(factory.putPaymentRegister, 'getPayload')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(3)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data },
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{ 
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data
			},
			MOCKS.LOGGER.INFO_REFUSED()
		)

		expect(spyGetInspectionStatus).toHaveBeenCalledWith(MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data)

		expect(spyGetPayload).toHaveBeenCalledWith(
			MOCKS.STATUS_FACTORY.GET_REFUSED_STATUS(),
			MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT().idTransaction,
			`${MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data.proposta.numero}`,
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_REFUSED_SUCCESS_RESPONSE().data.proposta.origem
		)
	})

	test('It should pass without validation errors and return nothing when status is issued', async () => {
		api.autoQuotations.getProtocols.mockImplementationOnce(async () => {
			return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data
		})

		factory.status.getInspectionStatus.mockImplementationOnce(() => {
			return MOCKS.STATUS_FACTORY.GET_ISSUED_STATUS()
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyGetInspectionStatus = jest.spyOn(factory.status, 'getInspectionStatus')
		const spyGetPayload = jest.spyOn(factory.putPaymentRegister, 'getPayload')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(3)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data },
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{ 
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data
			},
			MOCKS.LOGGER.INFO_ISSUED()
		)

		expect(spyGetInspectionStatus).toHaveBeenCalledWith(MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data)

		expect(spyGetPayload).toHaveBeenCalledWith(
			MOCKS.STATUS_FACTORY.GET_ISSUED_STATUS(),
			MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT().idTransaction,
			`${MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data.proposta.numero}`,
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_ISSUED_SUCCESS_RESPONSE().data.proposta.origem
		)
	})

	test('It should pass without validation errors and send to the DB when the status is pending and give ttl above the limit.', async () => {
		api.autoQuotations.getProtocols.mockImplementationOnce(async () => {
			return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data
		})

		factory.status.getInspectionStatus.mockImplementationOnce(() => {
			return MOCKS.STATUS_FACTORY.GET_PENDING_STATUS()
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyGetInspectionStatus = jest.spyOn(factory.status, 'getInspectionStatus')
		const spyGetPayload = jest.spyOn(factory.putPaymentRegister, 'getPayload')
		const spyGetTtlInMinutes = jest.spyOn(factory.ttl, 'getTtlInMinutes')
		const spySendMessage = jest.spyOn(service.dlq, 'sendMessage')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(3)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data },
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DLQ()
		)

		expect(spyGetInspectionStatus).toHaveBeenCalledWith(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data)

		expect(spyGetPayload).toHaveBeenCalledWith(
			MOCKS.STATUS_FACTORY.GET_PENDING_STATUS(),
			MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT().idTransaction,
			`${MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data.proposta.numero}`,
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data.proposta.origem
		)

		expect(spyGetTtlInMinutes).toHaveBeenCalledWith(
			MOCKS.TTL_FACTORY.GET_MINUTES_ABOVE_THE_MAX_LIMIT(),
			undefined
		)

		expect(spySendMessage).toHaveBeenCalledWith(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())
	})

	test('It should pass without validation errors and send to the DB when the status is pending and give ttl below the limit.', async () => {
		api.autoQuotations.getProtocols.mockImplementationOnce(async () => {
			return MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data
		})

		factory.status.getInspectionStatus.mockImplementationOnce(() => {
			return MOCKS.STATUS_FACTORY.GET_PENDING_STATUS()
		})

		factory.ttl.getMinutesSinceInspectionRequest.mockImplementationOnce(() => {
			return MOCKS.TTL_FACTORY.GET_MINUTES_BELOW_THE_MAX_LIMIT()
		})
	
		factory.ttl.getTtlInMinutes.mockImplementationOnce(() => {
			return MOCKS.TTL_FACTORY.TTL_BELOW_THE_MAX_LIMIT()
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyGetInspectionStatus = jest.spyOn(factory.status, 'getInspectionStatus')
		const spyGetPayload = jest.spyOn(factory.putPaymentRegister, 'getPayload')
		const spyGetTtlInMinutes = jest.spyOn(factory.ttl, 'getTtlInMinutes')
		const spyPutItem = jest.spyOn(service.dynamoDb, 'putItem')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(3)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data },
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DB(MOCKS.TTL_FACTORY.TTL_BELOW_THE_MAX_LIMIT())
		)

		expect(spyGetInspectionStatus).toHaveBeenCalledWith(
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data)

		expect(spyGetPayload).toHaveBeenCalledWith(
			MOCKS.STATUS_FACTORY.GET_PENDING_STATUS(),
			MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT().idTransaction,
			`${MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data.proposta.numero}`,
			MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_AXIOS_PENDING_UNABLETOPAY_JUSTSETOFFEEDBACKS_SUCCESS_RESPONSE().data.proposta.origem
		)

		expect(spyGetTtlInMinutes).toHaveBeenCalledWith(
			MOCKS.TTL_FACTORY.GET_MINUTES_BELOW_THE_MAX_LIMIT(),
			undefined
		)

		expect(spyPutItem).toHaveBeenCalledWith(
			MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT(),
			MOCKS.TTL_FACTORY.TTL_BELOW_THE_MAX_LIMIT()
		)
	})

	test('It should pass with no validation errors and send to db when has a payment error', async () => {
		factory.ttl.getTtlInMinutes.mockImplementationOnce(() => {
			return MOCKS.TTL_FACTORY.TTL_UP_TO_FIFTEEN_MINUTES()
		})
		
		const paymentError = new PaymentApiError()

		api.payment.putPaymentRegister.mockImplementationOnce(async () => {
			throw paymentError
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyLoggerError = jest.spyOn(service.logger, 'error')
		
		await checkInspectionRequest.process({
			orderNumber: '3000617082',
			externalId: '00001',
			productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
			scope: 'auto',
			amount: 100,
			contactEmail: 'teste@teste.com.br',
			installments: 1,
			idTransaction: '00123456',
			inspectionStatusProcessCount: 0,
			inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
			quotationNumber: '30000572475',
			receivedFromDb: true
		})

		expect(spyLoggerInfo).toHaveBeenCalledTimes(4)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(1, 
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() } }, 
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_DYNAMODB_TTL())
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				payload: { ...MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PAYLOAD_SENT_TO_PAYMENTREGISTER()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			4,
			{
				inspectionRequestData: {  ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() }
			},
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DB(CONSTANT.TTL.UP_TO_FIFTEEN_MINUTES)
		)

		expect(spyLoggerError).toHaveBeenCalledTimes(1)
		expect(spyLoggerError).toHaveBeenCalledWith(
			{  
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB() },
				error: paymentError,
			},
			MOCKS.LOGGER.ERROR_PROCESSING()
		)
	})

	test('It should pass with no validation errors and send to db when has a payment error', async () => {
		factory.ttl.getTtlInMinutes.mockImplementationOnce(() => {
			return MOCKS.TTL_FACTORY.TTL_UP_TO_FIFTEEN_MINUTES()
		})
		
		const paymentError = new PaymentApiError()

		api.payment.putPaymentRegister.mockImplementationOnce(async () => {
			throw paymentError
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyLoggerError = jest.spyOn(service.logger, 'error')
		
		await checkInspectionRequest.process({
			orderNumber: '3000617082',
			externalId: '00001',
			productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
			scope: 'auto',
			amount: 100,
			contactEmail: 'teste@teste.com.br',
			installments: 1,
			idTransaction: '00123456',
			inspectionStatusProcessCount: 0,
			inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
			quotationNumber: '30000572475',
			receivedFromDb: true,
			attemptAfterPaymentError: true
		})

		expect(spyLoggerInfo).toHaveBeenCalledTimes(4)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(1, 
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() } }, 
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_DYNAMODB_TTL())
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() },
				protocolData: { ...MOCKS.API_AUTO_QUOTATIONS.GETPROTOCOLOS_PENDING_ABLETOPAY_JUSTSETOFFEEDBACKS_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PROTOCOLS_API_RESPONSE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			3,
			{
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() },
				payload: { ...MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN() }
			},
			MOCKS.LOGGER.INFO_PAYLOAD_SENT_TO_PAYMENTREGISTER()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			4,
			{
				inspectionRequestData: {  ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() }
			},
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DLQ()
		)

		expect(spyLoggerError).toHaveBeenCalledTimes(1)
		expect(spyLoggerError).toHaveBeenCalledWith(
			{  
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR() },
				error: paymentError,
			},
			MOCKS.LOGGER.ERROR_PROCESSING()
		)
	})
})

describe('Given a invalid input', () => {
	test('It should not pass and throw validation errors', async () => {
		factory.ttl.getTtlInMinutes.mockImplementationOnce(() => {
			return MOCKS.TTL_FACTORY.TTL_UP_TO_FIFTEEN_MINUTES()
		})
		
		const validationError = new ValidationError('The attributes values are not valid')

		service.validation.inputData.mockImplementation(() => {
			throw validationError
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyInputValidation = jest.spyOn(service.validation, 'inputData')
		const spyLoggerError = jest.spyOn(service.logger, 'error')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(2)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DB(CONSTANT.TTL.UP_TO_FIFTEEN_MINUTES)
		)

		expect(spyInputValidation).toHaveBeenCalledWith(
			MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT(),
			CONSTANT.INSPECTION_REQUEST_SCHEMA
		)

		expect(spyLoggerError).toHaveBeenCalledTimes(1)
		expect(spyLoggerError).toHaveBeenCalledWith(
			{ 
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() },
				error: validationError
			},
			MOCKS.LOGGER.ERROR_INVALID_INPUT())
	})

	test('It should not pass with any error', async () => {
		const anyError = new Error()

		service.validation.inputData.mockImplementation(() => {
			throw anyError
		})

		const spyLoggerInfo = jest.spyOn(service.logger, 'info')
		const spyInputValidation = jest.spyOn(service.validation, 'inputData')
		const spyLoggerError = jest.spyOn(service.logger, 'error')

		await checkInspectionRequest.process(MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT())

		expect(spyLoggerInfo).toHaveBeenCalledTimes(2)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			1,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE()
		)
		expect(spyLoggerInfo).toHaveBeenNthCalledWith(
			2,
			{ inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() } },
			MOCKS.LOGGER.INFO_DATA_SENT_TO_DB(CONSTANT.TTL.UP_TO_FIFTEEN_MINUTES)
		)

		expect(spyInputValidation).toHaveBeenCalledWith(
			MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT(),
			CONSTANT.INSPECTION_REQUEST_SCHEMA
		)

		expect(spyLoggerError).toHaveBeenCalledTimes(1)
		expect(spyLoggerError).toHaveBeenCalledWith(
			{ 
				inspectionRequestData: { ...MOCKS.CONTROLLER.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT() },
				error: anyError
			},
			MOCKS.LOGGER.ERROR_PROCESSING())
	})
})
