/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.LOGGER = 'lambda_service_order_request_logger'

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API.`
