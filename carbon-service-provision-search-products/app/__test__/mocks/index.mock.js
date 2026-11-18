const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = require('./src/factory/searchProductsControllerResponse.mock')
exports.FACTORY_SEARCHPRODUCT_ALIAS = require('./src/factory/processProductAliasFactory.mock')

exports.API_PRODUCT = require('./src/api/searchProductsApi.mock')

exports.CONTROLLER_PRODUCT = require('./src/controller/searchProductsController.mock')

exports.HANDLER = require('./handler.mock.js')
