const MOCKS = require('./mocks/index.mock')
const { handler } = require('../index')
const controller = require('./../src/controller')
const service = require('./../src/service')

jest.mock('./../src/controller', () => ({
	goodCard: { process: jest.fn() },
}))
jest.mock('./../src/service')

describe('Given a request', () => {
	let event
	let record

	beforeEach(() => {
		jest.clearAllMocks()

		// Initialize a mocked event and record for testing
		record = {
			body: JSON.stringify({ message: 'testMessage' }),
			messageId: 'testId',
		}
		event = { Records: [record] }

		// Mock the logger methods
		service.logger = {
			info: jest.fn(),
			error: jest.fn(),
		}

		// Mock the controller method
		controller.goodCard.process.mockResolvedValue(
			Promise.resolve(MOCKS.CONTROLLER_SUCCESS_RESPONSE)
		)
	})
	it('should process the message successfully', async () => {
		await handler(event)

		expect(service.logger.info).toBeCalledWith(
			`EVENTO RECEBIDO: ${record.body}`
		)
		expect(controller.goodCard.process).toBeCalledWith(JSON.parse(record.body))
	})

	it('should handle the parse error', async () => {
		const badRecord = { body: 'badMessage' }
		event.Records = [badRecord]

		const result = await handler(event)

		expect(service.logger.error).toBeCalledWith(
			`Error to parse input message: ${badRecord.body}`
		)
		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: badRecord.messageId },
		])
	})

	it('should handle the controller error', async () => {
		const error = new Error('testError')
		controller.goodCard.process.mockRejectedValue(error)

		const result = await handler(event)

		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: record.messageId },
		])
	})
})
