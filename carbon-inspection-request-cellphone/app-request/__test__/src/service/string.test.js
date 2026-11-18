const { string } = require('../../../src/service')

describe('Suite de testes de string.js', () => {
	describe('removeAccents', () => {
		test('Deve remover acentos de uma string', () => {
			expect(string.removeAccents('José')).toBe('Jose')
			expect(string.removeAccents('Maria Ângela')).toBe('Maria Angela')
			expect(string.removeAccents('Conceição')).toBe('Conceicao')
		})

		test('Deve remover cedilha', () => {
			expect(string.removeAccents('François')).toBe('Francois')
		})

		test('Deve manter string sem acentos intacta', () => {
			expect(string.removeAccents('Maria Santos')).toBe('Maria Santos')
		})

		test('Deve remover caracteres especiais não alfanuméricos exceto espaço', () => {
			expect(string.removeAccents('João-Silva')).toBe('JoaoSilva')
		})

		test('Deve retornar string vazia quando receber string vazia', () => {
			expect(string.removeAccents('')).toBe('')
		})
	})
})
