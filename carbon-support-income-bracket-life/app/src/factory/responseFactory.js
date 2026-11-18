exports.success = (data) => {
	return {
		statusCode: 200,
		body: data,
	}
}

exports.error = () => ({
	statusCode: 500,
	body: {
		status: 'error',
		message: 'Unable to retrieve income brackets',
	},
})
