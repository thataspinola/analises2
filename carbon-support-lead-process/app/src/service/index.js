const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.logger = common.service.logger
exports.validation = common.service.validation
exports.cpfValidator = common.service.cpfValidator
exports.cnpjValidation = common.service.cnpjValidation

exports.sqs = require('./sqs')
