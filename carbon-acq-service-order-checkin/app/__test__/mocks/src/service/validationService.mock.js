const CONSTANT = require('../../../../src/property')

exports.VALID_INPUT_DATA = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_NOTNULABLEPROPERTY_INPUT_DATA = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: null,
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.VALIDATION_SCHEMA = CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
	}
}

exports.INVALID_NOTNULABLEPROPERTY_PROPERTY_NAME = () => {
	return 'sku'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'integrationData'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: 2410987,
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'externalId'
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'cellphone'
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silvagmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'email'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024/09/26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'startDateTime'
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11-222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'cellphone'
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00',
				},
				serviceId: '100',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'startDateTime'
}
