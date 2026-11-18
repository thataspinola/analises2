const MOCKS = require('./mocks/index.mock')
const { handler } = require('../index')
const controller = require('./../src/controller')
const service = require('./../src/service')

jest.mock('./../src/controller', () => ({
	eligibility: { process: jest.fn() },
}))
jest.mock('./../src/service')

describe('Given a request', () => {
	let event
	let record

	beforeEach(() => {
		jest.clearAllMocks()

		record = {
			body: JSON.stringify({ message: 'testMessage' }),
			messageId: 'testId',
		}
		event = { Records: [record] }

		service.logger = {
			info: jest.fn(),
			error: jest.fn(),
		}

		controller.eligibility.process.mockResolvedValue(
			Promise.resolve(MOCKS.CONTROLLER_SUCCESS_RESPONSE)
		)
	})
	xit('should process the message successfully', async () => {
		await handler(event)

		expect(service.logger.info).toBeCalledWith(
			`EVENTO RECEBIDO: ${record.body}`
		)
		expect(controller.eligibility.process).toBeCalledWith(
			JSON.parse(record.body)
		)
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
		controller.eligibility.process.mockRejectedValue(error)

		const result = await handler(event)

		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: record.messageId },
		])
	})
})
