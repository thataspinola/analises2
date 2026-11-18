const MOCKS = require('../../mocks/validationService.mock')
const service = require('../../../src/service')
const errors = require('../../../src/error')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

describe('Suite de testes de validationService.js', () => {
	test('Deve executar sem erro quando o payload fornecido for válido e conter o `transactionId`', () => {
		expect(() =>
			service.validation.inputData(MOCKS.VALID_PAYLOAD)
		).not.toThrow()
	})

	test('Deve executar sem erro quando o payload fornecido for válido e conter o `paymentData`', () => {
		expect(() =>
			service.validation.inputData(MOCKS.VALID_PAYLOAD_WITH_PAYMENT_DATA)
		).not.toThrow()
	})

	test('Deve retornar um ValidationError para o `scope` quando não fornecido', () => {
		expect(() =>
			service.validation.inputData(MOCKS.INVALID_SCOPE_REQUIRED_PAYLOAD)
		).toThrow('The attributes values are not valid: scope')
	})

	test('Deve retornar um ValidationError para o `transactionId` quando é muito longo', () => {
		expect(() =>
			service.validation.inputData(MOCKS.INVALID_TRANSACTION_ID_PAYLOAD)
		).toThrow('The attributes values are not valid: transactionId')
	})

	test('Deve retornar um ValidationError para o `transactionId` ou `paymentData`não forem fornecidos', () => {
		expect(() =>
			service.validation.inputData(MOCKS.INVALID_PAYLOAD_ONE_OF)
		).toThrow(
			'The attributes values are not valid: transactionId, paymentData, must match exactly one schema in oneOf'
		)
	})

	test('Deve retornar um ValidationError quando o payload fornecido  conter o `paymentData` e o `status` for diferente de ERROR', () => {
		expect(() =>
			service.validation.inputData(
				MOCKS.INVALID_PAYLOAD_STATUS_WITH_PAYMENT_DATA
			)
		).toThrow(
			'The attributes values are not valid: status must be equal to constant ERROR'
		)
	})

	test.each([
		{
			keyword: 'unexpected',
		},
		{
			keyword: 'type',
			instancePath: '',
		},
	])(
		'Deve retornar um ValidationError com uma mensagem genérica quando uma keyword ou um instacePath desconhecidos forem encontrados',
		(error) => {
			Ajv.prototype.compile = jest.fn(() => {
				const returnObj = jest.fn(() => {})
				returnObj.errors = [error]

				return returnObj
			})

			addFormats.default = jest.fn(() => {})

			expect(() => service.validation.inputData(MOCKS.VALID_PAYLOAD)).toThrow(
				new errors.ValidationError(
					'The attributes values are not valid: can not determine property'
				)
			)
		}
	)
})
