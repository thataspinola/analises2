const errors = require('../../error')
const factory = require('../../factory')
const service = require('../../service')
const CONSTANT = require('../../property')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const graphQlQuery = async (gqlFileName, payload) => {
	const query = fs.readFileSync(path.resolve(__dirname, gqlFileName), 'utf8')

	const variables = { value: payload ?? '' }

	const config = {
		method: 'POST',
		url: `${CONSTANT.GATEWAY_URL}/${CONSTANT.API_PATH}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: { query, variables },
	}
	try {
		const response = await axios(config)

		if (!response?.data?.data) {
			let requestErrorCode = 500
			let requestErrorMessage =
				'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
			if (
				response?.data?.errors !== undefined &&
				Array.isArray(response.data.errors) &&
				response.data.errors.length > 0
			) {
				const firstError = response.data.errors[0]
				requestErrorMessage = `Erro da chamada do GraphQL da plataforma de comércio eletrônico: ${firstError.message}`
				if (firstError.extensions?.http_code) {
					requestErrorCode = firstError.extensions.http_code
				}
			}
			throw new errors.GraphQLError(requestErrorMessage, requestErrorCode)
		}
		service.logger.info(
			`Return GraphQL data: ${JSON.stringify(response.data.data, 'null')}`
		)
		return response.data.data
	} catch (error) {
		let errorToThrow
		if (error.name !== 'GraphQLError') {
			const axiosResponseErrorData =
				factory.axiosResponseErrorData.getErrorData(error)
			errorToThrow = new errors.ExternalApiError(
				axiosResponseErrorData.message,
				axiosResponseErrorData.status,
				error.stack
			)
		} else {
			errorToThrow = new errors.GraphQLError(error.message, 500, error.stack)
		}

		service.logger.error(
			JSON.stringify({
				message: error.message,
				statusCode: error.code,
			})
		)

		throw errorToThrow
	}
}

exports.getProductsFromCategory = async (payload) => {
	try {
		let processCategories = ''
		let categoriesResponse = ''
		if (!payload) {
			processCategories = await graphQlQuery('getAllCategories.gql')
			categoriesResponse = factory.processProductAlias.processAllCategories(
				processCategories,
				CONSTANT.CATEGORIES_VITRINE
			)
			return categoriesResponse
		} else {
			processCategories = await graphQlQuery(
				'getCategoryWithProducts.gql',
				payload
			)

			if (!processCategories.getPortoServicesProductsByCategoryName) {
				throw new errors.ResponseError(404, { status: 'category_not_found', message: "Categoria de produtos não encontrada"})
			}

			const productsFromGraphql =
				processCategories.getPortoServicesProductsByCategoryName.items

			const categoriesResponseList = productsFromGraphql
				.map((product) => {
					product.porto_services_metadata.product_type = 'single'
					return factory.processProductAlias.process({
						products: {
							items: [product],
						},
					})
				})
				.filter((product) => product.link.href !== null)

			return categoriesResponseList
		}
	} catch (error) {
		service.logger.error('Error during grapQl query of getProductsFromCategory')
		throw error
	}
}

exports.getHighlightedProducts = async () => {
	try {
		let resposeHighlightsApi = []
		resposeHighlightsApi = await graphQlQuery('getHighlights.gql')

		let returnProcessHighlights =
			resposeHighlightsApi.getPortoServicesHighlightProducts.items
				.map((product) => {
					product.porto_services_metadata.product_type = 'single'
					return factory.processProductAlias.process({
						products: {
							items: [product],
						},
					})
				})
				.filter((product) => product.link.href !== null)

		return returnProcessHighlights
	} catch (error) {
		service.logger.error('Error during grapQl query of getHighlights')
		throw error
	}
}

exports.filterProducts = async (filter) => {
	try {
		let responseFilterProductsApi = await graphQlQuery(
			'filterProducts.gql',
			filter
		)

		const productListParse = responseFilterProductsApi.products.items
		let categoriesMap = {}

		productListParse.forEach((product) => {
			product.categories.forEach((category) => {
				if (category.icon_code !== null && category.name) {
					if (!categoriesMap[category.name]) {
						const categoryItem = CONSTANT.CATEGORIES_VITRINE.find(
							(item) => item.name === category.name
						)
						categoriesMap[category.name] = {
							id: category.id,
							category: category.name,
							icon: category.icon_code,
							menu: categoryItem ? categoryItem.menu : '',
							products: [],
						}
					}
					product.porto_services_metadata.product_type = 'single'

					const processedProduct = factory.processProductAlias.process({
						products: {
							items: [product],
						},
					})

					if (processedProduct.link.href !== null) {
						categoriesMap[category.name].products.push(processedProduct)
					}
				}
			})
		})
		const categories = Object.values(categoriesMap)

		return categories
	} catch (error) {
		service.logger.error('Error during GraphQL query of filterProducts')
		throw error
	}
}

exports.getProductByAlias = async (value) => {
	try {
		const valueArray = [value]

		const returnApiProduct = await graphQlQuery(
			'getProductsByAlias.gql',
			valueArray
		)

		const returnValue = factory.processProductAlias.process(
			returnApiProduct,
			value
		)

		if (!returnValue) {
			throw new errors.ResponseError(404, {
				status: 'product_alias_not_found',
			})
		}

		if (returnValue && returnValue.link.href === null) {
			service.logger.error('Produto não disponível ou inválido.')
		}

		return returnValue
	} catch (error) {
		service.logger.error('Error during grapQl query of getProductsByAlias')
		throw error
	}
}

exports.getCoupons = async () => {
	try {
		const response = await graphQlQuery('getCoupons.gql')

		return factory.coupons.mapCoupons(
			response.getPortoServicesCouponsCurrentActive
		)
	} catch (error) {
		service.logger.error('Error during grapQl query of getCoupons')
		throw error
	}
}
