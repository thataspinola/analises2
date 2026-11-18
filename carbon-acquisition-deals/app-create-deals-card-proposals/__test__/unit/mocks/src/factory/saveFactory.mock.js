const API_PROPOSTA_MOCKS = require('../api/propostaApi.mock')
const FACTORY_CARD_PROPOSALS_DATA_MOCKS = require('./cardProposalsDataFactory.mock')

exports.EXPECTED_RETURN = () => {
	return {
		scope: 'card-proposals',
		document: API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
		data: JSON.stringify(FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_RESPONSE()),
	}
}
