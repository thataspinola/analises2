const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const { handler } = require('../index')
jest.mock('../src/controller')

afterEach(function () {
	jest.clearAllMocks()
})

beforeEach(function () {
	controller.auto.processSqsMessage.mockImplementation(async (inputRequest) => {
		return MOCKS.CONTROLLER_AUTOCONTROLLER.PROCESS_SUCCESS_RETURN()
	})
})

describe('Given a request', () => {
	test('It should process transmission auto send request records from queue and return a sucessful object', async () => {
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_SUCCESS_RETURN()
		)
	})
	test('It should process transmission auto send request records from queue and return a non sucessful object', async () => {
		controller.auto.processSqsMessage.mockImplementationOnce((inputRequest) => {
			throw new Error(
				`API error: code '500' data: '{ "message": "Fake failure" }'`
			)
		})
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_FIRST_RECORD_PROCESSING_FAIL_RETURN()
		)
	})
	test('It should process transmission auto send request records from queue and return a non sucessful object when one of the input payload items is an invalid json string', async () => {
		await expect(
			handler(MOCKS.HANDLER_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM())
		).resolves.toEqual(
			MOCKS.HANDLER_FIRST_RECORD_PROCESSING_JSON_FORMAT_FAIL_RETURN()
		)
	})
})
