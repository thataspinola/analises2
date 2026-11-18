const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)
exports.response = common.factory.response
exports.api = require('./api')
exports.sns = require('./sns')
exports.sqs = require('./sqs')
exports.controller = require('./controller')
exports.service = require('./service')
