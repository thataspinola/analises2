const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const {
	AWS_REGION,
	GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL,
} = require('../../property')
const service = require('../../service')

const sqsClient = new SQSClient({ region: AWS_REGION })

exports.execute = async (parsedSqsMessage) => {
	const currentActivity =
		'Verificação e envio de rwgToken para fila SQS para processamento/conversão pós criação de OS'

	const rwgToken =
		parsedSqsMessage?.integrationData?.googleAppointmentConversion?.rwgToken

	if (rwgToken) {
		try {
			const message = new SendMessageCommand({
				MessageBody: JSON.stringify({ rwgToken }),
				QueueUrl: GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL,
			})

			const response = await sqsClient.send(message)

			service.logger.info(
				{ output: response },
				'Mensagem enviada com sucesso para fila - google appointments conversion'
			)
		} catch (error) {
			const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			service.logger.error(error, message)
		}
	}
}
