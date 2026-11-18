const FACTORY_LEADS_SEMSEGUROPAYLOAD_MOCKS = require('../../../factory/api/producaoComercial/multicanal/leads/semSeguroPayloadFactory.mock')
const POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_LEAD_VALUE = {
	cpf: '06963752060',
	id: '179265dc-f013-4fe4-a010-a0aae2103877',
	tipoCliente: 'atualização',
	referencia: 'site-institucional',
	corretor_online: null,
	vinculo_porto: null,
	origem: '9',
	fluxo_online: null,
	url_protocol: null,
	vinculo_mc: 0,
	nome_produto: null,
	id_produto: null,
	corretor_id: null,
	corretor_susep: null,
	codAtdMultiCanal: null,
	cnsc_id_indicacao: 'IND-000772/23',
}

const PUT_UPDATE_CONTACT_REQUEST_SUCCESS_REPONSE = {}

const POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_DATA_VALUE = {
	url: null,
	lead: POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_LEAD_VALUE,
	sistema: {
		successo: true,
		status: 200,
		descricao: 'Criação do lead realizada com sucesso.',
		stackTrace: null,
	},
}

exports.POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE = () => {
	return POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_LEAD_VALUE
}

exports.POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_DATA = () => {
	return POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_DATA_VALUE
}

exports.POSTSEMSEGURO_VALID_PAYLOAD_WITH_WHATSAPP_CHANNEL = () => {
	return FACTORY_LEADS_SEMSEGUROPAYLOAD_MOCKS.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN()
}

exports.POSTSEMSEGURO_VALID_RETURN_WITH_WHATSAPP_CHANNEL = () => {
	return POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE_LEAD_VALUE
}

exports.PUT_UPDATE_CONTACT_REQUEST_SUCCESS_RESPONSE = () => {
	return PUT_UPDATE_CONTACT_REQUEST_SUCCESS_REPONSE
}