const { handler } = require('../index')
const controller = require('../src/controller')
const service = require('../src/service')
const MOCKS = require('./mocks/index.mock')

jest.mock('../src/api')

jest.mock('../src/service', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
	}
}))

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info.mockImplementation((_message) => {})
	service.logger.error.mockImplementation((_message) => {})
	service.logger.warn.mockImplementation((_message) => {})
	service.logger.debug.mockImplementation((_message) => {})
})

describe('Suite de teste do handler do app-fail', () => {
	describe('Quando sucesso', () => {
		test('Deve retornar sucesso ao enviar uma mensagem válida', async () => {
			controller.inspectionFail.process = jest.fn().mockResolvedValue()

			const response = await handler(MOCKS.VALID_HANDLER_INPUT())

			expect(response).toEqual(MOCKS.HANDLER_SUCCESS_RESPONSE())
		})
	})

	describe('Quando falha', () => {
		test('Deve receber uma carga inválida', async () => {
			controller.inspectionFail.process = jest.fn().mockResolvedValue()
			const response = await handler(MOCKS.INVALID_HANDLER_INPUT(), {})
			expect(response).toEqual(MOCKS.HANDLER_ERROR_RESPONSE())
		})
	})
})
