exports.VALID_INPUT_DATA = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		labelTag: 'LABEL_XPTO',
		channel: 'Channel 1',
		date: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
	}
}
exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			fullName: { type: 'string' },
			cellPhone: { type: 'string', minLength: 10 },
			email: { type: 'string', format: 'email' },
			labelTag: { type: 'string', pattern: 'LABEL_.*' },
			channel: {
				enum: ['Channel 1', 'Channel 2'],
			},
			date: { type: 'string', format: 'date-time' },
		},
		required: ['fullName', 'cellPhone', 'email', 'channel'],
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'channel'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: false,
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '123',
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		channel: 'Channel 3',
	}
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'channel'
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'somedomainemail.com',
		channel: 'Channel 1',
	}
}
exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'somedomain@email.com',
		channel: 'Channel 1',
		labelTag: 'Banana',
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'email'
}
exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'labelTag'
}
exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'somedomain@email.com',
		channel: 'Channel 1',
		date: '01/12/2023 0h25m00s',
	}
}
exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'date'
}
