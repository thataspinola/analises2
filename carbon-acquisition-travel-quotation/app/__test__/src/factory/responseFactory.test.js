const responseFactory = require('../../../src/factory/responseFactory')

describe('Suite de testes de responseFactory.js', () => {
	test('Deve retornar statusCode 201 no sucesso', () => {
		const response = responseFactory.success({ ok: true }, 'trace-id')

		expect(response.statusCode).toBe(201)
	})

	test('Deve retornar 500 quando o code do erro nao for numerico', () => {
		const response = responseFactory.Error('falha', 'ECONNABORTED', 'trace-id')

		expect(response.statusCode).toBe(500)
	})

	test('Deve retornar 500 quando o code do erro estiver fora da faixa HTTP', () => {
		const response = responseFactory.Error('falha', 600, 'trace-id')

		expect(response.statusCode).toBe(500)
	})

	test('Deve preservar um statusCode HTTP valido', () => {
		const response = responseFactory.Error('gateway timeout', 504, 'trace-id')

		expect(response.statusCode).toBe(504)
	})

	test('Deve converter um statusCode valido recebido como string', () => {
		const response = responseFactory.Error('bad request', '400', 'trace-id')

		expect(response.statusCode).toBe(400)
	})
})
