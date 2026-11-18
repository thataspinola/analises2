const { quotationFactory } = require('../../../src/factory')
const {
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITHOUT_4th_PLAN,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE,
	VALID_INPUT_DATA,
	GET_COUPON_API_SUCCESS_RESPONSE,
	VALID_INPUT_DATA_WITH_CUPOM,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_CUPOM,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_PACKAGES_FILTERED,
	VALID_INPUT_DATA_WITH_COMMISSION_RATE,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE,
	VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_FUNCIONARIO,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_NOMAD,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_BHG,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_COB47J,
	QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_4N6U1J
} = require('../../mocks/index.mock')

describe('Suite de testes de quotationFactory.js', () => {
	test('Deve retornar o payload corretamente', () => {
		const response = quotationFactory.makePayload(VALID_INPUT_DATA)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE)
	})

	test('Deve retornar o payload corretamente quando não é informado nome social', () => {
		const input = JSON.parse(JSON.stringify(VALID_INPUT_DATA))
		input.cellPhone.client.socialName = ''
		const response = quotationFactory.makePayload(input)

		expect(typeof response).toBe('object')
		const expected = JSON.parse(
			JSON.stringify(QUOTATION_FACTORY_PAYLOAD_RESPONSE)
		)
		expected.proponente.nomeSocial = undefined
		expect(response).toEqual(expected)
	})

	test('Deve retornar o payload corretamente quando não houver o quarto plano', () => {
		const response = quotationFactory.makePayload({
			...VALID_INPUT_DATA,
			cellPhone: {
				...VALID_INPUT_DATA.cellPhone,
				digitalProtectionValue: undefined,
			},
		})

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITHOUT_4th_PLAN
		)
	})

	test('Deve retornar o payload corretamente quando houver cupom', () => {
		const response = quotationFactory.makePayload(
			VALID_INPUT_DATA_WITH_CUPOM,
			GET_COUPON_API_SUCCESS_RESPONSE
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_CUPOM)
	})

	test('Deve retornar o payload corretamente quando vier do super app', () => {
		const response = quotationFactory.makePayload({
			...VALID_INPUT_DATA,
			cellPhone: {
				...VALID_INPUT_DATA.cellPhone,
				channelCode: 82,
				packages: [3, 4],
				digitalProtectionValue: undefined,
			},
		})

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_PACKAGES_FILTERED
		)
	})

	test('Deve retornar o payload corretamente quando vier do super app mas sem especificar pacotes', () => {
		const response = quotationFactory.makePayload({
			...VALID_INPUT_DATA,
			cellPhone: {
				...VALID_INPUT_DATA.cellPhone,
				channelCode: 82,
				digitalProtectionValue: undefined,
			},
		})

		let unfilteredResponse = QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITHOUT_4th_PLAN
		unfilteredResponse.codigoCanal = 82

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			unfilteredResponse
		)
	})

	test('Deve retornar o operationCode corretamente quando tiver commissionRate', () => {
		const response = quotationFactory.makePayload(VALID_INPUT_DATA_WITH_COMMISSION_RATE)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for FUNCIONARIO', () => {
		const inputPayload = {
			...VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
			susep: "P5005J"
		}
		const response = quotationFactory.makePayload(inputPayload)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_FUNCIONARIO)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for NOMAD', () => {
		const inputPayload = {
			...VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
			susep: "QI067J"
		}
		const response = quotationFactory.makePayload(inputPayload)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_NOMAD)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for BHG', () => {
		const inputPayload = {
			...VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
			susep: "VP518J"
		}
		const response = quotationFactory.makePayload(inputPayload)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_BHG)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for COB47J', () => {
		const inputPayload = {
			...VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
			susep: "COB47J"
		}
		const response = quotationFactory.makePayload(inputPayload)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_COB47J)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for 4N6U1J', () => {
		const inputPayload = {
			...VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP,
			susep: "4N6U1J"
		}
		const response = quotationFactory.makePayload(inputPayload)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_4N6U1J)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for outro', () => {
		const response = quotationFactory.makePayload(VALID_INPUT_DATA_WITH_LINK_SUSEP_ORIGIN_LP)

		expect(typeof response).toBe('object')
		expect(response).toEqual(QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE)
	})
})
