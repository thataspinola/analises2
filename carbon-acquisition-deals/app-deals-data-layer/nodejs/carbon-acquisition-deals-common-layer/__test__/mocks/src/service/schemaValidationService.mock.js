exports.SAVE_VALID_INPUT_DATA = () => {
	return {
		scope: 'good-card',
		document: '00000017400',
		data: '{}',
	}
}

exports.SAVE_INVALID_INPUT_DATA_INVALID_TYPE_PROPERTY = () => {
	return {
		scope: 'good-card',
		document: 123,
		data: '{}',
	}
}

exports.SAVE_INVALID_INPUT_DATA_INVALID_PROPERTY = () => {
	return {
		teste: '31033230006',
	}
}
