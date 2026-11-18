const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')
const errors = require('../../../src/error')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

describe('Suite de testes de validationService.js', () => {
	test('Deve executar sem erro quando o payload fornecido for válido', () => {
		expect(() =>
			service.validation.inputData(MOCKS.VALID_INPUT_DATA_PAID)
		).not.toThrow()
	})

	test('Deve retornar um ValidationError para o `leadIdentifier` quando não fornecido', () => {
		expect(() =>
			service.validation.inputData({
				...MOCKS.VALID_INPUT_DATA_PAID,
				leadIdentifier: undefined,
			})
		).toThrow('The attributes values are not valid: leadIdentifier')
	})

	test('Deve retornar um ValidationError para o `scope` quando não fornecido', () => {
		expect(() =>
			service.validation.inputData({
				...MOCKS.VALID_INPUT_DATA_PAID,
				scope: null,
			})
		).toThrow('The attributes values are not valid: scope')
	})

	test('Deve retornar um ValidationError para o `scope` quando fornecido com um valor invalido', () => {
		expect(() =>
			service.validation.inputData({
				...MOCKS.VALID_INPUT_DATA_PAID,
				scope: 'invalidScope',
			})
		).toThrow('The attributes values are not valid: scope')
	})

	test('Deve retornar um ValidationError para o `status` quando não fornecido', () => {
		expect(() =>
			service.validation.inputData({
				...MOCKS.VALID_INPUT_DATA_PAID,
				status: null,
			})
		).toThrow('The attributes values are not valid: status')
	})

	test('Deve retornar um ValidationError para o `status` quando fornecido com um valor invalido', () => {
		expect(() =>
			service.validation.inputData({
				...MOCKS.VALID_INPUT_DATA_PAID,
				status: 'FALHA',
			})
		).toThrow('The attributes values are not valid: status')
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
				service.validation.inputData(MOCKS.VALID_INPUT_DATA_PAID)
			).toThrow(
				new errors.ValidationError(
					'The attributes values are not valid: can not determine property'
				)
			)
		}
	)
})
