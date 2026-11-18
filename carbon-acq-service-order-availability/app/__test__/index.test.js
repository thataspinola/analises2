const MOCKS = require('./mocks/index.mock')

const controller = require('../src/controller')
const factory = require('../src/factory')
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

	controller.request.process.mockImplementation(async () => {
		return MOCKS.CONTROLLER_REQUEST.VALID_RETURN()
	})

	factory.requestControllerResponse.badRequestError.mockImplementation(() => {
		return MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
	})
	factory.requestControllerResponse.error.mockImplementation(() => {
		return MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
	})
})

describe('Suite de teste do handler do seu app', () => {
	describe('Quando sucesso', () => {
		test('Deve processar e não receber nenhuma exceção retornando response de sucesso', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.SUCCESS_RETURN())
		})
	})

	describe('Quando falha', () => {
		test('Deve processar e não receber nenhuma exceção retornando response de erro inesperado', async () => {
			controller.request.process.mockImplementationOnce(async () => {
				return MOCKS.CONTROLLER_REQUEST.INTERNALERROR_RETURN()
			})
			await expect(
				app.handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.INTERNALERROR_RETURN())
		})
		test('Deve processar e não receber nenhuma exceção retornando response de requisicao invalida', async () => {
			controller.request.process.mockImplementationOnce(async () => {
				return MOCKS.CONTROLLER_REQUEST.BADREQUEST_RETURN()
			})
			await expect(
				app.handler(MOCKS.HANDLER.INVALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.BADREQUEST_RETURN())
		})
		test('Deve processar e não receber nenhuma exceção retornando response de erro inesperado quando body não for uma string', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.INVALID_INPUT_BODY_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.INTERNALERROR_RETURN())
		})
		test('Deve processar e não receber nenhuma exceção retornando response de erro de requisicao invalida quando não possuir body com uma string JSON válida', async () => {
			await expect(
				app.handler(
					MOCKS.HANDLER.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT()
				)
			).resolves.toEqual(MOCKS.HANDLER.BADREQUEST_RETURN())
		})
	})
})
