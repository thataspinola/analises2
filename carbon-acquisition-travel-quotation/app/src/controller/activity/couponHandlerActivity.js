const api = require('../../api')

exports.execute = async (inputData) => {
    const inputCoupon = inputData.informacoes.find(i => i.codigo === 'DICIO_CUPOM')?.conteudo

    if (!inputCoupon) {
        return null
    }

    try {
        return await api.couponApi.getCouponData({ codigo: inputCoupon })
    } catch (error) {
        return null
    }
}