require('dotenv').config()

exports.TEAM = 'hub_vendas'
exports.NAME_APP = 'acquisition_lifeinsurance_profession'
exports.SERVICE_NAME = 'lifeinsurance-profession'
exports.VERSION = '1.0.0'
exports.NODE_ENV = process.env.NODE_ENV || 'local'
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

exports.PROFESSION_API_URL =
	process.env.SENSEDIA_URL || 'https://portoapicloud-hml.portoseguro.com.br'

exports.PROFESSION_API_PATH =
	process.env.API_PATH || 'vida/vida-on/v1/dominios/profissoes'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'
