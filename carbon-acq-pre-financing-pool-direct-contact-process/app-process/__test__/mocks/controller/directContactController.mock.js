const HANDLER_MOCKS = require('../handler.mock')
const PROCESSCONTACT_SUCCESS_RETURN_BODY_VALUE = {}

exports.PROCESSCONTACT_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: PROCESSCONTACT_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.PROCESSCONTACT_VALID_WHATSAPP_INPUT = () => {
	return JSON.parse(HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY())
}

exports.PROCESSCONTACT_PJ_VALID_WHATSAPP_INPUT = () => {
	return JSON.parse(HANDLER_MOCKS.VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY())
}

const PROCESSCONTACT_WHATSAPP_SUCCESS_RETURN_WITHOUT_TAXVAT_VALUE = {
	celular: '(11)*****4422',
	consentimentoRegistrado: 'SIM',
	email: 'c*****e@c*ienteproduto.com.br',
	leadId: '179265dc-f013-4fe4-a010-a0aae2103877',
	pescod: '82674864',
	sendConsentTopicMessageId: 'N/A',
	sendAnalyticsCollectMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
}

exports.PROCESSCONTACT_WHATSAPP_CPF_SUCCESS_RETURN = () => {
	return {
		...PROCESSCONTACT_WHATSAPP_SUCCESS_RETURN_WITHOUT_TAXVAT_VALUE,
		cpf: '0696******',
	}
}

exports.PROCESSCONTACT_WHATSAPP_CNPJ_SUCCESS_RETURN = () => {
	return {
		...PROCESSCONTACT_WHATSAPP_SUCCESS_RETURN_WITHOUT_TAXVAT_VALUE,
		cnpj: '0286******',
	}
}

exports.PROCESSCONTACT_WHATSAPP_CREATEPESSOA_SUCCESS_RETURN = () => {
	return {
		...PROCESSCONTACT_WHATSAPP_SUCCESS_RETURN_WITHOUT_TAXVAT_VALUE,
		pescod: '75315984',
		cpf: '0696******',
	}
}

exports.PROCESSCONTACT_INVALID_JSON_INPUT = () => {
	return JSON.stringify({
		formData: {
			justAnUnexpectedProperty: 'And not include any expected ones',
		},
	})
}

exports.PROCESSCONTACT_INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Direct contact request processing error: Validation'
}

exports.PROCESSCONTACT_VALID_WHATSAPP_INVALID_CPF_INPUT = () => {
	const VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE =
		HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA()
	return {
		formData: {
			...VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE,
			client: {
				...VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE.client,
				cpfCnpj: '12345678901',
			},
		},
	}
}

exports.PROCESSCONTACT_VALID_WHATSAPP_INVALID_CPF_INPUT_EXCEPTION_MESSAGE =
	() => {
		return 'Direct contact request processing error: Número de CPF/CNPJ inválido'
	}

exports.PROCESSCONTACT_VALID_TELEPHONE_INPUT = () => {
	return JSON.parse(HANDLER_MOCKS.VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY())
}

exports.PROCESSCONTACT_TELEPHONE_SUCCESS_RETURN = () => {
	return {
		celular: '(11)*****4422',
		consentimentoRegistrado: 'SIM',
		cpf: '0696******',
		email: 'n*********m@e*aildomain.com',
		leadId: '179265dc-f013-4fe4-a010-a0aae2103877',
		pescod: '82674864',
		sendConsentTopicMessageId: 'N/A',
		sendAnalyticsCollectMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
	}
}
