const { axiosHandlerError } = require('../../../src/factory')

describe('Suite de Testes de axiosHandlerErrorFactory.js', () => {
	test('Deve retornar um objeto com os campos `status` e `message`', async () => {
		const errorHandled = axiosHandlerError(new Error('Error'))
		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled).toHaveProperty('message')
	})

	test('Deve retornar um objeto com os campos `status` igual a 404 e o `message` igual a Not Found', async () => {
		const errorHandled = axiosHandlerError({
			response: { status: 404, data: 'Not Found' },
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(404)
		expect(errorHandled.message).toBe('Not Found')
	})

	test('Deve retornar um objeto com os campos `status` igual a 404 e o `message` {error: "Bad Request"}', async () => {
		const errorHandled = axiosHandlerError({
			response: { status: 400, data: { error: 'Bad Request' } },
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled.message).toBe(JSON.stringify({ error: 'Bad Request' }))
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `message` igual a ERROR - Error', async () => {
		const errorHandled = axiosHandlerError({
			request: {},
			message: 'Error',
			code: 'ERROR',
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled.message).toBe('ERROR - Error')
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `message` igual a Error', async () => {
		const errorHandled = axiosHandlerError(new Error('Error'))

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe('Error')
	})
})
