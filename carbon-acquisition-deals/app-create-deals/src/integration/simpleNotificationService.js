const CONSTANTS = require('../property')
const service = require('../service')
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')

const snsClient = new SNSClient({ region: CONSTANTS.AWS_REGION })

exports.sendNotification = async (message) => {
	try {
		let params = {
			TopicArn: CONSTANTS.CREATE_DEALS_SNS,
			Message: typeof message == 'string' ? message : JSON.stringify(message),
		}

		const createDealsSnsSendResult = await snsClient.send(
			new PublishCommand(params)
		)

		service.logger.info(
			`Requisição para a criação de oportunidades foi realizada`
		)

		return createDealsSnsSendResult ?? null
	} catch (error) {
		service.logger.error(
			`Erro ao enviar requisição de criação de oportunidades: ${error.message}`
		)
		throw new Error(`Error to send message to SNS - ${error.message}`)
	}
}
