const api = require('../../api')
const { CHANNEL_CODE_COUPON_AUTOA_PPLY } = require('../../property')

const getCouponData = async (variacoes) => {
    try {
        return await api.couponApi.getCouponData(variacoes)
    } catch {
        return []
    }
}

exports.execute = async (inputRequest) => {
    const { coupon,channelCode } = inputRequest.cellPhone
    const { phoneBrandCode, phoneModelCode } = inputRequest.cellPhone.productDetails
    const modelCode = phoneBrandCode && phoneModelCode ? `${phoneBrandCode}-${phoneModelCode}` : null
    if (CHANNEL_CODE_COUPON_AUTOA_PPLY.includes(String(channelCode)) && !coupon) {   
        const variacoes = [modelCode, phoneBrandCode].filter(Boolean)
        const couponDataByModel = variacoes.length > 0 ? await getCouponData(variacoes) : []
        return couponDataByModel[0] || null 
    } else {
        const variacoes = [modelCode,phoneBrandCode].filter(Boolean)
        return coupon ? await api.couponApi.getCouponData(variacoes,coupon) : null
    }
}