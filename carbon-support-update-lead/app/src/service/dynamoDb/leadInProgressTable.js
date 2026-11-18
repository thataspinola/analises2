const CONSTANTS = require('../../property')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
	DeleteCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const client = new DynamoDBClient({ region: CONSTANTS.AWS_REGION })
const docClient = DynamoDBDocumentClient.from(client)

exports.deleteItem = async (vdoCode) => {
	const deleteCommand = new DeleteCommand({
		TableName: CONSTANTS.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME,
		Key: {
			vdoCode: `${vdoCode}`,
		},
	})
	const deleteCommandResponse = await docClient.send(deleteCommand)

	return deleteCommandResponse
}