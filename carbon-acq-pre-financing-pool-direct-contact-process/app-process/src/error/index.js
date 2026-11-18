const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.DuplicatedLeadError = require('./duplicatedLeadError')
exports.BlockListError = require('./blockListError')
exports.LeadNotFoundError = require('./leadNotFoundError')
exports.DynamoDbError = require('./DynamoDbError')
exports.ValidationError = common.errors.ValidationError