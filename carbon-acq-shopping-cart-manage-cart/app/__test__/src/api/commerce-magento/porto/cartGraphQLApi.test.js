const MOCKS = require('../../../../mocks/index.mock')
const serviceModule = require('../../../../../src/service')
const axios = require('axios')
const api = require('../../../../../src/api')

jest.mock('../../../../../src/service')
jest.mock('axios')

jest.mock('../../../../../src/property', () => ({
	COMMERCE_URL: 'http://mock.commerce.url',
	API_PATH_CREATE_CART: '/graphql',
}))

beforeEach(() => {
	serviceModule.logger.info.mockImplementation(() => {})
	serviceModule.logger.error.mockImplementation(() => {})
	serviceModule.logger.warn.mockImplementation(() => {})
	serviceModule.logger.debug.mockImplementation(() => {})

	axios.mockImplementation(async (config) => {
		const query = config.data?.query || ''

		if (query.includes('createEmptyCart')) {
			return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_CREATE_EMPTY_CART_SUCCESS()
		}
		if (query.includes('assignCustomerToGuestCart')) {
			return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_ASSIGN_CUSTOMER_SUCCESS()
		}

		if (query.includes('cart(') && query.includes('FetchCart')) {
			return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_FETCH_CART_SUCCESS()
		}

		if (query.includes('query GetCart')) {
			return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_GET_CART_SUCCESS()
		}

		if (query.includes('removeItemFromCart')) {
			return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_REMOVE_CART_ITEM_SUCCESS()
		}

		const error = new Error(
			`Unexpected GraphQL operation in mock: ${query || 'Empty query'}`
		)

		error.response = { status: 404, data: {} }
		throw error
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de GraphQL Client API Functions', () => {
	test('createEmptyCartAPI should return cart data on success', async () => {
		const result =
			await api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI(
				'some-token'
			)
		expect(result).toEqual(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_RETURN_VALUE
		)

		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('createEmptyCartAPI should throw an error if API returns null data', async () => {
		axios.mockResolvedValueOnce({
			status: 200,
			data: { data: { createEmptyCart: null } },
		})

		await expect(
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI()
		).rejects.toThrow('Falha ao criar carrinho vazio através da API.')
		expect(serviceModule.logger.error).toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('fetchCartAPI should return cart ID on success', async () => {
		const result = await api.commerceMagento.porto.cartGraphQL.fetchCartAPI(
			'test-cart-id',
			'test-token'
		)
		expect(result).toEqual(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_RETURN_VALUE
		)
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('fetchCartAPI should return null if cart is not found', async () => {
		axios.mockResolvedValueOnce(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_GET_CART_INVALID_DATA()
		)

		const result = await api.commerceMagento.porto.cartGraphQL.fetchCartAPI(
			'non-existent-cart-id'
		)
		expect(result).toBeNull()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('assignCustomerToGuestCartAPI should return assigned cart ID on success', async () => {
		const result =
			await api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI(
				'guest-cart-id',
				'customer-token'
			)
		expect(result).toEqual(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_RETURN_VALUE
		)
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('assignCustomerToGuestCartAPI should throw an error if API returns null data', async () => {
		axios.mockResolvedValueOnce({
			status: 200,
			data: { data: { assignCustomerToGuestCart: null } },
		})

		await expect(
			api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI(
				'guest-cart-id',
				'customer-token'
			)
		).rejects.toThrow(
			'Falha ao associar cliente ao carrinho de convidado através da API.'
		)
		expect(serviceModule.logger.error).toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('getCartAPI should return full cart data on success', async () => {
		const result = await api.commerceMagento.porto.cartGraphQL.getCartAPI(
			'test-cart-id-get',
			'test-customer-token-get'
		)
		expect(result).toEqual(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_GET_CART_RETURN()
		)
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('getCartAPI should throw an error if API returns null or invalid cart data', async () => {
		axios.mockResolvedValueOnce(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_GET_CART_INVALID_DATA()
		)

		await expect(
			api.commerceMagento.porto.cartGraphQL.getCartAPI('invalid-cart-id')
		).rejects.toThrow('Falha ao consultar o carrinho através da API.')
		expect(serviceModule.logger.error).toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('removeCartItemAPI should return updated cart after item removal on success', async () => {
		const [cartCommerceId, cartItemUid, customerToken] =
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.INPUT_VALID_REMOVE_ITEM_PARAMS()

		const result =
			await api.commerceMagento.porto.cartGraphQL.removeCartItemAPI(
				cartCommerceId,
				cartItemUid,
				customerToken
			)

		expect(result).toEqual(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_CART_AFTER_ITEM_REMOVAL()
		)
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('removeCartItemAPI should throw an error if API returns null or invalid data after removal', async () => {
		axios.mockResolvedValueOnce(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_REMOVE_CART_ITEM_INVALID_DATA()
		)

		const [cartCommerceId, cartItemUid] =
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.INPUT_VALID_REMOVE_ITEM_NO_TOKEN_PARAMS()

		await expect(
			api.commerceMagento.porto.cartGraphQL.removeCartItemAPI(
				cartCommerceId,
				cartItemUid
			)
		).rejects.toThrow('Falha ao remover item do carrinho através da API.')
		expect(serviceModule.logger.error).toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('should throw GraphQL error if API returns errors field', async () => {
		axios.mockResolvedValueOnce(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_GRAPHQL_ERROR()
		)

		await expect(
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI()
		).rejects.toThrow('GraphQL error occurred')
		expect(serviceModule.logger.warn).not.toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})

	test('should throw error if API returns invalid data shape (not data.data)', async () => {
		axios.mockResolvedValueOnce(
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.RESPONSE_AXIOS_INVALID_DATA_SHAPE()
		)

		await expect(
			api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI()
		).rejects.toThrow('Falha ao criar carrinho vazio através da API.')
		expect(serviceModule.logger.error).toHaveBeenCalled()
		expect(axios).toHaveBeenCalledTimes(1)
	})
})
