const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')
const CONSTANT = require('../../../src/property')
const addFormats = require('ajv-formats')
const Ajv = require('ajv')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de validationService.js', () => {
	test('Deve validar os dados com sucesso', () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.VALID_INPUT_DATA(),
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		}).not.toThrow()
	})

	test('Deve retornar uma exceção quando não informar um campo obrigatório', () => {
		try {
			service.validation.inputData(
				{
					...MOCKS.VALID_INPUT_DATA(),
					client: {
						cpf: undefined,
						name: 'Maria Santos',
						cellPhone: '11222225555',
						email: 'email@dominio.com',
					},
				},
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		} catch (error) {
			expect(error.message).toEqual('The attributes values are not valid: cpf')
		}
	})
	test('Deve retornar uma exceção quando não informar um campo obrigatório parte de uma condicao anyOf', () => {
		try {
			service.validation.inputData(MOCKS.VALID_INPUT_DATA(), {
				...CONSTANT.CREATE_LEAD_SCHEMA,
				properties: {
					...CONSTANT.CREATE_LEAD_SCHEMA.properties,
					dummyProperty1: { type: 'string' },
					dummyProperty2: { type: 'string' },
				},
				anyOf: [
					{ required: ['dummyProperty1'] },
					{ required: ['dummyProperty2'] },
				],
			})
		} catch (error) {
			expect(error.message).toEqual(
				'The attributes values are not valid: dummyProperty1, dummyProperty2'
			)
		}
	})

	test('Deve retornar uma exceção quando informar um campo com tipo diferente do esperado', () => {
		try {
			service.validation.inputData(
				{
					...MOCKS.VALID_INPUT_DATA(),
					scope: 1234,
				},
				CONSTANT.CREATE_LEAD_SCHEMA
			)
		} catch (error) {
			expect(error.message).toEqual(
				'The attributes values are not valid: scope'
			)
		}
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
			service.validation.inputData(MOCKS.VALID_INPUT_DATA())
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
			service.validation.inputData(MOCKS.VALID_INPUT_DATA())
		}).toThrow(
			'The attributes values are not valid: can not determine property'
		)
	})
})
