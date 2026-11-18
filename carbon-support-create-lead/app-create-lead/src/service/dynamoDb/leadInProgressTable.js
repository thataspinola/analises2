const CONSTANTS = require('../../property')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
	PutCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const client = new DynamoDBClient({ region: CONSTANTS.AWS_REGION })
const docClient = DynamoDBDocumentClient.from(client)

exports.putItem = async (itemData) => {
    const Item = {
        createdAt: Math.floor(new Date().getTime() / 1000),
        expireAt: Math.floor((new Date().getTime() + CONSTANTS.LEAD_IN_PROGRESS_TTL_IN_MINUTES * 60 * 1000) / 1000),
        ...itemData
    }

	const command = new PutCommand({
		TableName: CONSTANTS.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME,
		Item
	})

	const response = await docClient.send(command)

	return response
}
