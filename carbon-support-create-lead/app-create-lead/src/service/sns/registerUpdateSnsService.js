const { PublishCommand, SNSClient } = require('@aws-sdk/client-sns')
const CONSTANT = require('../../property')
const service = require('..')

const snsClient = new SNSClient({
	region: CONSTANT.AWS_REGION,
})

exports.sendSnsMessage = async (payload) => {
	{
		try {
			const timeNow = new Date().toISOString()

			const snsMessage = {
				eventTime: timeNow,
				payload: payload,
			}

			let sendPublishCommandParams = {
				Message: JSON.stringify(snsMessage),
				TopicArn: CONSTANT.CLIENT_REGISTER_UPDATE_SNS_TOPIC_ARN,
				Attributes: {
					eventTime: timeNow,
				},
			}

			const snsClientSendResult = await snsClient.send(
				new PublishCommand(sendPublishCommandParams)
			)

			service.logger.info(
				`Requisição de envio para o Topico SNS do Register Update foi realizada`
			)

			return snsClientSendResult?.MessageId ?? null
		} catch (error) {
			service.logger.error(
				`Erro ao enviar a requisição de envio para o Topico SNS do Register Update: ${error.message}`
			)
			throw new Error(
				`Error to send message to Register Complete SNS Topic - ${error.message}`
			)
		}
	}
}
