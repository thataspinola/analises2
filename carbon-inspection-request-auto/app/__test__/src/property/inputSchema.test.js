const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property/index')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Test suite for the inputSchema.js.', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.PROPERTY_INPUTSCHEMA.VALID_INPUT(),
				CONSTANT.QUEUE_MESSAGE_SCHEMA
			)
		}).not.toThrow()
	})
})
