const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const { handler } = require('../index')

beforeAll(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario with Successful request test', () => {
	test('It should receive success response from controller', async () => {
		controller.travel.process = jest.fn(async () => {
			return MOCKS.CONTROLLER_SUCCESS_RESPONSE()
		})

		const response = await handler(
			MOCKS.VALID_INDEX_INPUT_REQUEST(),
			MOCKS.CONTEXT()
		)

		expect(response).toEqual(MOCKS.INDEX_SUCCESS_RESPONSE())
	})
})

describe('Scenario with Fail request test', () => {
	test('It should receive a error from controller', async () => {
		controller.travel.process = jest.fn(() => {
			throw new Error('Error')
		})

		const response = await handler(
			MOCKS.VALID_INDEX_INPUT_REQUEST(),
			MOCKS.CONTEXT()
		)

		expect(response).toEqual(MOCKS.INDEX_ERROR_RESPONSE())
	})

	test('It should receive an invalid payload', async () => {
		controller.travel.process = jest.fn(async () => {
			return MOCKS.CONTROLLER_SUCCESS_RESPONSE()
		})

		const response = await handler(
			MOCKS.INVALID_INDEX_INPUT_REQUEST(),
			MOCKS.CONTEXT()
		)

		expect(response).toEqual(MOCKS.INDEX_ERROR_RESPONSE())
	})
})
