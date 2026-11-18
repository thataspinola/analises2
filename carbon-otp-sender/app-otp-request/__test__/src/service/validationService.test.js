const MOCKS = require('../../mocks/index.mock')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object without LASTREQUESTMESSAGEID that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should not throw errors after validate an object with LASTREQUESTMESSAGEID that follows expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_VALID_INPUT_DATA_WITH_LASTREQUESTMESSAGEID(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows expected schema but with a missing property', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_MISSING_PROPERTY(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_MISSING_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property type', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property size', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property value', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME()}`
		)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property format', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME()}`
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
				MOCKS.SERVICE_VALIDATION_VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
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
				MOCKS.SERVICE_VALIDATION_VALID_INPUT_DATA(),
				MOCKS.SERVICE_VALIDATION_SCHEMA()
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
