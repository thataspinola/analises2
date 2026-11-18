exports.VALID_DATA_SAVE = () => {
	return {
		scope: 'eligibility',
		document: '12345678901',
		data: '{}',
	}
}

exports.SCOPE_AND_DOCUMENT_DATA = {
	document: '12345678901',
}

exports.VALID_DATA_GET = () => {
	return this.SCOPE_AND_DOCUMENT_DATA
}

exports.INVALID_DATA_WITHOUT_SCOPE_SAVE = () => {
	return {
		document: '12345678901',
		data: '{}',
	}
}

exports.INVALID_DATA_WITHOUT_SCOPE_GET = () => {
	return {
		document: '12345678901',
	}
}

exports.INVALID_DATA_WITHOUT_DOCUMENT_SAVE = () => {
	return {
		scope: 'eligibility',
		data: '{}',
	}
}

exports.INVALID_DATA_WITHOUT_DOCUMENT_GET = () => {
	return {
		scope: 'eligibility',
	}
}

exports.INVALID_DATA_WITHOUT_DATA_SAVE = () => {
	return {
		scope: 'eligibility',
		document: '12345678901',
	}
}

exports.SUCCESS_SAVE_RESPONSE = () => {
	return 'The deals data was saved with success.'
}

exports.SUCCESS_GET_RESPONSE = () => {
	return this.SCOPE_AND_DOCUMENT_DATA
}

exports.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_SCOPE = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The attributes values are not valid: scope',
		},
	}
}

exports.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_DOCUMENT = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The attributes values are not valid: document',
		},
	}
}

exports.CONTROLLER_REQUEST_BAD_REQUEST_INVALID_DATA = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The attributes values are not valid: data',
		},
	}
}
