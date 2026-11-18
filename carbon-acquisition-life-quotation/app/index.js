const logMetadata = require('./src/service/logMetadata')
const service = require('./src/service')
const factory = require('./src/factory')
const controller = require('./src/controller')
const CONSTANTS = require('./src/property')

module.exports.handler = async (event, context) => {
	let currentActivity = CONSTANTS.MESSAGES.INDEX.START
    let responseBody = null
    let responseStatusCode = null

	try{
		service.logger.info({ requestId: logMetadata.traceId(context?.awsRequestId) }, CONSTANTS.MESSAGES.INDEX.INPUT_REQUEST)

		if (typeof event.body !== 'string') {
            throw new error.ValidationError(CONSTANTS.MESSAGES.INDEX.INVALID_BODY)
        }

		currentActivity = CONSTANTS.MESSAGES.INDEX.CONVERTING_BODY
		const inputData = JSON.parse(event.body)

		currentActivity = CONSTANTS.MESSAGES.INDEX.PROCESSING_PROPOSAL
		const quotation = await controller.quotation.getQuotation(inputData)

		if (quotation.statusCode == 200) {
            service.logger.info({
                requestId: logMetadata.traceId(context?.awsRequestId),
                statusCode: quotation.statusCode,
                quotationCount: Array.isArray(quotation.body?.quotations) ? quotation.body.quotations.length : 0,
            }, CONSTANTS.MESSAGES.INDEX.SUCCESS)
        }

		responseBody =  JSON.stringify(quotation.body)
		responseStatusCode = quotation.statusCode
	} catch (ex) {
		const log = {
			error: logMetadata.errorSummary(ex),
			carbonErrorData: {
                requestId: logMetadata.traceId(context?.awsRequestId),
				layer: 'handler',
				currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
			}
		}

		service.logger.error(
			log,
			log.carbonErrorData.currentActivity
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
