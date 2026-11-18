const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('buildResponse test suite', () => {
	xtest('should return the response object with the correct data', () => {
		const response = factory.dataFormatFactory.buildResponse(
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_DOCUMENT(),
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_DATA_DEALS()
		)

		expect(response).toEqual(MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_RESPONSE())
	})

	xtest('should return the response object with status 404 and message "not found" when scope is not found', () => {
		const response = factory.dataFormatFactory.buildResponse(
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_DOCUMENT(),
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_DATA_DEALS_WITHOUD_GOOD_CARD()
		)

		expect(response).toEqual(
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_RESPONSE_WITH_404_NOT_FOUND()
		)
	})
})
