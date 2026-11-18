const MOCKS = require('../../mocks/src/service/schemaValidationService.mock')
const CONSTANTS = require('../../../src/property')
const service = require('../../../src/service')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

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

	test('It should throw error after validate an object that follows expected schema but with invalid type', async () => {
		expect(() => {
			service.schemaValidation.validate(
				MOCKS.INVALID_INPUT_DATA_INVALID_TYPE(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: documento`)
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
			service.schemaValidation.validate(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.INPUT_SCHEMA
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
			service.schemaValidation.validate(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.INPUT_SCHEMA
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
