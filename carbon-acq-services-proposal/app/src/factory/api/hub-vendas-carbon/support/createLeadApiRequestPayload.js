const CONSTANT = require('../../../../property')

exports.getRequestPayload = (inputData) => {
	const responsePayload = {
		...CONSTANT.CREATE_LEAD_DATA,

		scope: inputData.scope,
		client: {
			cpf: inputData.serviceProvision.serviceOrder.requester.documentNumber,
			name: inputData.serviceProvision.serviceOrder.requester.name,
			socialName: inputData.serviceProvision.serviceOrder.requester.socialName,
			cellPhone: inputData.serviceProvision.serviceOrder.requester.cellphone,
			email: inputData.serviceProvision.serviceOrder.requester.email,
		},
		address: {
			zipCode:
				inputData.serviceProvision.serviceOrder.serviceAddresses[0].zipCode,
			street:
				inputData.serviceProvision.serviceOrder.serviceAddresses[0].street,
			number:
				inputData.serviceProvision.serviceOrder.serviceAddresses[0]
					.streetNumber,
			complement:
				inputData.serviceProvision.serviceOrder.serviceAddresses[0]
					.additionalInfo,
			neighborhood:
				inputData.serviceProvision.serviceOrder.serviceAddresses[0]
					.neighborhood,
			city: inputData.serviceProvision.serviceOrder.serviceAddresses[0].city,
			state: inputData.serviceProvision.serviceOrder.serviceAddresses[0].state,
		},

		marketingOptInFlag: inputData.marketingOptInFlag,
		sessionId: inputData.sessionId,
		ipAddress: inputData.ipAddress,
		userAgent: inputData.userAgent,
		susepCode: inputData.susepCode,
		idLink: inputData.affiliateId,
		linkOrigin: inputData.linkOrigin,
	}

	const dataUtmKeys = Object.keys(inputData).filter((dataKey) =>
		dataKey.toLowerCase().startsWith('utm_')
	)

	dataUtmKeys.forEach((dataUtmKey) => {
		responsePayload[`${dataUtmKey}`] = inputData[`${dataUtmKey}`]
	})

	return responsePayload
}
