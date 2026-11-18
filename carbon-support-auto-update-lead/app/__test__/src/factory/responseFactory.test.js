const {factoryResponse} = require('../../../src/factory')

beforeAll(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario with Successful request test', () => {
	test('It should receive a error invocation without code', async () => {
		const response = await factoryResponse.error('Message example')

		expect(response).toEqual({
			statusCode: 500,
			body: {
				status: 'error',
				description: 'Message example',
			},
		})
	})

	test('It should receive a error invocation with 400 code', async () => {
		const response = await factoryResponse.error('Message example', 400)

		expect(response).toEqual({
			statusCode: 400,
			body: {
				status: 'error',
				description: 'Message example',
			},
		})
	})

	test('It should receive a success invocation', async () => {
		const response = await factoryResponse.success({
			example: '12345',
		})

		expect(response).toEqual({
			statusCode: 200,
			body: {
				example: '12345',
			},
		})
	})
})
