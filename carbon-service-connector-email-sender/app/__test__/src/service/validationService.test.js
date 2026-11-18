const MOCKS = require('../../mocks/index.mock')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { validation } = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a inputData call', () => {
	test('It should not throw errors after validate an object that follows emailSender payload schema', async () => {
		expect(() => {
			validation.inputData(MOCKS.PAYLOAD_VALID)
		}).not.toThrow()
	})

	test('It should throw error after validate an object that follows emailSender payload schema but with a missing property', async () => {
		expect(() => {
			let missingProperty = {
				...MOCKS.PAYLOAD_VALID,
				from: undefined,
			}
			validation.inputData(missingProperty)
		}).toThrow(`The attributes values are not valid: from`)
	})

	test('It should return error after validate an object that follows emailSender payload schema with a invalid property type', async () => {
		expect(() => {
			let invalidProperty = {
				...MOCKS.PAYLOAD_VALID,
				from: 123,
			}
			validation.inputData(invalidProperty)
		}).toThrow(`The attributes values are not valid: /from`)
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
			validation.inputData(MOCKS.PAYLOAD_VALID)
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
			validation.inputData(MOCKS.PAYLOAD_VALID)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
