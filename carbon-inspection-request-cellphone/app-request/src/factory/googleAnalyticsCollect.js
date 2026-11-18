exports.getMessage = (inputData, proposalId) => {
	let message = JSON.parse(JSON.stringify(inputData.integrationData.analytics))

	message.events[0].params.service_protocol = inputData.orderNumber

	message.events[0].params.proposal_id = proposalId

	return message
}
