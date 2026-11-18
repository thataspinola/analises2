const { response } = require('../../../src/factory')

describe('Suite de testes de responseFactory.js', () => {
	test('Deve retornar response erro 500 corretamente', () => {
		const res = response.error('mensagem de erro')

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(500)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})

	test('Deve retornar response erro 400 corretamente', () => {
		const res = response.error('mensagem de erro', 400)

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(400)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})
})
