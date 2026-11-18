exports.CUSTOM_MESSAGE = () => {
	return 'An error accurs when saving data in database'
}

exports.CUSTOM_STACK_TRACE = () => {
	return 'Error stack trace'
}

exports.CUSTOM_ERROR = () => {
	return {
		code: 500,
		message: this.CUSTOM_MESSAGE(),
		stack: this.CUSTOM_STACK_TRACE(),
	}
}
