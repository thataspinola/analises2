const NODE_ENV = process.env.NODE_ENV || 'local'
exports.NODE_ENV = NODE_ENV

const getSensediaUrlAuto = () => {
	if (NODE_ENV === 'production') {
		return (
			process.env.SENSEDIACLOUD_URL ||
			'https://portoapicloud.portoseguro.com.br'
		)
	}
	return process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'
}

exports.SENSEDIA_URL = getSensediaUrlAuto()

exports.API_PATH =
	process.env.API_PATH || 'automovel/parceiro-marketplace/v1/veiculos'

exports.TYPE_TABLE_REFERENCE = 2

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

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

exports.NO_QUERY_STRING_MESSAGE =
	'Is required: plate or description and yearModel'

exports.VALIDATION_SERVICE_PLATE_MESSAGES = {
	mustBeString: 'Plate must be a string',
	haveFewerThan: 'Plate must NOT have fewer than 7 characters',
	haveMoreThan: 'Plate must NOT have more than 7 characters',
	validFormat: 'Plate must be a valid format',
}

exports.VALIDATION_SERVICE_DESCRIPTION_MESSAGES = {
	mustBeString: 'Description must be a string',
	mustBeStringAt2Characters:
		'Description must be a string containing at least 2 characters',
}

exports.VALIDATION_SERVICE_YEAR_MODEL_MESSAGES = {
	mustBeValidYear:
		'YearModel must be a 4-digit number representing a valid year',
}

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Veículos do Auto.`

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.NO_ALPHANUMERICS_CHARACTERS_REGEX = /[^a-zA-Z0-9]+/g

exports.REMOVE_TABS_AND_BRAKE_LINES_REGEX = /[\t\n]/g

exports.REMOVE_CAT_COD_REGEX = / - CAT\.\d+ - COD\.\d+/g

exports.CONTAINS_ONLY_DIGITS_REGEX = /^\d+$/

exports.PREMIUM_VEHICLE_VALUE = process.env.PREMIUM_VEHICLE_VALUE || 250000.0