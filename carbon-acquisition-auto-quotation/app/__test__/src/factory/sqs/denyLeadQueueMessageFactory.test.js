const denyLeadQueueMessageFactory = require('../../../../src/factory/sqs/denyLeadQueueMessageFactory')
const { VALID_INPUT_DATA_PARSED } = require('../../../mocks/index.mock')

describe('Given tests for updateLeadQueueMessageFactory.js', () => {
	test('It should get message in format to send queue', () => {
		const message = denyLeadQueueMessageFactory.getMessage(
			'Exemplo de mensagem de erro',
			VALID_INPUT_DATA_PARSED.auto.idLead
		)

		expect(message).toEqual({
			motivo: 'Exemplo de mensagem de erro',
			oportunidadeId: VALID_INPUT_DATA_PARSED.auto.idLead,
		})
	})
})
