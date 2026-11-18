/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'
exports.NODE_ENV = NODE_ENV_VALUE
exports.OTP_SEND_SCHEMA = {
	type: 'object',
	properties: {
		taxvat: { type: 'string', pattern: '[0-9]{10,11}' },
		destinationnumber: { type: 'string', minLength: 10 },
		emaildestinantionaddress: {
			type: 'string',
			format: 'email',
			nullable: true,
		}, //Nullable e fora dos required fields temporariamente para não gerar conflito com itens que estiverem na fila (sem este campo) em ambiente produtivo ao entrar estas mudanças
		corporativeheader: { type: 'string' },
		pescod: { type: 'string', nullable: true },
		formData: {
			type: 'object',
			properties: {
				nome: { type: 'string' },
				nomeSocial: { type: 'string', nullable: true },
				email: { type: 'string', format: 'email' },
				celular: { type: 'string', minLength: 11 },
			},
			required: ['nome', 'email', 'celular'],
		},
	},
	required: [
		'taxvat',
		'destinationnumber',
		'corporativeheader',
		'pescod',
		'formData',
	],
}

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.CARBON_EMAIL_SENDER_QUEUE_URL =
	process.env.CARBON_EMAIL_SENDER_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-service-connector-email-sender'

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.com.br'

exports.GOVERNANCA_DADOS_PESSOA_API_PATH =
	process.env.GOVERNANCA_DADOS_PESSOA_API_PATH ||
	'governancadados/dados-pessoa/v1/pessoa'

exports.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH =
	process.env.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH ||
	'portais/ms-usuarios/v2/users/activation/simple/antifraud'
exports.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH =
	process.env.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH ||
	'portais/ms-usuarios/v2/users/status'

exports.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH ||
	'seguranca/corporativa/v1/portocom/gera-token-aa'

exports.CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH =
	process.env.CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH ||
	'corporativo/smsservice/v1/send-sms'

exports.OTP_REDIS_CACHE_CONN_STRING =
	process.env.OTP_REDIS_CACHE_CONN_STRING ||
	'redis://carbon-otp-redis-cache.7qpvgq.0001.cac1.cache.amazonaws.com:6379'

exports.ANTIFRAUD_AUTHORIZATION_CODE =
	process.env.ANTIFRAUD_AUTHORIZATION_CODE || '304b21088eb80fd5c4f8bb722fb2adf8'

exports.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME ||
	'CLIENTES_HML'
exports.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME =
	process.env.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME ||
	'OTP_HUB_VENDAS'

exports.CORPORATIVO_SMSSERVICE_SENDSMS_MENSAGEM =
	process.env.CORPORATIVO_SMSSERVICE_SENDSMS_SUFIXO_MENSAGEM ||
	'e o seu codigo de verificacao. portoseguro.com.br'

exports.PESSOA_CODIGO_ORIGEM_BCP = 174 // Origem BCP 174 é Hub de Vendas
exports.PESSOA_CODIGO_ORGAO_EXPEDIDOR = 10 // Codigo Orgão Expedidor 10 é Departamento de Polícia Federal
exports.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO = 1 // Tipo Documento Identificação 1 é CPF
exports.PESSOA_CODIGO_FINALIDADE_ENDERECO_ELETRONICO = 1 // Finalidade Endereco Eletronico 1 é Pessoal
exports.PESSOA_CODIGO_DDI_TELEFONE = 55 // Codigo DDI Telefone 55 é o codigo do Brasil (+55)
exports.PESSOA_CODIGO_FINALIDADE_TELEFONE = 1 // Tipo Finalidade Telefone 1 é Celular
exports.PESSOA_CODIGO_LINHA_TELEFONICA = 1 // Tipo Linha Telefonia 1 é Móvel
exports.PESSOA_CODIGO_TIPO_PESSOA = 1 // Tipo Pessoa 1 é Pessoa Física

exports.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SENDER =
	'porto@portoseguro.com.br'
exports.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SUBJECT =
	'Porto | Seu código de validação é '

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
