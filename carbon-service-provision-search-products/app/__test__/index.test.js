const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const app = require('../index')

jest.mock('../src/controller')
jest.mock('../src/factory')
jest.mock('../src/service/loggerService')

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
})

describe('Suite de teste do handler do seu app', () => {
	describe('Quando sucesso', () => {
		test('Deve processar e não receber nenhuma exceção retornando response de sucesso quando utilizado método POST', async () => {
			controller.searchProducts.process.mockResolvedValue(
				MOCKS.CONTROLLER_PRODUCT.PROCESS_VALID_RETURN()
			)

			await expect(
				app.handler(MOCKS.HANDLER.POST_VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.SUCCESS_RETURN())
		})

		test('Deve processar e não receber nenhuma exceção retornando response de sucesso quando utilizado método GET', async () => {
			controller.searchProducts.process.mockResolvedValue(
				MOCKS.CONTROLLER_PRODUCT.PROCESS_VALID_RETURN()
			)

			await expect(
				app.handler(MOCKS.HANDLER.GET_VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.SUCCESS_RETURN())
		})
	})

	describe('Quando falha', () => {
		test('Deve processar e não receber nenhuma exceção retornando response de erro', async () => {
			controller.searchProducts.process.mockResolvedValueOnce(
				MOCKS.CONTROLLER_PRODUCT.PROCESS_INTERNALERROR_RETURN()
			)

			await expect(
				app.handler(MOCKS.HANDLER.GET_VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.INTERNALERROR_RETURN())
		})

		test('Deve retornar erro em caso de metodo não suportado', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.INVALID_METHOD_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.UNSUPPORTED_METHOD_RESPONSE())
		})

		test('Deve retornar erro em caso de json body inválido', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.INVALID_JSON_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.INVALID_JSON_RESPONSE())
		})

		test('Deve retornar um erro em caso de erro não esperado/desconhecido', async () => {
			const error = new Error('Erro desconhecido')

			controller.searchProducts.process.mockRejectedValue(error)

			await expect(
				app.handler(MOCKS.HANDLER.POST_VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.INTERNAL_ERROR_RESPONSE(error.message))
		})
	})
})
