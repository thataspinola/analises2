const CONSTANT = require('../../property')
const service = require('../../service')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')
const client = new DynamoDBClient({ region: CONSTANT.AWS_REGION })
const docClient = DynamoDBDocumentClient.from(client)

const handleDynamoDBError = (operation, error) => {
	const errorMessage = `Erro durante a operação de ${operation} no DynamoDB: ${error.message}`
	service.logger.error(errorMessage)
	throw new Error(errorMessage)
}

exports.createItem = async (
	message,
	messageTtlStartDateTime,
	messageTtlDeltaInSeconds
) => {
	try {
		const calculatedAbsoluteTtlSeconds =
			Math.floor(messageTtlStartDateTime.getTime() / 1000) +
			Number(messageTtlDeltaInSeconds)

		const putCommand = new PutCommand({
			TableName: CONSTANT.SERVICE_ORDER_TABLE_NAME,
			Item: {
				HPK: `externalId#${message.externalId}`,
				RSK: `sku#${message.integrationData.serviceOrder.sku}`,
				message: JSON.stringify(message),
				ttl: calculatedAbsoluteTtlSeconds,
			},
		})

		const putCommandResponse = await docClient.send(putCommand)
		return putCommandResponse.$metadata
	} catch (error) {
		handleDynamoDBError('createItem', error)
	}
}
