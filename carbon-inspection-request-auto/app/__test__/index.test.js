const MOCKS = require('./mocks/index.mock')

const controller = require('../src/controller')
const app = require('../index')

jest.mock('../src/controller')
jest.mock('../logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	debug: jest.fn(),
}))

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	controller.inspection.process.mockImplementation(async () => {
		return MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
	})
})

describe('App handler test suite', () => {
	describe('When success', () => {
		test('It should process the data and receive no exceptions, returning a success response.', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.SUCCESS_RETURN())
		})
	})

	describe('When it fails', () => {
		test('It should process and not receive any exceptions, returning an error response when the controller fails.', async () => {
			const thrownErrorMessage = 'Unexpected inspectionController error'
			const thrownError = new Error(thrownErrorMessage)

			controller.inspection.process.mockImplementationOnce(() => {
				throw thrownError
			})
			await expect(
				app.handler(MOCKS.HANDLER.VALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.FAIL_RETURN())
		})

		test('It should process the input and not receive any exceptions, returning an error response when it receives invalid input.7', async () => {
			await expect(
				app.handler(MOCKS.HANDLER.INVALID_INPUT_PAYLOAD())
			).resolves.toEqual(MOCKS.HANDLER.FAIL_RETURN())
		})
	})
})
