const SERVICE = require('../../../src/service')
const CONSTANTS = require('../../../src/property')
const MOCKS = require('../../mocks/src/service/validationService.mock.js')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

describe('Given tests for validationService.js', () => {
	test('It should return success in validate schema', () => {
		expect(() => {
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.CONSENTS_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should return error on validate field', () => {
        expect(() => {
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA_ERROR(),
				CONSTANTS.CONSENTS_SCHEMA
			)
		}).toThrow('The attributes values are not valid: taxvat')
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
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.CONSENTS_SCHEMA
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
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANTS.CONSENTS_SCHEMA
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
