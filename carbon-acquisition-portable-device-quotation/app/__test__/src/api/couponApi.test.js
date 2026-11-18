const CONST = require('../../../src/property')
const api = require('../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')
const { logger } = require('../../../src/service')

jest.mock('../../../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	},
	validation: {},
	dynamoDB: {},
}))
jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de coupon.js', () => {
	describe('getCouponData', () => {
		it('Deve retornar com sucesso a resposta ao chamar a Api de Cupom do portableDevice', async () => {
			axios.mockResolvedValueOnce({
				data: MOCKS.GET_COUPON_API_SUCCESS_RESPONSE,
			})

			const response = await api.coupon.getCouponData(MOCKS.VALID_INPUT_DATA)

			expect(response).toEqual(MOCKS.GET_COUPON_API_SUCCESS_RESPONSE)
		})

		it('Deve retornar um erro quando chamar a API de Cupom do portableDevice retornar um erro 404', async () => {
			const spyLogger = jest.spyOn(logger, 'error')
			const notFoundError = new Error('Not Found')
			notFoundError.response = {
				status: 404,
				data: MOCKS.API_COUPONAPI.GET_COUPON_API_ERROR_404_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw notFoundError
			})

			await expect(
				api.coupon.getCouponData(MOCKS.VALID_INPUT_DATA_WITH_INEXISTENT_CUPOM)
			).rejects.toThrow(new Error('Not Found'))
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})

		it('Deve retornar um erro quando ao chamar a API de Cupom do portableDevice retornar um erro 400', async () => {
			const spyLogger = jest.spyOn(logger, 'error')
			const badRequestError = new Error('Bad Request')
			badRequestError.response = {
				status: 400,
				data: MOCKS.GET_COUPON_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw badRequestError
			})

			await expect(
				api.coupon.getCouponData(MOCKS.VALID_INPUT_DATA_WITH_INACTIVE_CUPOM)
			).rejects.toThrow(new Error('Bad Request'))
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})

		it('Deve retornar um erro quando chamar a API de Cupom do portableDevice retornar um erro 500', async () => {
			const spyLogger = jest.spyOn(logger, 'error')
			const badRequestError = new Error('Bad Request')
			badRequestError.response = {
				status: 400,
				data: MOCKS.GET_COUPON_API_ERROR_400_RESPONSE,
			}

			axios.mockImplementationOnce(() => {
				throw badRequestError
			})

			await expect(
				api.coupon.getCouponData(MOCKS.VALID_INPUT_DATA_WITH_INACTIVE_CUPOM)
			).rejects.toThrow(new Error('Bad Request'))
			expect(spyLogger).toHaveBeenCalled()
			expect(spyLogger).toHaveBeenCalledTimes(1)
		})
	})
})
