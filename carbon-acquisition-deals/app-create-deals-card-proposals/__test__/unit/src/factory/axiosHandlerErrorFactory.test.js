const factory = require('../../../../src/factory')

describe('axiosResponseErrorDataFactory.js test suite', () => {
	test('Should handle errors with a response object', () => {
		const error = {
			response: {
				status: 404,
				data: 'Not Found',
			},
		}
		const result = factory.axiosResponseErrorDataFactory(error)
		expect(result).toEqual({
			status: 404,
			message: 'Not Found',
		})
	})

	test('Should handle error response data if it is an object', () => {
		const error = {
			response: {
				status: 400,
				data: { message: 'Bad Request' },
			},
		}
		const result = factory.axiosResponseErrorDataFactory(error)
		expect(result).toEqual({
			status: 400,
			message: JSON.stringify({ message: 'Bad Request' }),
		})
	})

	test('Should handle errors without a response, but with a request', () => {
		const error = {
			request: {},
			code: 'ECONNABORTED',
			message: 'timeout of 0ms exceeded',
		}
		const result = factory.axiosResponseErrorDataFactory(error)
		expect(result).toEqual({
			status: 500,
			message: 'ECONNABORTED - timeout of 0ms exceeded',
		})
	})

	test('Should handle errors without response or request', () => {
		const error = {
			message: 'An unknown error occurred',
		}
		const result = factory.axiosResponseErrorDataFactory(error)
		expect(result).toEqual({
			status: 500,
			message: 'An unknown error occurred',
		})
	})
})
