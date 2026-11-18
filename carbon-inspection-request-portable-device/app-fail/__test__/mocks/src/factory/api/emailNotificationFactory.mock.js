exports.VALID_INPUT = () => {
	return {
		orderNumber: '12345',
		externalId: 'abcde',
		scope: 'portable_device',
	}
}

exports.VALID_RETURN = () => {
	return {
		status: 'ERROR',
		scope: 'portable_device',
		paymentData: {
			orderNumber: '12345',
			externalId: 'abcde',
			scope: 'portable_device',
		},
	}
}
