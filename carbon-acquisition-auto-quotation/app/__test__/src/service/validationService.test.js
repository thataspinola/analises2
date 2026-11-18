const { VALID_INPUT_DATA_PARSED } = require('../../mocks/index.mock')
const { validationService } = require('../../../src/service')
const { ValidationError } = require('../../../src/error')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de validationService.js', () => {
	test('Deve validar os dados com sucesso', () => {
		expect(() => {
			validationService.inputData(VALID_INPUT_DATA_PARSED)
		}).not.toThrow()
	})

	test('Deve retornar uma exceção quando não informar um campo obrigatório', () => {
		expect(() => {
			validationService.inputData({
				...VALID_INPUT_DATA_PARSED,
				scope: undefined,
			})
		}).toThrow(
			new ValidationError(
				"The input path value is not valid: 'root' must have required property 'scope'"
			)
		)
	})

	test('Deve retornar uma exceção quando informar um campo com tipo diferente do esperado', () => {
		expect(() => {
			validationService.inputData({
				...VALID_INPUT_DATA_PARSED,
				scope: 1234,
			})
		}).toThrow(
			new ValidationError(
				"The input path value is not valid: 'scope' must be string"
			)
		)
	})

	test('Deve retornar uma exceção após uma validação dar um erro de validação inesperado', async () => {
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
			validationService.inputData(VALID_INPUT_DATA_PARSED)
		}).toThrow(
			new ValidationError(
				'The input path value is not valid: can not determine property'
			)
		)
	})
})
