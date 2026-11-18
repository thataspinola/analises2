const MOCKS = require('./mocks/index.mock')
const controller = require('../src/controller')
const service = require('../src/service')
const { handler } = require('../index')
jest.mock('../src/controller')
jest.mock('../src/service')

afterEach(function () {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(function () {
	controller.processSnsSqsMessage.process.mockImplementation(
		async (inputRequest) => {
			return MOCKS.CONTROLLER_PROCESSSNSSQSMESSAGE.PROCESS_VALID_RETURN()
		}
	)
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})
	service.logger.warn.mockImplementation((message) => {})
	service.logger.debug.mockImplementation((message) => {})
})

describe('lambdaHandler', () => {
	test('Should process messages with carbon-trace-id', async () => {
		const event = {
			Records: [
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test' }) }),
					messageAttributes: {
						'carbon-trace-id': 'trace-id-123',
					},
					messageId: 'msg-1',
				},
			],
		}

		controller.processSnsSqsMessage.process.mockResolvedValueOnce()

		const result = await handler(event)

		expect(controller.processSnsSqsMessage.process).toHaveBeenCalledWith(
			{ data: 'test' },
			'trace-id-123'
		)
		expect(result.batchItemFailures).toEqual([])
	})

	test('Should generate a new carbon-trace-id if not provided', async () => {
		const event = {
			Records: [
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test' }) }),
					messageAttributes: {},
					messageId: 'msg-1',
				},
			],
		}

		controller.processSnsSqsMessage.process()

		const result = await handler(event)

		expect(controller.processSnsSqsMessage.process).toHaveBeenCalled()
		expect(result.batchItemFailures).toEqual([])
	})

	test('Should log an error and reject if JSON parsing fails', async () => {
		const event = {
			Records: [
				{
					body: 'invalid-json',
					messageId: 'msg-1',
				},
			],
		}

		const result = await handler(event)

		expect(service.logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Processing JSON parse error:')
		)
		expect(result.batchItemFailures).toEqual([{ itemIdentifier: 'msg-1' }])
	})

	test('Should handle multiple records', async () => {
		const event = {
			Records: [
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test1' }) }),
					messageId: 'msg-1',
				},
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test2' }) }),
					messageId: 'msg-2',
				},
			],
		}

		controller.processSnsSqsMessage.process
			.mockResolvedValueOnce()
			.mockRejectedValueOnce(new Error('Processing error'))

		const result = await handler(event)

		expect(result.batchItemFailures).toEqual([{ itemIdentifier: 'msg-2' }])
	})

	test('Should return failures for all rejected promises', async () => {
		const event = {
			Records: [
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test1' }) }),
					messageId: 'msg-1',
				},
				{
					body: JSON.stringify({ Message: JSON.stringify({ data: 'test2' }) }),
					messageId: 'msg-2',
				},
			],
		}

		controller.processSnsSqsMessage.process
			.mockRejectedValueOnce(new Error('Error 1'))
			.mockRejectedValueOnce(new Error('Error 2'))

		const result = await handler(event)

		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: 'msg-1' },
			{ itemIdentifier: 'msg-2' },
		])
	})
})
