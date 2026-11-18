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
		.resolves(MOCKS.SERVICE_SNS_PROCESS.VALID_RESPONSE())
	service.logger.error = jest.fn()
})

describe('Given an sendMessage call', () => {
	test('It should a response with the expected value', async () => {
		let returnValue = await service.sns.processSnsService.sendSnsMessage(
			MOCKS.SERVICE_SNS_PROCESS.MESSAGE_INPUT(),
			MOCKS.SERVICE_SNS_PROCESS.MESSAGEATTRIBUTES_INPUT()
		)
		expect(returnValue).toEqual(MOCKS.SERVICE_SNS_PROCESS.VALID_RETURN())

		returnValue = await service.sns.processSnsService.sendSnsMessage(
			MOCKS.SERVICE_SNS_PROCESS.MESSAGE_INPUT()
		)
		expect(returnValue).toEqual(MOCKS.SERVICE_SNS_PROCESS.VALID_RETURN())

		returnValue = await service.sns.processSnsService.sendSnsMessage(
			MOCKS.SERVICE_SNS_PROCESS.STRING_MESSAGE_INPUT()
		)
		expect(returnValue).toEqual(MOCKS.SERVICE_SNS_PROCESS.VALID_RETURN())

		snsMock.on(PublishCommand).resolves({})

		returnValue = await service.sns.processSnsService.sendSnsMessage(
			MOCKS.SERVICE_SNS_PROCESS.STRING_MESSAGE_INPUT()
		)
		expect(returnValue).toBeNull()
	})
	test('It should throw an error when the SNS call fails', async () => {
		const error = new Error('SNS error')
		snsMock.on(PublishCommand).rejects(error)

		await expect(
			service.sns.processSnsService.sendSnsMessage(
				MOCKS.SERVICE_SNS_PROCESS.MESSAGE_INPUT(),
				MOCKS.SERVICE_SNS_PROCESS.MESSAGEATTRIBUTES_INPUT()
			)
		).rejects.toThrow(`Error to send message to SNS - ${error.message}`)

		expect(service.logger.error).toHaveBeenCalledWith(
			`Erro ao enviar a requisição para o SNS: ${error.message}`
		)
	})
})
