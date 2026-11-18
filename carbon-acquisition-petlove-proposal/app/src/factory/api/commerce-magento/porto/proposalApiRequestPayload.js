const CONSTANTS = require('../../../../property')

exports.getRequestPayload = (inputData, commerceQuotationId, leadData) => {
	return {
		proposal: {
			scope: CONSTANTS.SCOPE,
			petlove: {
				quotation_token: commerceQuotationId,
				lead_identifier: leadData?.vdoCode,
				broker: {
					link_id: leadData?.idLead,
					name: getValidBrokerValue(
						inputData?.brokerName,
						leadData?.brokerName
					),
					email: getValidBrokerValue(
						inputData?.brokerEmail,
						leadData?.brokerEmail
					),
					phone: getValidBrokerValue(
						inputData?.brokerPhone,
						leadData?.brokerPhone
					),
					susep_code: getValidBrokerValue(
						inputData?.susepCode,
						leadData?.susepCode
					),
				},
				client: {
					name: inputData.user.fullName,
					email: inputData.user.email,
					cpf: inputData.user.cpf,
					phone: inputData.user.phone,
				},
			},
		},
	}
}

function getValidBrokerValue(parsedInputData, leadData) {
	return parsedInputData?.trim() ? parsedInputData : leadData
}
