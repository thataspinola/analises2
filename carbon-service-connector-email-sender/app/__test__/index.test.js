const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const { handler } = require('../index')
jest.mock('../src/controller')
jest.mock('../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

beforeEach(() => {
	controller.emailSender.sendEmail.mockImplementation(async () =>
		MOCKS.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE()
	)
	service.logger.info = jest.fn()
	service.logger.error = jest.fn()
})

describe('Lambda Handler Tests', () => {
	test('Processes records and returns a successful response', async () => {
		const event = MOCKS.SQS_MESSAGE_SUCCESS()
		const expectedResponse = { batchItemFailures: [] }

		const result = await handler(event)

		expect(result).toEqual(expectedResponse)
		expect(controller.emailSender.sendEmail).toHaveBeenCalledTimes(
			event.Records.length
		)
	})

	test('Handles a failure in sendEmail and returns batchItemFailures', async () => {
		controller.emailSender.sendEmail.mockRejectedValueOnce(
			new Error('Simulated failure')
		)

		const event = MOCKS.SQS_MESSAGE_SUCCESS()
		const expectedResponse = MOCKS.INDEX_ERROR_RESPONSE()

		const result = await handler(event)

		expect(result).toEqual(expectedResponse)
		expect(controller.emailSender.sendEmail).toHaveBeenCalled()
	})

	test('Processes mixed success and failure responses correctly', async () => {
		controller.emailSender.sendEmail
			.mockResolvedValueOnce({})
			.mockRejectedValueOnce(new Error('Simulated failure'))

		const event = {
			Records: [
				MOCKS.SQS_MESSAGE_SUCCESS().Records[0],
				MOCKS.SQS_MESSAGE_SUCCESS(MOCKS.SQS_BODY_INVALID).Records[0],
			],
		}

		const result = await handler(event)

		expect(result.batchItemFailures).toHaveLength(1)
		expect(result.batchItemFailures[0].itemIdentifier).toBe(
			event.Records[1].messageId
		)
		expect(controller.emailSender.sendEmail).toHaveBeenCalledTimes(2)
	})
})
