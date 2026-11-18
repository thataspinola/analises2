const MOCKS = require('../../mocks/validationService.mock')
const service = require('../../../src/service')
const errors = require('../../../src/error')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

describe('Suite de testes de validationService.js', () => {
	test('Deve executar sem erro quando o payload fornecido for válido', () => {
		expect(() =>
			service.validation.validateInputData(MOCKS.VALID_PAYLOAD)
		).not.toThrow()
	})

	test('Deve retornar um ValidationError para o `scope` quando não fornecido', () => {
		expect(() =>
			service.validation.validateInputData(MOCKS.INVALID_SCOPE_REQUIRED_PAYLOAD)
		).toThrow('The attributes values are not valid: scope')
	})

	test('Deve retornar um ValidationError para o `orderNumber` quando não fornecido', () => {
		expect(() =>
			service.validation.validateInputData(
				MOCKS.INVALID_ORDER_NUMBER_REQUIRED_PAYLOAD
			)
		).toThrow('The attributes values are not valid: orderNumber')
	})

	test('Deve retornar um ValidationError para o `externalId` quando não fornecido', () => {
		expect(() =>
			service.validation.validateInputData(
				MOCKS.INVALID_EXTERNAL_ID_REQUIRED_PAYLOAD
			)
		).toThrow('The attributes values are not valid: externalId')
	})

	test('Deve retornar um ValidationError quando um atributo não for do tipo esperado', () => {
		expect(() =>
			service.validation.validateInputData(MOCKS.INVALID_ORDER_NUMBER_PAYLOAD)
		).toThrow('The attributes values are not valid: orderNumber')
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

			expect(() =>
				service.validation.validateInputData(MOCKS.VALID_PAYLOAD)
			).toThrow(
				new errors.ValidationError(
					'The attributes values are not valid: can not determine property'
				)
			)
		}
	)
})
