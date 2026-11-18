const CONSTANT = require('../property')
const service = require('../service')
const factory = require('../factory')
const api = require('../api')
const { ResponseError } = require('../error')

const inputValidation = (parsedJson) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(parsedJson, CONSTANT.SEARCH_PRODUCTS_SCHEMA)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name == 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}
		throw error
	}
}

const exceptionSimulation = (parsedInput) => {
	if (CONSTANT.NODE_ENV !== 'production') {
		let currentActivity = 'Teste de exceção'
		try {
			if (parsedInput.type === 'Except') {
				throw new Error(
					`Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
				)
			}
		} catch (error) {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
	}
}

const getProductsFromCommercePlatform = async (parsedJsonInputBody) => {
	let currentActivity = 'Definição tipo de filtragem de produto a ser aplicada'
	try {
		let apiGetProductResponseData

		switch (parsedJsonInputBody.type) {
			case CONSTANT.SEARCH_PRODUCTS_TYPE_HIGHLIGHTS:
				apiGetProductResponseData =
					await api.commercePlatform.graphQlQuery.getHighlightedProducts()
				break

			case CONSTANT.SEARCH_PRODUCTS_TYPE_FILTER:
				apiGetProductResponseData =
					await api.commercePlatform.graphQlQuery.filterProducts(
						parsedJsonInputBody.value
					)
				break

			case CONSTANT.SEARCH_PRODUCTS_TYPE_PRODUCT_ALIAS:
				apiGetProductResponseData =
					await api.commercePlatform.graphQlQuery.getProductByAlias(
						parsedJsonInputBody.value
					)
				break
			case CONSTANT.SEARCH_PRODUCTS_TYPE_CATEGORIES:
				apiGetProductResponseData =
					await api.commercePlatform.graphQlQuery.getProductsFromCategory(
						parsedJsonInputBody.value
					)
				break
			case CONSTANT.SEARCH_PRODUCTS_TYPE_PRODUCT_CUPONS:
				apiGetProductResponseData =
					await api.commercePlatform.graphQlQuery.getCoupons()
				break
			default:
				apiGetProductResponseData =
					factory.searchProductsControllerResponse.noContent()
				break
		}

		return apiGetProductResponseData
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

exports.process = async (parsedJsonInputBody) => {
	try {
		service.logger.info({ input: parsedJsonInputBody }, 'request input')

		exceptionSimulation(parsedJsonInputBody)

		inputValidation(parsedJsonInputBody)

		const filteredProductsResult =
			await getProductsFromCommercePlatform(parsedJsonInputBody)

		return factory.searchProductsControllerResponse.success(
			filteredProductsResult
		)
	} catch (error) {
		const searchProductsError = new Error(
			`Erro no processamento da requisição de produtos: ${error.message}`
		)

		service.logger.error(error, searchProductsError.message
		)

		if (error.name === 'ValidationError') {
			return factory.searchProductsControllerResponse.badRequestError(
				searchProductsError.message
			)
		}

		if (error instanceof ResponseError) {
			return {
				statusCode: error.statusCode,
				body: error.data,
			}
		}

		return factory.searchProductsControllerResponse.error(
			searchProductsError.message
		)
	}
}
