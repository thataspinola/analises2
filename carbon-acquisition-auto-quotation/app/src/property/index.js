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
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV.trim())

exports.API_PATH = 'automovel/parceiro-marketplace/v1/ofertas/cotacoes'

exports.PRODUCT_CODE = '06'
exports.PRODUCT_STEP = '00'
exports.DEFAULT_ERROR_CODE = '000'
exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'
exports.PARTNER_CODE = 71
exports.AUTO_CONSUMER_DISCOUNT_CODE = 159
exports.CASH_PAYMENT_DISCOUNT_CODE = 196
exports.OTHER_CARD_DISCOUNT_CODE = 197
exports.CONGENER_RENOVATION = 6
exports.NEW_INSURANCE = 0
exports.PORTO_COMPANY_CODE = 1
exports.AZUL_COMPANY_CODE = 35
exports.PORTO_CARD = 97
exports.OTHERS_CARDS = 62
exports.ID_FOR_DISCOUNT_PORTO_CARD = 2
exports.ID_FOR_NO_DISCOUNT_PORTO_CARD = 1
exports.AUTO_ITAU_DISCOUNT_CODE = 142
exports.AUTO_ITAU_ACCOUNT_TYPES = {
	5: 'Itaú',
	7: 'Itaú Uniclass',
	10: 'Itaú Personnalité',
}
exports.ID_ORIGIN_FOR_UPDATE_CALL_ME_LEAD = '36'
exports.UPDATE_LEAD_REASON_STATUS = '778210132'
exports.UPDATE_LEAD_STATUS = '0'
exports.UPDATE_LEAD_AUTO_QUEUE_URL =
	process.env.UPDATE_LEAD_AUTO_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-support-auto-update-lead'

exports.DENY_LEAD_AUTO_QUEUE_URL =
	process.env.DENY_LEAD_AUTO_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-support-deny-lead-queue'

exports.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API =
	process.env.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API ||
	'https://ml6rf47bic-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/'

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

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

exports.QUOTATION_SCHEMA = require('./quotationSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API`

exports.VEHICLE_API_DATA_ERROR_MESSAGE = `Houve um erro com os dados retornados pela API de Cotação do Auto.`

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.APP_DRIVER_CODE = 30

exports.BRAND_CODES = {
	AZUL: 1002,
	PORTO: 1001,
	ITAU: 1003,
	MITSUI: 1004,
}

exports.BRAND_NAMES = {
	[exports.BRAND_CODES.PORTO]: 'Porto Seguro Tradicional',
	[exports.BRAND_CODES.AZUL]: 'Azul Seguro',
	[exports.BRAND_CODES.ITAU]: 'Itaú Seguro',
	[exports.BRAND_CODES.MITSUI]: 'Mitsui Sumitomo Seguros',
}

exports.AZUL_SEGMENT_CODES = {
	TRADICIONAL: 30,
	COMPACTO: 38,
	ROUBO_E_FURTO: 37,
	MOTO_AZUL: [68, 69],
	APA: 57
}

exports.ITAU_SEGMENT_CODES = {
	TRADICIONAL: 50,
	COMPACTO: 59,
}

exports.PORTO_SEGMENT_CODES = {
	PREMIUM: 70,
}

exports.SEGMENTS_NAMES = {
	[exports.BRAND_CODES.AZUL]: {
		[exports.AZUL_SEGMENT_CODES.TRADICIONAL]: 'Azul Seguro Tradicional',
		[exports.AZUL_SEGMENT_CODES.ROUBO_E_FURTO]: 'Azul Seguro Roubo e Furto',
		[exports.AZUL_SEGMENT_CODES.COMPACTO]: 'Azul Seguro Compacto',
		[exports.AZUL_SEGMENT_CODES.APA]: 'Azul por Assinatura'
	},
	[exports.BRAND_CODES.ITAU]: {
		[exports.ITAU_SEGMENT_CODES.TRADICIONAL]: 'Itaú Seguro Tradicional',
		[exports.ITAU_SEGMENT_CODES.COMPACTO]: 'Itaú Seguro Compacto',
	},
	[exports.BRAND_CODES.PORTO]: {
		[exports.PORTO_SEGMENT_CODES.PREMIUM]: 'Porto Auto Premium',
	},
}

const EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES =
	process.env.EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES || '38, 68, 69'
const EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES =
	process.env.EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES || '59'
const NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES =
	process.env.NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES || '37, 17, 18, 60, 64'

exports.EIGHTY_PERCENT_DISCOUNT_LIST_CODES =
	EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES.split(',').map(Number)
exports.EIGHTY_FIVE_PERCENT_DISCOUNT_LIST_CODES =
	EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES.split(',').map(Number)
exports.NINETY_PERCENT_DISCOUNT_LIST_CODES =
	NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES.split(',').map(Number)

exports.QUOTATION_ERROR_OBSERVATION =
	'Cotação não realizada, favor entrar em contato com o cliente'

exports.COVERAGES = {
	3: "Cobertura para danos materiais a terceiros (RCF)",
	4: "Cobertura para danos corporais a terceiros (RCF)",
	5: "Cobertura para os ocupantes do veículo (APP)",
	11: "Danos Morais e Estéticos",
	12: "Assistência para vidros, Lanternas, Retrovisores e faróis",
	22: "Roda, pneu e suspensão",
	30: 'Custos de defesa auto',
	59: "Danos aos Vidros e Retrovisores e Faróis e Lanternas"
}

exports.MAIN_COVERAGES = {
	1: "Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto",
	2: "Incêndio, Roubo e Furto",
	18: "Colisão Total; Incêndio, Roubo e Furto",
	19: "Colisão Parcial; Colisão Total",
	20: "Colisão Total"
}

exports.MAIN_COVERAGES_MAPPING = {
	COLISAO_PARCIAL: {
		description: "Colisão Parcial",
		codes: [1, 19]
	},
	COLISAO_TOTAL: {
		description: "Colisão Total",
		codes: [1, 18, 19, 20],
	},
	INCENDIO_ROUBO_FURTO: {
		description: "Incêndio, Roubo e Furto",
		codes: [1, 2, 18]
	},
}