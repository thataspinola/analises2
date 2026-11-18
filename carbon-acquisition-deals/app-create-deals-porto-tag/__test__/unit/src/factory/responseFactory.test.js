const factory = require('../../../../src/factory')

describe('responseFactory.js test suite', () => {
	describe('Success return', () => {
		test('Should return a success response with the data provided', () => {
			const data = { message: 'Sucesso' }
			const expectedResponse = {
				isBase64Encoded: false,
				headers: {},
				statusCode: 200,
				body: JSON.stringify(data),
			}

			const response = factory.response.success(data)

			expect(response).toEqual(expectedResponse)
		})
	})

	describe('Error return', () => {
		test('Should return an error response with the provided message and status code', () => {
			const message = 'Erro interno'
			const statusCode = 500
			const expectedResponse = {
				isBase64Encoded: false,
				headers: {},
				statusCode: statusCode,
				body: JSON.stringify(message),
			}

			const response = factory.response.error(message, statusCode)

			expect(response).toEqual(expectedResponse)
		})

		test('Should return an error response with the default message and default status code when not provided', () => {
			const expectedResponse = {
				isBase64Encoded: false,
				headers: {},
				statusCode: 500,
				body: JSON.stringify('Internal Server Error'),
			}

			const response = factory.response.error()

			expect(response).toEqual(expectedResponse)
		})
	})
})
