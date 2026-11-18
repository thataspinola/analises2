const { mockClient } = require('aws-sdk-client-mock')
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const MOCKS = require('../../../mocks/index.mock')
const { dynamoDb } = require('../../../../src/service')

const dynamoDbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
	dynamoDbMock.on(PutCommand).resolves(MOCKS.PUTCOMMAND_VALID_RETURN())
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
	dynamoDbMock.reset()
})

describe('Suite de testes de leadInProgressTable.js', () => {
	test('putItem', async () => {
		let returnValue = await dynamoDb.leadInProgress.putItem(
			MOCKS.VALID_PUT_ITEM
		)
		expect(returnValue).toEqual(MOCKS.PUTCOMMAND_VALID_RETURN())
	})
})
