const FACTORY_RESPONSE_MOCKS = require('./src/factory/responseFactory.mock')
const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1 = require('./src/api/servico-resolve/appointment-service/v1/index.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/resquestController.mock')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSE = FACTORY_RESPONSE_MOCKS
exports.FACTORY_API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1_APPOINTMENTSERVICEREQUEST = require('./src/factory/api/servico-resolve/appointment-service/v1/AppointmentServiceRequestFactory.mock')
exports.FACTORY_API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1_APPOINTMENTSERVICERESPONSE = require('./src/factory/api/servico-resolve/appointment-service/v1/AppointmentServiceResponseFactory.mock')


exports.HANDLER = require('./handler.mock')
