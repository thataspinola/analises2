const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const errors = require('../../../src/error')
const service = require('../../../src/service')
const api = require('../../../src/api')

jest.mock('../../../src/service')
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

	service.validation.inputData.mockImplementation((payload, schema) => {
		// Do nothing (no validation errors)
	})
})

describe('Suite de teste de mockController.js', () => {
	describe('Quando sucesso', () => {
		test('It should return a product based on input alias - { type: productAlias, value: alias}', async () => {
			const productAliasMock = MOCKS.API_PRODUCT.GET_PRODUCT_BY_ALIAS(
				'conserto-de-ar-condicionado'
			)
			api.commercePlatform.graphQlQuery.getProductByAlias.mockResolvedValue(
				productAliasMock
			)
			await expect(
				controller.searchProducts.process({
					type: 'productAlias',
					value: 'conserto-de-ar-condicionado',
				})
			).resolves.toEqual(
				MOCKS.CONTROLLER_PRODUCT.PROCESS_VALID_RETURN(productAliasMock)
			)
		})
	})

	describe('Quando falha', () => {
		test('It should log an error and return bad request response when receives a structure input that not follows the expected schema', async () => {
			const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new errors.ValidationError('Validation')
			})

			await expect(
				controller.searchProducts.process(
					MOCKS.CONTROLLER_PRODUCT.PROCESS_INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual({
				statusCode: 400,
				body: {
					status: 'error',
					message:
						'Erro no processamento da requisição de produtos: Validation',
				},
			})
			expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_ERROR_WARNING_MESSAGE()
			)
		})

		test('It should log an error and return internal error response when an unexpected exception occurs during input validation', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

			service.validation.inputData.mockImplementationOnce(() => {
				throw new Error('Unexpected validation error')
			})

			await expect(
				controller.searchProducts.process(
					MOCKS.CONTROLLER_PRODUCT.PROCESS_INVALID_PARSEDJSON_INPUT()
				)
			).resolves.toEqual({
				statusCode: 500,
				body: {
					status: 'error',
					message:
						'Erro no processamento da requisição de produtos: Unexpected validation error',
				},
			})
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.SERVICE_LOGGER.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE()
			)
		})

		test('It should return an error response based on a ResponseError', async () => {
			api.commercePlatform.graphQlQuery.getProductByAlias.mockImplementationOnce(
				() => {
					throw new errors.ResponseError(404, { status: 'error' })
				}
			)

			await expect(
				controller.searchProducts.process({
					type: 'productAlias',
					value: 'invalid-product-alias',
				})
			).resolves.toEqual({ statusCode: 404, body: { status: 'error' } })
		})
	})
})
