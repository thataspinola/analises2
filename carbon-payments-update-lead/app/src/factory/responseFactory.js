const createResponse = (statusCode, bodyContent) => ({
	statusCode,
	body: bodyContent,
})

exports.success = (successBodyContent = {}) => {
	return createResponse(200, successBodyContent)
}

exports.error = (message = null) => {
	const bodyContent = { status: 'error' }
	if (message) {
		bodyContent.message = message
	}
	return createResponse(500, bodyContent)
}

exports.badRequestError = (
	message = 'The supplied request body is invalid'
) => {
	const bodyContent = { status: 'error', message }
	return createResponse(400, bodyContent)
}
