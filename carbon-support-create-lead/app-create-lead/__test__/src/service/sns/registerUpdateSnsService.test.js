const { mockClient } = require('aws-sdk-client-mock')
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')
const MOCKS = require('../../../mocks/index.mock')
const service = require('../../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

const snsMock = mockClient(SNSClient)

beforeEach(() => {
	snsMock
		.on(PublishCommand)
		.resolves(
			MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDMESSAGECOMMAND_VALID_RESPONSE()
		)
	service.logger.error = jest.fn()
})

describe('Given an sendMessage call', () => {
	test('It should a response with the expected value', async () => {
		await expect(
			service.sns.registerUpdateSnsService.sendSnsMessage(
				MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDPROCESSMESSAGE_MESSAGE_INPUT()
			)
		).resolves.toEqual(
			MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDPROCESSMESSAGE_VALID_RETURN()
		)

		snsMock.on(PublishCommand).resolves({})

		await expect(
			service.sns.registerUpdateSnsService.sendSnsMessage(
				MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDPROCESSMESSAGE_STRING_MESSAGE_INPUT()
			)
		).resolves.toBeNull()
	})
	test('It should throw an error when the SNS call fails', async () => {
		const error = new Error('SNS error')
		snsMock.on(PublishCommand).rejects(error)

		await expect(
			service.sns.registerUpdateSnsService.sendSnsMessage(
				MOCKS.SERVICE_SNS_REGISTERUPDATE.SENDPROCESSMESSAGE_MESSAGE_INPUT()
			)
		).rejects.toThrow(
			`Error to send message to Register Complete SNS Topic - ${error.message}`
		)

		expect(service.logger.error).toHaveBeenCalledWith(
			`Erro ao enviar a requisição de envio para o Topico SNS do Register Update: ${error.message}`
		)
	})
})
