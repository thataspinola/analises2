const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')
const awsClientMock = require('aws-sdk-client-mock')
const libDynamoDB = require('@aws-sdk/lib-dynamodb')
const CONSTANTS = require('../../../src/property')
const PersistenceError = require('../../../src/common/errors/PersistenceError')

const dynamoMock = awsClientMock.mockClient(libDynamoDB.DynamoDBDocumentClient)

describe('Tests for payment pix dynamodb service', () => {
	test('Should call update status method and response with success from dynamoDB with success message', async () => {
		dynamoMock.on(libDynamoDB.UpdateCommand).callsFake((input) => {
			expect(input).toEqual({
				TableName: CONSTANTS.DYNAMODB_TABLE_NAME,
				Key: {
					id: 'portable_device',
				},
				UpdateExpression:
					'SET current_number = if_not_exists(current_number, :initial) + :incremento',
				ExpressionAttributeValues: {
					':initial': 0,
					':incremento': 1,
				},
				ReturnValues: 'UPDATED_NEW',
			})

			return MOCKS.VALID_RESPONSE_SEQUENCE_TABLE()
		})

		const response = await service.dynamoDB.sequence.getPortableDeviceSequence()

		expect(response).toEqual(MOCKS.VALID_EXTERNAL_BUDGET_NUMBER)
	})

	test('Should throw a PersistenceError when there is an error calling update status', async () => {
		dynamoMock.on(libDynamoDB.UpdateCommand).callsFake((input) => {
			throw new Error('Database error')
		})

		await expect(
			service.dynamoDB.sequence.getPortableDeviceSequence()
		).rejects.toThrow(PersistenceError)

		await expect(
			service.dynamoDB.sequence.getPortableDeviceSequence()
		).rejects.toThrow(
			'Erro ao gerar número externo do orçamento: Database error'
		)
	})
})
