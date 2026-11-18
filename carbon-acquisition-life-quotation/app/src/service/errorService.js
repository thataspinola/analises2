const logMetadata = require('./logMetadata')
const factory = require('../factory')
const service = require('../service')

exports.filterError = (errorCode) => {
	switch (errorCode) {
		case 'GN01':
		case 'GN02':
			return factory.responseError.systemUnavailable(errorCode)
		case 'OR04':
			return factory.responseError.insuranceBroker(errorCode)
		case 'OR06':
			return factory.responseError.invalidDiscountCoupon(errorCode)
		case 'OR01':
		case 'OR02':
		case 'OR03':
		case 'OR05':
		case 'OR07':
		case 'OR08':
		case 'OR09':
		case 'OR10':
		case 'OR11':
		case 'OR12':
		case 'OR13':
		case 'OR14':
		case 'OR15':
		case 'OR16':
		case 'OR17':
		case 'OR18':
		case 'OR19':
		case 'OR20':
			return factory.responseError.UnableCompleteQuotation(errorCode)
		default:
			service.logger.error({ code: logMetadata.errorCode(errorCode) }, 'Unmapped life quotation error code')
			return factory.responseError.UnknownError(errorCode)
	}
}
