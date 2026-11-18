const Ajv = require('ajv')
const CONSTANTS = require('../../../../src/property')
const MOCKS = require('../../mocks/index.mock')

const ajv = new Ajv()
const validate = ajv.compile(CONSTANTS.PORTO_TAG_SCHEMA)

describe('Schema Validation', () => {
	test('should validate a valid object', () => {
		const valid = validate(MOCKS.SCHEMA_PORTO_TAG_MOCKS.VALID_DATA())
		expect(valid).toBe(true)
	})

	test('should validate an object with null codigoCampanha', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.VALID_DATA_CODIGO_CAMPANHA_NULL()
		)
		expect(valid).toBe(true)
	})

	test('should validate an object without codigoCampanha', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.VALID_DATA_CODIGO_CAMPANHA_MISSING()
		)
		expect(valid).toBe(true)
	})

	test('should invalidate an object with missing required properties', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.INVALID_DATA_MISSING_REQUIRED_PROPERTY()
		)
		expect(valid).toBe(false)
		expect(validate.errors).not.toBeNull()
	})

	test('should invalidate an object with additional properties', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.INVALID_DATA_WITH_ADDITIONAL_PROPERTY()
		)
		expect(valid).toBe(false)
		expect(validate.errors).not.toBeNull()
	})

	test('should invalidate an object with incorrect property types', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.INVALID_DATA_WITH_INVALID_TYPE()
		)
		expect(valid).toBe(false)
		expect(validate.errors).not.toBeNull()
	})

	test('should invalidate an object with incorrect enum values', () => {
		const valid = validate(
			MOCKS.SCHEMA_PORTO_TAG_MOCKS.INVALID_DATA_WITH_INVALID_ENUM_VALUE()
		)
		expect(valid).toBe(false)
		expect(validate.errors).not.toBeNull()
	})
})
