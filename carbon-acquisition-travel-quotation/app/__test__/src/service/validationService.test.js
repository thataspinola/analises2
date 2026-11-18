const SERVICE = require('../../../src/service')
const CONSTANTS = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

describe('Given tests for validationService.js', () => {
	test('It should return success in validate schema', () => {
		expect(() => {
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA,
				CONSTANTS.SCHEMA.travelQuotationSchema
			)
		}).not.toThrow()
	})

    test('It should return error on validate field', () => {
        expect(() => {
			SERVICE.validation.inputData(
				{},
				CONSTANTS.SCHEMA.travelQuotationSchema
			)
		}).toThrow('The attributes values are not valid: informacoes')
    })

	test('It should return error on validate field', () => {
        expect(() => {
			SERVICE.validation.inputData(
				MOCKS.VALID_INPUT_DATA_ERROR,
				CONSTANTS.SCHEMA.travelQuotationSchema
			)
		}).toThrow('The attributes values are not valid: conteudo')
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
				MOCKS.PAYLOAD_REQUEST,
				CONSTANTS.SCHEMA.travelQuotationSchema
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
				MOCKS.VALID_INPUT_DATA,
				CONSTANTS.SCHEMA.travelQuotationSchema
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
