const { quotationFactory } = require('../../../src/factory')
const {
	VALID_INPUT_DATA_PARSED,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_RENOVATION_CONGENERE,
} = require('../../mocks/index.mock')

describe('Suite de testes de quotationFactory.js', () => {
	test('Deve retornar o payload corretamente para novo seguro', () => {
		let input = {
			...VALID_INPUT_DATA_PARSED,
			auto: {
				...VALID_INPUT_DATA_PARSED.auto,
				bonusPolicy: {
					...VALID_INPUT_DATA_PARSED.auto.bonusPolicy,
					congenere: null,
				},
			},
		}
		const response = quotationFactory.makePayload(input)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE)
	})

	test('Deve retornar o payload corretamente para renovação de seguro', () => {
		const response = quotationFactory.makePayload(VALID_INPUT_DATA_PARSED)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			QUOTATION_FACTORY_PAYLOAD_RESPONSE_RENOVATION_CONGENERE
		)
	})

	test('Deve retornar o payload corretamente para novo seguro quando não é informado dados de bonus', () => {
		let input = {
			...VALID_INPUT_DATA_PARSED,
			auto: {
				...VALID_INPUT_DATA_PARSED.auto,
				bonusPolicy: undefined,
			},
		}
		const response = quotationFactory.makePayload(input)

		expect(typeof response).toBe('object')
		expect(response).toEqual({
			...QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE,
			apoliceBonus: undefined,
		})
	})

	test('Deve retornar o payload corretamente quando condutor também é segurado e possui nome social', () => {
		let input = JSON.parse(JSON.stringify(VALID_INPUT_DATA_PARSED))

		input.auto.person.client.socialName = 'zezinho figueira'

		const response = quotationFactory.makePayload(input)

		const expectedResponse = JSON.parse(
			JSON.stringify(QUOTATION_FACTORY_PAYLOAD_RESPONSE_RENOVATION_CONGENERE)
		)
		expectedResponse.segurado.pessoa.nomeSocialPessoa = 'zezinho figueira'
		expectedResponse.condutores[0].pessoa.nomeSocialPessoa = 'zezinho figueira'

		expect(typeof response).toBe('object')
		expect(response).toEqual(expectedResponse)
	})
})
