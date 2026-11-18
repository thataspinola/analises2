const loggerMocks = require('../../../app-common/nodejs/carbon-acq-service-order-request-common/__test__/mocks/logger/logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')
exports.SERVICE_SNS_PROCESS = require('./src/service/sns/processSnsService.mock')

exports.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER = require('./src/api/hub-vendas-carbon/prestacao-servico/ordem-servico/index.mock')

exports.CONTROLLER_PROCESSSSQSMESSAGE = require('./src/controller/processSqsMessageController.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_SNS_SERVICEORDERREQUESTED = require('./src/factory/service/sns/serviceOrderRequestedFactory.mock')
exports.FACTORY_API_CREATESERVICEORDERDATA = require('./src/factory/api/hub-vendas-carbon/prestacao-servicos/ordem-servico/createServiceOrderDataFactory.mock')
exports.FACTORY_CONTROLLER_CREATESERVICEORDERDATAREQUEST = require('./src/factory/controller/createServiceOrderDataRequest/index.mocks')

exports.HANDLER = require('./handler.mock')

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}
exports.IMPERSONAL_USER_CARBON = () => {
	return 'token'
}
exports.CREATESERVICEORDERDATA_VALID_RETURN = () => {
	return {
		requestId: 'V5JD8W45RBCNHFD083HGSS6CJVV4KONS05AEMVJF66Q9ASUAAJG',
		message: 'Registro da Ordem de serviço criada com sucesso',
	}
}
