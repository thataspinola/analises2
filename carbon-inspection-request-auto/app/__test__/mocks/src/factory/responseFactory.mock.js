const ERROR_MESSAGE_CONTENT = 'Some error message'

const ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	description: ERROR_MESSAGE_CONTENT,
}

exports.ERROR_VALID_INPUT = () => {
	return ERROR_MESSAGE_CONTENT
}

exports.CODE_400 = () => {
	return 400
}

exports.ERROR_VALID_RETURN_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.ERROR_VALID_RETURN_WITH_MESSAGE_RETURN_AND_CODE400 = () => {
	return {
		statusCode: 400,
		body: ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.SUCCESS_VALID_INPUT = () => {
	return 'Success'
}

exports.SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: 'Success',
	}
}
