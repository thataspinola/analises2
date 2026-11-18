const MOCKS = require('./../mocks/index.mock')
const service = require('../../src/service')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

describe('Given a inputData call', () => {
	test('It should not throw errors after validating an object that follows the expected schema', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SCHEMA_VALIDE(),
				MOCKS.SCHEMA()
			)
		}).not.toThrow()
	})
	
	test('It should throw an error after validating an object that follows the expected schema with an invalid property type', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SCHEMA_NOT_SUSEP(),
				MOCKS.SCHEMA()
			)
		}).toThrow(
			MOCKS.VALIDATION_SERVICE_INVALID_INPUT_DATA('susep')
		)
	})

	test('It should throw an error after an unexpected validation error', async () => {
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
				MOCKS.SCHEMA_VALIDE(),
				MOCKS.SCHEMA()
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
				MOCKS.SCHEMA_VALIDE(),
				MOCKS.SCHEMA()
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
