const { response } = require('../../../src/factory')
const MOCKS = require('../../mocks/src/factory/responseFactory.mock')

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

	test('Deve retornar response erro 500 sem mensagem corretamente', () => {
		const res = response.error()

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(500)
		expect(res).toHaveProperty('body')
		expect(res.body).not.toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
	})

	test('Deve retornar response erro 400 corretamente', () => {
		const res = response.badRequestError('mensagem de erro')

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(400)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})

	test('Deve retornar response erro 400 sem mensagem corretamente', () => {
		const res = response.badRequestError()

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(400)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('The supplied request body is invalid')
	})

	test('Deve retornar response sucesso 200 corretamente', () => {
		const res = response.success(MOCKS.RESPONSE_SUCCESS_BODY_VALUE())

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(200)
		expect(res).toHaveProperty('body')
		expect(res.body).toEqual(MOCKS.RESPONSE_SUCCESS_BODY_VALUE())
	})
})
