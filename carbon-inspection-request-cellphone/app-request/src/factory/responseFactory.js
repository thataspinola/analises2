exports.success = (data) => {
	return {
		statusCode: 200,
		body: data,
	}
}

exports.error = (description, code = 500) => {
	return {
		statusCode: code,
		body: {
			status: 'error',
			description,
		},
	}
}
