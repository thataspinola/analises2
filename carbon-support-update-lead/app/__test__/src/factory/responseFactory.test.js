const { responseFactory } = require('../../../src/factory')

describe('Suite de testes de responseFactory.js', () => {
	test('Deve retornar statusCode e statusMessage', () => {
		const response = responseFactory.updateLeadSuccess(200, 'Update lead')

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(200)
		expect(response).toHaveProperty('statusMessage')
		expect(response.statusMessage).toBe('Update lead')
	})

	test('Deve retornar response erro 500 corretamente', () => {
		const res = responseFactory.error('mensagem de erro')

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(500)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})

	test('Deve retornar response erro 400 corretamente', () => {
		const res = responseFactory.error('mensagem de erro', 400)

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(400)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})
})
