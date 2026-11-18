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
		.resolves(MOCKS.SERVICE_SNS_CONSENTS.SENDMESSAGECOMMAND_VALID_RESPONSE())
		service.logger.error = jest.fn()
})

describe('Given an sendMessage call', () => {
	test('It should a response with the expected value', async () => {
		let returnValue = await service.sns.consents.sendConsentMessage(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_MESSAGE_INPUT(),
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_MESSAGEATTRIBUTES_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_VALID_RETURN()
		)

		returnValue = await service.sns.consents.sendConsentMessage(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_MESSAGE_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_VALID_RETURN()
		)

		returnValue = await service.sns.consents.sendConsentMessage(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_STRING_MESSAGE_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_VALID_RETURN()
		)

		snsMock.on(PublishCommand).resolves({})

		returnValue = await service.sns.consents.sendConsentMessage(
			MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_STRING_MESSAGE_INPUT()
		)
		expect(returnValue).toBeNull()
	})
	test('It should throw an error when the SNS call fails', async () => {
        const error = new Error('SNS error')
        snsMock.on(PublishCommand).rejects(error)

        await expect(
            service.sns.consents.sendConsentMessage(
                MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_MESSAGE_INPUT(),
                MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_MESSAGEATTRIBUTES_INPUT()
            )
        ).rejects.toThrow(`Error to send message to SNS - ${error.message}`)

        expect(service.logger.error).toHaveBeenCalledWith(
            `Erro ao enviar a requisição do registro de consentimento: ${error.message}`
        )
    })
})
