const { couponApi } = require('../../../src/api')
const axios = require('axios')
const { CouponApiError } = require('../../../src/common/errors')

jest.mock('axios')
jest.mock('../../../src/service', () => ({
	logger: {
		info: jest.fn(),
		error: jest.fn(),
	},
}))

describe('Given tests for couponApi.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('It should return coupon data from API', async () => {
		const data = [{ codigo: 'CUPOM10', percentualDesconto: 10 }]
		axios.mockResolvedValue({ data })

		const params = { variacao: ['Brasil'] }
		const result = await couponApi.getCouponData(params)

		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'GET',
				url: expect.stringMatching(/\/v1\/coupons$/),
				params: {
					produto: 'viagem',
					...params,
				},
			})
		)
		expect(result).toEqual(data)
	})

	test('It should throw CouponApiError when API fails', async () => {
		axios.mockRejectedValue(new Error('Network error'))

		await expect(couponApi.getCouponData({ variacao: [] })).rejects.toBeInstanceOf(
			CouponApiError
		)
	})

	test('It should throw CouponApiError when API returns error response payload', async () => {
		axios.mockRejectedValue({
			response: {
				data: { message: 'invalid coupon' },
			},
		})

		await expect(couponApi.getCouponData({ variacao: [] })).rejects.toBeInstanceOf(
			CouponApiError
		)
	})
})