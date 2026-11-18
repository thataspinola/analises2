const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(() => {
	axios.mockImplementation(async (params) => {
		if (params.url.includes(CONSTANT.API_PATH)) {
			return {}
		}
		const responseError = new Error()
		responseError.response = { status: 404, data: {} }
		throw responseError
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de teste de productApi.js', () => {
	describe('Dada uma chamada para o método getProductsFromCategory', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não lançar nenhuma exceção quando chamado sem nome de categoria', async () => {
				axios.mockImplementationOnce(async (params) => {
					if (params.url.includes(CONSTANT.API_PATH)) {
						return MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_ALLCATEGORIES_SUCCESS_RESPONSE_DATA()
					}
					const responseError = new Error()
					responseError.response = { status: 404, data: {} }
					throw responseError
				})
				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).resolves.toEqual(
					MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_ALLCATEGORIES_VALID_RETURN()
				)
			})
			test('Deve retornar o valor esperado e não lançar nenhuma exceção quando chamado com nome de categoria', async () => {
				axios.mockImplementationOnce(async (params) => {
					if (params.url.includes(CONSTANT.API_PATH)) {
						return MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_LIMPEZACATEGORY_SUCCESS_RESPONSE_DATA()
					}
					const responseError = new Error()
					responseError.response = { status: 404, data: {} }
					throw responseError
				})
				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).resolves.toEqual(
					MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_LIMPEZACATEGORY_VALID_RETURN()
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory()
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})

			test('Deve lançar um ResponseError 404 com status category_not_found quando a categoria não existir', async () => {
				axios.mockResolvedValueOnce(
					MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_CATEGORY_NOT_FOUND_RESPONSE_DATA()
				)

				try {
					await api.commercePlatform.graphQlQuery.getProductsFromCategory(
						MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_VALID_CATEGORYNAME_PAYLOAD_INPUT()
					)
				} catch (error) {
					expect(error.statusCode).toEqual(404)
					expect(error.data).toEqual({ status: 'category_not_found', message: "Categoria de produtos não encontrada" })
				}
			})
		})
	})

	describe('Dada uma chamada para o método getHighlightedProducts', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não lançar nenhuma exceção quando chamado', async () => {
				axios.mockImplementationOnce(async (params) => {
					if (params.url.includes(CONSTANT.API_PATH)) {
						return MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_HIGHLIGHTEDPRODUCTS_SUCCESS_RESPONSE_DATA()
					}
					const responseError = new Error()
					responseError.response = { status: 404, data: {} }
					throw responseError
				})
				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).resolves.toEqual(
					MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_HIGHLIGHTEDPRODUCTS_VALID_RETURN()
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.getHighlightedProducts()
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})
		})
	})

	describe('Dada uma chamada para o método filterProducts', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não lançar nenhuma exceção', async () => {
				axios.mockImplementationOnce(async (params) => {
					if (params.url.includes(CONSTANT.API_PATH)) {
						return MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_FILTERELETROS_SUCCESS_RESPONSE_DATA()
					}
					const responseError = new Error()
					responseError.response = { status: 404, data: {} }
					throw responseError
				})
				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).resolves.toEqual(
					MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_RETURN()
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.filterProducts(
						MOCKS.API_PRODUCT.FILTERPRODUCTS_ELETROS_VALID_FILTER_INPUT()
					)
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})
		})
	})

	describe('Dada uma chamada para o método getProductByAlias', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não lançar nenhuma exceção', async () => {
				axios.mockImplementationOnce(async (params) => {
					if (params.url.includes(CONSTANT.API_PATH)) {
						return MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_HIDRAULICOALIAS_SUCCESS_RESPONSE_DATA()
					}
					const responseError = new Error()
					responseError.response = { status: 404, data: {} }
					throw responseError
				})
				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).resolves.toEqual(
					MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_RETURN()
				)
			})

			test('Deve lançar um erro caso o produto buscado não seja encontrado', async () => {
				axios.mockResolvedValue(
					MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_NOT_FOUND_SUCCESS_RESPONSE_DATA()
				)

				try {
					await api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_INVALID_PRODUCT_ALIAS_INPUT()
					)
				} catch (error) {
					expect(error.statusCode).toEqual(404)
					expect(error.data).toEqual({ status: 'product_alias_not_found' })
				}
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.getProductByAlias(
						MOCKS.API_PRODUCT.GETPRODUCTBYALIAS_HIDRAULICO_VALID_VALUE_INPUT()
					)
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})
		})
	})

	describe('Dada uma chamada para o método getCoupons', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não lançar nenhuma exceção quando chamado', async () => {
				axios.mockResolvedValue(MOCKS.API_PRODUCT.GETPRODUCTENDPOINT_AXIOS_COUPONS_SUCCESS_RESPONSE_DATA())
				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).resolves.toEqual(
					MOCKS.API_PRODUCT.GET_COUPONS_VALID_RETURN()
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.response = {
							status: 500,
							data: { message: 'Testing expected error' },
						}
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow(
					'Erro inesperado recebido da chamada do GraphQL da plataforma de comércio eletrônico: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando a API retornar um erro no campo errors', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							errors: [{ message: 'API error message' }],
						},
					}
				})

				await expect(
					api.commercePlatform.graphQlQuery.getCoupons()
				).rejects.toThrow(
					'Erro da chamada do GraphQL da plataforma de comércio eletrônico: API error message'
				)
			})
		})
	})
})
