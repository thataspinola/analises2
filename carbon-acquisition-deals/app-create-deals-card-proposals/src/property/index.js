require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.PROPOSTA_PATH = 'portobank/pis-workflow/proposta/v1/proposta'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.DEALS_DATA_LIBRARY_LOCATION =
	getDealsDataLibraryLocation(NODE_ENV_VALUE)

function getDealsDataLibraryLocation(NODE_ENV) {
	const LOCAL = '@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer'
	const LAYER_LOCATION =
		'/opt/nodejs/carbon-acquisition-deals-common-layer/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.PROPOSALS_IN_PROGRESS_SCHEMA = require('./cardProposalsSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = 'Erro ao acessar api'
exports.TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'
exports.NOT_FOUND_ERROR_DEFAULT_MESSAGE = 'Not Found'
exports.BAD_REQUEST_DEFAULT_MESSAGE = 'The supplied request body is invalid'
exports.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE = 'Internal Server Error'
exports.DEALS_DATA_LAYER_ERROR_DEFAULT_MESSAGE =
	'Erro ao salvar dados no banco de dados dynamoDB'
