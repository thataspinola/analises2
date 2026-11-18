require('dotenv').config()
/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'
/* istanbul ignore next */
exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.brasil'
exports.API_VIAGEMON_PAGAMENTO_URL = 'vida/viagem-on/v1/pagamento'
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.STATS_CODE = {
	INTERNAL_SERVER_ERROR: 500
}


exports.MESSAGES = {
	TRANSMISSION_CONTROLLER: {
		GETTING_API: "Chamando a API do Sensedia",
		CURRENT_ACTIVITY: "Erro identificado durante a atividade",
		GETTING_CERTIFICATE: "Obtendo o certificado do Sensedia",
	}
}
