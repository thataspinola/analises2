exports.error = (description) => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			description,
		},
	}
}

exports.success = (data) => {
	return {
		statusCode: 200,
		body: data,
	}
}
