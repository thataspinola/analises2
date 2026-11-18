const FACTORY = require('../../../src/factory')

describe('Suite de testes de axiosResponseErrorData.js', () => {
	test('Deve lidar com erros com um objeto de resposta', () => {
		const error = {
			response: {
				status: 404,
				data: 'Not Found',
			},
		}
		const result = FACTORY.axiosResponseErrorData(error)
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
		const result = FACTORY.axiosResponseErrorData(error)
		expect(result).toEqual({
			status: 400,
			message: JSON.stringify({ message: 'Bad Request' }),
		})
	})

	test('Deve retornar 504 quando a requisicao expirar por ECONNABORTED', () => {
		const error = {
			request: {},
			code: 'ECONNABORTED',
			message: 'timeout of 20000ms exceeded',
		}
		const result = FACTORY.axiosResponseErrorData(error)
		expect(result).toEqual({
			status: 504,
			message: 'ECONNABORTED - timeout of 20000ms exceeded',
		})
	})

	test('Deve retornar 504 quando a requisicao expirar por ETIMEDOUT', () => {
		const error = {
			request: {},
			code: 'ETIMEDOUT',
			message: 'connect ETIMEDOUT',
		}
		const result = FACTORY.axiosResponseErrorData(error)
		expect(result).toEqual({
			status: 504,
			message: 'ETIMEDOUT - connect ETIMEDOUT',
		})
	})

	test('Deve retornar 500 quando nao houver resposta e nao for timeout', () => {
		const error = {
			request: {},
			code: 'ECONNRESET',
			message: 'socket hang up',
		}
		const result = FACTORY.axiosResponseErrorData(error)
		expect(result).toEqual({
			status: 500,
			message: 'ECONNRESET - socket hang up',
		})
	})

	test('Deve lidar com erros sem response ou request', () => {
		const error = {
			message: 'An unknown error occurred',
		}
		const result = FACTORY.axiosResponseErrorData(error)
		expect(result).toEqual({
			status: 500,
			message: 'An unknown error occurred',
		})
	})
})
