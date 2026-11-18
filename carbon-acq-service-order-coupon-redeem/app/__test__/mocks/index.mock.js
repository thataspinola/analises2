const loggerMocks = require('./logger/logger.mock')
exports.CONTROLLER_PROCESSSNSSQSMESSAGE = require('./src/controller/processSnsSqsMessageController.mock')
exports.FACTORY_COUPONREDEEM = require('./src/factory/controller/setServiceOrderCouponRedeemData/index.mocks')
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')
exports.FACTORY_API_PROCESSEDDATAREPORT = require('./src/factory/api/cupomApiResquestFactory/processedDataReportFactory.mock')
exports.LOGGER = loggerMocks
exports.SERVICE_LOGGER = loggerMocks
exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_PROCESSEDDATAREPORT = require('./src/factory/controller/processSnsSqsMessage/processedDataReportFactory.mock')
exports.FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_RECEIVEDDATAREPORT = require('./src/factory/controller/processSnsSqsMessage/receivedDataReportFactory.mock')
exports.HANDLER = require('./handler.mock')

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}
