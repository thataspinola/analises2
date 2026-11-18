exports.NOTFOUNDERROR_VALID_INPUT = () => {
	return {
		response: { status: 404, data: 'Not Found' },
	}
}

exports.NOTFOUNDERROR_VALID_RETURN = () => {
	return {
		status: 400,
		message: `{error:'Not Found'}`,
	}
}

exports.BADREQUESTERROR_VALID_INPUT = () => {
	return {
		response: { status: 400, data: { error: 'Bad Request' } },
	}
}

exports.BADREQUESTERROR_VALID_RETURN = () => {
	return {
		status: 400,
		message: `{error:'Bad Request'}`,
	}
}

exports.UNEXPECTEDERROR_VALID_INPUT = () => {
	return {
		request: {},
		message: 'Error',
		code: 'ERROR',
	}
}

exports.UNEXPECTEDERROR_VALID_RETURN = () => {
	return {
		status: 500,
		message: 'ERROR - Error',
	}
}
