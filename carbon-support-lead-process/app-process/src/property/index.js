const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
const path = require('path')

exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)
exports.DYNAMICS_LIBRARY_LOCATION = getDynamicsLibraryLocation(NODE_ENV_VALUE)

const common = require(this.COMMON_LIBRARY_LOCATION)
exports.LEAD_SCHEMA = common.LEAD_SCHEMA

exports.MESSAGES = {
	LAYER: {
		HANDLER: 'Handler',
		LEAD_CONTROLLER: 'Lead Controller'
	},
	HANDLER: {
		PROCESSING_ERROR: "Processing JSON parse error:"
	},
	LEAD_CONTROLLER: {
		INPUT_DATA: "INPUT REQUEST",
		VALIDATION: "Validando os dados recebidos",
		ACTIVITY: "Erro identificado durante a atividade de criação de lead:",
		GETTING_TOKEN_CARBON_CLOUD: "Obtendo o token Sensedia Carbon cloud.",
		GETTING_TOKEN_CLOUD: "Obtendo o token Sensedia cloud",
		GETTING_LEAD_LEAYER: "Chamando a layer create lead dynamics",
		GETTING_CERTIFICATE: "Obtendo o certificado do Sensedia",
		CURRENT_ACTIVITY: "Erro identificado durante a atividade:",
		LEAD_PAYLOAD: "payload enviado para a criacao o dynamics",
		RESPONSE_DAYNAMICS: "resposta do daynamics"
	}
}

exports.ERROR_MESSAGES = common.ERROR_MESSAGES

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do sensedia.'
exports.STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500
}

function getCommonLibraryLocation(NODE_ENV) {
	const LOCAL_LOCATION = path.join(
		__dirname,
		'../../../app-common/nodejs/carbon-support-lead-common'
	)
	const LAYER_LOCATION =
		'/opt/nodejs/carbon-support-lead-common'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

function getDynamicsLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-service-connector-dynamics'
	const LAYER_LOCATION = '/opt/nodejs/carbon-service-connector-dynamics/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}
