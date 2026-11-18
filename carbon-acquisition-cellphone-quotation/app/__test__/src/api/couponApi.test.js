const CONST = require('../../../src/property')
const { couponApi } = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const { CouponApiError } = require('../../../src/common/errors')
const { logger } = require('../../../src/service')

jest.mock('../../../src/service', () => ({
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
}))
jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de couponApi.js', () => {
	describe('getCouponData', () => {
		it('Deve retornar com sucesso a resposta ao chamar a Api de Cupom do cellphone', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.GET_COUPON_API_SUCCESS_RESPONSE,
			})

			const response = await couponApi.getCouponData(MOCKS.VALID_INPUT_DATA)

			expect(response).toEqual(MOCKS.GET_COUPON_API_SUCCESS_RESPONSE)
		})

		it('Deve retornar uma exceção do tipo CouponApiError quando ao chamar a API de Cupom do cellphone retornar um erro 404', async () => {
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 404,
				data: MOCKS.GET_COUPON_API_ERROR_404_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				couponApi.getCouponData(MOCKS.VALID_INPUT_DATA_WITH_INEXISTENT_CUPOM)
			).rejects.toThrow(new CouponApiError())

			expect(logger.error).toHaveBeenCalledWith(
				notFoundError,
				notFoundError.response.data,
				CONST.COUPON_API_ERROR_INVALID_COUPON
			)
			expect(logger.error).toHaveBeenCalledTimes(1)
		})

		it('Deve retornar uma exceção do tipo CouponApiError quando ao chamar a API de Cupom do cellphone retornar um erro 400', async () => {
			const badRequestError = new Error('Bad Request')
			badRequestError.response = {
				status: 400,
				data: MOCKS.GET_COUPON_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw badRequestError
			})

			await expect(
				couponApi.getCouponData(MOCKS.VALID_INPUT_DATA_WITH_INACTIVE_CUPOM)
			).rejects.toThrow(new CouponApiError())

			expect(logger.error).toHaveBeenCalledWith(
				badRequestError,
				badRequestError.response.data,
				CONST.COUPON_API_ERROR_INVALID_COUPON
			)
			expect(logger.error).toHaveBeenCalledTimes(1)
		})

		it('Deve retornar uma exceção do tipo CouponApiError quando ao chamar a API de Cupom do cellphone retornar um erro 500', async () => {
			const serverError = new Error('Internal Server Error')
			serverError.response = {
				status: 500,
				data: { message: 'Internal Server Error' },
			}

			axios.mockImplementationOnce(() => {
				throw serverError
			})

			await expect(
				couponApi.getCouponData(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(new CouponApiError())

			expect(logger.error).toHaveBeenCalledWith(
				serverError,
				serverError.response.data,
				CONST.COUPON_API_ERROR_INVALID_COUPON
			)
			expect(logger.error).toHaveBeenCalledTimes(1)
		})

		it('Deve lançar CouponApiError quando o erro não tiver response (erro de rede)', async () => {
			const networkError = new Error('Network Error')

			axios.mockImplementationOnce(() => {
				throw networkError
			})

			await expect(
				couponApi.getCouponData(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(CouponApiError)
		})

		it('Deve retornar uma exceção do tipo CouponApiError quando ao chamar a API de Cupom retornar um erro sem response', async () => {
			const spyLogger = jest.spyOn(logger, 'error')
			const networkError = new Error('Network Error')

			axios.mockImplementationOnce(() => {
				throw networkError
			})

			await expect(
				couponApi.getCouponData(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow(new CouponApiError())
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
