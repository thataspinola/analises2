jest.mock('../../../../src/api', () => ({
    couponApi: {
        getCouponData: jest.fn(),
    },
}))

describe('couponHandlerActivity security lock', () => {
    const buildInput = () => ({
        countries: 'Argentina, Chile',
        informacoes: [
            {
                codigo: 'DESTINO',
                conteudo: 'Brasil',
            },
        ],
    })

    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetModules()
    })

    function loadActivity() {
        const activity = require('../../../../src/controller/activity/couponHandlerActivity')
        const { couponApi } = require('../../../../src/api')

        return { activity, couponApi }
    }

    test('should return null', async () => {
        const { activity, couponApi } = loadActivity()
        const result = await activity.execute(buildInput())

        expect(result).toBeNull()
        expect(couponApi.getCouponData).not.toHaveBeenCalled()
    })

    test('should return coupon data', async () => {
        const { activity, couponApi } = loadActivity()
        const mockCouponData = {
            codigo: 'CUPOM30',
            percentualDesconto: 30,
            descricao: '30% de desconto',
        }

        couponApi.getCouponData.mockResolvedValue(mockCouponData)

        const inputData = buildInput()
        inputData.informacoes.push({
            codigo: 'DICIO_CUPOM',
            conteudo: 'CUPOM30',
        })

        const result = await activity.execute(inputData)

        expect(result).toEqual(mockCouponData)
        expect(couponApi.getCouponData).toHaveBeenCalledWith({ codigo: 'CUPOM30' })
    })

    test('should return null when couponApi throws an error', async () => {
        const { activity, couponApi } = loadActivity()
        couponApi.getCouponData.mockRejectedValue(new Error('API error'))

        const inputData = buildInput()
        inputData.informacoes.push({
            codigo: 'DICIO_CUPOM',
            conteudo: 'CUPOM30',
        })

        const result = await activity.execute(inputData)

        expect(result).toBeNull()
        expect(couponApi.getCouponData).toHaveBeenCalledWith({ codigo: 'CUPOM30' })
    })
})
