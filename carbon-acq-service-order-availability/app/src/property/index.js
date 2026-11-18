const VALIDATION_SERVICE_APPOINTMENT_SCHEMA = require('./validationServiceAppointmentSchema')

exports.VALIDATION_SERVICE_APPOINTMENT_SCHEMA =
	VALIDATION_SERVICE_APPOINTMENT_SCHEMA.SCHEMA

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.GATEWAY_URL =
	process.env.GATEWAY_URL || 'https://osbhmlwfm.portoseguro.brasil'

exports.API_PATH =
	process.env.API_PATH ||
	'AgendaAtendimentoSocorristaIntegrationService/AgendaAtendimentoSocorristaIntegrationServiceRestV1_0/'

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.PARTNER_ID = '110'

exports.ADDRESS_TYPE = '3'

exports.COMPANY_CODE = process.env.FISCAL_COMPANY_CODE || 95

exports.ORIGIN_CODE = '9'

exports.SOURCE_SYSTEM_CODE = '36'

exports.CATEGORY_TAR_COD = '0'

exports.ASSISTANCE_CODE = '0'

exports.NATURE_CODE = '0'

exports.SUB_NATURE_CODE = '0'

exports.VEHICLE_CODE = '0'

exports.MONTH_NAMES = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]

exports.WEEKDAY_NAMES = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
]

/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

exports.NODE_ENV = NODE_ENV_VALUE

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
