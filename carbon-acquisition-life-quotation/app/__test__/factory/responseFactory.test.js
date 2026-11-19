const factory = require('../../src/factory')
const MOCKS = require('../mocks/index.mock')

describe('test for response factory', () => {
	test('should convert the response successfully', () => {
		dateOfBirth = '2000-06-25'

		let result = factory.responseSuccess.quotationSuccess(
			MOCKS.OFERTAS_DATA(),
			dateOfBirth
		)

		expect(result).toEqual(MOCKS.RESPONSE_QUOTATION_DATA_SUCCESS(dateOfBirth))
	})
})
