const token = require('@porto-seguro/hub-vendas.carbon-token')
const paymentDAtalayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
const { handler } = require('../index')
const controller = require('../src/controller')
const MOCKS = require('./mocks/index.mock')

const FAKE_TOKEN = '123456'

jest.mock('../src/service')
jest.mock('../src/api')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

beforeAll(() => {
	token.getMulesoftTokenHubInternal = jest.fn(async () => {
		return FAKE_TOKEN
	})
	paymentDAtalayer.savePaymentData = jest.fn(async () => {
		return {}
	})
})

describe('Scenario with Successful request test', () => {
	test('Deve receber resposta de sucesso do controlador', async () => {
		controller.inspection.process = jest.fn(async () => {
			return MOCKS.CONTROLLER_SUCCESS_RESPONSE()
		})
		const response = await handler(MOCKS.VALID_INDEX_INPUT_REQUEST())
		expect(response).toEqual(MOCKS.INDEX_SUCCESS_RESPONSE())
	})
})

describe('Scenario with Fail request test', () => {
	test('Deve receber uma carga inválida', async () => {
		controller.inspection.process = jest.fn(async () => {
			return MOCKS.CONTROLLER_SUCCESS_RESPONSE()
		})
		const response = await handler(
			MOCKS.INVALID_INDEX_INPUT_REQUEST(),
			MOCKS.CONTEXT()
		)
		expect(response).toEqual(MOCKS.INDEX_ERROR_RESPONSE())
	})
})
