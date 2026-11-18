const CONSTANT = require('../../../property')

const isValidPropertyValue = (value) => {
	return value !== undefined && value !== null && value !== ''
}

exports.getDataReport = (parsedSnsSqsMessagePayload) => {
	const number = isValidPropertyValue(
		parsedSnsSqsMessagePayload?.integrationData?.serviceOrderNumber
	)
		? parsedSnsSqsMessagePayload.integrationData.serviceOrderNumber
		: 'N/A'

	const name = isValidPropertyValue(
		parsedSnsSqsMessagePayload?.integrationData?.customer?.name
	)
		? parsedSnsSqsMessagePayload.integrationData.customer?.name
		: 'N/A'

	const socialName = isValidPropertyValue(
		parsedSnsSqsMessagePayload?.integrationData?.customer?.socialName
	)
		? parsedSnsSqsMessagePayload.integrationData.customer?.socialName
		: 'N/A'
	const email = isValidPropertyValue(
		parsedSnsSqsMessagePayload?.integrationData?.customer?.email
	)
		? parsedSnsSqsMessagePayload.integrationData.customer.email.replace(
				CONSTANT.EMAIL_MASK_REGEX,
				'*'
		  )
		: 'N/A'

	return {
		number: number,
		name: name,
		socialName: socialName,
		email: email,
	}
}
