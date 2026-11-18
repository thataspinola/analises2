const MOCKS = require('../../mocks/src/service/sortCards.mock')
const { sort } = require('../../../src/service/sortCardsService')

describe('Sort cards teste suite', () => {
	test('It should sort correctly given cards', () => {
		const sortedCards = sort(MOCKS.GIVEN_CARDS())

		expect(sortedCards).toEqual(MOCKS.EXPECTED_ORDER_CARDS())
	})
})
