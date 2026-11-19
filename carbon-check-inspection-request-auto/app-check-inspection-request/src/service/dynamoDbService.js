const {
	INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
	AWS_REGION
} = require('../property')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
    GetCommand,
	PutCommand,
	DeleteCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const client = new DynamoDBClient({ region: AWS_REGION })
const docClient = DynamoDBDocumentClient.from(client)

const itemExists = async (inputBody) => {
	const getCommand = new GetCommand({
		TableName: INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
		Key: {
			HPK: `orderNumber#${inputBody.quotationNumber}#idTransaction#${inputBody.idTransaction}`,
			RSK: `${inputBody.inspectionRequestDate}`,
		},
	})
	const getCommandResponse = await docClient.send(getCommand)
	return !!getCommandResponse.Item
}

exports.putItem = async (inputBody, ttlInMinutes) => {
	const putCommand = new PutCommand({
		TableName: INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
		Item: {
			HPK: `orderNumber#${inputBody.quotationNumber}#idTransaction#${inputBody.idTransaction}`,
			RSK: `${inputBody.inspectionRequestDate}`,
			createdAt: Math.floor(new Date(inputBody.inspectionRequestDate).getTime() / 1000),
			expireAt: Math.floor((new Date().getTime() + ttlInMinutes * 60 * 1000) / 1000),
			...inputBody
		},
	})

	await docClient.send(putCommand)
}

exports.deleteItemIfExists = async (inputBody) => {
	const exists = await itemExists(inputBody)
	if (exists) {
		const deleteCommand = new DeleteCommand({
			TableName: INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
			Key: {
				HPK: `orderNumber#${inputBody.quotationNumber}#idTransaction#${inputBody.idTransaction}`,
				RSK: `${inputBody.inspectionRequestDate}`,
			},
		})
		await docClient.send(deleteCommand)
	}
}