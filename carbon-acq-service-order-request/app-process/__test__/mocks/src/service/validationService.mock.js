const MOCKS_HANDLER = require('../../handler.mock')
const CONSTANT = require('../../../../src/property')

const VALID_INPUT_DATA_VALUE = JSON.parse(
	JSON.stringify(MOCKS_HANDLER.VALID_EVENT_SQSMESSAGE_1_PAYLOAD())
)

exports.VALID_INPUT_DATA = () => {
	return VALID_INPUT_DATA_VALUE
}

exports.VALID_NULABLEPROPERTY_INPUT_DATA = () => {
	const validData = {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			serviceOrder: {
				...VALID_INPUT_DATA_VALUE.integrationData.serviceOrder,
			},
		},
	}

	validData.integrationData.serviceOrder.coupon = null
	return validData
}

exports.VALIDATION_SCHEMA = CONSTANT.SQS_MESSAGE_SCHEMA

exports.INVALID_NOTNULABLEPROPERTY_INPUT_DATA = () => {
	const invalidData = {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			serviceOrder: {
				...VALID_INPUT_DATA_VALUE.integrationData.serviceOrder,
			},
		},
	}

	invalidData.integrationData.serviceOrder.sku = null
	return invalidData
}

exports.INVALID_NOTNULABLEPROPERTY_PROPERTY_NAME = () => {
	return 'sku'
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	const INVALID_INPUT_DATA_WITHOUT_ECOMMERCEPLATFORM = {
		...VALID_INPUT_DATA_VALUE,
	}

	delete INVALID_INPUT_DATA_WITHOUT_ECOMMERCEPLATFORM.eCommercePlatform

	return INVALID_INPUT_DATA_WITHOUT_ECOMMERCEPLATFORM
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'eCommercePlatform'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		externalId: 234567,
	}
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'externalId'
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			customer: {
				...VALID_INPUT_DATA_VALUE.integrationData.customer,
				documentNumber: '123',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'documentNumber'
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			customer: {
				...VALID_INPUT_DATA_VALUE.integrationData.customer,
				email: 'dummy.com.br',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'email'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	const INVALID_INPUT_DATA_WITHOUT_LATITUDE = {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			serviceAddress: {
				...VALID_INPUT_DATA_VALUE.integrationData.serviceAddress,
				latitudes: '-23.5649224',
			},
		},
	}

	delete INVALID_INPUT_DATA_WITHOUT_LATITUDE.integrationData.serviceAddress
		.latitude

	return INVALID_INPUT_DATA_WITHOUT_LATITUDE
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'latitude'
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			serviceAddress: {
				...VALID_INPUT_DATA_VALUE.integrationData.serviceAddress,
				zipCode: 'ABC123',
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'zipCode'
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		integrationData: {
			...VALID_INPUT_DATA_VALUE.integrationData,
			serviceOrder: {
				...VALID_INPUT_DATA_VALUE.integrationData.serviceOrder,
				schedule: {
					...VALID_INPUT_DATA_VALUE.integrationData.serviceOrder.schedule,
					startDateTime: '30-02-2034',
				},
			},
		},
	}
}

exports.INVALID_INPUT_DATA_WRONG_DATEFORMAT_PROPERTY_NAME = () => {
	return 'startDateTime'
}
