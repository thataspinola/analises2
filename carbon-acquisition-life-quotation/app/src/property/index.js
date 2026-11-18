require('dotenv').config()

exports.NODE_ENV = process.env.NODE_ENV || 'development'

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapicloud-hml.portoseguro.com.br'
exports.OFERTAS_PATH = 
	process.env.OFERTAS_PATH || 'vida/vida-on/v1/ofertas'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

/** CONSTANTES DE PRODUTO */
exports.PRODUCT_NAME = 'Seguro de Vida'
exports.PRODUCT_SKU = 'SEGURO_DE_VIDA'
exports.PRODUCT_DURATION = '1 ano a partir da data de contratação'
exports.PRODUCT_BENEFITS = '2 benefícios a sua escolha'
exports.BOOST_DIFFERENCE = 1.59

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.QUOTATION_SCHEMA = require('./quotationSchema')

exports.MESSAGES = {
	INDEX: {
		START: "Start lambdaHandler",
		INVALID_BODY: 'Input must be a string',
		CONVERTING_BODY: "Converting body",
		PROCESSING_QUOTATION: "Processing quotation controller",
		SUCCESS: 'Quotation created successfully',
		INPUT_REQUEST: 'Event request'
	},
	QUOTATION_CONTROLLER: {
		VALIDATION: 'Validating the received data'
	}
}