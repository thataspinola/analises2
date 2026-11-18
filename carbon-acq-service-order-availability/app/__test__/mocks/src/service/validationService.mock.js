exports.VALID_INPUT_DATA = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}
exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			city: {
				type: 'string',
				maxLength: 45,
			},
			stateCode: {
				type: 'string',
				minLength: 2,
				maxLength: 2,
				pattern: '^[A-Z]{2}$',
			},
			specialtyCode: {
				type: 'string',
				maxLength: 5,
				description: 'Descrição: Especialidade que deseja assistência.',
			},
			latitude: {
				type: 'number',
				minimum: -90,
				maximum: 90,
			},
			longitude: {
				type: 'number',
				minimum: -180,
				maximum: 180,
			},
			catTarCode: {
				type: 'string',
				maxLength: 3,
				description: 'Descrição: Caso não tenha a informação enviar “0”',
			},
			originCode: {
				type: 'string',
				maxLength: 2,
				enum: ['1', '2', '9'],
				description: '1- Socorro, 2-Passageiro, 9-Residencia',
			},
			assistanceCode: {
				type: 'string',
				maxLength: 3,
				description: 'Descrição: Caso não tenha a informação enviar “0”',
			},
			natureCode: {
				type: 'string',
				maxLength: 5,
				description: 'Descrição: Caso não tenha a informação enviar “0”',
			},
			subNatureCode: {
				type: 'string',
				maxLength: 2,
				description: 'Descrição: Caso não tenha a informação enviar “0”',
			},
			vehicleCode: {
				type: 'string',
				maxLength: 6,
				description: 'Descrição: Caso não tenha a informação enviar “0”',
			},
			addressType: {
				type: 'string',
				enum: ['3'],
				description: 'Descrição: Fixo “3”',
			},
			companyCode: {
				type: 'string',
				maxLength: 3,
				enum: ['1', '35', '84'],
				description:
					'Descrição: 1 - Porto Seguro, 35 - Azul Seguros, 84 – Itaú',
			},
			specialtyList: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						questions: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									code: {
										type: 'string',
									},
									responseDescription: {
										type: 'string',
									},
								},
								required: ['code', 'responseDescription'],
							},
						},
					},
				},
			},
		},
		required: [
			'city',
			'stateCode',
			'specialtyCode',
			'latitude',
			'longitude',
			'originCode',
			'companyCode',
		],
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		latitude: '-16.3655573',
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: '-46.8938834',
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'longitude'
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '2',
		sourceSystemCode: '17',
	}
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'companyCode'
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		state: 'MG',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'stateCode'
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MGS',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: -46.8938834,
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'stateCode'
}
exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		city: 'Santa Luzia',
		stateCode: 'MG',
		specialtyCode: '44',
		latitude: -16.3655573,
		longitude: '123',
		originCode: '9',
		companyCode: '1',
		sourceSystemCode: '17',
	}
}
exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'longitude'
}
