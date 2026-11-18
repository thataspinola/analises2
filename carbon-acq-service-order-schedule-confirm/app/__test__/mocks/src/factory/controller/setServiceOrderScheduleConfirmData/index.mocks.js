exports.SCHEDULECONFIRMFACTORY_PARSEDINPUT_VALID_PAYLOAD = () => {
	return {
		carbonTraceId: 'carbon123',
		eCommercePlatform: {
			orderNumber: 'order123',
			loggedCPF: 'cpf123',
		},
		integrationData: {
			serviceOrderNumber: 'service123',
			serviceOrder: {
				sku: 'sku123',
				schedule: {
					key: 'valid-key',
				},
			},
		},
		externalId: 'trans123',
		transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
	}
}

exports.SCHEDULECONFIRMFACTORY_RESPONSE_SUCCESS = () => {
	return {
		message: 'Success message',
	}
}

exports.SCHEDULECONFIRMFACTORY_RESPONSE_EMPTY = () => {
	return {}
}
