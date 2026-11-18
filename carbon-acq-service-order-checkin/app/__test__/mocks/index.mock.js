const loggerMocks = require('./logger.mock')

exports.CONTROLLER_PROCESSSNSSQSMESSAGE = require('./src/controller/processSnsSqsMessageController.mock')
exports.FACTORY_CHECKIN = require('./src/factory/controller/checkin/checkinFactory.mocks')
exports.FACTORY_API_ASSISTENCIA_WEBHOOK_OSCHASSI_CHECKINOSAPI_POSTCHECKINOSPAYLOAD = require('./src/factory/api/assistencia/webhook/oschassi/checkinOsApi/postCheckinOsPayloadFactory.mock')
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')
exports.LOGGER = loggerMocks
exports.SERVICE_LOGGER = loggerMocks
exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_PROCESSEDDATAREPORT = require('./src/factory/controller/setServiceOrderCheckinData/index.mock')
exports.HANDLER = require('./handler.mock')

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}
