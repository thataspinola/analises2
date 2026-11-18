const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const MOCKS = require('../../../mocks/index.mock')
const service = require('../../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

const sqsMock = mockClient(SQSClient)

beforeEach(() => {
	sqsMock
		.on(SendMessageCommand)
		.resolves(
			MOCKS.SERVICE_SQS_ANALYTICSCOLLECT.SENDMESSAGECOMMAND_VALID_RESPONSE()
		)
})

describe('Given an sendMessage call', () => {
	test('It should a response with the expected value', async () => {
		let returnValue = await service.sqs.analyticsCollect.sendMessage(
			MOCKS.SERVICE_SQS_ANALYTICSCOLLECT.SENDMESSAGE_MESSAGE_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.SERVICE_SQS_ANALYTICSCOLLECT.SENDMESSAGE_VALID_RETURN()
		)

		sqsMock.on(SendMessageCommand).resolves({})

		returnValue = await service.sqs.analyticsCollect.sendMessage(
			MOCKS.SERVICE_SQS_ANALYTICSCOLLECT.SENDMESSAGE_MESSAGE_INPUT()
		)
		expect(returnValue).toBeNull()
	})
})
