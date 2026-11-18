const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.PAYMENT_REGISTER_ENDPOINT_URL) !== -1) {
			return MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_AXIOS_APPROVED_SUCCESS_RESPONSE()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given a putPaymentRegister call', () => {
	test('It should return expected value and do not get an exception', async () => {
		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).resolves.toEqual(
			MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_APPROVED_VALID_RETURN()
		)
	})

	test('It should return expected value and do not get an exception when receives an PENDING response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.PAYMENT_REGISTER_ENDPOINT_URL) !== -1) {
				return MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_AXIOS_PENDING_SUCCESS_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})
		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).resolves.toEqual(
			MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PENDING_VALID_RETURN()
		)
	})

	test('It should return expected value and do not get an exception when receives an REJECTED response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.PAYMENT_REGISTER_ENDPOINT_URL) !== -1) {
				return MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_AXIOS_REJECTED_SUCCESS_RESPONSE()
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})
		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).resolves.toEqual(
			MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_REJECTED_VALID_RETURN()
		)
	})

	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.PAYMENT_REGISTER_ENDPOINT_URL) !== -1) {
				responseError.response = {
					status: 500,
					data: { message: 'Testing expected error' },
				}
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow(JSON.stringify({ message: 'Testing expected error' }))
	})

	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow('Unexpected error')
	})

	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')
	})

	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow('API unexpected error: Empty or invalid response')

        axios.mockResolvedValueOnce(MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_AXIOS_APPROVED_SUCCESS_RESPONSE_WITHOUT_STATUS())

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow('Unexpected structure from payment register PUT response')
	})

	test('It should get an exception when API did not give response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(CONSTANT.PAYMENT_REGISTER_ENDPOINT_URL) !== -1) {
				responseError.request = params
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.payment.putPaymentRegister(
				MOCKS.API_PAYMENT_REGISTER.PUTPAYMENTREGISTER_PAYMENTREADY_VALID_PAYLOAD_INPUT()
			)
		).rejects.toThrow('500 - Houve um erro inesperado ao invocar a API')
	})
})
