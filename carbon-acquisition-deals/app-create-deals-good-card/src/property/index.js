require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'

exports.API_PATH = 'goodcard-fenix/v1/cards'

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

exports.INPUT_SCHEMA = {
	type: 'object',
	properties: {
		codigoCanal: { type: 'integer', minimum: 1 },
		tipoDocumento: { type: 'string', enum: ['CPF', 'CNPJ'] },
		documento: { type: 'string' },
		codigoCampanha: { type: 'string', nullable: true },
	},
	required: ['codigoCanal', 'tipoDocumento', 'documento'],
	additionalProperties: false,
}
