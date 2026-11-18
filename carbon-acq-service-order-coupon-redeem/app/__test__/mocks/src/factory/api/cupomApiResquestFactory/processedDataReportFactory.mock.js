exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => {
		return {
			redeemCouponReturnMessage: undefined,
			updateCouponStatusReturnRequestId: undefined
		}
	}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		redeemCouponReturnMessage: "test",
		updateCouponStatusReturnRequestId: "test123"
	}
}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		cupom: 'ABC123',
		cpfCnpj: '12345678900',
		numeroOs: '123456',
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		cupom: 'N/A',
		cpfCnpj: '12345678900',
		numeroOs: null,
	}
}

exports.GETDATAREPORT_NULL_UPDATE_COUPON_STATUS_RETURN_REQUESTID = () => {
	return {
		redeemCouponReturnMessage: "test",
		updateCouponStatusReturnRequestId: null
	}
}

exports.GETDATAREPORT_EMPTY_REDEEN_COUPON_RETURN_MESSAGE = () => {
	return {
		redeemCouponReturnMessage: "",
		updateCouponStatusReturnRequestId: null
	}
}

exports.GETDATAREPORT_ALL_INVALID = () => {
	return {
		coupon: null,
		number: undefined,
		documentNumber: '',
	}
}
