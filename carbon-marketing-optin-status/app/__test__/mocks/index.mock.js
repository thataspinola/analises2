const CONSTANT = require("./../../src/property")

exports.INVALID_EVENT = () => {
	return {
		body: undefined
	}
}

exports.VALID_EVENT = () => {
	return {
		body: JSON.stringify({
			taxvat: "1231223123"
		})
	}
}

exports.RESPONSE_CONSENTS_HANDLER_BAD_REQEUST = () => {
	return {
		isBase64Encoded: false,
		headers: {
			'carbon-trace-id': 'traceId'
		},
		statusCode: CONSTANT.STATS_CODE.BAD_REQUEST,
		body: JSON.stringify({
			message: 'Input must be a string'
		})
	}
}

exports.RESPONSE_CONSENTS_HANDLER_ERROR = () => {
	return {
		isBase64Encoded: false,
		headers: {
			'carbon-trace-id': 'traceId'
		},
		statusCode: CONSTANT.STATS_CODE.INTERNAL_SERVER_ERROR,
		body: JSON.stringify({
			status: 'error',
			message: 'Parse Error'
		})
	}
}

exports.RESPONSE_CONSENTS_HANDLER = () => {
	return {
		isBase64Encoded: false,
		headers: {
			'carbon-trace-id': 'traceId'
		},
		statusCode: CONSTANT.STATS_CODE.OK,
		body: JSON.stringify({
			status: CONSTANT.STATUS_CONSENTS.OPT_IN
		})
	}
}


exports.RESPONSE_CONSENTS_CONTROLLER = () => {
	return {
		statusCode: 200,
		body: {
			status: CONSTANT.STATUS_CONSENTS.OPT_IN
		}
	}
}

exports.TRACE_ID = () => {
	return 'traceId'
}
