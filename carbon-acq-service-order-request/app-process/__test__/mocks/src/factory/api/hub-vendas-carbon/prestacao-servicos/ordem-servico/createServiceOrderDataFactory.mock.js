const MOCKS = require('../../../../../../index.mock')

const VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE =
	MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()
		.integrationData

exports.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT = () => {
	return VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE
}

const VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT_SOCIALNAME_VALUE =
	'CAEHTREEN WTOPCNGHJKKK DBA WOLF'
exports.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT = () => {
	return {
		...VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE,
		customer: {
			...VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE.customer,
			socialName:
				VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT_SOCIALNAME_VALUE,
		},
	}
}

exports.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_WITH_COMBO = () => {
	return {
		...VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE,
		combo: {
			items: [
				{ questionCode: 'Q001', quantity: 5, name: 'combo 1' },
				{ questionCode: 'Q002', quantity: 1, name: 'combo 2' },
				{ questionCode: 'Q003', quantity: 5, name: 'combo 3' },
			],
		},
	}
}

exports.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_WITH_COMBO_WITHOUT_QUESTIONS =
	() => {
		return {
			...VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_VALUE,
			combo: {
				items: [
				{ quantity: 5, name: 'combo 1' },
				{ quantity: 1, name: 'combo 2' },
				{ quantity: 5, name: 'combo 3' },
			],
			},
		}
	}

const VALID_RETURN_VALUE = {
	serviceOrder: {
		originCode: '9',
		problem: '1105',
		schedule: {
			endDateTime: '2024-09-26T10:00:00.000',
			key: '02092024193000161456',
			openOsDateTime: '2024-09-26T10:00:00.000',
			startDateTime: '2024-09-26T08:00:00.000',
		},
		siebelIntegrationId: '933821240800009118230',
		specialtyCode: '1541',
		subject: 'P97',
		susep: 'TST03J',
		homeServiceFlag: 'N',
		mileageLimit: 0,
		openingReason: 1,
		originSystemCode: 36,
		paymentMethodCode: 6,
		priorityLevel: 2,
		privateServiceFlag: 'S',
		productBrandCode: 109,
		providerOnSiteFlag: 'N',
		questions: [],
	},
	customer: {
		cellPhone: '222225555',
		cellPhoneDdd: '11',
		contactName: 'FULANO SILVA',
		documentNumberComplete: '58489669074',
		documentNumberVerifyCode: '74',
		documentNumberWithoutVerifyCode: '584896690',
		email: 'fulano.silva@gmail.com',
		issuerName: 'FULANO SILVA',
		name: 'FULANO SILVA',
		socialName: '',
	},
	serviceAddress: {
		additionalInfo: '',
		city: 'Sao Paulo',
		latitude: -23.5649224,
		longitude: -46.6519376,
		neighborhood: 'Bela Vista',
		number: '982',
		reference: '',
		standardizationCodeCt24h: 3,
		state: 'SP',
		street: 'Avenida Paulista',
		zipCodeBase: '01310',
		zipCodeSuffix: '100',
		addressType: 1,
	},

	callDetails: {
		agreementType: 0,
		cgcOrder: 0,
		companyCode: 9,
		companyGroupCode: 95,
		fiscalCompanyCode: 95,
		registrationNumber: '99980',
		requesterTypeCode: 3,
		userType: 'F',
	},
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

const VALID_RETURN_VALUE_WITH_VEHICLE = {
	serviceOrder: {
		originCode: '9',
		problem: '1105',
		schedule: {
			endDateTime: '2024-09-26T10:00:00.000',
			key: '02092024193000161456',
			openOsDateTime: '2024-09-26T10:00:00.000',
			startDateTime: '2024-09-26T08:00:00.000',
		},
		siebelIntegrationId: '933821240800009118230',
		specialtyCode: '724',
		subject: 'P97',
		susep: 'TST03J',
		homeServiceFlag: 'N',
		mileageLimit: 0,
		openingReason: 1,
		originSystemCode: 36,
		paymentMethodCode: 6,
		priorityLevel: 2,
		privateServiceFlag: 'S',
		productBrandCode: 109,
		providerOnSiteFlag: 'N',
		questions: [],
		vehicleModelCode: '3429',
		vehicleLicenseCode: 'PORT000',
		vehiclemodelYear: 2026,
		vehicleColor: '11',
	},
	customer: {
		cellPhone: '222225555',
		cellPhoneDdd: '11',
		contactName: 'FULANO SILVA',
		documentNumberComplete: '58489669074',
		documentNumberVerifyCode: '74',
		documentNumberWithoutVerifyCode: '584896690',
		email: 'fulano.silva@gmail.com',
		issuerName: 'FULANO SILVA',
		name: 'FULANO SILVA',
		socialName: '',
	},
	serviceAddress: {
		additionalInfo: '',
		city: 'Sao Paulo',
		latitude: -23.5649224,
		longitude: -46.6519376,
		neighborhood: 'Bela Vista',
		number: '982',
		reference: '',
		standardizationCodeCt24h: 3,
		state: 'SP',
		street: 'Avenida Paulista',
		zipCodeBase: '01310',
		zipCodeSuffix: '100',
		addressType: 1,
	},
	callDetails: {
		agreementType: 0,
		cgcOrder: 0,
		companyCode: 9,
		companyGroupCode: 95,
		fiscalCompanyCode: 95,
		registrationNumber: '99980',
		requesterTypeCode: 3,
		userType: 'F',
	},
}
exports.VALID_RETURN_WITH_VEHICLE = () => {
	return VALID_RETURN_VALUE_WITH_VEHICLE
}

exports.VALID_RETURN_WITH_SOCIALNAME = () => {
	return {
		...VALID_RETURN_VALUE,
		customer: {
			...VALID_RETURN_VALUE.customer,
			contactName:
				VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT_SOCIALNAME_VALUE,
			issuerName:
				VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT_SOCIALNAME_VALUE,
			socialName:
				VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT_SOCIALNAME_VALUE,
		},
	}
}

exports.VALID_RETURN_WITH_COMBO = () => {
	return {
		...VALID_RETURN_VALUE,
		serviceOrder: {
			...VALID_RETURN_VALUE.serviceOrder,
			history: 'PORTO ASSISTENCIA INFORMA: combo 1 (5) - combo 2 (1) - combo 3 (5)',
			questions: [
				{ questionCode: 'Q001', quantity: '5' },
				{ questionCode: 'Q002', quantity: '1' },
				{ questionCode: 'Q003', quantity: '5' },
			],
		},
	}
}

exports.VALID_RETURN_WITH_COMBO_WITHOUT_QUESTIONS = () => {
	return {
		...VALID_RETURN_VALUE,
		serviceOrder: {
			...VALID_RETURN_VALUE.serviceOrder,
			history: 'PORTO ASSISTENCIA INFORMA: combo 1 (5) - combo 2 (1) - combo 3 (5)',
			questions: [],
		},
	}
}
