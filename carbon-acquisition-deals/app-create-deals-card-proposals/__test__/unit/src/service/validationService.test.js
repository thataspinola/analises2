const MOCKS = require('../../mocks/index.mock')
const service = require('../../../../src/service/index')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const CONSTANTS = require('../../../../src/property')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object that follows expected schema', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows expected schema but with invalid property', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.INVALID_INPUT_DATA_INVALID_PROPERTY(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: codigoCanal`)
	})

	test('It should not throw when codigoCampanha is null', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.INPUT_DATA_CODIGO_CAMPANHA_NULL(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should not throw when codigoCampanha is missing', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.INPUT_DATA_CODIGO_CAMPANHA_MISSING(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should throw error when required property is missing', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.INPUT_DATA_MISSING_REQUIRED_PROPERTY(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: documento`)
	})

	test('It should throw error when property type is not valid', async () => {
		expect(() => {
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.INPUT_DATA_INVALID_PROPERTY_VALUE(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: codigoCampanha`)
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
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
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
			service.schemaValidation.inputData(
				MOCKS.SERVICE_VALIDATION_MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
