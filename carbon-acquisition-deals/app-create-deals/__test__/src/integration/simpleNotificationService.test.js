const integration = require('../../../src/integration')
const { mockClient } = require('aws-sdk-client-mock')
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')
const CONSTANTS = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')

const snsMock = mockClient(SNSClient)
service.logger.error = jest.fn()

describe('Scenario with Successful request test', () => {
	test('It should response with success from sns', async () => {
		snsMock.on(PublishCommand).callsFake((input) => {
			expect(input).toEqual({
				TopicArn: CONSTANTS.CREATE_DEALS_SNS,
				Message: MOCKS.SERVICE_SIMPLE_NOTIFICATION_MOCKS.VALID_MESSAGE(),
			})

			return MOCKS.SERVICE_SIMPLE_NOTIFICATION_MOCKS.VALID_RESPONSE()
		})

		const response = await integration.sns.sendNotification(
			MOCKS.SERVICE_SIMPLE_NOTIFICATION_MOCKS.VALID_INPUT_MESSAGE()
		)

		expect(response).toEqual(
			MOCKS.SERVICE_SIMPLE_NOTIFICATION_MOCKS.VALID_RESPONSE()
		)
	})

	test('It should throw an error when the SNS call fails', async () => {
		const error = new Error('SNS error')
		snsMock.on(PublishCommand).rejects(error)

		await expect(
			integration.sns.sendNotification(
				MOCKS.SERVICE_SIMPLE_NOTIFICATION_MOCKS.VALID_INPUT_MESSAGE()
			)
		).rejects.toThrow(`Error to send message to SNS - ${error.message}`)

		expect(service.logger.error).toHaveBeenCalledWith(
			`Erro ao enviar requisição de criação de oportunidades: ${error.message}`
		)
	})
})
