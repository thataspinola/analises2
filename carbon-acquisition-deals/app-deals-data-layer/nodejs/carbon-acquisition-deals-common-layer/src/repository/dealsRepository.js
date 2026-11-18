const PersistenceError = require('../error/PersistenceError')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
	PutCommand,
	QueryCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({ region: 'ca-central-1' })
const docClient = DynamoDBDocumentClient.from(client)

exports.save = async (tableName, data) => {
	try {
		const Item = {
			...data,
		}

		const command = new PutCommand({
			TableName: tableName,
			Item,
		})

		const response = await docClient.send(command)

		return response
	} catch (error) {
		throw new PersistenceError(
			`Erro to save data on database: ${error.message}`
		)
	}
}

exports.get = async (tableName, cpf) => {
	try {
		const command = new QueryCommand({
			TableName: tableName,
			KeyConditionExpression: 'document = :document',
			ExpressionAttributeValues: {
				':document': cpf,
			},
		})

		const data = await docClient.send(command)

		if (!data?.Items) throw new Error('Data not found on database')

		return data?.Items
	} catch (error) {
		throw new PersistenceError(
			`Erro to get data from the database: ${error.message}`
		)
	}
}
