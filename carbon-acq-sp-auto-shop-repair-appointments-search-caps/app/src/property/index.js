/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.GATEWAY_URL =
	process.env.GATEWAY_URL || 'https://apis-hml.portoseguro.brasil'

exports.API_PATH_APPOINTMENTS =
	process.env.API_PATH_APPOINTMENTS ||
	'assistencia/capsenderecos/v1/agendamentos/disponibilidade'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

exports.REQUEST_SCHEMA = require('./requestSchema')

exports.DEFAULT_STREET_NUMBER = '0'

/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`
