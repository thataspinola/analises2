const PersistenceError = require('../../common/errors/PersistenceError')
const CONSTANTS = require('../../property')
const clientDynamoDB = require('@aws-sdk/client-dynamodb')
const libDynamoDB = require('@aws-sdk/lib-dynamodb')

const client = new clientDynamoDB.DynamoDBClient({
	region: CONSTANTS.AWS_REGION,
})
const docClient = libDynamoDB.DynamoDBDocumentClient.from(client)

exports.getPortableDeviceSequence = async () => {
	try {
		const updateCommand = new libDynamoDB.UpdateCommand({
			TableName: CONSTANTS.DYNAMODB_TABLE_NAME,
			Key: {
				id: 'portable_device',
			},
			UpdateExpression:
				'SET current_number = if_not_exists(current_number, :initial) + :incremento',
			ExpressionAttributeValues: {
				':initial': 0,
				':incremento': 1,
			},
			ReturnValues: 'UPDATED_NEW',
		})

		const response = await docClient.send(updateCommand)

		return response.Attributes.current_number
	} catch (error) {
		throw new PersistenceError(
			`Erro ao gerar número externo do orçamento: ${error.message}`
		)
	}
}
