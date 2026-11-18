const VALID_RESPONSE_VALUE = {
	statusCode: 200,
	body: {},
}

exports.POST_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RESPONSE_VALUE,
	}
}

exports.VALID_PAYLOAD = () => {
	return {
		status: 'ERROR',
		scope: 'portable_device',
		paymentData: {
			orderNumber: '000005334',
			externalId: '58000000007370',
			scope: 'portable_device',
		},
	}
}

exports.VALID_RESPONSE = () => VALID_RESPONSE_VALUE
