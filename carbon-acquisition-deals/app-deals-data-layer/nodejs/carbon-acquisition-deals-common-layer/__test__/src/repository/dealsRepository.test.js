const MOCKS = require('../../mocks/src/repository/dealsRepository.mock')
const repository = require('../../../src/repository')
const { mockClient, AwsStub } = require('aws-sdk-client-mock')
const {
	PutCommand,
	QueryCommand,
	DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')

const dynamoMock = mockClient(DynamoDBDocumentClient)

describe('Tests for deals repository', () => {
	test('Should call save method and response with success from dynamoDB with success message', async () => {
		dynamoMock.on(PutCommand).callsFake((input) => {
			expect(input).toEqual({
				TableName: 'fake_table',
				Item: MOCKS.VALID_DATA(),
			})

			return { message: 'success' }
		})

		const response = await repository.deals.save(
			'fake_table',
			MOCKS.VALID_DATA()
		)

		expect(response).toEqual({ message: 'success' })
	})

	test('Should call get method and response with success from dynamoDB with success message', async () => {
		dynamoMock.on(QueryCommand).callsFake((input) => {
			expect(input).toEqual({
				TableName: 'fake_table',
				KeyConditionExpression: 'document = :document',
				ExpressionAttributeValues: {
					':document': MOCKS.VALID_DATA_GET().document,
				},
			})

			return MOCKS.VALID_DYNAMO_RESPONSE_GET()
		})

		const response = await repository.deals.get('fake_table', 'document')

		expect(response).toEqual(MOCKS.VALID_REPOSITORY_RESPONSE_GET())
	})
})
