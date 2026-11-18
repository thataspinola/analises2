const factory = require('../../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Save factory build test suite', () => {
	it('It should return expected object', () => {
		const result = factory.saveFactory.build(
			MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
			MOCKS.FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_RESPONSE()
		)
		expect(result).toEqual(MOCKS.FACTORY_SAVE_MOCKS.EXPECTED_RETURN())
	})
})
