const MOCKS = require('./mocks/index.mock')
const { handler } = require('../index')
const controller = require('./../src/controller')

jest.mock('./../src/controller', () => ({
	findDealsController: { process: jest.fn() },
}))

jest.mock('./../src/service', () => ({
	logger: { info: jest.fn() },
}))

describe('Given a request', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	test('It should create a request with success', async () => {
		controller.findDealsController.process = jest.fn(() => {
			return MOCKS.CONTROLLER_RESPONSE_SUCCESS()
		})
		const response = await handler(MOCKS.HANDLER_VALID_REQUEST_INPUT_DATA())

		expect(response).toEqual(MOCKS.HANDLER_VALID_RETURN())
	})

	test('It should create a request with error in input', async () => {
		controller.findDealsController.process = jest.fn(() => {
			return MOCKS.CONTROLLER_REQUEST_INVALID()
		})
		const response = await handler(MOCKS.HANDLER_INVALID_REQUEST_INPUT_DATA())

		expect(response).toEqual(MOCKS.HANDLER_FAIL_RETURN_WITH_INVALID_INPUT())
	})
})
