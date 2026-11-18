const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../src/property')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows expected schema but with invalid property', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.INVALID_INPUT_DATA_INVALID_PROPERTY(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: codigoCanal`)
	})

	test('It should not throw when codigoCampanha is missing', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.INPUT_DATA_CODIGO_CAMPANHA_MISSING(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should not throw when codigoCampanha is null', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.INPUT_DATA_CODIGO_CAMPANHA_NULL(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw when codigoCampanha is present with invalid type', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.INPUT_DATA_CODIGO_CAMPANHA_INVALID_TYPE(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: codigoCampanha`)
	})
})
