exports.VALID_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.VALID_NULABLEPROPERTY_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: null,
				},
				customer: null,
			},
		},
	}
}

exports.INVALID_NOTNULABLEPROPERTY_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: null,
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.VALID_CONDITIONAL_OPTIONAL_PROPERTY_A_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.VALID_CONDITIONAL_OPTIONAL_PROPERTY_B_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.VALID_MULTIPLETYPEPROPERTY_INPUT_DATA = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			payload: {
				type: 'object',
				properties: {
					integrationData: {
						type: 'object',
						properties: {
							serviceOrder: {
								type: 'object',
								properties: {
									coupon: { type: 'string', nullable: true },
								},
								required: ['coupon'],
							},
							customer: { type: 'string', nullable: true },
						},
						required: ['serviceOrder', 'customer'],
					},
				},
				required: ['integrationData'],
			},
		},
		required: ['payload'],
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
			},
		},
	}
}

exports.VALIDATION_SCHEMA_WITH_PROPERTIES_WITH_SAME_NAME = () => {
	return {
		type: 'object',
		properties: {
			integrationData: {
				type: 'object',
				properties: {
					serviceOrder: {
						type: 'object',
						properties: {
							number: { type: 'string' },
							coupon: { type: 'string' },
						},
						required: ['number'],
					},
					customer: {
						type: 'object',
						properties: {
							documentNumber: { type: 'string', pattern: '[0-9]+' },
						},
						required: ['documentNumber'],
					},
				},
				required: ['serviceOrder', 'customer'],
			},
		},
		required: ['integrationData'],
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					number: '12345',
				},
				customer: {
					documentNumber: '12345678901',
				},
			},
		},
	}
}

exports.INVALID_NOTNULABLEPROPERTY_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'customer'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME_NAME = () => {
	return 'integrationData'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 12345,
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'A',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'INVALID',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		payload: {
			integrationData: {
				serviceOrder: {
					coupon: 'TEST1',
				},
				customer: 'TESTE',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY_NAME = () => {
	return 'coupon'
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'coupon'
}