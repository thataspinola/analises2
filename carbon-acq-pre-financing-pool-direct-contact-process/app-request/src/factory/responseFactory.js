const CONSTANT = require('../property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.error = common.factory.response.error
exports.badRequestError = common.factory.response.badRequestError

exports.success = (parsedInput, sqsResponse) => {
	const successBodyContent = {
		directContactRequestQueueMessageId: sqsResponse.MessageId,
	}
	return common.factory.response.success(successBodyContent)
}
