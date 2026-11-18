const { mockClient } = require('aws-sdk-client-mock')
const {
    PutCommand,
	GetCommand,
    DeleteCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')
const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property')
const service = require('../../../src/service')
require('aws-sdk-client-mock-jest')

const dynamoDbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
	dynamoDbMock
		.on(PutCommand)
		.resolves(MOCKS.DYNAMODB.PUTCOMMAND_VALID_RETURN())

	dynamoDbMock
		.on(GetCommand)
		.resolves(MOCKS.DYNAMODB.GETCOMMAND_VALID_RETURN())

    dynamoDbMock
		.on(DeleteCommand)
		.resolves(MOCKS.DYNAMODB.DELETECOMMAND_VALID_RETURN())
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
	dynamoDbMock.reset()
})

describe('Given an deleteItemIfExists call', () => {
	test('It should delete the item if it exists', async () => {
        expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(0)

		await service.dynamoDb.deleteItemIfExists(MOCKS.DYNAMODB.VALID_BODY())

		expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(1)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(1)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(0)
	})

    test('It should not delete the item if it is not exists', async () => {
        dynamoDbMock
            .on(GetCommand)
            .resolves(MOCKS.DYNAMODB.GETCOMMAND_INVALID_RETURN())

        expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(0)

		await service.dynamoDb.deleteItemIfExists(MOCKS.DYNAMODB.VALID_BODY())

		expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(1)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(0)
	})
})

describe('Given an putItem call', () => {
	test('It should add item', async () => {
		expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(0)

		await service.dynamoDb.putItem(MOCKS.DYNAMODB.VALID_BODY())

		expect(dynamoDbMock.commandCalls(GetCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(DeleteCommand).length).toEqual(0)
        expect(dynamoDbMock.commandCalls(PutCommand).length).toEqual(1)
	})
})
