require('aws-sdk-client-mock-jest')
const { mockClient } = require('aws-sdk-client-mock')
const {
    PutCommand,
    GetCommand,
    DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const { TransactWriteItemsCommand } = require('@aws-sdk/client-dynamodb')

const CONSTANT = require('../../../../src/property')
const errors = require('../../../../src/error')
const serviceDynamoDb = require('../../../../src/service/dynamoDb')
const service = require('../../../../src/service')
const MOCKS = require('../../../mocks/index.mock')

const dynamoDbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
    dynamoDbMock
        .on(GetCommand)
        .resolves(MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_RETURN_METHOD_GET())

    dynamoDbMock
        .on(PutCommand)
        .resolves(MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_RETURN_METHOD_CREATE())
})

afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    jest.resetModules()
    dynamoDbMock.reset()
})

describe('userSessionDataCacheService tests', () => {
    describe('Given a create cache', () => {
        test('It should return sessionId and expireAt when succeeded', async () => {

            const lead = MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_DYNAMODB_LEAD_INPUT()
            const response = await 
                service.dynamoDb.preFinancingLeadDataCache.create(
                    lead.vdoCode,
                    lead.branchId,
                    lead.leadId
                )

            expect(response).toEqual(
                MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_RETURN_METHOD_CREATE()
            )
        })
        
        test('It should throw an error when there is a problem with the DynamoDB call', async () => {
            const error = new Error('some error')
            dynamoDbMock.on(PutCommand).rejectsOnce(error)

            const lead = MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_DYNAMODB_LEAD_INPUT()

            await expect(
                service.dynamoDb.preFinancingLeadDataCache.create(
                    lead.vdoCode,
                    lead.branchId,
                    lead.leadId
                )
            ).rejects.toThrow(
                new errors.DynamoDbError(
                    `Error when consist data in AWS DynamoDb table ${CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME}.`  
                )
            )
        })
    })

    describe('Given a get call', () => {
        test('It should return when succeeded', async () => {
            const lead = MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_DYNAMODB_LEAD_INPUT()

            const result = await 
                service.dynamoDb.preFinancingLeadDataCache.get(lead.vdoCode, lead.branchId)

            expect(result).toEqual(
                MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_RETURN_METHOD_GET().Item
            )
        })

        test('Should return null when no have items', async () => {
            const mockValue = {Item: null}
            dynamoDbMock.on(GetCommand).resolves(mockValue)

            const lead = MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_DYNAMODB_LEAD_INPUT()

            const result = await 
                service.dynamoDb.preFinancingLeadDataCache.get(lead.vdoCode, lead.branchId)

            expect(result).toBeNull()
        })

        test('It should throw an error when there is a problem with the DynamoDB call', async () => {
            const error = new Error('some error')
            dynamoDbMock.on(GetCommand).rejectsOnce(error)

            const lead = MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_DYNAMODB_LEAD_INPUT()

            await expect(
                service.dynamoDb.preFinancingLeadDataCache.get(lead.vdoCode, lead.branchId)
            ).rejects.toThrow(
                new errors.DynamoDbError(
                    `Error when get data from AWS DynamoDb table ${CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME}.`,
                    error
                )
            )
        })
     })
})