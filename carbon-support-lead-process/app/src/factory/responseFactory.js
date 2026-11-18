const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.error = common.factory.response.error
exports.badRequestError = common.factory.response.badRequestError

exports.success = (messageId) => {
	const successBody = {
		messageId: messageId
	}

	return common.factory.response.success(successBody)
}