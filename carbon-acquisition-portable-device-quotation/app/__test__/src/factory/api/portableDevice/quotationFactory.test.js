const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
const service = require('../../../../../src/service')

jest.mock('../../../../../src/service')

beforeAll(() => {
	service.dynamoDB.sequence.getPortableDeviceSequence = jest.fn(async () => {
		return MOCKS.VALID_EXTERNAL_BUDGET_NUMBER
	})
	service.string.removeAccents = jest.fn((str) => str)
})

describe('Suite de testes de factory.quotation.js', () => {
	test('Deve retornar o payload corretamente', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE()
		)
	})

	test('Deve retornar o payload corretamente quando não é informado nome social', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA_WITHOUT_SOCIAL_NAME(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITHOUT_SOCIAL_NAME()
		)
	})

	test('Deve retornar o payload corretamente quando houver cupom', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA_WITH_CUPOM(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.GET_COUPON_API_SUCCESS_RESPONSE()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_CUPOM()
		)
	})

	test('Deve retornar o operationCode corretamente quando tiver commissionRate', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.VALID_INPUT_DATA_WITH_COMMISSION_RATE(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE()
		)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for FUNCIONARIO', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION_ACTIVE_SUSEP_ORIGIN_LP_SUSEP_S5005J()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_SUSEP_FUNCIONARIO()
		)
	})

	test('Deve retornar o operationCode corretamente quando tiver link ativo e susep for outro', async () => {
		const response = await factory.quotation.makePayload(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA(),
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.LEAD_INFORMATION_ACTIVE_SUSEP_ORIGIN_LP()
		)

		expect(typeof response).toBe('object')
		expect(response).toEqual(
			MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE_OTHER()
		)
	})
})
