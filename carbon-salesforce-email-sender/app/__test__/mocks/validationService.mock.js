exports.VALID_PAYLOAD = {
	transactionId: '123456',
	status: 'SUCCESS',
	scope: 'phone',
}

exports.VALID_PAYLOAD_WITH_PAYMENT_DATA = {
	status: 'ERROR',
	scope: 'phone',
	paymentData: {
		orderNumber: '0987654321',
		externalId: '1234567890',
		scope: 'phone',
	},
}

exports.INVALID_PAYLOAD_ONE_OF = {
	status: 'SUCCESS',
	scope: 'phone',
}

exports.INVALID_TRANSACTION_ID_PAYLOAD = {
	transactionId: true,
	status: 'SUCCESS',
	scope: 'phone',
}

exports.INVALID_SCOPE_REQUIRED_PAYLOAD = {
	transactionId: '123456',
	status: 'SUCCESS',
}

exports.INVALID_ADDITIONAL_PROPERTIES_PAYLOAD = {
	transactionId: '123456',
	status: 'SUCCESS',
	scope: 'phone',
	extraProperty: 'shouldBeIgnored',
}

exports.INVALID_PAYLOAD_STATUS_WITH_PAYMENT_DATA = {
	status: 'SUCCESS',
	scope: 'phone',
	paymentData: {
		orderNumber: '0987654321',
		externalId: '1234567890',
		scope: 'phone',
	},
}
