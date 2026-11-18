const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

beforeAll(() => {
	jest
		.useFakeTimers('modern')
		.setSystemTime(new Date('2023-10-16T00:00:00.000Z'))
})

describe('Suite de testes de dynamoDb.js', () => {
	test('Deve retornar o valor esperado', async () => {
		let returnValue = factory.dynamoDb.makePayloadLeadInProgress(
			MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE(),
			MOCKS.VALID_INPUT_DATA()
		)
		expect(returnValue).toEqual(MOCKS.VALID_PUT_ITEM())
	})
	test('Deve retornar o valor esperado sem o idProductType quando ele não estiver presente no inputData', async () => {
		const inputData = JSON.parse(JSON.stringify(MOCKS.VALID_INPUT_DATA()))
		delete inputData.idProductType
		const returnValue = factory.dynamoDb.makePayloadLeadInProgress(
			MOCKS.DYNAMICS_CREATE_LEAD_RESPONSE(),
			inputData
		)
		expect(returnValue).not.toHaveProperty('idProductType')
	})
})
