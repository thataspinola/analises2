const FACTORY_RESPONSE_MOCKS = require('./src/factory/responseFactory.mock')
const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.API_SERVICE_APPOINTMENT = require('./src/api/serviceAppointmentApi.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/requestController.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = FACTORY_RESPONSE_MOCKS
exports.FACTORY_REQUEST_API = require('./src/factory/api/serviceAppointmentApi/serviceAppointmentRequestPayloadFactory.mock')
exports.FACTORY_RESPONSE_API = require('./src/factory/api/serviceAppointmentApi/serviceAppointmentResponsePayloadFactory.mock')

exports.HANDLER = require('./handler.mock')
