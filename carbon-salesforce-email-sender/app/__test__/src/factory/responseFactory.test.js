const factory = require('../../../src/factory')

describe('Suite de testes de responseFactory.js', () => {
	describe('SUCCESS', () => {
		test('Deve retornar uma resposta de sucesso com o corpo padrão', () => {
			const expected = {
				statusCode: 200,
				body: {},
			}
			const response = factory.response.success()
			expect(response).toEqual(expected)
		})

		test('Deve retornar uma resposta de sucesso com o corpo personalizado', () => {
			const customBody = { data: 'test' }
			const expected = {
				statusCode: 200,
				body: customBody,
			}
			const response = factory.response.success(customBody)
			expect(response).toEqual(expected)
		})
	})

	describe('ERROR', () => {
		test('Deve retornar uma resposta de erro com mensagem padrão', () => {
			const expected = {
				statusCode: 500,
				body: {
					status: 'ERROR',
				},
			}
			const response = factory.response.error()
			expect(response).toEqual(expected)
		})

		test('Deve retornar uma resposta de erro com mensagem personalizada', () => {
			const customMessage = 'Custom error message'
			const expected = {
				statusCode: 500,
				body: {
					status: 'ERROR',
					message: customMessage,
				},
			}
			const response = factory.response.error(customMessage)
			expect(response).toEqual(expected)
		})
	})

	describe('badRequestError', () => {
		test('Deve retornar uma resposta de erro badRequest com a mensagem padrão', () => {
			const expected = {
				statusCode: 400,
				body: {
					status: 'ERROR',
					message: 'The supplied request body is invalid',
				},
			}
			const response = factory.response.badRequestError()
			expect(response).toEqual(expected)
		})

		test('Deve retornar uma resposta de erro badRequest com a mensagem personalizada', () => {
			const customMessage = 'Custom bad request message'
			const expected = {
				statusCode: 400,
				body: {
					status: 'ERROR',
					message: customMessage,
				},
			}
			const response = factory.response.badRequestError(customMessage)
			expect(response).toEqual(expected)
		})
	})
})
