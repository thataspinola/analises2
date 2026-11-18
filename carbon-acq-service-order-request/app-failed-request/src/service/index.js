exports.dynamoDB = require('./dynamoDB')
const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)
exports.logger = common.service.logger
