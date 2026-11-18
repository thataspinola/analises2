/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)
exports.DYNAMICS_LIBRARY_LOCATION = getDynamicsLibraryLocation(this.NODE_ENV)
exports.ID_RAMO = {
	resid: '13',
	travel: '610',
	internationalTravel: '611',
	auto: '27',
	cell: '143',
}

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME =
	process.env.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME || 'carbon-lead-in-progress'

/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore else */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

/**
 * Função que retorna o endereço de importação da biblioteca do dynamics
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca do dynamics
 */
function getDynamicsLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-service-connector-dynamics'
	const LAYER_LOCATION = '/opt/nodejs/carbon-service-connector-dynamics/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	/* istanbul ignore else */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.UPDATE_LEAD_SCHEMA = require('./updateLeadSchema')
