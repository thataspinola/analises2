const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Test suite for the axiosHandlerError.js', () => {
	test('It should return an object with the fields `status` and `message`.', async () => {
		const errorHandled = factory.axiosHandlerError(new Error('Error'))
		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled).toHaveProperty('message')
	})

	test('It should return an object with the `status` field equal to 404 and the `message` field equal to Not Found.', async () => {
		const errorHandled = factory.axiosHandlerError(
			MOCKS.FACTORY_AXIOSHANDLERERROR.NOTFOUNDERROR_VALID_INPUT()
		)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(404)
		expect(errorHandled.message).toBe('Not Found')
	})

	test('It should return an object with the `status` field equal to 404 and the `message` {error: "Bad Request"}', async () => {
		const errorHandled = factory.axiosHandlerError(
			MOCKS.FACTORY_AXIOSHANDLERERROR.BADREQUESTERROR_VALID_INPUT()
		)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled.message).toBe(JSON.stringify({ error: 'Bad Request' }))
	})

	test('It should return an object with the `status` field equal to 500 and the `message` field equal to ERROR - Error.', async () => {
		const errorHandled = factory.axiosHandlerError(
			MOCKS.FACTORY_AXIOSHANDLERERROR.UNEXPECTEDERROR_VALID_INPUT()
		)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled.message).toBe('ERROR - Error')
	})

	test('It should return an object with the `status` field equal to 500 and the `message` field equal to Error.', async () => {
		const errorHandled = factory.axiosHandlerError(new Error('Error'))

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe('Error')
	})
})
