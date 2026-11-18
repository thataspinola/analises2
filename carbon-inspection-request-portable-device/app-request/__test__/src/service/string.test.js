const service = require('../../../src/service')

describe('Suite de testes de string.js', () => {
	describe('removeAccents', () => {
		test('Deve remover acentos de uma string', () => {
			expect(service.string.removeAccents('José')).toBe('Jose')
			expect(service.string.removeAccents('Maria Ângela')).toBe('Maria Angela')
			expect(service.string.removeAccents('Conceição')).toBe('Conceicao')
		})

		test('Deve remover cedilha', () => {
			expect(service.string.removeAccents('François')).toBe('Francois')
		})

		test('Deve manter string sem acentos intacta', () => {
			expect(service.string.removeAccents('Maria Santos')).toBe('Maria Santos')
		})

		test('Deve remover caracteres especiais não alfanuméricos exceto espaço', () => {
			expect(service.string.removeAccents('João-Silva')).toBe('JoaoSilva')
		})

		test('Deve retornar string vazia quando receber string vazia', () => {
			expect(service.string.removeAccents('')).toBe('')
		})
	})
})
