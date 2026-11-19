import { describe, test, expect, beforeEach, vi } from 'vitest'
import { createApplication } from './helpers/application.mjs'
let carbonUpdateLeadApi, handler

const makeRecord = (sequenceNumber, leadCode = `lead-${sequenceNumber}`) => ({
	eventID: `event-${sequenceNumber}`,
	dynamodb: {
		SequenceNumber: sequenceNumber,
		OldImage: {
			vdoCode: { S: leadCode },
			idProductType: { S: '7' },
			idBranch: { S: '27' },
			expireAt: { N: '1700000000' },
		},
	},
})

describe('abandoned quotation stream with real controller and payload factory', () => {
	beforeEach(() => {
		carbonUpdateLeadApi = { updateLead: vi.fn() }
		const load = createApplication({
			'./src/api/index.js': { carbonUpdateLeadApi },
			'./src/service/index.js': { logger: { info: vi.fn(), error: vi.fn() } },
		})
		handler = load('index.js').handler
		carbonUpdateLeadApi.updateLead.mockResolvedValue({ updated: true })
	})

	test('updates a successful batch using the existing business payload', async () => {
		const records = [makeRecord('601'), makeRecord('602')]
		await expect(handler({ Records: records })).resolves.toEqual({ batchItemFailures: [] })
		expect(carbonUpdateLeadApi.updateLead.mock.calls).toEqual(
			['lead-601', 'lead-602'].map((leadCode) => [{
				codigo_vdo: leadCode,
				id_tipo_produto: 7,
				id_ramo: 27,
				fase: '1',
				status: '0',
				razao_status: '778210123',
			}])
		)
	})

	test('does not invoke the API for records after the failed checkpoint', async () => {
		carbonUpdateLeadApi.updateLead
			.mockResolvedValueOnce({ updated: true })
			.mockRejectedValueOnce(new Error('synthetic upstream unavailable'))
		const records = [makeRecord('701'), makeRecord('702'), makeRecord('703')]

		await expect(handler({ Records: records })).resolves.toEqual({
			batchItemFailures: [{ itemIdentifier: '702' }],
		})
		expect(carbonUpdateLeadApi.updateLead).toHaveBeenCalledTimes(2)

		await expect(handler({ Records: records.slice(1) })).resolves.toEqual({
			batchItemFailures: [],
		})
		expect(carbonUpdateLeadApi.updateLead.mock.calls.map(([p]) => p.codigo_vdo))
			.toEqual(['lead-701', 'lead-702', 'lead-702', 'lead-703'])
	})

	test('reports a malformed DynamoDB image instead of acknowledging it', async () => {
		const record = makeRecord('801')
		delete record.dynamodb.OldImage.expireAt

		await expect(handler({ Records: [record] })).resolves.toEqual({
			batchItemFailures: [{ itemIdentifier: '801' }],
		})
		expect(carbonUpdateLeadApi.updateLead).not.toHaveBeenCalled()
	})
})
