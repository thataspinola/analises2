const fs = require('fs')
const path = require('path')
const axios = require('axios')
const service = require('../../../service')
const CONSTANT = require('../../../property')

const CREATE_EMPTY_CART = fs.readFileSync(
	path.resolve(__dirname, 'createEmptyCart.gql'),
	'utf8'
)
const FETCH_CART = fs.readFileSync(
	path.resolve(__dirname, 'fetchCart.gql'),
	'utf8'
)
const ASSIGN_CUSTOMER = fs.readFileSync(
	path.resolve(__dirname, 'assignCustomerToGuestCart.gql'),
	'utf8'
)
const GET_CART = fs.readFileSync(path.resolve(__dirname, 'getCart.gql'), 'utf8')
const DELETE_CART_ITEM = fs.readFileSync(
	path.resolve(__dirname, 'removeCartItem.gql'),
	'utf8'
)

async function executeGraphQL(query, variables = {}, customerToken = '') {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	if (customerToken) headers.Authorization = `Bearer ${customerToken}`

	const config = {
		method: 'POST',
		url: `${CONSTANT.COMMERCE_URL}/${CONSTANT.API_PATH_CREATE_CART}`,
		headers,
		data: { query, variables },
	}

	try {
		const response = await axios(config)

		if (response.data.errors) {
			const errorMessage =
				response.data.errors[0].message ||
				'Um erro GraphQL desconhecido ocorreu.'

			service.logger.error(
				'Erro de GraphQL da API:',
				errorMessage,
				response.data.errors
			)

			throw new Error(errorMessage)
		}

		return response.data.data
	} catch (err) {
		service.logger.error(
			`Falha na execução da query GraphQL: ${err.message || err}`,
			err.response ? err.response.data : ''
		)

		throw err
	}
}

async function createEmptyCartAPI(customerToken = '') {
	service.logger.info('Chamando API para criar um carrinho vazio.')
	const data = await executeGraphQL(CREATE_EMPTY_CART, {}, customerToken)
	if (!data || !data.createEmptyCart) {
		service.logger.error(
			'API createEmptyCart retornou dados nulos ou inválidos.'
		)
		throw new Error('Falha ao criar carrinho vazio através da API.')
	}
	return data.createEmptyCart
}

async function fetchCartAPI(cartCommerceId, customerToken = '') {
	service.logger.info(`Chamando API para buscar o carrinho: ${cartCommerceId}.`)
	const data = await executeGraphQL(
		FETCH_CART,
		{ cart_id: cartCommerceId },
		customerToken
	)
	return data && data.cart && data.cart.id ? data.cart.id : null
}

async function assignCustomerToGuestCartAPI(
	cartCommerceId,
	customerToken = ''
) {
	service.logger.info(
		`Chamando API para associar cliente ao carrinho: ${cartCommerceId}.`
	)
	const data = await executeGraphQL(
		ASSIGN_CUSTOMER,
		{ cart_id: cartCommerceId },
		customerToken
	)
	if (
		!data ||
		!data.assignCustomerToGuestCart ||
		!data.assignCustomerToGuestCart.id
	) {
		service.logger.error(
			`API assignCustomerToGuestCart retornou dados nulos para o carrinho ${cartCommerceId}.`
		)
		throw new Error(
			'Falha ao associar cliente ao carrinho de convidado através da API.'
		)
	}
	return data.assignCustomerToGuestCart.id
}

async function getCartAPI(cartCommerceId, customerToken = '') {
	service.logger.info(
		`Chamando API para consultar o carrinho ${cartCommerceId}.`
	)
	const data = await executeGraphQL(
		GET_CART,
		{ cartId: cartCommerceId },
		customerToken
	)
	if (!data || !data.cart) {
		service.logger.error('API getCartAPI retornou dados nulos ou inválidos.')
		throw new Error('Falha ao consultar o carrinho através da API.')
	}
	return data.cart
}

async function removeCartItemAPI(
	cartCommerceId,
	cartItemUid,
	customerToken = ''
) {
	service.logger.info(
		`Chamando API para remover o item ${cartItemUid} do carrinho ${cartCommerceId}.`
	)
	const variables = {
		cartId: cartCommerceId,
		cartItemUid: cartItemUid,
	}
	const data = await executeGraphQL(DELETE_CART_ITEM, variables, customerToken)
	if (!data || !data.removeItemFromCart) {
		service.logger.error(
			`API removeItemFromCart retornou dados nulos ou inválidos para o carrinho ${cartCommerceId}.`
		)
		throw new Error('Falha ao remover item do carrinho através da API.')
	}
	return data.removeItemFromCart.cart
}

module.exports = {
	createEmptyCartAPI,
	fetchCartAPI,
	assignCustomerToGuestCartAPI,
	getCartAPI,
	removeCartItemAPI,
}
