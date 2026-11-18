const errors = require('../../../../src/error')
const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../../src/property')

describe('BadRequest.js test suit', () => {
	test('Should create an instance of BadRequest with the correct properties', () => {
		const error = new errors.BadRequest(
			MOCKS.BAD_REQUEST_ERROR_MOCKS.CUSTOM_ERROR()
		)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.BadRequest)
		expect(error.message).toBe(MOCKS.BAD_REQUEST_ERROR_MOCKS.CUSTOM_MESSAGE())
		expect(error.name).toBe('BadRequest')
		expect(error.code).toBe(MOCKS.BAD_REQUEST_ERROR_MOCKS.CUSTOM_CODE())
		expect(error.stack).toBe(MOCKS.BAD_REQUEST_ERROR_MOCKS.CUSTOM_STACK_TRACE())
	})
	test('Deve criar uma instância de BadRequest com as propriedades corretas quando não há mensagem', () => {
		const error = new errors.BadRequest({})

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.BadRequest)
		expect(error.message).toBe(CONSTANTS.BAD_REQUEST_DEFAULT_MESSAGE)
		expect(error.name).toBe('BadRequest')
	})
})
