const { validation } = require('../../../src/service')
const MOCKS = require('../../mocks/src/service/validationService.mock')
const CONSTANTS = require('../../../src/property')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

describe('Given a validate tests for validationService.js', () => {
	test('It should not throw errors after validate an object that follows expected schema', () => {
		expect(() => {
			validation.inputData(
				MOCKS.VALID_INPUT_REQUEST(),
				CONSTANTS.UPDATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should return error after validate an object that follows expected schema missing codigo_vdo', async () => {
		expect(() => {
			validation.inputData(
				MOCKS.INVALID_INPUT_REQUEST_MISSING_CODIGO_VDO(),
				CONSTANTS.UPDATE_LEAD_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: codigo_vdo`)
	})

	test('It should return error after validate an object with wrong field type', async () => {
		expect(() => {
			validation.inputData(
				MOCKS.INVALID_INPUT_REQUEST_WRONG_FIELD_TYPE(),
				CONSTANTS.UPDATE_LEAD_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: pmc_observacoes`)
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
			validation.inputData(
				MOCKS.VALID_INPUT_REQUEST(),
				CONSTANTS.UPDATE_LEAD_SCHEMA
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
			validation.inputData(
				MOCKS.VALID_INPUT_REQUEST(),
				CONSTANTS.UPDATE_LEAD_SCHEMA
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
