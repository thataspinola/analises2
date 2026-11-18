const controller = require('./src/controller')
const factory = require('./src/factory')
const errors  = require('./src/error')
const service = require('./src/service')
const CONSTANT = require('./src/property')

const lambdaHandler = async (event) => {
	const traceId = factory.trace.generateTraceId(event)
    let currentActivity = CONSTANT.MESSAGES.INDEX.START
    let responseBody = null
    let responseStatusCode = null

    try {
        const body = event.body
        
        if (typeof body !== 'string') {
            throw new errors.ValidationError(CONSTANT.MESSAGES.INDEX.INVALID_BODY)
        }

        currentActivity = CONSTANT.MESSAGES.INDEX.CONVERTING_BODY
        const inputFormData = JSON.parse(body)

        const maskTaxvat = service.dataMask.maskCpf(inputFormData.taxvat)
        service.logger.info(`INPUT REQUEST: ${JSON.stringify({taxvat: maskTaxvat, carbonTraceId: traceId})}`)

        currentActivity = CONSTANT.MESSAGES.INDEX.PROCESSING_CONSENTS
        const responseConsents = await controller.consents.process(inputFormData, traceId)

        responseBody = JSON.stringify(responseConsents.body)
		responseStatusCode = responseConsents.statusCode

    } catch (error) {
        const errorReporting = JSON.stringify({
            rawError: error,
            carbonErrorData: {
                identifiers: `carbon-trace-id: ${traceId}`,
                layer: 'handler',
                currentActivity: `Erro identificado durante a atividade de obter consentimentos`,
                errorMessage: error.message
            }
        })

        service.logger.error(errorReporting, `Erro identificado durante de obter consentimentos: ${error.message}`)
        
        let httpErrorData = null
        if(error?.name === errors.ValidationError.name){
            httpErrorData = factory.response.badRequestError(error.message)
        }else{
            httpErrorData = factory.response.error(error.message)
        }

		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
    }

    service.logger.info(`OUTPUT REQUEST: ${JSON.stringify({body: responseBody, traceId: traceId})}`)

    const response = {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': `${traceId}`},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
};

module.exports.handler = lambdaHandler