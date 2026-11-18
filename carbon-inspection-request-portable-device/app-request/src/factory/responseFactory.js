exports.success = (successBodyContent) => {
	let successBody = {}
	if (successBodyContent === undefined) {
		successBody = {}
	} else {
		successBody = successBodyContent
	}
	return {
		statusCode: 200,
		body: successBody,
	}
}

exports.error = (message) => {
	const response = {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}
