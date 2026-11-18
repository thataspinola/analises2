const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/src/factory/responseFactory.mock')

describe('Build function', () => {
	it('Should build the object correctly', () => {
		const result = factory.save.build(
			MOCKS.INPUT_DOCUMENT,
			MOCKS.INPUT_RESPONSE
		)

		expect(result).toEqual(MOCKS.VALID_OUTPUT())
	})
})
