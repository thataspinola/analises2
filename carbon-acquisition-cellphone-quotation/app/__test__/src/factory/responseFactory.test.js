const { CouponApiError } = require('../../../src/common/errors')
const { responseFactory } = require('../../../src/factory')
const {
	RESPONSE_FACTORY_QUOTATIONS,
	GET_CELLPHONE_API_SUCCESS_RESPONSE,
	VALID_INPUT_DATA,
	CONTROLLER_SUCCESS_RESPONSE,
	VALID_QUOTATION_DATE,
} = require('../../mocks/index.mock')
const {
	COUPON_API_ERROR_INVALID_COUPON,
	COUPON_API_ERROR_CODE_DEFAULT,
} = require('../../../src/property')

afterEach(() => {
	jest.clearAllMocks()
})

beforeEach(() => {
	jest
		.useFakeTimers('modern')
		.setSystemTime(new Date(VALID_QUOTATION_DATE()).getTime())
})

describe('Suite de testes de responseFactory.js', () => {
	test('Deve retornar susepCode, brokerName, brokerEmail, brokerPhone, idLead, vdoCode e quotations', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA,
			GET_CELLPHONE_API_SUCCESS_RESPONSE
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('susepCode')
		expect(response.susepCode).toBe(VALID_INPUT_DATA.susep)
		expect(response).toHaveProperty('brokerName')
		expect(response.brokerName).toBe(VALID_INPUT_DATA.brokerName)
		expect(response).toHaveProperty('brokerEmail')
		expect(response.brokerEmail).toBe(VALID_INPUT_DATA.brokerEmail)
		expect(response).toHaveProperty('brokerPhone')
		expect(response.brokerPhone).toBe(VALID_INPUT_DATA.brokerPhone)
		expect(response).toHaveProperty('pescod')
		expect(response.pescod).toBe(VALID_INPUT_DATA.pescod)
		expect(response).toHaveProperty('idLead')
		expect(response.idLead).toBe(VALID_INPUT_DATA.idLead)
		expect(response).toHaveProperty('vdoCode')
		expect(response.vdoCode).toBe(VALID_INPUT_DATA.vdoCode)
		expect(response).toHaveProperty('quotation_data')
		expect(response.quotation_data).toEqual(GET_CELLPHONE_API_SUCCESS_RESPONSE)
		expect(response).not.toHaveProperty('couponData')

		expect(response).toHaveProperty('quotations')
		expect(response.quotations).toEqual(RESPONSE_FACTORY_QUOTATIONS)
	})

	test('Deve retornar o valor sem desconto quando houver cupom', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA,
			GET_CELLPHONE_API_SUCCESS_RESPONSE,
			{ percentualDesconto: 10 }
		)

		expect(response.quotations[0].product_attributes.discount_percentage).toBe(10)
		expect(response.quotations[0].product_attributes.amount_without_discount).toBe(306.53)
		expect(response.quotations[0].product_attributes.coupon_description).toBeUndefined()
	})

	test('Deve mapear dados de cupom nos atributos da cotacao', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA,
			GET_CELLPHONE_API_SUCCESS_RESPONSE,
			{ codigo: 'COUPON10', percentualDesconto: 10, descricao: 'Cupom teste' }
		)

		expect(response).not.toHaveProperty('couponData')
		expect(response.quotations[0].product_attributes.discount_percentage).toBe(10)
		expect(response.quotations[0].product_attributes.coupon_description).toBe('Cupom teste')
	})

	test('Deve retornar com sucesso o fluxo do Controller', () => {
		const response = responseFactory.controllerSuccess(
			CONTROLLER_SUCCESS_RESPONSE
		)

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(201)
		expect(response).toHaveProperty('body')
		expect(response.body).toBe(CONTROLLER_SUCCESS_RESPONSE)
	})

	test('Deve retornar com erro o fluxo do Controller', () => {
		const response = responseFactory.controllerError('erro')

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(500)
		expect(response).toHaveProperty('body')
		expect(response.body).toStrictEqual({
			message: 'Unknown Server Error',
			status: 'error',
			code: null,
			errorCode: '0500000'
		})
	})

	test('Deve retornar com erro de cupom o fluxo do Controller', () => {
		const response = responseFactory.controllerError(new CouponApiError())

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(422)
		expect(response).toHaveProperty('body')
		expect(response.body).toStrictEqual({
			message: COUPON_API_ERROR_INVALID_COUPON,
			status: 'error',
			code: COUPON_API_ERROR_CODE_DEFAULT,
			errorCode: '0500000'
		})
	})

	test('Deve retornar os campos com valor sem desconto e o valor do desconto quando houver cupom', () => {
		const response = responseFactory.quotationSuccess(
			VALID_INPUT_DATA,
			GET_CELLPHONE_API_SUCCESS_RESPONSE,
			{ percentualDesconto: 10 }
		)

		expect(response.quotations[0].product_attributes.discount_percentage).toBe(10)
		expect(response.quotations[0].product_attributes.amount_without_discount).toBe(306.53)
		expect(response.quotations[0].product_attributes.first_installment_value_without_discount).toBe(25.54)
		expect(response.quotations[0].product_attributes.remaining_installments_value_without_discount).toBe(25.54)
		expect(response.quotations[0].product_attributes.discount_percentage_amount).toBe(30.65)
	})
})
