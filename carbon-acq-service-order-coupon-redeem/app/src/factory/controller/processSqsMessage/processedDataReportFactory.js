const isValidPropertyValue = (inputData) => {
	return typeof inputData === 'string' && inputData.trim() !== ''
}

exports.getDataReport = (
    redeemCouponReturn,
    updateCouponStatusReturn,
) => {
	const redeemCouponReturnMessage = isValidPropertyValue(redeemCouponReturn?.mensagem)
		? redeemCouponReturn.mensagem
		: 'N/A'
	const updateCouponStatusReturnRequestId = isValidPropertyValue(updateCouponStatusReturn?.requestId)
		? updateCouponStatusReturn.requestId
		: 'N/A'

	const payload = {
        redeemCouponReturnMessage,
        updateCouponStatusReturnRequestId
	}

	return payload
}