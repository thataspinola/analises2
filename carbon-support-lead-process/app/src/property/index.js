const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'
const path = require('path')
exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)
const common = require(this.COMMON_LIBRARY_LOCATION)

exports.LEAD_SCHEMA = common.LEAD_SCHEMA
exports.AWS_REGION = 'ca-central-1'
exports.LEAD_QUEUE_URL = process.env.LEAD_QUEUE_URL || 
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-support-lead'

function getCommonLibraryLocation(NODE_ENV) {
	const LOCAL_LOCATION = path.join(
		__dirname,
		'../../../app-common/nodejs/carbon-support-lead-common'
	)
	const LAYER_LOCATION =
		'/opt/nodejs/carbon-support-lead-common'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL_LOCATION
	return LAYER_LOCATION
}

exports.MESSAGES = {
	LAYER: {
		HANDLER: 'Handler',
		LEAD_CONTROLLER: 'Lead Controller'
	},
	HANDLER: {
		INVALID_BODY: "A propriedade body é obrigatória",
		CURRENT_ACTIVITY: "Erro identificado durante a atividade"
	},
	LEAD_CONTROLLER: {
		INPUT_DATA: "INPUT REQUEST",
		VALIDATION: "Validando os dados recebidos",
		ACTIVITY: "Erro identificado durante a atividade de envio para a fila de criação de lead:",
		CURRENT_ACTIVITY: "Erro identificado durante a atividade:",
		SENDING_MESSAGE: "Postando mensagem na fila",
		CREATED_MESSAGE_SUCCESS: "Mensagem criada com sucesso. MessageId:"
	}
}

exports.ERROR_MESSAGES = common.ERROR_MESSAGES