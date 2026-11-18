const service = require('../../../service')
const api = require('../../../api')

exports.execute = async (coupon, planIds, petloveToken) => {
	let currentActivity = 'Obtendo detalhes do cupom Petlove'
	try {
		const couponDetails = await api.businessPartner.couponDetails.get(
			coupon,
			planIds,
			petloveToken
		)
		const allowedCouponFields = [
			'name',
			'description',
			'type',
			'discount',
			'cycles',
			'code',
		]
		const couponDetailsFiltered = filterObjectByWhitelist(
			couponDetails.data,
			allowedCouponFields
		)
		return couponDetailsFiltered
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'getCouponDetailsActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

function filterObjectByWhitelist(originalObject, allowedFields) {
	const newObject = {}

	for (const field of allowedFields) {
		if (originalObject.hasOwnProperty(field)) {
			newObject[field] = originalObject[field]
		}
	}
	return newObject
}
