const CONSTANT = require('../property')

exports.success = (data) => {
	return {
		statusCode: CONSTANT.STATS_CODE.OK,
		body: {
			...data,
		},
	}
}

exports.error = (message) => {
	const response = {
		statusCode: CONSTANT.STATS_CODE.INTERNAL_SERVER_ERROR,
		body: {
			status: 'error',
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}

exports.badRequestError = (message) => {
	return {
		statusCode: CONSTANT.STATS_CODE.BAD_REQUEST,
		body: {
			message,
		},
	}
}

exports.notFoundError = (message) => {
	return {
		statusCode: CONSTANT.STATS_CODE.NOT_FOUND,
		body: {
			message,
		},
	}
}
