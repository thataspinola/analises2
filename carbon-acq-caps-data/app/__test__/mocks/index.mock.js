const FACTORY_RESPONSE_MOCKS = require('./src/factory/responseFactory.mock')
const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS = require('./src/api/assistencia/capsenderecos/v1/infoCapsApi.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/resquestController.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = FACTORY_RESPONSE_MOCKS
exports.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE = require('./src/factory/api/assistencia/capsenderecos/v1/infoCapsPayloadResponseFactory.mock')

exports.HANDLER = require('./handler.mock')
