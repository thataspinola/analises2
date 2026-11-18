const { VALID_INPUT_DATA } = require('../../mocks/index.mock')
const service = require('../../../src/service')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de service.validation.js', () => {
	test('Deve validar os dados com sucesso', () => {
		expect(() => {
			service.validation.inputData(VALID_INPUT_DATA)
		}).not.toThrow()
	})

	test.each(['portableDevice'])(
		'Deve retornar uma exceção quando não informar um campo obrigatório',
		(field) => {
			expect(() => {
				service.validation.inputData({
					...VALID_INPUT_DATA,
					[`${field}`]: undefined,
				})
			}).toThrow(`The attributes values are not valid: ${field}`)
		}
	)

	test.each([['portableDevice', 1234]])(
		'Deve retornar uma exceção quando informar um campo com tipo diferente do esperado',
		(field, value) => {
			expect(() => {
				service.validation.inputData({
					...VALID_INPUT_DATA,
					[`${field}`]: value,
				})
			}).toThrow(`The attributes values are not valid: ${field}`)
		}
	)

	test.each([null, 2500])(
		'Deve retornar uma exceção quando informar o a cobertura para zip code com um valor não esperado.',
		(value) => {
			expect(() => {
				service.validation.inputData({
					...VALID_INPUT_DATA,
					portableDevice: {
						...VALID_INPUT_DATA.portableDevice,
						client: {
							...VALID_INPUT_DATA.portableDevice.client,
							zipCode: value,
						},
					},
				})
			}).toThrow('The attributes values are not valid: zipCode')
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
			service.validation.inputData(VALID_INPUT_DATA)
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
			service.validation.inputData(VALID_INPUT_DATA)
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
