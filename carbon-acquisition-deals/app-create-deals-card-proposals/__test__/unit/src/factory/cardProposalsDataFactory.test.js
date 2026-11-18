const factory = require('../../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('getSaveDealsData.js test suite', () => {
	it('Should return an array of objects with the "codigoProposta" property', () => {
		const result = factory.cardProposalsDataFactory.getSaveDealsData(
			MOCKS.FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_API_RESPONSE()
		)

		expect(result).toEqual(
			MOCKS.FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_RESPONSE()
		)
	})

	it('Should return an empty array if cardProposals is empty', () => {
		const cardProposals = []

		const result =
			factory.cardProposalsDataFactory.getSaveDealsData(cardProposals)

		expect(result).toEqual([])
	})
})
