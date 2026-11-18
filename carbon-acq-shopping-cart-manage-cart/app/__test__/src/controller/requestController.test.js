const service = require('../../../src/service')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const errors = require('../../../src/error')
const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index.mock')

jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')

beforeAll(() => {
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})

	service.validation.inputData = jest.fn((payload, schema) => {
		//Do nothing (no validation errors)
	})

	api.commerceMagento.porto.cartGraphQL = {
		assignCustomerToGuestCartAPI: jest.fn(() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_CREATE_ASSIGN_CUSTOMER_CART_RETURN()
		),
		createEmptyCartAPI: jest.fn(() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_CREATE_EMPTY_CART_RETURN()
		),
		fetchCartAPI: jest.fn(() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_CREATE_FETCH_CART_RETURN()
		),
		getCartAPI: jest.fn(() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_GET_CART_RETURN()
		),
		removeCartItemAPI: jest.fn(() =>
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_REMOVE_CART_ITEM_RETURN()
		),
	}

	factory.api.commerceMagento.porto.cartGraphQLApiResponse.getRequestPayload.mockImplementation(
		() =>
			MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN()
	)

	factory.controllerResponse.badRequestError.mockImplementation((message) =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN(
			message
		)
	)

	factory.controllerResponse.error.mockImplementation((message) =>
		MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(message)
	)
})

beforeEach(() => {
	factory.controllerResponse.success.mockImplementation((data) => {
		if (
			data === MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()
		) {
			return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
		}
		if (
			data ===
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_EXISTING_CART_ID()
		) {
			return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_FETCH_CART_RETURN()
		}
		if (
			data ===
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_ASSIGNED_CART_ID()
		) {
			return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_ASSIGN_CUSTOMER_BODY_RETURN()
		}
		if (
			data ===
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_GET_CART_RETURN()
		) {
			return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_GET_CART_RETURN()
		}
		if (
			data ===
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_CART_AFTER_ITEM_REMOVAL()
		) {
			return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_DELETE_ITEM_RETURN()
		}
		return { statusCode: 200, body: data }
	})
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})
describe('Suite de teste do controller', () => {
	describe('Cenário de erro do controller/processCart', () => {
		test('deve retornar erro interno se uma chamada de API crítica falhar de forma não tratada (ex: createEmptyCartAPI na última tentativa)', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			const apiError = new Error('Critical API failure')

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				apiError
			)
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI.mockRejectedValueOnce(
				apiError
			)
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI.mockRejectedValueOnce(
				apiError
			)

			await expect(controller.request.process(input, 'POST')).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(
					apiError.message
				)
			)
		})
	})
	describe('Cenário de sucesso - POST (Criação/Gestão de Carrinho)', () => {
		test('deve criar um novo carrinho para o cliente se fetchCartAPI e assignCustomerToGuestCartAPI falharem', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			const newCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()
			const fetchError = new Error('Fetch failed')
			const assignError = new Error('Assignment failed')

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				fetchError
			)
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI.mockRejectedValueOnce(
				assignError
			)
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI.mockResolvedValueOnce(
				newCartId
			)

			await expect(controller.request.process(input, 'POST')).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
			)
		})

		test('deve criar um novo carrinho de convidado se apenas cartCommerceId for fornecido e fetchCartAPI falhar', async () => {
			const input =
				MOCKS.CONTROLLER_REQUEST.VALID_WITHOUT_CUSTOMERTOKEN_PARSEDJSON_INPUT()
			const newCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()
			const fetchError = new Error('Fetch API for guest cart failed')

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				fetchError
			)
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI.mockResolvedValueOnce(
				newCartId
			)

			await expect(controller.request.process(input, 'POST')).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
			)
		})

		test('deve retornar um novo ID de carrinho quando nenhum cartCommerceId ou customerToken é fornecido (fallback para novo carrinho de convidado)', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_EMPTY_PARSEDJSON_INPUT()
			const newCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				new Error('No cart found')
			)
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI.mockRejectedValueOnce(
				new Error('No assign possible')
			)
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI.mockResolvedValueOnce(
				newCartId
			)

			await expect(controller.request.process(input, 'POST')).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
			)
		})

		test('deve retornar um novo ID de carrinho quando customerToken está presente, mas não há cartCommerceId (criação direta para cliente)', async () => {
			const input =
				MOCKS.CONTROLLER_REQUEST.VALID_WITHOUT_CARTCOMMERCEID_PARSEDJSON_INPUT()
			const newCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				new Error('No cart ID provided, so no fetch')
			)
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI.mockResolvedValueOnce(
				newCartId
			)

			await expect(controller.request.process(input, 'POST')).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
			)
		})

		test('deve retornar fetchedCartId se cartCommerceId e customerToken forem fornecidos e fetchCartAPI tiver sucesso', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			const existingCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_EXISTING_CART_ID()
			input.cartCommerceId = existingCartId

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockResolvedValueOnce(
				existingCartId
			)

			const result = await controller.request.process(input, 'POST')
			expect(result).toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_FETCH_CART_RETURN()
			)
		})

		test('deve retornar assignedCartId se fetchCartAPI falhar mas assignCustomerToGuestCartAPI tiver sucesso', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()

			const assignedCartId =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_ASSIGNED_CART_ID()
			input.cartCommerceId = assignedCartId
			const fetchError = new Error('Fetch failed')

			api.commerceMagento.porto.cartGraphQL.fetchCartAPI.mockRejectedValueOnce(
				fetchError
			)
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI.mockResolvedValueOnce(
				assignedCartId
			)

			const result = await controller.request.process(input, 'POST')
			expect(result).toEqual(
				MOCKS.CONTROLLER_REQUEST.VALID_RETURN_ASSIGNED_CUSTOMER()
			)
		})
	})

	describe('Cenário de sucesso - Método DELETE', () => {
		test('deve remover um item do carrinho para uma requisição DELETE', async () => {
			const input =
				MOCKS.CONTROLLER_REQUEST.VALID_DELETE_CART_ITEM_PARSEDJSON_INPUT()
			const expectedResultAfterRemoval =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_CART_AFTER_ITEM_REMOVAL()

			api.commerceMagento.porto.cartGraphQL.removeCartItemAPI.mockResolvedValueOnce(
				expectedResultAfterRemoval
			)

			const result = await controller.request.process(input, 'DELETE')

			expect(result).toEqual(
				MOCKS.CONTROLLER_REQUEST.VALID_RETURN_DELETED_ITEM()
			)
		})

		test('deve retornar erro interno se a remoção do item do carrinho falhar', async () => {
			const input =
				MOCKS.CONTROLLER_REQUEST.VALID_DELETE_CART_ITEM_PARSEDJSON_INPUT()
			const apiError = new Error('Erro ao remover item do carrinho')

			api.commerceMagento.porto.cartGraphQL.removeCartItemAPI.mockRejectedValueOnce(
				apiError
			)

			await expect(
				controller.request.process(input, 'DELETE')
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN(apiError.message)
			)
		})
	})

	describe('Cenário de sucesso - Método GET', () => {
		test('deve retornar o carrinho existente para uma requisição GET', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_GET_CART_PARSEDJSON_INPUT()
			const expectedCartData =
				MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_GET_CART_RETURN()

			api.commerceMagento.porto.cartGraphQL.getCartAPI.mockResolvedValueOnce(
				expectedCartData
			)

			const result = await controller.request.process(input, 'GET')

			expect(result).toEqual(MOCKS.CONTROLLER_REQUEST.VALID_RETURN_GET_CART())
		})

		test('deve retornar erro interno se a consulta GET ao carrinho falhar', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_GET_CART_PARSEDJSON_INPUT()
			const apiError = new Error('Erro ao consultar carrinho na API')

			api.commerceMagento.porto.cartGraphQL.getCartAPI.mockRejectedValueOnce(
				apiError
			)

			await expect(controller.request.process(input, 'GET')).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN(apiError.message)
			)
		})
	})

	describe('Cenário de erro - Método HTTP não suportado', () => {
		test('deve retornar bad request para um método HTTP não suportado (PUT)', async () => {
			const input = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			const httpMethod = 'PUT'

			await expect(
				controller.request.process(input, httpMethod)
			).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.BAD_REQUEST_METHOD_NOT_SUPPORTED_RETURN(
					httpMethod
				)
			)
		})
	})

	describe('Cenário de erro de validação e outros no controller', () => {
		test('It should return internal error response when receives a structure with data that fires exception simulation and logs data', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			const input =
				MOCKS.CONTROLLER_REQUEST.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT()

			await expect(controller.request.process(input, 'GET')).resolves.toEqual(
				MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN('Fake failure')
			)

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.EXCEPTION_SIMULATION_ERROR_MESSAGE()
			)
		})

		test('Deve retornar resposta de bad request quando a validação de entrada falha (ValidationError)', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')
			const validationErrorMessage = 'Validation'
			const expectedControllerErrorMessage = `Erro no processamento: ${validationErrorMessage}`

			service.validation.inputData = jest.fn(() => {
				throw new errors.ValidationError('Validation')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.INVALID_PARSEDJSON_INPUT(),
					'POST'
				)
			).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN(
					expectedControllerErrorMessage
				)
			)

			expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_ERROR_WARNING_MESSAGE()
			)
		})

		test('Deve retornar resposta de erro interno quando ocorre uma exceção inesperada durante a validação de entrada', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
			service.validation.inputData = jest.fn(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.request.process(
					MOCKS.CONTROLLER_REQUEST.INVALID_PARSEDJSON_INPUT(),
					'POST'
				)
			).resolves.toEqual(
				MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(
					'Unexpected validation error'
				)
			)

			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE()
			)
		})
	})
})
