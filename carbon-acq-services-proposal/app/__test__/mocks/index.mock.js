const loggerMocks = require('./logger.mock')
exports.LOGGER = loggerMocks

exports.SERVICE_LOGGER = loggerMocks
exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.FACTORY_API_SERVICE_APPOINTMENT_REQUEST = require('./src/factory/api/serviceAppointmentApi/serviceAppointmentRequestPayload.mock.js')
exports.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE = require('./src/factory/api/serviceAppointmentApi/serviceAppointmentResponsePayload.mock.js')
exports.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD = require('./src/factory/api/commerce-magento/porto/proposalApiRequestPayload.mock')
exports.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD = require('./src/factory/api/commerce-magento/porto/quotationApiRequestPayload.mock.js')
exports.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/prestacao-servico/orderBookApiRequestPayload.mock')
exports.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD = require('./src/factory/api/hub-vendas-carbon/prestacao-servico/orderBookApiResponsePayload.mock')
exports.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/support/createLeadApiRequestPayload.mock.js')
exports.FACTORY_API_HUBVENDASCARBON_ACQUISITION_CREATECARTREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/acquisition/cartCheckoutApiRequestPayload.mock.js')
exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_CONTROLLERRESPONSE = require('./src/factory/controllerResponse.mock.js')
exports.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD = require('./src/factory/controller/request/processedReturnPayloadFactory.mock.js')


exports.API_COMMERCEMAGENTO_PORTO_PROPOSAL = require('./src/api/commerce-magento/porto/proposalApi.mock')
exports.API_COMMERCEMAGENTO_PORTO_QUOTATION = require('./src/api/commerce-magento/porto/quotationApi.mock')
exports.API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOK = require('./src/api/hub-vendas-carbon/prestacao-servico/orderBookApi.mock.js')
exports.API_HUBVENDASCARBON_PRESTACAOSERVICO_PRICING = require('./src/api/hub-vendas-carbon/prestacao-servico/pricingApi.mock.js')
exports.API_SUPPORTCREATELEAD = require('./src/api/hub-vendas-carbon/support/createLeadApi.mock')
exports.API_HUBVENDASCARBON_ACQUISITION_CARTCHECKOUT = require('./src/api/hub-vendas-carbon/acquisition/cartCheckoutApi.mock.js')
exports.API_SERVICE_APPOINTMENT = require('./src/api/serviceAppointmentApi.mock')

exports.CONTROLLER_REQUEST = require('./src/controller/requestController.mock.js')

exports.HANDLER = require('./handler.mock.js')
