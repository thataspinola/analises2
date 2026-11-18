const { VALID_INPUT_DATA } = require('../../mocks/index.mock')
const { validationService } = require('../../../src/service')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de validationService.js', () => {
	test('Deve validar os dados com sucesso', () => {
		expect(() => {
			validationService.inputData(VALID_INPUT_DATA)
		}).not.toThrow()
	})

	test.each(['scope', 'susep', 'pescod',])(
		'Deve retornar uma exceção quando não informar um campo obrigatório',
		(field) => {
			expect(() => {
				validationService.inputData({
					...VALID_INPUT_DATA,
					[`${field}`]: undefined,
				})
			}).toThrow(`The attributes values are not valid: ${field}`)
		}
	)

	test.each([
		['scope', 1234],
		['susep', 1234],
		['pescod', 'error'],
	])(
		'Deve retornar uma exceção quando informar um campo com tipo diferente do esperado',
		(field, value) => {
			expect(() => {
				validationService.inputData({
					...VALID_INPUT_DATA,
					[`${field}`]: value,
				})
			}).toThrow(`The attributes values are not valid: ${field}`)
		}
	)

	test.each([null, '2500'])(
		'Deve retornar uma exceção quando informar o a cobertura para proteção digital com um valor não esperado.',
		(value) => {
			expect(() => {
				validationService.inputData({
					...VALID_INPUT_DATA,
					cellPhone: {
						...VALID_INPUT_DATA.cellPhone,
						digitalProtectionValue: value,
					},
				})
			}).toThrow('The attributes values are not valid: digitalProtectionValue')
		}
	)

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
			validationService.inputData(VALID_INPUT_DATA)
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
			validationService.inputData(VALID_INPUT_DATA)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
