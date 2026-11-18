const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const errors = require('../../../src/error')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')
const activity = require('../../../src/controller/activity')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const CONSTANT = require('../../../src/property')

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

	service.validation.inputData = jest.fn((payload, schema) => {
		//Do nothing (no validation errors)
	})

	token.getImpersonalUserCarbon = jest.fn(
		() => MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().impersonalUserToken
	)

	token.getPortoCertificates = jest.fn(
		() => MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().ca
	)

	factory.api.hubVendasCarbon.prestacaoServico.orderBookApiRequestPayload.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKREQUESTPAYLOAD.PAYLOAD_RETURN()
	)

	factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getResponsePayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN()
	)

	factory.api.hubVendasCarbon.prestacaoServico.orderBookApiResponsePayload.getNewScheduleResponse.mockImplementation(
		() =>
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_NOT_DISPONIBLE_DATA_RETURN()
	)

	factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.PAYLOAD_RETURN()
	)

	factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_RESPONSE()
	)

	factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload.mockImplementationOnce(
		() =>
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EXPECTED_OUTPUTVALID()
	)

	api.commerceMagento.porto.quotation.postCommerceQuotation.mockImplementation(
		() => MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.VALID_RETURN()
	)

	api.commerceMagento.porto.proposal.postCommerceProposal.mockImplementation(
		() => MOCKS.API_COMMERCEMAGENTO_PORTO_PROPOSAL.VALID_RETURN()
	)

	api.hubVendasCarbon.acquisition.cartCheckout.postCommerceCreateCart.mockImplementation(
		() => MOCKS.API_HUBVENDASCARBON_ACQUISITION_CARTCHECKOUT.VALID_RETURN()
	)

	api.hubVendasCarbon.prestacaoServico.pricing.postPricing.mockImplementation(
		() => MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING.VALID_RETURN()
	)

	api.hubVendasCarbon.prestacaoServico.orderBook.postOrderBook.mockImplementation(
		() => MOCKS.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK.VALID_RETURN()
	)

	api.serviceAppointment.postServiceAppointment.mockResolvedValue(
		MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_API_REGULARAGENDA_VALID_RETURN()
	)

	api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementation(() =>
		MOCKS.API_SUPPORTCREATELEAD.VALID_RETURN()
	)

	factory.controllerResponse.badRequestError.mockImplementation(() =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
	)

	factory.controllerResponse.error.mockImplementation(() =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN()
	)
})

beforeEach(() => {
	jest.spyOn(activity.getApiGatewayTokens, 'execute').mockResolvedValue({})

	factory.controllerResponse.success.mockImplementation(() => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
	})

	factory.controllerResponse.newSchedule.mockImplementation(() => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_NEW_SCHEDULE_RETURN()
	})
})

describe('Suite de teste de requestController.js', () => {
	describe('Quando sucesso', () => {
		test('It should pass with no validation errors and return success', async () => {
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.VALID_RETURN())
		})

		test('It should return success when there is a combo product in the input', async () => {
			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_COMBO_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.VALID_RETURN())
		})

		test('It should return success when all API calls succeed', async () => {
			const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.VALID_RETURN())
			expect(spyServiceLoggerInfo).toHaveBeenCalled()
		})

		test('It should make order booking call directly through the serviceAppointment API if ORDER_BOOKING_STRATEGY_FLAG is set to API_DIRECT_CALL', async () => {
			process.env.ORDER_BOOKING_STRATEGY_FLAG = 'API_DIRECT_CALL'

			await controller.request.process(
				MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			)

			expect(api.serviceAppointment.postServiceAppointment).toHaveBeenCalled()
		})

		test('It should verify if the service is a recommendation and set the coupon to acquire the discount if there is no recommendation in the cart', async () => {
			const mockRecommendationInput = {
				...MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
				isRecommendation: true,
				cartCommerceId: 'mock-cart-commerce-id',
			}

			mockRecommendationInput.serviceProvision.coupon = 'TEST_COUPON'

			api.commerceMagento.porto.cartHasRecommendation.getCartHasRecommendation.mockResolvedValue(
				{ cartHasRecommendation: false }
			)

			await controller.request.process(mockRecommendationInput)

			expect(
				api.commerceMagento.porto.cartHasRecommendation.getCartHasRecommendation
			).toHaveBeenCalledTimes(1)

			expect(
				api.hubVendasCarbon.prestacaoServico.pricing.postPricing
			).toHaveBeenCalledWith({
				...mockRecommendationInput.serviceProvision,
				coupon: CONSTANT.RECOMMENDATION_COUPON,
			})

			expect(
				factory.api.commerce.porto.commerceQuotationApiRequestPayload
					.getRequestPayload
			).toHaveBeenCalledWith(expect.anything(), true)

			expect(
				factory.api.commerce.porto.commerceProposalApiRequestPayload
					.getRequestPayload
			).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expect.anything(),
				expect.anything(),
				true
			)
		})

		test('It should verify if the service is a recommendation and NOT set the coupon to acquire the discount if there is a recommendation in the cart', async () => {
			const mockRecommendationInput = {
				...MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
				isRecommendation: true,
				cartCommerceId: 'mock-cart-commerce-id',
			}

			mockRecommendationInput.serviceProvision.coupon = 'TEST_COUPON'

			api.commerceMagento.porto.cartHasRecommendation.getCartHasRecommendation.mockResolvedValue(
				{ cartHasRecommendation: true }
			)

			await controller.request.process(mockRecommendationInput)

			expect(
				api.commerceMagento.porto.cartHasRecommendation.getCartHasRecommendation
			).toHaveBeenCalledTimes(1)

			expect(
				api.hubVendasCarbon.prestacaoServico.pricing.postPricing
			).toHaveBeenCalledWith({
				...mockRecommendationInput.serviceProvision,
				coupon: 'TEST_COUPON',
			})

			expect(
				factory.api.commerce.porto.commerceQuotationApiRequestPayload
					.getRequestPayload
			).toHaveBeenCalledWith(expect.anything(), false)

			expect(
				factory.api.commerce.porto.commerceProposalApiRequestPayload
					.getRequestPayload
			).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expect.anything(),
				expect.anything(),
				false
			)
		})
	})

	describe('Quando falha', () => {
		test('It should return internal error response when receives a structure with data that fires exception simulation and log data', async () => {
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

		test('It should return bad request response when receives a structure input that does not follow the expected schema', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			service.validation.inputData = jest.fn(() => {
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

		test('It should return internal error response when an unexpected exception occurs during input validation', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			service.validation.inputData = jest.fn(() => {
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

		test('It should return internal error response when receives a structure with data that fires exception simulation and logs data', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
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
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})

		test('It should return internal error when postPricingBudget API call fails', async () => {
			api.hubVendasCarbon.prestacaoServico.pricing.postPricing.mockImplementationOnce(
				() => {
					throw new Error('API failure')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})

		test('It should return internal error when postCommerceQuotation API call fails', async () => {
			api.commerceMagento.porto.quotation.postCommerceQuotation.mockImplementationOnce(
				() => {
					throw new Error('API failure')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})

		test('It should return internal error when postCommerceProposal API call fails', async () => {
			api.commerceMagento.porto.proposal.postCommerceProposal.mockImplementationOnce(
				() => {
					throw new Error('API failure')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})

		test('It should return internal error when postOrderBook API call fails', async () => {
			api.hubVendasCarbon.prestacaoServico.orderBook.postOrderBook.mockImplementationOnce(
				() => {
					throw new Error('API failure')
				}
			)

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual(MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN())
		})

		test('It should return internal error when postCreateLead API call fails', async () => {
			api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementationOnce(
				() => {
					throw new Error('API failure')
				}
			)

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
	})
})
