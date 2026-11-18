exports.VALID_INPUT_DATA = () => {
	return {
			type: 'all',
			value:
				'LI001, ER006, EC100, HR015, HC100, LD001, DI001, DI002, DI003, DE001, LR003, LR006, LR011, LR005, PR004',
		
	}
}

exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			type: { type: 'string' },
			value: { type: 'string' },
		},
		required: ['type', 'value'],
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return []
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return ''
}
