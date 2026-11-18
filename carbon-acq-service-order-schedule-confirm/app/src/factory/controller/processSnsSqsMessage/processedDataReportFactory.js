const isValidPropertyValue = (inputData) => {
	return typeof inputData === 'string' && inputData.trim() !== ''
}
exports.getDataReport = (confirmDataReturn, updateScheduleStatusReturn) => {
	const confirmDataReturnMessage = isValidPropertyValue(
		confirmDataReturn?.message
	)
		? confirmDataReturn.message
		: 'N/A'
	const updateScheduleStatusReturnRequestId = isValidPropertyValue(
		updateScheduleStatusReturn?.requestId
	)
		? updateScheduleStatusReturn.requestId
		: 'N/A'

	const payload = {
		confirmDataReturnMessage,
		updateScheduleStatusReturnRequestId,
	}

	return payload
}
