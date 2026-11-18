const updateLeadQueueMessageFactory = require('../../../../src/factory/sqs/updateLeadQueueMessageFactory')
const CONSTANT = require('../../../../src/property')

describe('Given tests for updateLeadQueueMessageFactory.js', () => {
	test('It should get message in format to send queue for code status is 5', () => {
		const message = updateLeadQueueMessageFactory.getMessage(
			{ vdoCode: '1234'},
			CONSTANT.QUOTATION_ERROR_OBSERVATION
		)

		expect(message).toEqual({
			codigo_vdo: '1234',
			razao_status: CONSTANT.UPDATE_LEAD_REASON_STATUS,
			status: CONSTANT.UPDATE_LEAD_STATUS,
			pmc_observacoes: CONSTANT.QUOTATION_ERROR_OBSERVATION,
			id_ramo: 27,
		})
	})

	test('It should get message in format to send queue for a default status code', () => {
		const message = updateLeadQueueMessageFactory.getMessage({ vdoCode: '1234'})

		expect(message).toEqual({
			codigo_vdo: '1234',
			razao_status: CONSTANT.UPDATE_LEAD_REASON_STATUS,
			status: CONSTANT.UPDATE_LEAD_STATUS,
			pmc_observacoes: undefined,
			id_ramo: 27,
		})
	})

	test('It should get message in format to send queue for a default error', () => {
		const message = updateLeadQueueMessageFactory.getMessage({ vdoCode: '1234'})

		expect(message).toEqual({
			codigo_vdo: '1234',
			razao_status: '778210132',
			status: '0',
			pmc_observacoes: undefined,
			id_ramo: 27,
		})
	})

	test('It should get message in format to send queue for a default status code with the product id', () => {
		const message = updateLeadQueueMessageFactory.getMessage({ vdoCode: '1234', idProductType: 7})

		expect(message).toEqual({
			codigo_vdo: '1234',
			razao_status: CONSTANT.UPDATE_LEAD_REASON_STATUS,
			status: CONSTANT.UPDATE_LEAD_STATUS,
			pmc_observacoes: undefined,
			id_ramo: 27,
			id_tipo_produto: 7
		})
	})
})
