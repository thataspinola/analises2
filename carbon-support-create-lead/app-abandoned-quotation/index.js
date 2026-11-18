const { abandonedQuotationController } = require('./src/controller')
const { ValidationError } = require('./src/error')
const { logger } = require('./src/service')

module.exports.handler = async (event) => {
	if (!Array.isArray(event?.Records)) {
		throw new ValidationError('The request Records must be an array')
	}

	// Validate checkpoints before side effects: an unidentified failure must retry the batch.
	for (const record of event.Records) {
		const sequenceNumber = record?.dynamodb?.SequenceNumber
		if (typeof sequenceNumber !== 'string' || !sequenceNumber.trim()) {
			throw new ValidationError('Each record must have a DynamoDB SequenceNumber')
		}
	}

	for (const record of event.Records) {
		const sequenceNumber = record.dynamodb.SequenceNumber

		try {
			const oldImage = record.dynamodb.OldImage
			if (!oldImage || typeof oldImage !== 'object' || Array.isArray(oldImage)) {
				throw new ValidationError('The DynamoDB record OldImage is required')
			}

			await abandonedQuotationController.process({
				...event,
				Records: [record],
			})
		} catch (error) {
			logger.error(
				{
					eventId: record.eventID,
					sequenceNumber,
					errorName: error?.name || 'Error',
				},
				'Failed to process abandoned quotation stream record'
			)

			// DynamoDB retries this checkpoint and the remaining records in the batch.
			return { batchItemFailures: [{ itemIdentifier: sequenceNumber }] }
		}
	}

	return { batchItemFailures: [] }
}
