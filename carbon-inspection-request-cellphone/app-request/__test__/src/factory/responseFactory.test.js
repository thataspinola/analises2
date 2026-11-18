const factory = require('../../../src/factory')

beforeAll(() => {})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Scenario with Successful request test', () => {
	test('Deve receber uma chamada de erro sem código', async () => {
		const response = await factory.response.error('Message example')
		expect(response).toEqual({
			statusCode: 500,
			body: {
				status: 'error',
				description: 'Message example',
			},
		})
	})

	test('Deve receber uma invocação de erro com código 400', async () => {
		const response = await factory.response.error('Message example', 400)
		expect(response).toEqual({
			statusCode: 400,
			body: {
				status: 'error',
				description: 'Message example',
			},
		})
	})

	test('Deve receber uma invocação de sucesso', async () => {
		const response = await factory.response.success({
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
