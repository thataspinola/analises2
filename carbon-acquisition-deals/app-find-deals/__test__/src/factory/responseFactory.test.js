const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Suite de testes de responseFactory.js', () => {
	test('Deve retornar response erro 500 corretamente', () => {
		const res = factory.response.error('mensagem de erro')

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(500)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})

	test('Deve retornar response erro 400 corretamente', () => {
		const res = factory.response.error('mensagem de erro', 400)

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(400)
		expect(res).toHaveProperty('body')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('status')
		expect(res.body.message).toBe('mensagem de erro')
	})

	test('Deve retornar response sucesso 200 corretamente', () => {
		const res = factory.response.success(MOCKS.CONTROLLER_RESPONSE_SUCCESS())

		expect(typeof res).toBe('object')
		expect(res).toHaveProperty('statusCode')
		expect(res.statusCode).toBe(200)
		expect(res).toHaveProperty('body')
		expect(res.body).toEqual(MOCKS.CONTROLLER_RESPONSE_SUCCESS())
	})
})
