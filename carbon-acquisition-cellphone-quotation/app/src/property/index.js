const NODE_ENV = process.env.NODE_ENV || 'local'
exports.CURRENT_ENVIRONMENT = NODE_ENV
exports.NODE_ENV = NODE_ENV

exports.MAX_TIME_PROCESS_QUOTATION =
	process.env.MAX_TIME_PROCESS_QUOTATION || 20

exports.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS =
	process.env.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS || '4000'

exports.COUPON_API_URL =
	process.env.COUPON_API_URL ||
	'https://qo3cmbems1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com'

exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.brasil'

exports.API_PATH = 're/celular/v1/calculo'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.PRODUCT_SCOPE = 'Seguro Celular'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV.trim())

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

exports.CHANNEL_CODE_COUPON_AUTOA_PPLY = (process.env.CHANNEL_CODE_COUPON_AUTO_APPLY || '').split(',').map(channel => channel.trim()).filter(Boolean)

exports.QUOTATION_SCHEMA = require('./quotationSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação do celular.`

exports.MAXIMUM_TIME_EXCEEDED_ERROR_MESSAGE = `Tempo máximo excedido ao tentar obter a cotação`

exports.QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação do Celular para geração do hash.`

exports.QUOTATION_CALCULATION_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação do Celular para busca do calculo.`

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.COUPON_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cupom.`

exports.COUPON_API_ERROR_INVALID_COUPON = `invalid coupon`

exports.COUPON_API_ERROR_CODE_DEFAULT = `hub-coupon`

exports.CARBON_QUEUE_URL =
	process.env.CARBON_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-ppweb-quotation-insert'


exports.PRODUCT_CODE = '05'
exports.PRODUCT_STEP = '00'
exports.DEFAULT_ERROR_CODE = '000'
exports.SUPER_APP_CHANNEL_CODE = 82

exports.SUSEP_FUNCIONARIO = process.env.EMPLOYEE_SUSEP || "P5005J"
exports.SUSEP_NOMAD = 'QI067J'
exports.SUSEP_BHG = 'VP518J'
exports.SUSEP_COB47J = 'COB47J'
exports.SUSEP_4N6U1J = '4N6U1J'

exports.PUBLISH_MESSAGE_DENY_LEAD = "Publicando messagem de 'deny-lead'"

exports.DENY_LEAD_QUEUE_URL = process.env.DENY_LEAD_QUEUE_URL || 
	'https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-support-deny-lead-queue'

exports.DENY_LEAD_MESSAGE_REASON = "Risco não aceito na cotação do seguro celular"