const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../src/property')

const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Test suite for the validationService.js', () => {
	test('It should not throw errors after validate an object that follows expected schema', () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_MESSAGE_REQUEST(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).not.toThrow()
	})

	test('It should return error after validate an object that follows expected schema with an invalid property orderNumber', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: orderNumber`)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property scope', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_MESSAGE_MISSING_SCOPE(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: scope`)
	})

	test('It should return error after validate an object that follows expected schema with an invalid property contactEmail', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: contactEmail`)
	})

	test('It should return error after validate an object that follows expected schema with more than one invalid field', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: scope, contactEmail`)
	})

	test('It should return error after validate an object that follows expected schema with invalid email format', async () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.SERVICE_VALIDATION.INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(`The attributes values are not valid: contactEmail`)
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
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_MESSAGE_REQUEST(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
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
				MOCKS.SERVICE_VALIDATION.VALID_INPUT_MESSAGE_REQUEST(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
