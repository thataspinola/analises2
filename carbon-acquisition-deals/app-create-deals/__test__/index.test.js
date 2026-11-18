const MOCKS = require('./mocks/index.mock')
const { handler } = require('../index')
const { createDealsController } = require('./../src/controller')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a request', () => {
	test('It should create a request with success', async () => {
		createDealsController.process = jest.fn(() => {
			return MOCKS.CONTROLLER_REQUEST_SUCCESS_RETURN()
		})

		const response = await handler(MOCKS.HANDLER_VALID_REQUEST_INPUT_DATA())

		expect(response).toEqual(MOCKS.HANDLER_SUCCESS_RETURN())
	})

	test('It should throw an exception when controller returns error', async () => {
		createDealsController.process = jest.fn(() => {
			return MOCKS.CONTROLLER_REQUEST_INTERNAL_ERROR()
		})

		const response = await handler(MOCKS.HANDLER_VALID_REQUEST_INPUT_DATA())

		expect(response).toEqual(MOCKS.HANDLER_FAIL_RETURN_CONTROLLER_ERROR())
	})
})
