const factory = require('../../../src/factory')

describe('Suite de testes de axiosHandlerError.js', () => {
	test('Deve retornar o status e a mensagem corretos quando o erro.response estiver presente', () => {
		const error = {
			response: {
				status: 404,
				data: 'Not Found',
			},
		}
		const result = factory.axiosHandlerError(error)
		expect(result).toEqual({ status: 404, message: 'Not Found' })
	})

	test('Deve fazer o stringify nos dados se for um objeto', () => {
		const error = {
			response: {
				status: 400,
				data: { message: 'Bad Request' },
			},
		}
		const result = factory.axiosHandlerError(error)
		expect(result).toEqual({
			status: 400,
			message: JSON.stringify({ message: 'Bad Request' }),
		})
	})

	test('Deve retornar o status 500 e uma mensagem quando não houver erro.response e o erro.request estiver presente', () => {
		const error = {
			request: {},
			code: 'ECONNABORTED',
			message: 'timeout of 2500ms exceeded',
		}
		const result = factory.axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message:
				'No response received - ECONNABORTED: timeout of 2500ms exceeded',
		})
	})

	test('Deve retornar o status 500 e uma mensagem quando não houver erro.response nem erro.request', () => {
		const error = {
			message: 'An unknown error occurred',
		}
		const result = factory.axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message: 'Request setup failed - An unknown error occurred',
		})
	})
})
