const api = require('../../../api')
const service = require('../../../service')
const factory = require('../../../factory')

async function createCustomerCart(customerToken) {
	service.logger.info(`Criando novo carrinho para o cliente.`)
	const newCartId =
		await api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI(
			customerToken
		)
	service.logger.info(
		`Novo carrinho ${newCartId} criado e associado ao cliente.`
	)
	return newCartId
}

async function createGuestCart() {
	service.logger.info(`Criando novo carrinho de convidado.`)
	const newCartId =
		await api.commerceMagento.porto.cartGraphQL.createEmptyCartAPI('')
	service.logger.info(`Novo carrinho de convidado ${newCartId} criado.`)
	return newCartId
}

async function handleKnownCartAndCustomer(cartCommerceId, customerToken) {
	service.logger.info(
		`Processando carrinho ${cartCommerceId} para cliente com token.`
	)
	try {
		service.logger.info(`Tentando buscar carrinho ${cartCommerceId} com token.`)
		const fetchedCartId =
			await api.commerceMagento.porto.cartGraphQL.fetchCartAPI(
				cartCommerceId,
				customerToken
			)
		service.logger.info(
			`Carrinho ${fetchedCartId} é válido e acessível com o token fornecido.`
		)
		return fetchedCartId
	} catch (fetchError) {
		service.logger.warn(
			`Falha ao buscar carrinho (${cartCommerceId}) com token. Tentando associar o cliente. Erro: ${fetchError.message}`
		)
		try {
			const assignedCartId =
				await api.commerceMagento.porto.cartGraphQL.assignCustomerToGuestCartAPI(
					cartCommerceId,
					customerToken
				)
			service.logger.info(
				`Cliente associado com sucesso ao carrinho: ${assignedCartId}.`
			)
			return assignedCartId
		} catch (assignError) {
			service.logger.warn(
				`Falha ao associar cliente ao carrinho existente (${cartCommerceId}). Criando um novo carrinho para o cliente. Erro: ${assignError.message}`
			)
			return createCustomerCart(customerToken)
		}
	}
}

async function handleKnownGuestCart(cartCommerceId) {
	service.logger.info(
		`Validando carrinho existente: ${cartCommerceId} (sem token de cliente).`
	)
	try {
		const validCartId =
			await api.commerceMagento.porto.cartGraphQL.fetchCartAPI(
				cartCommerceId,
				''
			)
		service.logger.info(`Carrinho ${validCartId} é válido.`)
		return validCartId
	} catch (error) {
		service.logger.warn(
			`Carrinho ${cartCommerceId} inválido ou expirado; criando um novo carrinho para convidado. Erro: ${error.message}`
		)
		return createGuestCart()
	}
}

async function processCart(cartCommerceId, customerToken) {
	try {
		if (cartCommerceId && customerToken) {
			return await handleKnownCartAndCustomer(cartCommerceId, customerToken)
		}

		if (customerToken && !cartCommerceId) {
			service.logger.info(
				`Cliente autenticado sem carrinho existente; criando um novo carrinho.`
			)
			return await createCustomerCart(customerToken)
		}

		if (cartCommerceId && !customerToken) {
			return await handleKnownGuestCart(cartCommerceId)
		}

		service.logger.info(
			`Nenhum ID de carrinho ou token de cliente fornecido; criando um novo carrinho para convidado.`
		)
		return await createGuestCart()
	} catch (err) {
		service.logger.error(
			`Erro crítico no processamento do carrinho: ${err.message}${
				err.stack ? `\nStack: ${err.stack}` : ''
			}`
		)
		throw err
	}
}

exports.execute = async (inputParsedData) => {
	try {
		const cartId = await processCart(
			inputParsedData?.cartCommerceId,
			inputParsedData?.customerToken
		)

		service.logger.info(
			`Processamento do carrinho finalizado. ID do carrinho: ${JSON.stringify(
				cartId
			)}`
		)
		const responseApi =
			factory.api.commerceMagento.porto.cartGraphQLApiResponse.getRequestPayload(
				cartId
			)
		return responseApi
	} catch (error) {
		service.logger.error(
			`Erro crítico no processamento do carrinho: ${error.message}${
				error.stack ? `\nStack: ${error.stack}` : ''
			}`
		)
		throw error
	}
}
