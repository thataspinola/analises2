const MOCKS = require('../../mocks/index.mock')
const service = require('../../../../src/service')

describe('filterCardProposalsInProgressService.js test suite', () => {
	it('Should return an array of objects only with the filtered items', () => {
		const result = service.filterCardProposalsInProgress.filter(
			MOCKS.SERVICE_FILTER_CARD_PROPOSALS_IN_PROGRESS.API_RESPONSE()
		)

		expect(result).toEqual(
			MOCKS.SERVICE_FILTER_CARD_PROPOSALS_IN_PROGRESS.VALID_RETURN()
		)
	})

	it('Should return an empty array when no one fits with filter', () => {
		const result = service.filterCardProposalsInProgress.filter(
			MOCKS.SERVICE_FILTER_CARD_PROPOSALS_IN_PROGRESS.API_RESPONSE_WITH_NO_ONE_FITS()
		)

		expect(result).toEqual([])
	})

	it('Should return an empty array if cardProposals is empty', () => {
		const cardProposals = []

		const result = service.filterCardProposalsInProgress.filter(cardProposals)

		expect(result).toEqual([])
	})
})
