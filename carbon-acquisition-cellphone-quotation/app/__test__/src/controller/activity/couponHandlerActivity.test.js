const MOCKS = require('../../../mocks/controller/activity/couponHandlerActivity.mock')
const couponHandlerActivity = require('../../../../src/controller/activity/couponHandlerActivity')
const { couponApi } = require('../../../../src/api')

jest.mock('../../../../src/api')
jest.mock('../../../../src/property', () => ({
    ...jest.requireActual('../../../../src/property'),
    CHANNEL_CODE_COUPON_AUTOA_PPLY: ['82'],
    COUPON_API_URL: 'http://localhost-api'
}))

describe('couponHandlerActivity', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('coupon handler', () => {
        test('should return coupon data when coupon is sent in request', async () => {
            couponApi.getCouponData.mockResolvedValue(MOCKS.SUCCESS_RESPONSE)
            const inputRequestWithCoupon = {
                cellPhone: {
                    channelCode: '35',
                    coupon: 'DESCONTO10',
                    productDetails: {
                        phoneBrandCode: '94',
                        phoneModelCode: '2390'
                    }
                }
            }

            const result = await couponHandlerActivity.execute(inputRequestWithCoupon)

            expect(result).toEqual(MOCKS.SUCCESS_RESPONSE)
            expect(couponApi.getCouponData).toHaveBeenCalledTimes(1)
            expect(couponApi.getCouponData).toHaveBeenCalledWith(['94-2390', '94'], 'DESCONTO10')
        })

        test('should return null when there is no coupon and channel is not enabled for auto apply', async () => {
            const requestNotEnabled = {
                cellPhone: {
                    channelCode: '35',
                    coupon: null,
                    productDetails: {
                        phoneBrandCode: '94',
                        phoneModelCode: '2390'
                    }
                }
            }

            const result = await couponHandlerActivity.execute(requestNotEnabled)

            expect(result).toBeNull()
            expect(couponApi.getCouponData).not.toHaveBeenCalled()
        })

        test('should return auto apply coupon when channel is enabled and no coupon was provided', async () => {
            const mockAutoCoupon = [{ codigo: 'DESCONTO10', percentualDesconto: 10 }]
            couponApi.getCouponData.mockResolvedValue(mockAutoCoupon)

            const requestAutoApply = {
                cellPhone: {
                    channelCode: 82, 
                    coupon: null,
                    productDetails: {
                        phoneBrandCode: '94',
                        phoneModelCode: '2390'
                    }
                }
            }

            const result = await couponHandlerActivity.execute(requestAutoApply)

            expect(result).toEqual(mockAutoCoupon[0])
            expect(couponApi.getCouponData).toHaveBeenCalledWith(['94-2390', '94'])
        })

        test('should return null when auto apply coupon returns empty list', async () => {
            couponApi.getCouponData.mockResolvedValue([])

            const requestAutoApply = {
                cellPhone: {
                    channelCode: '82',
                    coupon: null,
                    productDetails: {
                        phoneBrandCode: '94',
                        phoneModelCode: null
                    }
                }
            }

            const result = await couponHandlerActivity.execute(requestAutoApply)

            expect(result).toBeNull()
            expect(couponApi.getCouponData).toHaveBeenCalledWith(['94'])
        })

        test('should catch error on getCouponData internal function and return null', async () => {
            couponApi.getCouponData.mockRejectedValue(new Error('API Error'))

            const requestAutoApply = {
                cellPhone: {
                    channelCode: '82',
                    coupon: null,
                    productDetails: {
                        phoneBrandCode: '94',
                        phoneModelCode: '2390'
                    }
                }
            }

            const result = await couponHandlerActivity.execute(requestAutoApply)

            expect(result).toBeNull()
        })
    })
})