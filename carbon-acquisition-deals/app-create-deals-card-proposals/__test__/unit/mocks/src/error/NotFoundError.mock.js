exports.CUSTOM_MESSAGE = () => {
	return 'Item not found'
}

exports.CUSTOM_CODE = () => {
	return 404
}

exports.CUSTOM_STACK_TRACE = () => {
	return 'Error stack trace'
}

exports.CUSTOM_ERROR = () => {
	return {
		code: this.CUSTOM_CODE(),
		message: this.CUSTOM_MESSAGE(),
		stack: this.CUSTOM_STACK_TRACE(),
	}
}
