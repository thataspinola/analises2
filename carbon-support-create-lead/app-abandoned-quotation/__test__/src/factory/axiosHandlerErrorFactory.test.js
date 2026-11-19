const { axiosHandlerError } = require('../../../src/factory')

describe('Suite de testes de axiosHandlerErrorFactory.js', () => {
	test('Deve lidar com erros com um objeto de resposta', () => {
		const error = {
			response: {
				status: 404,
				data: 'Not Found',
			},
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 404,
			message: 'Not Found',
		})
	})

	test('Deve lidar com os dados de resposta do erro se for um objeto', () => {
		const error = {
			response: {
				status: 400,
				data: { message: 'Bad Request' },
			},
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 400,
			message: JSON.stringify({ message: 'Bad Request' }),
		})
	})

	test('Deve lidar com erros sem response, mas com um request', () => {
		const error = {
			request: {},
			code: 'ECONNABORTED',
			message: 'timeout of 0ms exceeded',
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message: 'ECONNABORTED - timeout of 0ms exceeded',
		})
	})

	test('Deve lidar com erros sem response ou request', () => {
		const error = {
			message: 'An unknown error occurred',
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message: 'An unknown error occurred',
		})
	})
})
