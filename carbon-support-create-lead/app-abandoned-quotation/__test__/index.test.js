const { abandonedQuotationController } = require('../src/controller')
const { logger } = require('../src/service')
const { ValidationError } = require('../src/error')
const { handler } = require('..')

jest.mock('../src/controller', () => ({
	abandonedQuotationController: { process: jest.fn() },
}))
jest.mock('../src/service', () => ({
	logger: { error: jest.fn() },
}))

const makeRecord = (sequenceNumber) => ({
	eventID: `event-${sequenceNumber}`,
	eventName: 'REMOVE',
	dynamodb: {
		SequenceNumber: sequenceNumber,
		OldImage: {
			vdoCode: { S: `lead-${sequenceNumber}` },
			expireAt: { N: '1700000000' },
		},
	},
})

describe('DynamoDB Stream abandoned quotation handler', () => {
	beforeEach(() => {
		jest.resetAllMocks()
		abandonedQuotationController.process.mockResolvedValue([{ updated: true }])
	})

	test('acknowledges an empty batch without invoking the controller', async () => {
		await expect(handler({ Records: [] })).resolves.toEqual({ batchItemFailures: [] })
		expect(abandonedQuotationController.process).not.toHaveBeenCalled()
	})

	test('processes records sequentially and returns the stream success contract', async () => {
		const first = makeRecord('90071992547409930001')
		const second = makeRecord('90071992547409930002')
		const completed = []
		abandonedQuotationController.process.mockImplementation(async ({ Records }) => {
			if (Records[0] === second) expect(completed).toEqual([first])
			await Promise.resolve()
			completed.push(Records[0])
		})

		const response = await handler({ Records: [first, second], source: 'synthetic' })

		expect(response).toEqual({ batchItemFailures: [] })
		expect(completed).toEqual([first, second])
		expect(abandonedQuotationController.process.mock.calls).toEqual([
			[{ Records: [first], source: 'synthetic' }],
			[{ Records: [second], source: 'synthetic' }],
		])
		expect(logger.error).not.toHaveBeenCalled()
	})

	test('returns the failed SequenceNumber and leaves the remaining records for retry', async () => {
		const records = [makeRecord('101'), makeRecord('102'), makeRecord('103')]
		abandonedQuotationController.process
			.mockResolvedValueOnce([{ updated: true }])
			.mockRejectedValueOnce(new Error('synthetic API failure'))

		await expect(handler({ Records: records })).resolves.toEqual({
			batchItemFailures: [{ itemIdentifier: '102' }],
		})
		expect(abandonedQuotationController.process).toHaveBeenCalledTimes(2)
		expect(logger.error).toHaveBeenCalledWith(
			{ eventId: 'event-102', sequenceNumber: '102', errorName: 'Error' },
			'Failed to process abandoned quotation stream record'
		)
	})

	test('reports a synchronous controller failure using SequenceNumber instead of eventID', async () => {
		abandonedQuotationController.process.mockImplementation(() => {
			throw new Error('synchronous failure')
		})

		await expect(handler({ Records: [makeRecord('201'), makeRecord('202')] }))
			.resolves.toEqual({ batchItemFailures: [{ itemIdentifier: '201' }] })
		expect(abandonedQuotationController.process).toHaveBeenCalledTimes(1)
	})

	test('handles a non-Error rejection without swallowing the failed checkpoint', async () => {
		abandonedQuotationController.process.mockRejectedValue(null)

		await expect(handler({ Records: [makeRecord('301')] })).resolves.toEqual({
			batchItemFailures: [{ itemIdentifier: '301' }],
		})
		expect(logger.error.mock.calls[0][0].errorName).toBe('Error')
	})

	test.each([undefined, null, {}, { Records: null }, { Records: {} }, { Records: 'invalid' }])(
		'rejects malformed batches instead of returning an HTTP response: %p',
		async (event) => {
			await expect(handler(event)).rejects.toBeInstanceOf(ValidationError)
			expect(abandonedQuotationController.process).not.toHaveBeenCalled()
		}
	)

	test.each([null, undefined, '', ' ', 123])(
		'rejects an invalid checkpoint before performing any side effects: %p',
		async (sequenceNumber) => {
			const records = [makeRecord('401'), makeRecord(sequenceNumber)]
			await expect(handler({ Records: records })).rejects.toThrow('SequenceNumber')
			expect(abandonedQuotationController.process).not.toHaveBeenCalled()
		}
	)

	test.each([null, undefined, {}, { dynamodb: null }])(
		'rejects records without a DynamoDB checkpoint: %p',
		async (record) => {
			await expect(handler({ Records: [record] })).rejects.toThrow('SequenceNumber')
			expect(abandonedQuotationController.process).not.toHaveBeenCalled()
		}
	)

	test.each([undefined, null, 'invalid', []])(
		'reports a missing or invalid OldImage as an item failure: %p',
		async (oldImage) => {
			const record = makeRecord('501')
			record.dynamodb.OldImage = oldImage
			await expect(handler({ Records: [record, makeRecord('502')] })).resolves.toEqual({
				batchItemFailures: [{ itemIdentifier: '501' }],
			})
			expect(abandonedQuotationController.process).not.toHaveBeenCalled()
		}
	)
})
