const error  = require('../../../../src/error')
const CONSTANT = require('../../../../src/property')

exports.TRACE_ID = () => {
	return 'traceId'
}

exports.VALID_INPUT_DATA = () => {
	return {
		taxvat: '21312441231'
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


exports.RESPONSE_CONSENTS_NOT_FOUND = () => {
	return {
		statusCode: 200,
		body: {
			status: CONSTANT.STATUS_CONSENTS.NOT_FOUND
		} 
	}
}

exports.RESPONSE_CONSENTS_ACTIVITY_SUCCESS = () => {
	return {
		opt: true
	}
}

exports.RESPONSE_CONSENTS_ACTIVITY_NOT_FOUND = () => {
	return new error.ExternalApiError.NotFoundError()
}

exports.RESPONSE_CONSENTS_CONTROLLER_BAD_REQUEST = (message) => {
    return {
        statusCode: CONSTANT.STATS_CODE.BAD_REQUEST,
        body: {
            message: message
        }
    }
}

exports.RESPONSE_CONSENTS_CONTROLLER_ERROR = () => {
    return {
        statusCode: CONSTANT.STATS_CODE.INTERNAL_SERVER_ERROR,
        body: {
            status: 'error',
            message: CONSTANT.EXTERNAL_API_ERROR_DEFAULT_MESSAGE, 
        }
    }
}