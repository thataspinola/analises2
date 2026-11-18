const MOCKS = require('../../mocks/index.mock')
const api = require('../../../src/api')
const controller = require('../../../src/controller')
const errors = require('../../../../app-common/nodejs/carbon-acq-service-order-request-common/src/errors')
const service = require('../../../src/service')
const factory = require('../../../src/factory')

jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info = jest.fn((message) => {})
	service.logger.error = jest.fn((message) => {})
	service.logger.warn = jest.fn((message) => {})
	service.logger.debug = jest.fn((message) => {})

	api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.postServiceProvisionPaymentCheckout =
		jest.fn(async () => {
			MOCKS.API_HUBVENDASCARBON_PAYMENT_SERVICE_PROVISION_CHECKOUT.POSTSERVICEPROVISIONCHECKOUT_VALID_RETURN()
		})

	api.sendgrid.v3.mail.postSendEndpoint = jest.fn(async () => {
		MOCKS.API_SENDGRID_V3_MAIL.POSTSENDENDPOINT_VALID_RETURN()
	})

	factory.api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.getPayload =
		jest.fn(() => {
			MOCKS.FACTORY_API_HUBVENDASCARBON_PAYMENT_SERVICE_PROVISION_CHECKOUT.VALID_RETURN()
		})

	factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload = jest.fn(() => {
		MOCKS.FACTORY_API_SENDGRID_V3_MAIL_POSTSENDPOINT.VALID_RETURN()
	})

	service.dynamoDB.serviceOrderTableService.createItem = jest.fn(async () => {
		MOCKS.SERVICE_DYNAMODB_SERVICEORDERTABLE.CREATEITEM_SERVICEORDERTABLESERVICE_RESPONSE_PAYLOAD()
	})
})

beforeEach(() => {
	factory.controller.processSqsMessage.processedDataReport.getDataReport =
		jest.fn((processSqsMessagePayload) => {
			return MOCKS.FACTORY_CONTROLLER_PROCESSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_VALID_RETURN()
		})
})

describe('Suite de teste do requestController', () => {
	describe('Quando sucesso', () => {
		test('It should pass with no validation errors and return success', async () => {
			await expect(
				controller.failedRequest.process(
					MOCKS.CONTROLLER_FAILEDREQUEST.VALID_PARSEDJSONQUEUEMESSAGE_INPUT(),
					MOCKS.HANDLER.VALID_GENERATED_CARBONTRACEID()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_FAILEDREQUEST.VALID_RETURN())
		})
	})

	describe('Quando falha', () => {
		test('It should log an error and return internal error response when receives a structure with data that fires exception simulation and log data', async () => {
			factory.controller.processSqsMessage.processedDataReport.getDataReport =
				jest.fn(() => {
					throw new Error('General error')
				})

			await expect(
				controller.failedRequest.process(
					MOCKS.CONTROLLER_FAILEDREQUEST.INVALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(
				MOCKS.CONTROLLER_FAILEDREQUEST.GENERIC_EXCEPTION_MESSAGE_BEGINNING()
			)
		})

		test.skip('It should log an error and return internal error response when an exception occurs during API zipSearchApi Endpoint call', async () => {
			const errorMessage =
				'Any postServiceProvisionPaymentCheckoutEndpoint unexpected error'

			api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.postServiceProvisionPaymentCheckout =
				jest.fn(async () => {
					throw new Error(errorMessage)
				})

			await expect(
				controller.failedRequest.process(
					MOCKS.CONTROLLER_FAILEDREQUEST.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
				)
			).rejects.toThrow(errorMessage)

			expect(service.logger.error).toHaveBeenCalledWith(
				expect.objectContaining({ message: errorMessage })
			)
		})
	})
})
