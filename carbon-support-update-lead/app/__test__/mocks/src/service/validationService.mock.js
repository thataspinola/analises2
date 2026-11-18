const TESTING_SCHEMA = {
	type: 'object',
	properties: {
		payload: {
			type: 'object',
			properties: {
				bcpId: {
					oneOf: [{ type: 'string', pattern: '[0-9]+' }, { type: 'number' }],
					$comment:
						'Use of oneOf including both string and number types is needed to ensure validation even when bcpId comes with numeric value (Supports legacy code SNS messages)',
				},
				consents: {
					type: 'array',
					items: {
						type: 'object',
						patternProperties: {
							'^.*$': { type: 'boolean' },
						},
						minProperties: 1,
					},
					minItems: 1,
				},
				doctoClient: { type: 'string', pattern: '[0-9]{10,14}' },
				name: { type: 'string' },
				nameArea: { type: 'string' },
				product: {
					oneOf: [{ type: 'string', pattern: '[0-9]+' }, { type: 'number' }],
					$comment:
						'Use of oneOf including both string and number types is needed to ensure validation even when bcpId comes with numeric value (Supports legacy code SNS messages)',
				},
				productName: { type: 'string', nullable: true },
				vertical: { type: 'string' },
				domain: { type: 'string' },
			},
			if: { required: ['doctoClient'] },
			then: { required: ['consents', 'doctoClient', 'name'] },
			else: { required: ['bcpId', 'consents', 'name'] },
		},
		eventTime: { type: 'string', format: 'date-time' },
		eventId: {
			oneOf: [{ type: 'string', pattern: '[0-9]+' }, { type: 'number' }],
			$comment:
				'Use of oneOf including both string and number types is needed to ensure validation even when bcpId comes with numeric value (Supports legacy code SNS messages)',
		},
		eventType: { type: 'string' },
	},
	required: ['payload', 'eventTime', 'eventId', 'eventType'],
}

exports.VALID_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}

exports.VALID_NULABLEPROPERTY_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: null,
		},
	}
}

exports.INVALID_NOTNULABLEPROPERTY_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: null,
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
		},
	}
}

exports.VALID_CONDITIONAL_OPTIONAL_PROPERTY_A_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}

exports.VALID_CONDITIONAL_OPTIONAL_PROPERTY_B_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}

exports.VALID_MULTIPLETYPEPROPERTY_INPUT_DATA = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: 9226676,
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: 9226676,
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}
exports.VALIDATION_SCHEMA = () => {
	return {
		...TESTING_SCHEMA,
		properties: {
			...TESTING_SCHEMA.properties,
			dummyEnumValue: {
				enum: ['Channel 1', 'Channel 2'],
			},
			dummyMaxLenghtValue: {
				type: 'string',
				maxLength: 3,
			},
		},
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}

exports.VALIDATION_SCHEMA_WITH_PROPERTIES_WITH_SAME_NAME = () => {
	return {
		type: 'object',
		properties: {
			dummyProperty1: { type: 'number' },
			dummyProperty2: {
				type: 'object',
				properties: {
					dummyProperty1: { type: 'number' },
					dummyProperty3: { type: 'string' },
				},
				required: ['dummyProperty1'],
			},
		},
		required: ['dummyProperty1', 'dummyProperty2'],
	}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME = () => {
	return {
		dummyProperty1: 1,
		dummyProperty2: {
			dummyProperty3: 'test',
		},
	}
}

exports.INVALID_NOTNULABLEPROPERTY_PROPERTY_NAME = () => {
	return 'bcpId'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'bcpId'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTIES_WITH_SAME_NAME_NAME = () => {
	return 'dummyProperty1'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 12,
		},
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'productName'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
		dummyMaxLenghtValue: 'abcdwty',
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'dummyMaxLenghtValue'
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
		dummyEnumValue: 'Channel 7',
	}
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'dummyEnumValue'
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		eventTime: 'not iso datetime',
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'eventTime'
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '111.444.777-35',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'doctoClient'
}

exports.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY = () => {
	return {
		eventTime: new Date(2023, 12, 1, 0, 0, 0, 0).toISOString(),
		eventId: '470179',
		eventType: 'PFP_LEAD_RECEIVED',
		payload: {
			bcpId: 470179,
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '01234567890',
			name: 'Nomenelson Sobrenomeson',
			product: 'AUTOMOVEL',
			productName: null,
			vertical: 'Financeiro',
			nameArea: 'Consorcio',
			domain: 'www.portoseguro.com.br',
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		eventTime: '01/12/2023 0h25m00s',
		eventId: '9226676',
		eventType: 'CLIENT_REGISTERED',
		payload: {
			bcpId: '9226676',
			consents: [{ marketingOptInFlag: true }, { privacyPolicy: true }],
			doctoClient: '11144477735',
			name: 'Teste',
			product: '32',
			productName: 'VidaOn',
		},
	}
}
exports.INVALID_INPUT_DATA_INVALIDONEOF_PROPERTY_NAME = () => {
	return 'product'
}
exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'eventTime'
}
