const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_CONTROLLERRESPONSE = require('./src/factory/controllerResponse.mock.js')
exports.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE = require('./src/factory/api/commerce-magento/porto/cartGraphQLApiResponseFactory.js')

exports.API_COMMERCEMAGENTO_PORTO_CREATECART = require('./src/api/commerce-magento/porto/cartGraphQLApi.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/requestController.mock.js')

exports.HANDLER = require('./handler.mock.js')
