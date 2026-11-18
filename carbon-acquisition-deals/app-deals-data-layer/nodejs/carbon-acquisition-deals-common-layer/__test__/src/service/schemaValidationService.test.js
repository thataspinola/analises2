const MOCKS = require('../../mocks/src/service/schemaValidationService.mock')
const CONSTANTS = require('../../../src/property')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.SAVE_VALID_INPUT_DATA(),
				CONSTANTS.SAVE_INPUT_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows expected schema but with invalid property', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.SAVE_INVALID_INPUT_DATA_INVALID_PROPERTY(),
				CONSTANTS.SAVE_INPUT_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: scope`)
	})

	test('It should throw error after validate an object that follows expected schema but with invalid type property', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.SAVE_INVALID_INPUT_DATA_INVALID_TYPE_PROPERTY(),
				CONSTANTS.SAVE_INPUT_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: document`)
	})
})
