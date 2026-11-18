const {
	VALIDATION_SERVICE_DESCRIPTION_MESSAGES,
	VALIDATION_SERVICE_YEAR_MODEL_MESSAGES,
	VALIDATION_SERVICE_PLATE_MESSAGES,
} = require('../../../src/property')
const { validationService } = require('../../../src/services')

beforeEach(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de vehicleController.js', () => {
	describe('plateValidation', () => {
		test('Deve validar a placa com sucesso e não retornar exceção', () => {
			expect(() => validationService.plateValidation('XXX1234')).not.toThrow()
		})

		test('Deve retornar uma exceção quando a placa não for uma string', () => {
			const invalidValues = [undefined, null, 1234567, true, false]

			for (const value of invalidValues) {
				try {
					validationService.plateValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_PLATE_MESSAGES.mustBeString
					)
				}
			}
		})

		test('Deve retornar uma exceção quando a placa tiver menos que 7 caracteres', () => {
			const invalidValues = ['', 'X', 'XX', 'XXX', 'XXX1', 'XXX12', 'XXX123']

			for (const value of invalidValues) {
				try {
					validationService.plateValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_PLATE_MESSAGES.haveFewerThan
					)
				}
			}
		})

		test('Deve retornar uma exceção quando a placa tiver mais que 7 caracteres', () => {
			try {
				validationService.plateValidation('XXX12345')
			} catch (error) {
				expect(error instanceof ValidationError).toBeTruthy()
				expect(error.code).toBe(400)
				expect(error.message).toBe(
					VALIDATION_SERVICE_PLATE_MESSAGES.haveMoreThan
				)
			}
		})

		test('Deve retornar uma exceção quando a placa não tiver um formato válido', () => {
			const invalidValues = ['XXX123X', 'XXXXXXX', '1234567']

			for (const value of invalidValues) {
				try {
					validationService.plateValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_PLATE_MESSAGES.validFormat
					)
				}
			}
		})
	})

	describe('descriptionValidation', () => {
		test('Deve validar a descrição com sucesso e não retornar exceção', () => {
			expect(() =>
				validationService.descriptionValidation('Ford KA')
			).not.toThrow()
		})

		test('Deve retornar uma exceção quando a descrição não for uma string', () => {
			const invalidValues = [true, false, undefined, null]

			for (const value of invalidValues) {
				try {
					validationService.descriptionValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_DESCRIPTION_MESSAGES.mustBeString
					)
				}
			}
		})

		test('Deve retornar uma exceção quando a descrição não for uma string com pelo menos dois caracteres', () => {
			const invalidValues = ['a', 'b', 'c', 'd']

			for (const value of invalidValues) {
				try {
					validationService.descriptionValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_DESCRIPTION_MESSAGES.mustBeStringAt2Characters
					)
				}
			}
		})
	})

	describe('yearModelValidation', () => {
		test('Deve validar o ano modelo com sucesso e não retornar exceção', () => {
			expect(() => validationService.yearModelValidation(2020)).not.toThrow()

			expect(() => validationService.yearModelValidation('2020')).not.toThrow()
		})

		test('Deve retornar uma exceção quando o ano modelo não for uma string ou um número representando um ano válido', () => {
			const invalidValues = [
				true,
				false,
				undefined,
				null,
				1,
				22,
				333,
				44444,
				'',
				'5',
				'66',
				'777',
				'88888',
				'12ab',
				'df45',
			]

			for (const value of invalidValues) {
				try {
					validationService.yearModelValidation(value)
				} catch (error) {
					expect(error instanceof ValidationError).toBeTruthy()
					expect(error.code).toBe(400)
					expect(error.message).toBe(
						VALIDATION_SERVICE_YEAR_MODEL_MESSAGES.mustBeValidYear
					)
				}
			}
		})
	})
})
