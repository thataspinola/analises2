const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const errors = require('../../../src/error')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const CONSTANTS = require('../../../src/property')

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

	service.validation.inputData = jest.fn((payload, schema) => {
		//Do nothing (no validation errors)
	})

	factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.CREATELEADAPI_REQUEST_PAYLOAD_RETURN()
	)

	api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementation(() =>
		MOCKS.API_SUPPORTCREATELEAD.POSTCREATELEAD_VALID_RETURN()
	)

	api.hubVendasCarbon.acquisition.cartCheckout.postCommerceCreateCart.mockImplementation(
		() => MOCKS.API_ACQUISITIONCART.POSTVALID_RETURN()
	)

	factory.controllerResponse.badRequestError.mockImplementation(() =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
	)

	factory.controllerResponse.error.mockImplementation(() =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN()
	)

	factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_RESPONSE()
	)

	factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload.mockImplementationOnce(
		async () => {
			return MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.REQUEST_PAYLOAD_EXPECTED_OUTPUTVALID()
		}
	)

	api.commerceMagento.porto.quotation.postCommerceQuotation.mockImplementation(
		() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.POSTCOMMERCEQUOTATION_VALID_RETURN()
	)

	api.commerceMagento.porto.proposal.postCommerceProposal.mockImplementation(
		() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_PROPOSAL.POSTCOMMERCEPROPOSAL_VALID_RETURN()
	)

	api.businessPartner.checkoutSimulation.get.mockImplementation(() =>
		MOCKS.API_BUSINESSPARTNER_CHECKOUTSIMULATION.GETBUSINESSPARTNER_CHECKOUTSIMULATION_VALID_RETURN()
	)

	api.businessPartner.couponDetails.get.mockImplementation(() =>
		MOCKS.API_BUSINESSPARTNER_COUPONDETAILS.GETBUSINESSPARTNER_COUPONDETAILS_VALID_RETURN()
	)

	tokenLayer.getPetloveAuthToken = jest.fn(async () => {
		return MOCKS.CONTROLLER_REQUEST.TOKEN_PETLOVE()
	})

	tokenLayer.getPortoCertificates = jest.fn(async () => {
		return MOCKS.CONTROLLER_REQUEST.CERTIFICADOS_PORTO()
	})
})

beforeEach(() => {
	factory.controllerResponse.success.mockImplementation(() => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
	})
})

describe('Suite de teste de requestController.js', () => {
	describe('With coupon', () => {
		test('It should pass with no validation errors and return success', async () => {
			CONSTANTS.PETLOVE_COUPON = jest.fn(async () => {
				return MOCKS.CONTROLLER_REQUEST.PETLOVE_COUPON()
			})
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN())
		})

		test('It should return success when all API calls succeed', async () => {
			CONSTANTS.PETLOVE_COUPON = jest.fn(async () => {
				return MOCKS.CONTROLLER_REQUEST.PETLOVE_COUPON()
			})
			const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN())
			expect(spyServiceLoggerInfo).toHaveBeenCalled()
		})
	})
	describe('Without coupon', () => {
		test('It should pass with no validation errors and return success', async () => {
			CONSTANTS.PETLOVE_COUPON = jest.fn(async () => {
				return MOCKS.CONTROLLER_REQUEST.PETLOVE_EMPTY_COUPON()
			})
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN())
		})

		test('It should return success when all API calls succeed', async () => {
			CONSTANTS.PETLOVE_COUPON = jest.fn(async () => {
				return MOCKS.CONTROLLER_REQUEST.PETLOVE_EMPTY_COUPON()
			})
			const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN())
			expect(spyServiceLoggerInfo).toHaveBeenCalled()
		})
	})

	describe('Quando falha', () => {
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

		test('It should return bad request response when receives a structure input that does not follow the expected schema', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			service.validation.inputData = jest.fn(() => {
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

		test('It should return internal error response when an unexpected exception occurs during input validation', async () => {
			service.validation.inputData = jest.fn(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
		})

		test('It should return internal error response when receives a structure with data that fires exception simulation and logs data', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.PROCESS_INTERNALERROR_RETURN()
			)
			expect(spyServiceLoggerError).toHaveBeenCalled()
		})

		test('It should return internal error response when an exception occurs during the processing of the success return', async () => {
			const errorMessage =
				'Any controller dummy returnValue factory getReturnValue unexpected error'

			factory.controllerResponse.success = jest.fn(() => {
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

		test('It should return internal error when postCart API call fails', async () => {
			api.hubVendasCarbon.acquisition.cartCheckout.postCommerceCreateCart.mockImplementationOnce(
				() => {
					throw new Error('API failure')
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

		test('It should return internal error when postCreateLead API call fails', async () => {
			api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementationOnce(
				() => {
					throw new Error('API failure')
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
