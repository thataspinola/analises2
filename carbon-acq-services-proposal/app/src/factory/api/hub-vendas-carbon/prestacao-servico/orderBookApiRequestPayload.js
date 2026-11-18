exports.getRequestPayload = (inputData) => {
	const responsePayload = {
		scheduleType: inputData.serviceProvision.schedule.scheduleType,
		serviceDateTime: inputData.serviceProvision.schedule.serviceDateTime,
		city: inputData.serviceProvision.serviceOrder.serviceAddresses[0].city,
		stateCode:
			inputData.serviceProvision.serviceOrder.serviceAddresses[0].state,
		latitude:
			inputData.serviceProvision.serviceOrder.serviceAddresses[0].latitude,
		longitude:
			inputData.serviceProvision.serviceOrder.serviceAddresses[0].longitude,
		specialtyCode: inputData.serviceProvision.schedule.specialtyCode,
		originCode: inputData.serviceProvision.schedule.originCode,
		problemCode: inputData.serviceProvision.schedule.problem || null,
	}

	return responsePayload
}
