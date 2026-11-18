const { THRESHOLD, TTL } = require('../property')

exports.getMinutesSinceInspectionRequest = (inputBody) => {
	let minutesSinceInspectionRequest = 0
	const inspectionRequestDate = new Date(inputBody.inspectionRequestDate)
	const currentDate = new Date()
	if (currentDate > inspectionRequestDate) {
		minutesSinceInspectionRequest = Math.floor((currentDate.getTime() - inspectionRequestDate.getTime()) / (1000 * 60))
	}
	return minutesSinceInspectionRequest
}

exports.getTtlInMinutes = (minsAgo, attemptAfterPaymentError) => {
    let ttl = null
	
	if (attemptAfterPaymentError) return TTL.UP_TO_FIFTEEN_MINUTES
	
	if (minsAgo <= THRESHOLD.UP_TO_FIFTEEN_MINUTES) {
		ttl = TTL.UP_TO_FIFTEEN_MINUTES
	} else if (minsAgo <= THRESHOLD.UP_TO_TWENTY_FOUR_HOURS) {
		ttl = TTL.UP_TO_TWENTY_FOUR_HOURS
	} else if (minsAgo <= THRESHOLD.MAX_LIMIT) {
		ttl = TTL.MAX_LIMIT
	}
	
	return ttl
}
