const MOCKS = require('./mocks/index.mock')
const app = require('../../index')
const controller = require('../../src/controller')
const service = require('../../src/service')

jest.mock('../../src/controller', () => ({
	dealsPortoTagController: { process: jest.fn() },
}))
jest.mock('../../src/service')

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

		controller.dealsPortoTagController.process.mockResolvedValue(
			Promise.resolve(MOCKS.CONTROLLER_DEALS_PORTO_TAG.SUCCESS_RESPONSE())
		)
	})
	test('Should process the message successfully', async () => {
		await app.handler(event)

		expect(service.logger.info).toBeCalledWith(
			`EVENTO RECEBIDO: ${record.body}`
		)
		expect(controller.dealsPortoTagController.process).toBeCalledWith(
			JSON.parse(record.body)
		)
	})

	test('Should handle the parse error', async () => {
		const badRecord = { body: 'badMessage' }
		event.Records = [badRecord]

		const result = await app.handler(event)

		expect(service.logger.error).toBeCalledWith(
			`Error to parse input message: ${badRecord.body}`
		)
		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: badRecord.messageId },
		])
	})

	test('Should handle the controller error', async () => {
		const error = new Error('testError')
		controller.dealsPortoTagController.process.mockRejectedValue(error)

		const result = await app.handler(event)

		expect(result.batchItemFailures).toEqual([
			{ itemIdentifier: record.messageId },
		])
	})
})
