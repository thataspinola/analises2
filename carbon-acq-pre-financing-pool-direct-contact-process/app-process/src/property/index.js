/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'

const { join } = require('path')

exports.NODE_ENV = NODE_ENV_VALUE

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)
exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)

exports.PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY = 1

exports.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME = 
	process.env.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME ||
	'carbon-pre-financing-lead-cache'
	
exports.ZENVIA_API_AUTHORIZATION_HEADER_VALUE =
	process.env.ZENVIA_API_AUTHORIZATION_HEADER_VALUE ||
	'faf60ac84019b3b14f0848f5083bc831'

exports.MULESOFT_URL = process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.com.br'
exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'

exports.SENSEDIA_CLOUD_URL_INTERNAL =
	process.env.SENSEDIA_CLOUD_URL_INTERNAL ||
	'https://portoapicloud-hml.portoseguro.brasil'

exports.ZENVIA_URL =
	process.env.ZENVIA_URL || 'https://outbound.ms.altubots.com/zenvia'

exports.ZENVIA_PORTOASSISTENCIA_WHATSAPPBOT_PORTOSEGURO_SENDER_API_PATH =
	process.env.ZENVIA_PORTOASSISTENCIA_WHATSAPPBOT_PORTOSEGURO_SENDER_API_PATH ||
	'portoassistencia/2'

exports.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK =
	process.env.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK ||
	'producao-comercial/gdl/v1/leads/multicanal'

exports.CREAT_LEAD_PATH =
	process.env.CREAT_LEAD_PATH ||
	'xml'

exports.UPDATE_CONTACT_REQUEST_PATH =
	process.env.UPDATE_CONTACT_REQUEST_PATH ||
	'atualizacaosolicitacaocontato'

exports.GOVERNANCA_DADOS_PESSOA_API_PATH =
	process.env.GOVERNANCA_DADOS_PESSOA_API_PATH ||
	'governancadados/dados-pessoa/v1/pessoa'
exports.AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH =
	process.env.AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH ||
	'auditoria/rastreabilidade-cdc/v1/consentimentos'

exports.CONSENT_CHANNEL = 'HUB DE VENDAS'
exports.CONSENT_DOMAIN = 'www.portoseguro.com.br'
exports.CONSENT_ENVIRONMENT_TYPE = 'Site'
exports.CONSENT_MANAGEMENT_AREA = 'canaisdigitais' //TODO: Alterar para a área faz a gestão de consórcio
exports.CONSENT_NAME_AREA = 'Consorcio'

exports.CONSENT_VERTICAL = 'Financeiro'

exports.LEAD_ID_PRODUTO = '3'
exports.LEAD_ID_TIPO_PRODUTO = ''
exports.LEAD_ORIGEM_HUB_LIGUEME = '36'
exports.LEAD_ORIGEM_WHATSAPP = '9'
exports.LEAD_REFERENCIA =
	process.env.SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE || 'site-institucional'
exports.LEAD_PMC_PROGRAMA = 'nvd'

exports.WHATSAPPBOT_OUTBOUND_NUMBER = '5511948890025'
exports.WHATSAPPBOT_TEMPLATE_ID = '30869573-ebec-471d-8c78-732fa1c833b1'
exports.WHATSAPPBOT_FIELD_CAMPANHA = 'Consórcio'
exports.WHATSAPPBOT_FIELD_BUTTON_1 = ''
exports.WHATSAPPBOT_RESTARTCONTACT = true
exports.WHATSAPPBOT_CONTEXT_ENVPORTO = 'prod'
exports.WHATSAPPBOT_CONTEXT_ORIGEM = 'whatsapp'
exports.WHATSAPPBOT_CONTEXT_CAMPANHA = 'Botão do whatsapp'
exports.WHATSAPPBOT_CONTEXT_PROGRAMA = 'nvd'
exports.WHATSAPPBOT_CONTEXT_ID_PRODUTO = '3'
exports.WHATSAPPBOT_CONTEXT_TEMPLATEID = '30869573-ebec-471d-8c78-732fa1c833b1'
exports.WHATSAPPBOT_CONTEXT_TEMPLATE_NAME =
	'pdcaclientes_whatsapplandingpage02v01_leadsvendas'
exports.WHATSAPPBOT_CONTEXT_ID_TIPO_PRODUTO = ''
exports.WHATSAPPBOT_CONTEXT_NOME_PRODUTO = 'Consórcio'

exports.PESSOA_CODIGO_ORIGEM_BCP_HDV = 174 // Origem BCP 174 é Hub de Vendas
exports.PESSOA_CODIGO_TIPO_PESSOA_FISICA = 1 // Tipo Pessoa 1 é Pessoa Física
exports.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO_CPF = 1 // Tipo Documento Identificação 1 é CPF
exports.PESSOA_CODIGO_ORGAO_EXPEDIDOR_PF = 10 // Codigo Orgão Expedidor 10 é Departamento de Polícia Federal
exports.PESSOA_CODIGO_FINALIDADE_ENDERECO_ELETRONICO_PESSOAL = 1 // Finalidade Endereco Eletronico 1 é Pessoal
exports.PESSOA_CODIGO_DDI_TELEFONE_BRASIL = 55 // Codigo DDI Telefone 55 é o codigo do Brasil (+55)
exports.PESSOA_CODIGO_LINHA_TELEFONICA_MOVEL = 1 // Tipo Linha Telefonia 1 é Móvel
exports.PESSOA_CODIGO_FINALIDADE_TELEFONE_CELULAR = 1 // Tipo Finalidade Telefone 1 é Celular

exports.PESSOA_CODIGO_TIPO_PESSOA_JURIDICA = 2 // Tipo Pessoa 2 é Pessoa Jurídica
exports.PESSOA_CODIGO_TIPO_SITUACAO_PESSOA_JURIDICA_ATIVO = 1 //Tipo de situação de Pessoa Jurídica 1 é Ativa
exports.PESSOA_CODIGO_TIPO_PESSOA_JURIDICA_NAO_PORTO = 3 //Tipo de Pessoa Juridica 3 é Pessoa Jurídica não pertencente ao Grupo Porto
exports.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO_CNPJ = 2 // Tipo Documento Identificação 2 é CNPJ
exports.PESSOA_CODIGO_ORGAO_EXPEDIDOR_RF = 34 // Codigo Orgão Expedidor 34 é Receita Federal

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.CONSENTS_SNS_TOPIC_ARN =
	process.env.CONSENTS_SNS_TOPIC_ARN ||
	'arn:aws:sns:ca-central-1:791702935403:hub-vendas-client-consents'

exports.PHONENUMBER_CLEANUP_REGEX = /[()+\.\-#]/gm

exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

exports.GA_SUBPRODUCTS = {
	24: 'consorcio-de-automoveis',
	25: 'consorcio-de-imoveis',
	26: 'consorcio-de-equipamentos-profissionais',
	55: 'consorcio-de-eletrodomesticos',
	94: 'consorcio-de-pesados',
	124: 'consorcio-de-sustentaveis',
	154: 'consorcio-de-bike',
}

exports.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL =
	process.env.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-service-connector-google-analytics-collect'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

function getCommonLibraryLocation(NODE_ENV) {
	const LOCAL_LOCATION = join(
		__dirname,
		'../../../app-common/nodejs/carbon-acq-pre-financing-pool-direct-contact-common'
	)
	const LAYER_LOCATION =
		'/opt/nodejs/carbon-acq-pre-financing-pool-direct-contact-common'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
