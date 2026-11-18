const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.ValidationError = common.errors.ValidationError
exports.TokenError = require('./TokenError')