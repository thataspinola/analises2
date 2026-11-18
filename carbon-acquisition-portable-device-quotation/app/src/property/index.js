const NODE_ENV = process.env.NODE_ENV || 'local'
exports.CURRENT_ENVIRONMENT = NODE_ENV
exports.NODE_ENV = NODE_ENV

exports.AWS_REGION = 'ca-central-1'

exports.MAX_TIME_PROCESS_QUOTATION =
	process.env.MAX_TIME_PROCESS_QUOTATION || 25

exports.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS =
	process.env.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS || '4000'

exports.COUPON_API_URL =
	process.env.COUPON_API_URL ||
	'https://qo3cmbems1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com'

exports.COUPON_SCOPE = 'portable_device'

exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.brasil'

exports.API_PATH = 're/celular/v1/calculo'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.isDevEnv = (nodeEnv = NODE_ENV) => {
	return ['local', 'test', 'development', 'stage'].includes(nodeEnv)
}

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV.trim())

/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	if (['local', 'test'].includes(NODE_ENV)) {
		return NEXUS_LOCATION
	}

	return LAYER_LOCATION
}

exports.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API =
	process.env.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API ||
	'https://ezznkamnok-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/create-lead'

exports.QUOTATION_SCHEMA = require('./quotationSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação dos Equipamentos Portáteis.`
exports.MAXIMUM_TIME_EXCEEDED_ERROR_MESSAGE = `Tempo máximo excedido ao tentar obter a cotação`
exports.QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação dos Equipamentos Portáteis para geração do hash.`
exports.QUOTATION_CALCULATION_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cotação dos Equipamentos Portáteis para busca do calculo.`
exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'
exports.COUPON_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cupom.`
exports.COUPON_API_ERROR_INVALID_COUPON = `invalid coupon`
exports.COUPON_API_ERROR_CODE_DEFAULT = `hub-coupon`

exports.PRODUCT_CODE = '05'
exports.PRODUCT_STEP = '00'
exports.DEFAULT_ERROR_CODE = '000'

exports.SUSEP_FUNCIONARIO = 'S5005J'

exports.CHANNEL_CODE = 58
exports.CALCULATION_TYPE_CODE = 2
exports.MAIN_USER_AGE_GROUP_CODE = 1
exports.MAIN_RELEVANCE_CODE = 1
exports.INSURANCE_TYPE_CODE = 1

exports.OPERATION_CODE_EMPLOYEE = '708'
exports.OPERATION_CODE_DEFAULT = '597'

exports.PAYMENT_CODE_NORMAL = '62'
exports.PAYMENT_CODE_PORTOCARD = '97'

exports.DEFAULT_INSURED_PARTICIPATION = 0

exports.DYNAMODB_TABLE_NAME = 'carbon-sequences'

exports.DEVICE_SUBTYPE_MAPPING = {
	26: 512, // NOTEBOOK
	29: 655, // TABLET
	31: 718, // VIDEO GAME
	32: 302, // CÂMERA FILMADORA
	33: 124, // CÂMERA FOTOGRÁFICA
	67: 647, // SMART WATCH
	71: 1219, // SMART RING
	74: 1240, // Leitor Digital
	75: 810, // Óculos De Realidade Virtual
	76: 1229, // Óculos Com Inteligência Artificial
	77: 1230, // Video Game Console
	78: 1239, // Desktop Gamer
	79: 858, //	Monitor
}

exports.SCOPE = 'portable_device'
exports.DEVICE_AGE = 1

exports.ID_BRANCH_MAPPING = {
	201: [32, 33, 72],
	202: [26, 29, 74],
	203: [31, 67, 71, 75, 76, 77, 78, 79],
}

exports.CREATE_LEAD_DATA = {
	origin: '35',
	reference: 'hub',
	channel: 'portal do cliente',
	domain: 'http://portoseguro.com.br',
	environmentType: 'Site',
	managementArea: 'portocom',
	nameArea: 'portal cliente',
	vertical: 'Institucional',
	idProduct: '9',
	idGoogle: '',
	pmcInfo: '',
}

// ─── Coverage Plan Codes ────────────────────────────────────────────────────
exports.COVERAGE_PLAN_CODES =
	process.env.COVERAGE_PLAN_CODES
		? JSON.parse(process.env.COVERAGE_PLAN_CODES)
		: Object.freeze({
			THEFT:                                    6,
			THEFT_AND_BREAKAGE:                       7,
			THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT:      8,
			THEFT_NOTEBOOK_AND_TABLET:                15,
			THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET:   11,
			THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET: 8,
		})

// ─── Coverage Codes ─────────────────────────────────────────────────────────
exports.COVERAGE_CODES = Object.freeze({
  LOSS_OF_RENT:                    4,
  ROBBERY_AND_THEFT_BY_BREAKING_IN: 644,
  ACCIDENTAL_BREAKAGE:             643,
})

// ─── Offer Codes ────────────────────────────────────────────────────────────
exports.OFFER_CODES = Object.freeze({
  NOTEBOOK_AND_TABLET: 5220,
  PHOTO_AND_VIDEO:     5221,
  SMART_AND_GAMES:     5222,
})

// ─── Coverage Plan Map ───────────────────────────────────────────────────────
const { COVERAGE_PLAN_CODES, COVERAGE_CODES } = exports

const COVERAGE_PLAN_MAP = Object.freeze({
  THEFT: {
    code: COVERAGE_PLAN_CODES.THEFT,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
    ],
  },
  THEFT_AND_BREAKAGE: {
    code: COVERAGE_PLAN_CODES.THEFT_AND_BREAKAGE,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
      COVERAGE_CODES.ACCIDENTAL_BREAKAGE,              // 643
    ],
  },
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT: {
    code: COVERAGE_PLAN_CODES.THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
      COVERAGE_CODES.ACCIDENTAL_BREAKAGE,              // 643
      COVERAGE_CODES.LOSS_OF_RENT,                     // 4
    ],
  },
  THEFT_NOTEBOOK_AND_TABLET: {
    code: COVERAGE_PLAN_CODES.THEFT_NOTEBOOK_AND_TABLET,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
    ],
  },
  THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET: {
    code: COVERAGE_PLAN_CODES.THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
      COVERAGE_CODES.ACCIDENTAL_BREAKAGE,              // 643
    ],
  },
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET: {
    code: COVERAGE_PLAN_CODES.THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET,
    coverages: [
      COVERAGE_CODES.ROBBERY_AND_THEFT_BY_BREAKING_IN, // 644
      COVERAGE_CODES.ACCIDENTAL_BREAKAGE,              // 643
      COVERAGE_CODES.LOSS_OF_RENT,                     // 4
    ],
  },
})

// ─── Device Subtype Enum ─────────────────────────────────────────────────────
exports.DEVICE_SUBTYPE_ENUM = Object.freeze({
  // offerCode: 5220
  NOTEBOOK_26:        26,
  TABLET_29:          29,
  LEITOR_DIGITAL_74:  74,

  // offerCode: 5221
  CAMERA_FILMADORA_32:  32,
  CAMERA_FOTOGRAFICA_33: 33,
  DRONE_72:             72,

  // offerCode: 5222
  VIDEO_GAMES_PORTATEIS_31:              31,
  SMARTWATCH_67:                         67,
  SMART_RING_71:                         71,
  OCULOS_DE_REALIDADE_VIRTUAL_75:        75,
  OCULOS_COM_INTELIGENCIA_ARTIFICIAL_76: 76,
  VIDEO_GAME_CONSOLE_77:                 77,
  DESKTOP_GAMER_78:                      78,
  MONITOR_79:                            79,
})

// ─── Device Subtype Package ──────────────────────────────────────────────────
const {
  THEFT,
  THEFT_AND_BREAKAGE,
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT,
  THEFT_NOTEBOOK_AND_TABLET,
  THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET,
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET,
} = COVERAGE_PLAN_MAP

exports.DEVICE_SUBTYPE_PACKAGE = {
  // ── offerCode: 5220 ── plans: 6, 7, 13 ──────────────────────────────────
  NOTEBOOK_26:       [THEFT_NOTEBOOK_AND_TABLET, THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET, THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET],
  TABLET_29:         [THEFT_NOTEBOOK_AND_TABLET, THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET, THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET],
  LEITOR_DIGITAL_74: [THEFT_NOTEBOOK_AND_TABLET, THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET],

  // ── offerCode: 5221 ── plans: 6, 7, 8 ────────────────────────────────────
  CAMERA_FILMADORA_32:   [THEFT, THEFT_AND_BREAKAGE, THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT],
  CAMERA_FOTOGRAFICA_33: [THEFT, THEFT_AND_BREAKAGE, THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT],
  DRONE_72:              [THEFT],

  // ── offerCode: 5222 ── plans: 6, 7 ───────────────────────────────────────
  VIDEO_GAMES_PORTATEIS_31:              [THEFT, THEFT_AND_BREAKAGE],
  SMARTWATCH_67:                         [THEFT, THEFT_AND_BREAKAGE],
  SMART_RING_71:                         [THEFT, THEFT_AND_BREAKAGE],
  OCULOS_DE_REALIDADE_VIRTUAL_75:        [THEFT, THEFT_AND_BREAKAGE],
  OCULOS_COM_INTELIGENCIA_ARTIFICIAL_76: [THEFT, THEFT_AND_BREAKAGE],
  VIDEO_GAME_CONSOLE_77:                 [THEFT, THEFT_AND_BREAKAGE],
  DESKTOP_GAMER_78:                      [THEFT, THEFT_AND_BREAKAGE],
  MONITOR_79:                            [THEFT, THEFT_AND_BREAKAGE],
}