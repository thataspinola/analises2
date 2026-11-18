/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.OTP_REQUEST_SCHEMA = {
	type: 'object',
	properties: {
		taxvat: { type: 'string', pattern: '[0-9]{10,11}' },
		codigo: { type: 'string', pattern: '[0-9]{6}' },
	},
	required: ['taxvat', 'codigo'],
}

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'
exports.GENERIC_RESPONSE_MESSAGE_TOKEN = 'informações inválidas'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH ||
	'seguranca/corporativa/v1/portocom/valida-token-aa'

exports.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME ||
	'CLIENTES_HML'

exports.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME ||
	'OTP_HUB_VENDAS'

exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.com.br'
exports.BCP_API_PATH = process.env.BCP_API_PATH || 'bcp/v1/dadospessoa'

exports.GOVERNANCA_DADOS_PESSOA_API_PATH =
	process.env.GOVERNANCA_DADOS_PESSOA_API_PATH ||
	'governancadados/dados-pessoa/v1/pessoa'

exports.BCP_API_PATH =
	process.env.BCP_API_PATH || 'bcp/consulta-dados/v1/dadospessoa'

exports.OTP_REDIS_CACHE_CONN_STRING =
	process.env.OTP_REDIS_CACHE_CONN_STRING ||
	'redis://carbon-otp-redis-cache.7qpvgq.0001.cac1.cache.amazonaws.com:6379'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
