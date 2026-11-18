const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/support/createLeadApiRequestPayload.mock.js')
exports.FACTORY_API_HUBVENDASCARBON_ACQUISITION_CREATECARTREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/acquisition/cartCheckoutApiRequestPayload.mock.js')
exports.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD = require('./src/factory/api/commerce-magento/porto/proposalApiRequestPayload.mock')
exports.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD = require('./src/factory/api/commerce-magento/porto/quotationApiRequestPayload.mock.js')

exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_CONTROLLERRESPONSE = require('./src/factory/controllerResponse.mock.js')

exports.API_SUPPORTCREATELEAD = require('./src/api/hub-vendas-carbon/support/createLeadApi.mock')
exports.API_ACQUISITIONCART = require('./src/api/hub-vendas-carbon/acquisition/cartApi.mock.js')
exports.API_COMMERCEMAGENTO_PORTO_PROPOSAL = require('./src/api/commerce-magento/porto/proposalApi.mock')
exports.API_COMMERCEMAGENTO_PORTO_QUOTATION = require('./src/api/commerce-magento/porto/quotationApi.mock')
exports.API_BUSINESSPARTNER_CHECKOUTSIMULATION = require('./src/api/businessPartner/checkoutSimulationApi.mock')
exports.API_BUSINESSPARTNER_COUPONDETAILS = require('./src/api/businessPartner/couponDetailsApi.mock.js')

exports.CONTROLLER_REQUEST = require('./src/controller/requestController.mock.js')
exports.CREATE_LEAD_REQUEST = require('./src/controller/activity/postCreateLeadActivity.mock.js')

exports.HANDLER = require('./handler.mock.js')
