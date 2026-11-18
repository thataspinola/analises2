const FACTORY_RESPONSE_MOCKS = require('./src/factory/responseFactory.mock')
const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOS = require('./src/api/assistencia/capsenderecos/v1/agendamentosApi.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/requestController.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = FACTORY_RESPONSE_MOCKS
exports.FACTORY_API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOSPAYLOADRESPONSE = require('./src/factory/api/assistencia/capsenderecos/v1/agendamentosPayloadResponseFactory.mock')
exports.FACTORY_API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOSPAYLOADREQUEST = require('./src/factory/api/assistencia/capsenderecos/v1/agendamentosPayloadRequestFactory.mock')

exports.HANDLER = require('./handler.mock')
