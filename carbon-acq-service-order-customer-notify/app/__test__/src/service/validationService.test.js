const MOCKS = require('../../mocks/index.mock')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object that follows expected schema (when a property is conditionally optional)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_CONDITIONAL_OPTIONAL_PROPERTY_A_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).not.toThrow()
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_CONDITIONAL_OPTIONAL_PROPERTY_B_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object that follows expected schema (multiple property type with a different but accepted type)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_MULTIPLETYPEPROPERTY_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object that follows expected schema (string property nullable when receives null value)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_NULABLEPROPERTY_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows expected schema but with null value in a not nullable property', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_NOTNULABLEPROPERTY_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_NOTNULABLEPROPERTY_PROPERTY_NAME()}`
		)
	})

	test('It should throw error after validate an object that follows expected schema but with a missing property', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property type', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property size', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property value', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property format', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property format', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property format', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property (oneOf)', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with two missing properties with the same name', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA_WITH_PROPERTIES_WITH_SAME_NAME()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME_NAME()}`
		)
	})

	test('It should return error after an object validation give an unexpected validation error', async () => {
		Ajv.prototype.compile = jest.fn(() => {
			const returnObj = jest.fn(() => {})
			returnObj.errors = [
				{
					keyword: 'unexpected',
				},
			]

			return returnObj
		})

		addFormats.default = jest.fn(() => {})

		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)

		jest.clearAllMocks()

		Ajv.prototype.compile = jest.fn(() => {
			const returnObj = jest.fn(() => {})
			returnObj.errors = [
				{
					keyword: 'type',
					instancePath: '',
				},
			]

			return returnObj
		})

		addFormats.default = jest.fn(() => {})

		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
