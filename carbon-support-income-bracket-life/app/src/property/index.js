require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE
/* istanbul ignore next */
exports.SENSEDIA_CLOUD_URL =
	process.env.GATEWAY_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'
exports.API_VIDAON_FAIXA_RENDA_URL =
	process.env.API_PATH || 'vida/vida-on/v1/dominios/tipos-faixa-renda'
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.LOGGER = 'lambda_income_bracket_life_logger'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	/* istanbul ignore else */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
