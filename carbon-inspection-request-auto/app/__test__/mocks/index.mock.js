exports.HANDLER = require('./handler.mock')
exports.CARBONTOKENLIBRARY = require('./carbonTokenLibrary.mock')

exports.API_VEHICLE = require('./src/api/vehicleApi.mock')
exports.API_PROPOSALTRANSMISSION = require('./src/api/proposalTransmission.mock')
exports.API_UPDATELEAD = require('./src/api/updateLeadApi.mock')

exports.CONTROLLER_INSPECTION = require('./src/controller/inspectionController.mock')

exports.FACTORY_API_UPDATELEAD = require('./src/factory/api/updateLeadApiFactory.mock')
exports.FACTORY_API_PROPOSALTRANSMISSION = require('./src/factory/api/proposalTransmissionApiFactory.mock')
exports.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE = require('./src/factory/service/sqs/checkInspectionRequestQueueMessageFactory.mock')
exports.FACTORY_AXIOSHANDLERERROR = require('./src/factory/axiosHandlerError.mock')
exports.FACTORY_RESPONSE = require('./src/factory/responseFactory.mock')

exports.PROPERTY_INPUTSCHEMA = require('./src/property/inputSchema.mock')

exports.SERVICE_SQS_QUEUE = require('./src/service/sqs/queueService.mock')
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')
