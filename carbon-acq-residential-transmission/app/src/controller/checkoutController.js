const factory = require('../factory')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const CONSTANT = require('../property')

exports.processCheckout = async (event) => {
	const inputRequest = JSON.parse(event.body)
	const itens = inputRequest.itens
	const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })

	let travelResponse = []
	let homeResponse = []
	let notMappedResponse = []
	for (const item of itens) {
		switch (item.escopo) {
			case 'travel':
				try {
					const sqsResponse = await sqsClient.send(
						new SendMessageCommand({
							QueueUrl: `${CONSTANT.TRAVEL_QUEUE}`,
							MessageBody: JSON.stringify(item.dadosAdicionais),
						})
					)
					let response = {
						idItem: item.idItem,
						messageId: sqsResponse.MessageId,
					}
					travelResponse.push(response)
				} catch (error) {
					let response = {
						idItem: item.idItem,
						error: error.message,
					}
					travelResponse.push(response)
				}
				break
			case 'residential':
				try {
					const sqsResponse = await sqsClient.send(
						new SendMessageCommand({
							QueueUrl: `${CONSTANT.RESIDENTIAL_QUEUE}`,
							MessageBody: JSON.stringify(item.dadosAdicionais),
						})
					)
					let response = {
						idItem: item.idItem,
						messageId: sqsResponse.MessageId,
					}
					homeResponse.push(response)
				} catch (error) {
					let response = {
						idItem: item.idItem,
						error: error.message,
					}
					homeResponse.push(response)
				}
				break
			default:
				let response = {
					idItem: item.idItem,
					error: 'not mapped',
				}
				notMappedResponse.push(response)
				break
		}
	}

	const response = { travelResponse, homeResponse, notMappedResponse }
	return factory.response.transmissionSuccess(response)
}
