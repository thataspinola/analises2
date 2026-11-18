const HANDLER_MOCKS = require('./handler.mock')
const FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD_MOCKS = require('./factory/api/producaoComercial/multicanal/leads/semSeguroPayloadFactory.mock')

exports.HANDLER = HANDLER_MOCKS

exports.API_AUDITORIA_RASTREABILIDADECDC = require('./api/auditoria/rastreabilidadeCdcApi.mock')
exports.API_GOVERNANCADADOS_DADOSPESSOA = require('./api/governancaDados/dadosPessoaApi.mock')
exports.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS = require('./api/producaoComercial/multicanal/leadsApi.mock')

exports.CONTROLLER_DIRECTCONTACT = require('./controller/directContactController.mock')
exports.CONTROLLER_DIRECTCONTACT_UPDATED = require('./controller/directContactUpdateController.mock')

exports.FACTORY_SNS_CONSENTS = require('./factory/sns/consentsFactory.mock')
exports.FACTORY_SQS_ANALYTICSCOLLECT = require('./factory/sqs/analyticsCollectFactory.mock')
exports.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD = require('./factory/api/auditoria/rastreabilidadeCdc/consentimentosPayloadFactory.mock')
exports.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD =
	FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD_MOCKS
exports.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA = require('./factory/api/governancaDados/dadosPessoa/pessoaPayloadFactory.mock')
exports.FACTORY_CONTROLLER_DIRECTCONTACT_PROCESSEDDATAREPORT = require('./factory/controller/directContact/processedDataReportFactory.mock')
exports.FACTORY_API_HTTPS_AGENT = require('./factory/api/httpsAgentFactory.moke')

exports.SERVICE_SNS_CONSENTS = require('./service/sns/consentsService.mock')
exports.SERVICE_SQS_ANALYTICSCOLLECT = require('./service/sqs/analyticsCollectService.mock')
exports.SERVICE_PRE_FINANCING_LEAD_DYNAMODB = require('./service/dynamoDB/preFinancingLeadDataCacheService.mock')


exports.MULESOFT_IMPERSONAL_TOKEN_HUB = () => {
	return 'token'
}

exports.SENSEDIA_TOKEN_CARBON_CLOUD_INTERNAL = () => {
	return 'token'
}

exports.CERTIFICATES = () => {
	return 'CERTIFICATES'
}

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}

exports.SENSEDIA_HUB_CLOUD_TOKEN = () => {
	return 'token'
}

const FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN_VALUE =
	{
		destination: '1198754422',
		outboundNumber: '5511948890025',
		templateId: '30869573-ebec-471d-8c78-732fa1c833b1',
		fields: {
			campanha: 'Consórcio',
			button_1: '',
			nome: 'Nomeir Sobrenomeson',
		},
		context: {
			envPorto: 'prod',
			nome: 'Nomeir Sobrenomeson',
			nomeCivil: "Nomeir Sobrenomeson",
			nomeSocial: undefined,
			cpf_cnpj: '06963752060',
			email: 'cliente@clienteproduto.com.br',
			cep: '01254-985',
			origem: 'whatsapp',
			campanha: 'Botão do whatsapp',
			programa: 'nvd',
			id_produto: '3',
			id_ramo: '24',
			templateId: '30869573-ebec-471d-8c78-732fa1c833b1',
			template_name: 'pdcaclientes_whatsapplandingpage02v01_leadsvendas',
			id_tipo_produto: '',
			idLead: '179265dc-f013-4fe4-a010-a0aae2103877',
			nome_produto: 'Consórcio',
		},
		restartContact: true,
	}

exports.FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN =
	() => {
		return FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN_VALUE
	}

const API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA_VALUE =
	{
		status: 'sent',
		external_id: '5c60684e-4327-4e00-b2cd-68ff7f20c60c',
		message_id: 19390861,
		contact_id: 60218631,
	}

exports.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE =
	() => {
		return API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA_VALUE
	}

exports.FACTORY_ZENVIA_PORTOASSISTENCIA_WHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_DATA_INPUT =
	() => {
		return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA()
	}

exports.FACTORY_ZENVIA_PORTOASSISTENCIA_WHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_IDLEAD_INPUT =
	() => {
		return '179265dc-f013-4fe4-a010-a0aae2103877'
	}

exports.FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETHEADERS_VALID_RETURN =
	() => {
		return {
			'Content-Type': 'application/json',
			Authorization: 'faf60ac84019b3b14f0848f5083bc831',
		}
	}

exports.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA =
	() => {
		return API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA_VALUE
	}

exports.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD =
	() => {
		return FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN_VALUE
	}

exports.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_RETURN =
	() => {
		return API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA_VALUE
	}

exports.SERVICE_LOGGER_ERROR_MESSAGE_JSON_PARSE_ERROR = () => {
	return 'Processing message error: Expected property name or \'}\' in JSON at position 2 (line 1 column 3)'
}

exports.SERVICE_LOGGER_ERROR_MESSAGE_WITHOUT_FLAG_ERROR = () => {
	return 'Processing message error: There is not message \'flag\' field in Body'
}