/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.OTP_REQUEST_SCHEMA = {
	type: 'object',
	properties: {
		nome: { type: 'string' },
		nomeSocial: { type: 'string', nullable: true },
		taxvat: { type: 'string', pattern: '[0-9]{10,11}' },
		email: { type: 'string', format: 'email' },
		celular: { type: 'string', minLength: 11 },
		tentativas: { type: 'integer' },
		sessionId: { type: 'string' },
		ipAddress: { type: 'string', format: 'ipv4' },
		userAgent: { type: 'string' },
	},
	required: [
		'nome',
		'taxvat',
		'email',
		'celular',
		'tentativas',
		'sessionId',
		'ipAddress',
		'userAgent',
	],
}

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'
exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.com.br'
exports.BCP_API_PATH = process.env.BCP_API_PATH || 'bcp/v1/dadospessoa'

exports.AUTHORIZATION_CODE =
	process.env.AUTHORIZATION_CODE || '304b21088eb80fd5c4f8bb722fb2adf8'

exports.GOVERNANCA_DADOS_PESSOA_API_PATH =
	process.env.GOVERNANCA_DADOS_PESSOA_API_PATH ||
	'governancadados/dados-pessoa/v1/pessoa'

exports.BCP_API_PATH =
	process.env.BCP_API_PATH || 'bcp/consulta-dados/v1/dadospessoa'

exports.PORTAIS_MSUSUARIOS_USUARIO_API_PATH =
	process.env.PORTAIS_MSUSUARIOS_USUARIO_API_PATH ||
	'portais/ms-usuarios/v1/usuario'

exports.ORGANIZATION_ID = process.env.ORGANIZATION_ID || '6t4xugkr'
exports.POLICY = 'cadastro_hub_web'

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'
exports.OTP_SENDER_QUEUE_URL =
	process.env.OTP_SENDER_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-auth-otp-send-sms-requests'
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
