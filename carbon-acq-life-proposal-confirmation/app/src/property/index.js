require('dotenv').config()

/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'
exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapicloud-hml.portoseguro.brasil'

exports.API_PATH =
	process.env.API_PATH || 'vida/vida-on/v1/proposta/confirmacao'

exports.PROPOSAL_SCHEMA = require('./proposalSchema')

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	/* istanbul ignore else */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.MESSAGES = {
	INDEX: {
		START: "Start lambdaHandler",
		INVALID_BODY: 'Input must be a string',
		CONVERTING_BODY: "Converting body",
		PROCESSING_PROPOSAL: "Processing proposal controller",
		SUCCESS: 'Proposal created successfully',
		INPUT_REQUEST: 'Evento request'
	},
	PROPOSAL_CONTROLLER: {
		VALIDATION: "Validando os dados recebidos",
		GETTING_TOKEN: "Obtendo o token Sensedia",
		POSTTING_PROPOSAL_CONFIRMATION: "Chamando a API de confirmação de proposta",
		GETTING_CERTIFICATES: "Obtenção dos certificados"
	},
	PROPOSAL_CONFIRMATION_API: {
		CONFIGING: 'Criando config gateway api de abertura de proposta',
		REQUESTING: 'chamando api abertura de proposta'
	}
}