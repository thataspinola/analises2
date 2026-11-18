exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.COMMERCE_URL =
	process.env.COMMERCE_URL || 'https://ecom-stage.portoseguro.com.br'

exports.API_PATH_CREATE_CART = 'graphql'

exports.INPUT_DATA_SCHEMA = require('./inputDataSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

exports.NODE_ENV = NODE_ENV_VALUE
