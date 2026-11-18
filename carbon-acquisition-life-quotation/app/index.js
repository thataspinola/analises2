const service = require('./src/service')
const factory = require('./src/factory')
const controller = require('./src/controller')
const CONSTANTS = require('./src/property')

module.exports.handler = async (event, context) => {
	let currentActivity = CONSTANTS.MESSAGES.INDEX.START
    let responseBody = null
    let responseStatusCode = null

	try{
		service.logger.info(`Event: ${event.body}`)

		if (typeof event.body !== 'string') {
            throw new error.ValidationError(CONSTANTS.MESSAGES.INDEX.INVALID_BODY)
        }

		currentActivity = CONSTANTS.MESSAGES.INDEX.CONVERTING_BODY
		const inputData = JSON.parse(event.body)

		currentActivity = CONSTANTS.MESSAGES.INDEX.PROCESSING_PROPOSAL
		const quotation = await controller.quotation.getQuotation(inputData)

		if (quotation.statusCode == 200) {
			const dateOfBirth = event?.lifeinsurance?.date_of_birth
			let portoQuotationIds = []

			for (let item of quotation.body.quotations) {
				const quotation = item.porto_quotation_id
				portoQuotationIds.push(quotation)
			}
			service.logger.info({ dateOfBirth, portoQuotationIds })
		}

		responseBody =  JSON.stringify(quotation.body)
		responseStatusCode = quotation.statusCode
	} catch (ex) {
		const log = {
			rawError: ex,
			carbonErrorData: {
				identifiers: ``,
				layer: 'handler',
				currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
				errorMessage: ex.message
			}
		}
		
		service.logger.error(
			log,
			`${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
		)

		const httpErrorData = factory.responseError.UnknownError()
		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
	}

	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}