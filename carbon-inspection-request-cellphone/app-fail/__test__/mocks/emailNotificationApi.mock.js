exports.API_PAYLOAD = {
	status: 'ERROR',
	scope: 'phone',
	paymentData: {
		orderNumber: '000005334',
		externalId: '58000000007370',
		scope: 'phone',
	},
}

exports.API_RESPONSE_SUCCESS = { data: 'mockData' }

exports.API_RESPONSE_ERROR = new Error('Request failed')

exports.ERROR_DETAILS = { message: 'Error message', status: 500 }
