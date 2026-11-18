const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')
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
		.setSystemTime(new Date(MOCKS.VALID_QUOTATION_DATE()).getTime())
})

describe('Suite de testes de factory.response.js', () => {
	test('Deve retornar o payload corretamente', async () => {
		const response = await factory.response.quotationSuccess(
			MOCKS.FACTORY_RESPONSEFACTORY.VALID_INPUT_REQUEST(),
			MOCKS.FACTORY_RESPONSEFACTORY.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE(),
			MOCKS.FACTORY_RESPONSEFACTORY.LEAD_INFORMATION()
		)

		expect(response).toEqual(
			MOCKS.FACTORY_RESPONSEFACTORY.RESPONSE_FACTORY_SUCCESS_RESPONSE()
		)
	})
	test('Deve calcular os valores sem desconto quando há cupom aplicado', async () => {
		const response = await factory.response.quotationSuccess(
			MOCKS.FACTORY_RESPONSEFACTORY.VALID_INPUT_REQUEST(),
			MOCKS.FACTORY_RESPONSEFACTORY.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE(),
			MOCKS.FACTORY_RESPONSEFACTORY.LEAD_INFORMATION(),
			MOCKS.FACTORY_RESPONSEFACTORY.COUPON_DATA_10_PERCENT()
		)

		const quotation = response.body.quotations.find((q) => q.packageCode === 3)

		// fator = 1 - 10/100 = 0.9
		expect(quotation.couponDiscountPercentage).toBe(10)
		expect(quotation.couponDescription).toBe('Cupom de desconto de 10%')

		const oneInstallment = quotation.paymentOptions.find(
			(o) => o.installments === 1
		)
		expect(oneInstallment.first_installment_value_without_discount).toBe(386.4)
		expect(oneInstallment.remaining_installments_value_without_discount).toBe(0)
		expect(oneInstallment.amount_without_discount).toBe(386.4)
		expect(oneInstallment.discount_percentage_amount).toBe(38.64)

		const twoInstallments = quotation.paymentOptions.find(
			(o) => o.installments === 2
		)
		expect(twoInstallments.first_installment_value_without_discount).toBe(193.2)
		expect(twoInstallments.remaining_installments_value_without_discount).toBe(
			193.2
		)
		expect(twoInstallments.amount_without_discount).toBe(386.4)
		expect(twoInstallments.discount_percentage_amount).toBe(38.64)
	})

	test('Deve retornar campos null quando o percentual do cupom é inválido', async () => {
		const response = await factory.response.quotationSuccess(
			MOCKS.FACTORY_RESPONSEFACTORY.VALID_INPUT_REQUEST(),
			MOCKS.FACTORY_RESPONSEFACTORY.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE(),
			MOCKS.FACTORY_RESPONSEFACTORY.LEAD_INFORMATION(),
			MOCKS.FACTORY_RESPONSEFACTORY.COUPON_DATA_INVALID_PERCENTAGE()
		)

		const quotation = response.body.quotations[0]
		expect(quotation.couponDiscountPercentage).toBeNull()
		expect(quotation.couponDescription).toBeNull()

		const option = quotation.paymentOptions[0]
		expect(option.amount_without_discount).toBeNull()
		expect(option.first_installment_value_without_discount).toBeNull()
		expect(option.remaining_installments_value_without_discount).toBeNull()
		expect(option.discount_percentage_amount).toBeNull()
	})

	test('Deve retornar campos null quando o percentual do cupom é maior ou igual a 100', async () => {
		const response = await factory.response.quotationSuccess(
			MOCKS.FACTORY_RESPONSEFACTORY.VALID_INPUT_REQUEST(),
			MOCKS.FACTORY_RESPONSEFACTORY.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE(),
			MOCKS.FACTORY_RESPONSEFACTORY.LEAD_INFORMATION(),
			{
				...MOCKS.FACTORY_RESPONSEFACTORY.COUPON_DATA_10_PERCENT(),
				percentualDesconto: 100,
			}
		)

		const quotation = response.body.quotations[0]
		expect(quotation.couponDiscountPercentage).toBeNull()
		expect(quotation.paymentOptions[0].amount_without_discount).toBeNull()
	})

	test('Deve retornar com erro o fluxo do Controller', () => {
		const response = factory.response.error('erro')
		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('statusCode')
		expect(response.statusCode).toBe(500)
		expect(response).toHaveProperty('body')
		expect(response.body).toStrictEqual({
			message: 'erro',
			status: 'error',
		})
	})
})
