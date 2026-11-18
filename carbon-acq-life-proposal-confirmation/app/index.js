const logMetadata = require('./src/service/logMetadata')
const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')
const error = require('./src/error')
const CONSTANT = require('./src/property')

const lambdaHandler = async (event) => {
	const traceId = factory.trace.createdTraceId(event)
    let currentActivity = CONSTANT.MESSAGES.INDEX.START
	let quotationId = null
	let responseBody = null
	let responseStatusCode = null

	try {
		if (typeof event.body !== 'string') {
			throw new error.ValidationError(CONSTANT.MESSAGES.INDEX.INVALID_BODY)
		}

		service.logger.info({ traceId: logMetadata.traceId(traceId) }, CONSTANT.MESSAGES.INDEX.INPUT_REQUEST)

		currentActivity = CONSTANT.MESSAGES.INDEX.CONVERTING_BODY
		const parsedInput = JSON.parse(event.body)

		quotationId = parsedInput?.numeroOrcamento

		currentActivity = CONSTANT.MESSAGES.INDEX.PROCESSING_PROPOSAL
		const proposalControllerResponse =
			await controller.proposalController.process(parsedInput, traceId, quotationId)

		service.logger.info({ traceId: logMetadata.traceId(traceId), quotationId: logMetadata.quotationId(quotationId), statusCode: logMetadata.httpStatus(proposalControllerResponse.statusCode) }, CONSTANT.MESSAGES.INDEX.SUCCESS)

		responseBody = JSON.stringify(proposalControllerResponse.body)
		responseStatusCode = proposalControllerResponse.statusCode
	} catch (ex) {
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade de abertura de proposta`,
            }
        }
		service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )

		let  httpErrorData

		if(ex.name === 'ValidationError'){
			httpErrorData = factory.response.badRequestError(ex.message)
		}else{
			httpErrorData = factory.response.error(ex.message)
		}

		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
    }

	const response = {
		isBase64Encoded: false,
		headers:  {'carbon-trace-id' : traceId},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}

module.exports.handler = lambdaHandler
