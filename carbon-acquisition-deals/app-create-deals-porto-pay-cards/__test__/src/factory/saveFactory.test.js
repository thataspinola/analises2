const { build } = require('../../../src/factory/saveFactory')
const MOCKS = require('../../mocks/src/factory/saveFactory.mock')

describe('Save factory build test suite', () => {
	it('It should return expected object', () => {
		const result = build(MOCKS.VALID_DOCUMENT, MOCKS.VALID_RESPONSE)
		expect(result).toEqual(MOCKS.EXPECTED_RETURN())
	})
})
