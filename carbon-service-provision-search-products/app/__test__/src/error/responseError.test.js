const { ResponseError } = require('../../../src/error')

describe('ResponseError', () => {
	it('should create an error with the correct message, data, and status code', () => {
		const data = { message: 'Not Found' }
		const statusCode = 404
		const error = new ResponseError(statusCode, data)

		expect(error).toBeInstanceOf(Error)
		expect(error.name).toBe('ResponseError')
		expect(error.message).toBe('Response Error: 404 - {"message":"Not Found"}')
		expect(error.data).toEqual(data)
		expect(error.statusCode).toBe(statusCode)
	})

	it('should default to a 500 status code and default error data if invalid inputs are provided', () => {
		const error = new ResponseError('Invalid data', 'Invalid status code')

		expect(error).toBeInstanceOf(Error)
		expect(error.name).toBe('ResponseError')
		expect(error.message).toBe('Response Error: 500 - {"status":"error"}')
		expect(error.data).toEqual({ status: 'error' })
		expect(error.statusCode).toBe(500)
	})
})
