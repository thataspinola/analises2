const FACTORY_RESPONSE_MOCKS = require('./src/factory/responseFactory.mock')
const loggerMocks = require('./logger/logger.mock')

exports.LOGGER = loggerMocks
exports.SERVICE_LOGGER = loggerMocks
exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = FACTORY_RESPONSE_MOCKS
