const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'
exports.NODE_ENV = NODE_ENV_VALUE

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())
exports.PAYMENT_DATA_LIBRARY_LOCATION = getPaymentLibraryLocation(
	this.NODE_ENV.trim()
)

const getSensediaUrlAuto = () => {
	if (NODE_ENV_VALUE === 'production') {
		return (
			process.env.SENSEDIACLOUD_URL ||
			'https://portoapicloud.portoseguro.com.br'
		)
	}
	return process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'
}

exports.SENSEDIA_URL = getSensediaUrlAuto()

exports.VEHICLE_API_URL =
	process.env.VEHICLE_API_URL ||
	'https://zms8iybuyb.execute-api.ca-central-1.amazonaws.com'

exports.V1_AUTO_VEHICLE_SEARCH_ENDPOINT =
	process.env.V1_AUTO_VEHICLE_SEARCH_ENDPOINT || 'v1/auto-vehicle-search'

exports.UPDATE_LEAD_API_URL =
	process.env.UPDATE_LEAD_API_URL ||
	'https://aa5ipxhedk.execute-api.ca-central-1.amazonaws.com'

exports.V1_UPDATE_LEAD_ENDPOINT =
	process.env.V1_UPDATE_LEAD_ENDPOINT || 'v1/update-lead'

exports.PARTNER_CODE = 71

exports.UPDATE_LEAD_REASON_STATUS = '778210083'
exports.UPDATE_LEAD_STATUS_MESSAGE = '0'

exports.PENDING_STATUS = 'PENDING'

exports.AUTO_PROPOSAL_TRANSMISSION_PATH = (numeroCotacao, codigoOrcamento) => {
	return `automovel/parceiro-marketplace/v1/ofertas/cotacoes/${numeroCotacao}/orcamentos/${codigoOrcamento}/propostas/transmissoes`
}

exports.CHECK_INSPECTION_REQUEST_QUEUE_URL =
	process.env.CHECK_INSPECTION_REQUEST_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-check-inspection-request-auto'

exports.ID_RAMO_UPDATE_LEAD = 27

exports.REQUIRED_INSPECTION_OBSERVATION = 'Vistoria previa'

const INPUT_SCHEMA_DEFINITION = require('./inputSchema')
exports.QUEUE_MESSAGE_SCHEMA = INPUT_SCHEMA_DEFINITION.SCHEMA

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a busca de Veículos do Auto.`

exports.PROPOSAL_PROCESS_BEING_ISSUED_MESSAGE =
	'Proposta em Processo de Emissão, consulte o Protocolo mais tarde!'

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

function getPaymentLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-postponed-payment-data/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}
