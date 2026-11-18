const { mockClient } = require('aws-sdk-client-mock')
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const MOCKS = require('../../../mocks/index.mock')
const service = require('../../../../src/service')
require('aws-sdk-client-mock-jest')

const dynamoDbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
	dynamoDbMock
		.on(PutCommand)
		.resolves(
			MOCKS.SERVICE_DYNAMODB_SERVICEORDERTABLE.CREATEITEM_SERVICEORDERTABLESERVICE_RESPONSE()
		)
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
	dynamoDbMock.reset()
})

describe('Given an createItem call', () => {
	test('It should a response with true when succeeds and false when not', async () => {
		let returnValue =
			await service.dynamoDB.serviceOrderTableService.createItem(
				MOCKS.SERVICE_DYNAMODB_SERVICEORDERTABLE.CREATEITEM_SERVICEORDERTABLESERVICE_INPUT(),
				new Date(),
				2592000
			)
		expect(returnValue).toEqual(
			MOCKS.SERVICE_DYNAMODB_SERVICEORDERTABLE.CREATEITEM_SERVICEORDERTABLESERVICE_RESPONSE_PAYLOAD()
		)

		dynamoDbMock.on(PutCommand).resolves({})
	})

	test('It should throw an error when there is a problem with the DynamoDB call', async () => {
		dynamoDbMock.on(PutCommand).rejectsOnce(new Error('some error'))

		await expect(
			service.dynamoDB.serviceOrderTableService.createItem(
				MOCKS.SERVICE_DYNAMODB_SERVICEORDERTABLE.CREATEITEM_SERVICEORDERTABLESERVICE_INPUT(),
				new Date(),
				2592000
			)
		).rejects.toThrow(
			'Erro durante a operação de createItem no DynamoDB: some error'
		)

		dynamoDbMock.on(PutCommand).resolves({})
	})
})
