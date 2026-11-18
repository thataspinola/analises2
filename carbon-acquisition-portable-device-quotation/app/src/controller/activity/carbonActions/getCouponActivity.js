const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (coupon, inputRequest) => {
	let currentActivity = 'Chamada do endpoint de API de cupom do Carbon'
	try {
		const { deviceTypeCode, brandCode } = inputRequest.portableDevice.productDetails
		const modelCode = deviceTypeCode && brandCode ? `${brandCode}-${deviceTypeCode}` : null
		const variacoes = [modelCode, brandCode].filter(Boolean)
		const response = await api.coupon.getCouponData(coupon, variacoes)
		currentActivity = 'Retorno do endpoint de API de cupom do Carbon'
		service.logger.info(`${currentActivity} ${JSON.stringify(response)}`)

		return response
	} catch (error) {
		if (error.response?.status == 404 || error.response?.status == 400) {
			return 'invalid coupon'
		}
		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'GetCouponActivity',
				currentActivity: `Erro identificado durante a atividade: '${currentActivity}'`,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)
		throw error
	}
}
