const CONSTANT = require('../../property')
const factory = require('../../factory')
const service = require('../../service')
const errors = require('../../error')

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
	GetCommand,
	PutCommand,
	UpdateCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const dynamoDbClient = new DynamoDBClient(CONSTANT.AWSClientBaseConfig)
const dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient)

const calculateTTL = () => {
	const nowSeconds = Math.floor(Date.now() / 1000);
	const ttlSeconds = CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY * 24 * 60 * 60;
	return nowSeconds + ttlSeconds;
}

exports.create = async (vdoCode, branchId, leadId) => {
	try {
		const ttlTime =  calculateTTL()
		const tableKeyObject =
			factory.service.dynamoDb.preFinancingLeadDataCache.getTableKeyObject(
				vdoCode,
				branchId
			)
		const dataTableObject = 
			factory.service.dynamoDb.preFinancingLeadDataCache.getTableDataObject(
				leadId
			)
		
		const putCommand = new PutCommand({
			TableName: CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME,
			Item: {
				...tableKeyObject,
				...dataTableObject,
				ttl: ttlTime
			},
		})

		const putCommandResponse = await dynamoDbDocumentClient.send(putCommand)
		return putCommandResponse
	} catch (createError) {
		service.logger.error({ rawError: createError }, createError.message)
		const error = new errors.DynamoDbError(
			`Error when consist data in AWS DynamoDb table ${CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME}.`
			,createError		
		)

		throw error
	}
}

const getItem = async (vdoCode, branchId) => {
	try {
		const tableKeyObject =
			factory.service.dynamoDb.preFinancingLeadDataCache.getTableKeyObject(
				vdoCode,
				branchId
			)
		const getCommand = new GetCommand({
			TableName: CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME,
			Key: tableKeyObject,
		})

		const getCommandResponse = await dynamoDbDocumentClient.send(getCommand)
		return getCommandResponse.Item ? getCommandResponse.Item : null
	} catch (getError) {
		service.logger.error({ rawError: getError }, getError.message)
		throw new errors.DynamoDbError(
			`Error when get data from AWS DynamoDb table ${CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME}.`,
			getError
		)
	}
}

exports.get = getItem