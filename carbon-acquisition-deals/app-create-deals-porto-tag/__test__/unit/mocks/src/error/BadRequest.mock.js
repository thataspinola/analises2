exports.CUSTOM_MESSAGE = () => {
	return 'The attributes values are not valid'
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
