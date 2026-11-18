const { controller } = require('../src/controller')
const { handler } = require('../index')
const MOCKS = require('./mocks/index.mock')

describe('Scenario updateLeadController test', () => {
	test('It should receive success response from controller', async () => {
		controller.process = jest.fn(async () => {
			return {
				statusCode: 200,
				body: {},
			}
		})

		const response = await handler(MOCKS.VALID_INPUT_REQUEST(), {})

		expect(response).toEqual({
			batchItemFailures: [],
		})
	})
})

describe('Scenario with Fail request test', () => {
	test('It should receive a error from controller', async () => {
		controller.process = jest.fn(() => {
			throw new Error('Error')
		})

		const response = await handler(MOCKS.VALID_INPUT_REQUEST(), {})

		expect(response).toEqual({
			batchItemFailures: [
				{
					itemIdentifier: '1234567890',
				},
			],
		})
	})
})
