const MOCKS = require('./mocks/index.mock')
const checkInspectionRequestController = require('../src/controller/checkInspectionRequestController')
const { handler } = require('../index')

jest.mock('../src/controller/checkInspectionRequestController', () => ({
    process: jest.fn()
}))

afterEach(function () {
	jest.clearAllMocks()
})

beforeEach(function () {
    checkInspectionRequestController.process.mockResolvedValue(Promise.resolve())
})


describe('Given a request', () => {
    test('It should process records from queue and return a sucessful object', async () => {
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_SQS_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_SUCCESS_RETURN()
		)
	})

    test('It should process records from db and return a sucessful object', async () => {
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_DB_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_SUCCESS_RETURN()
		)
	})

	test('It should process records from queue and return a non sucessful object', async () => {
		checkInspectionRequestController.process.mockImplementationOnce(
			() => {
				throw new Error(
					`API error: code '500' data: '{ "message": "Fake failure" }'`
				)
			}
		)
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_SQS_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_FIRST_RECORD_PROCESSING_SQS_FAIL_RETURN()
		)
	})

    test('It should process records from db and return a non sucessful object', async () => {
		checkInspectionRequestController.process.mockImplementationOnce(
			() => {
				throw new Error(
					`API error: code '500' data: '{ "message": "Fake failure" }'`
				)
			}
		)
		await expect(handler(MOCKS.HANDLER_VALID_INPUT_DB_PAYLOAD())).resolves.toEqual(
			MOCKS.HANDLER_FIRST_RECORD_PROCESSING_DB_FAIL_RETURN()
		)
	})
})
