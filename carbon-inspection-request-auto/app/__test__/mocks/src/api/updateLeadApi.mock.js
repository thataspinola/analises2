exports.API_UPDATE_LEAD_VALID_PAYLOAD = () => {
	return {
		codigo_vdo: '12345678',
		id_ramo: '12344556',
	}
}

exports.PUT_API_UPDATE_LEAD_SUCCESS_RETURN = () => {
	return {
		data: {},
		statusCode: 200,
	}
}

exports.PUT_API_UPDATE_LEAD_EMPTY_RETURN = () => {
	return {
		data: undefined,
		statusCode: 200,
	}
}