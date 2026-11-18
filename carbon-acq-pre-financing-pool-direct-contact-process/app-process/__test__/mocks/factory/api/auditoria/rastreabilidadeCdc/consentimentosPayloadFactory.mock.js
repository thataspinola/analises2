const HANDLER_MOCKS = require('../../../../handler.mock')

const GETPAYLOAD_VALID_RETURN_VALUE = {
	bcpId: '75315984',
	channel: 'HUB DE VENDAS',
	consents: [
		{
			consent: 'privacy.privacyPolicy',
			consentValue: 'true',
		},
		{
			consent: 'marketingOptInFlag',
			consentValue: 'true',
		},
	],
	doctoClient: '06963752060',
	domain: 'www.portoseguro.com.br',
	environmentType: 'Site',
	managementArea: 'canaisdigitais',
	name: 'Nomeir Sobrenomeson',
	nameArea: 'Consorcio',
	product: '24',
	productName: 'CONSÓRCIO - AUTOMÓVEL',
	vertical: 'Financeiro',
}

exports.GETPAYLOAD_VALID_RETURN = () => {
	return GETPAYLOAD_VALID_RETURN_VALUE
}

exports.GETPAYLOAD_VALID_CLIENTDATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT()
}
exports.GETPAYLOAD_FALSE_MARKETINGOPTOUTFLAG_INPUT = () => {
	return false
}
exports.GETPAYLOAD_VALID_BCPID_INPUT = () => {
	return '75315984'
}
exports.GETPAYLOAD_VALID_PRODUCT_INPUT = () => {
	return 'AUTOMOVEL'
}

exports.GETPAYLOAD_WITHOUT_BCPID_VALID_RETURN = () => {
	return {
		...GETPAYLOAD_VALID_RETURN_VALUE,
		bcpId: '',
	}
}

exports.GETPAYLOAD_TRUE_MARKETINGOPTOUTFLAG_INPUT = () => {
	return true
}

exports.GETPAYLOAD_WITH_FALSE_MARKETING_CONSENT_VALID_RETURN = () => {
	return {
		...GETPAYLOAD_VALID_RETURN_VALUE,
		consents: [
			GETPAYLOAD_VALID_RETURN_VALUE.consents[0],
			{
				...GETPAYLOAD_VALID_RETURN_VALUE.consents[1],
				consentValue: 'false',
			},
		],
	}
}
