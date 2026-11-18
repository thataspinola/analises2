const checkoutController = require('../../src/controller/checkoutController')
const { mockClient } = require('aws-sdk-client-mock')
const MOCKS = require('../mocks/index.mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')

afterEach(() => {
	jest.clearAllMocks()
})

beforeAll(() => {})

describe('Given a default input', () => {
	test('It should receive a valid travel insurance event, send message to travel integration queue and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866' })

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_TRAVEL()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_TRAVEL_SUCCESS())
	})

	test('It should receive a valid home insurance event, send message to home integration queue and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866' })

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_HOME()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_HOME_SUCCESS())
	})

	test('It should receive a valid home and travel insurance event, send message to home and travel integration queue and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866' })

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_HOME_TRAVEL()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_HOME_TRAVEL_SUCCESS())
	})

	test('It should receive a not mapped life insurance event, return success with insurance not mapped response', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866' })

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_LIFE()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_NOTMAPPED_SUCCESS())
	})

	test('It should receive a valid travel insurance event, send message to travel integration queue fails and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.rejects('Could not send message to sqs. Error message.')

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_TRAVEL()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_TRAVEL_INTEGRATION_FAILED())
	})

	test('It should receive a valid travel insurance event, send message to travel integration queue fails and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.rejects('Could not send message to sqs. Error message.')

		const response = await checkoutController.processCheckout(
			MOCKS.VALID_INPUT_REQUEST_HOME()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_HOME_INTEGRATION_FAILED())
	})
})
