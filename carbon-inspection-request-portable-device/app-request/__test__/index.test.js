const paymentDatalayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
const token = require('@porto-seguro/hub-vendas.carbon-token')

const { handler } = require('../index')
const controller = require('../src/controller')
const service = require('../src/service')
const MOCKS = require('./mocks/index.mock')

const FAKE_TOKEN = '123456'

jest.mock('../src/service')
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

	token.getMulesoftTokenHubInternal = jest.fn(async () => {
		return FAKE_TOKEN
	})
	paymentDatalayer.savePaymentData = jest.fn(async () => {
		return {}
	})
})

describe('Suite de teste do handler do app-request', () => {
	describe('Quando sucesso', () => {
		test('Deve receber resposta de sucesso do controlador', async () => {
			controller.inspectionRequest.process = jest.fn(async () => {
				return MOCKS.CONTROLLER_INSPECTION_REQUEST.SUCCESS_RESPONSE()
			})
			const response = await handler(MOCKS.VALID_HANDLER_INPUT())
			expect(response).toEqual(MOCKS.HANDLER_SUCCESS_RESPONSE())
		})
	})

	describe('Quando falha', () => {
		test('Deve receber uma carga inválida', async () => {
			controller.inspectionRequest.process = jest.fn(async () => {
				return MOCKS.CONTROLLER_INSPECTION_REQUEST.SUCCESS_RESPONSE()
			})
			const response = await handler(MOCKS.INVALID_HANDLER_INPUT(), {})
			expect(response).toEqual(MOCKS.HANDLER_ERROR_RESPONSE())
		})
	})
})
