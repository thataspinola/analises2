const CONSTANT = require('../../../property')

const isValidPropertyValue = (value) => {
	return value !== undefined && value !== null && value !== ''
}

exports.getDataReport = (parsedSqsMessagePayload) => {
	const externalId = isValidPropertyValue(parsedSqsMessagePayload?.externalId)
		? parsedSqsMessagePayload.externalId
		: 'N/A'

	const transactionId = isValidPropertyValue(
		parsedSqsMessagePayload?.transactionId
	)
		? parsedSqsMessagePayload.transactionId
		: 'N/A'

	const sku = isValidPropertyValue(
		parsedSqsMessagePayload?.integrationData?.serviceOrder?.sku
	)
		? parsedSqsMessagePayload.integrationData.serviceOrder?.sku
		: 'N/A'

	const email = isValidPropertyValue(
		parsedSqsMessagePayload?.integrationData?.customer?.email
	)
		? parsedSqsMessagePayload.integrationData.customer.email.replace(
				CONSTANT.EMAIL_MASK_REGEX,
				'*'
		  )
		: 'N/A'

	return {
		externalId: externalId,
		transactionId: transactionId,
		sku: sku,
		email: email,
	}
}
