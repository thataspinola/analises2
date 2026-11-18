const VALID_INPUT_MESSAGE = {
	orderNumber: '123456',
	externalId: '123456',
	scope: 'auto',
	contactEmail: 'teste@teste.com',
	charges: [],
	integrationData: {},
}

exports.VALID_INPUT_MESSAGE_REQUEST = () => {
	return VALID_INPUT_MESSAGE
}

const INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER = {
	externalId: '123456',
	scope: 'auto',
	contactEmail: 'teste@teste.com',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER = () => {
	return INVALID_INPUT_MESSAGE_MISSING_ORDER_NUMBER
}

const INVALID_INPUT_MESSAGE_MISSING_SCOPE = {
	orderNumber: '123456',
	externalId: '123456',
	contactEmail: 'teste@teste.com',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_SCOPE = () => {
	return INVALID_INPUT_MESSAGE_MISSING_SCOPE
}

const INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL = {
	orderNumber: '123456',
	externalId: '123456',
	scope: 'auto',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL = () => {
	return INVALID_INPUT_MESSAGE_MISSING_CONTACT_EMAIL
}

const INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD = {
	orderNumber: '123456',
	externalId: '123456',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD = () => {
	return INVALID_INPUT_MESSAGE_MISSING_MORE_THAN_ONE_FIELD
}

const INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT = {
	orderNumber: '123456',
	externalId: '123456',
	contactEmail: 'teste.com',
	scope: 'auto',
	charges: [],
	integrationData: {},
}

exports.INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT = () => {
	return INVALID_INPUT_MESSAGE_EMAIL_WORNG_FORMAT
}
