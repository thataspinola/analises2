const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de validationService.js', () => {
	describe('Dada uma chamada ao método `inputData`', () => {
		test('Não deve gerar erros após validar um objeto que segue o esquema esperado', async () => {
			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).not.toThrow()
		})

		test('Deve gerar erro após validar um objeto que segue o esquema esperado, mas com uma propriedade ausente', async () => {
			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTY(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).toThrow(
				`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME()}`
			)
		})

		test('Deve retornar erro após validar um objeto que segue o esquema esperado com um tipo de propriedade inválido', async () => {
			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).toThrow(
				`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME()}`
			)
		})

		test('Deve retornar erro após validar um objeto que segue o esquema esperado com um formato de propriedade inválido', async () => {
			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).toThrow(
				`The attributes values are not valid: ${MOCKS.SERVICE_VALIDATION.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME()}`
			)
		})

		test('Deve retornar erro após uma validação de objeto dar um erro de validação inesperado', async () => {
			const mockReturnFunction = () => {}
			mockReturnFunction.errors = [
				{
					keyword: 'unexpected',
				},
			]

			const mockCompileFunction = jest.fn(() => mockReturnFunction)

			Ajv.prototype.compile = mockCompileFunction

			addFormats.default = jest.fn(() => {})

			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).toThrow(
				'The attributes values are not valid: can not determine property'
			)

			jest.clearAllMocks()

			const mockReturnFunction2 = () => {}
			mockReturnFunction2.errors = [
				{
					keyword: 'type',
					instancePath: '',
				},
			]

			const mockCompileFunction2 = jest.fn(() => mockReturnFunction2)

			Ajv.prototype.compile = mockCompileFunction2

			addFormats.default = jest.fn(() => {})

			expect(() => {
				service.validation.inputData(
					MOCKS.SERVICE_VALIDATION.VALID_INPUT_DATA(),
					MOCKS.SERVICE_VALIDATION.VALIDATION_SCHEMA()
				)
			}).toThrow(
				'The attributes values are not valid: can not determine property'
			)
		})
	})
})
