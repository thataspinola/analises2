const logMetadata = require('./src/service/logMetadata')
const controller = require('./src/controller')
const factory = require('./src/factory')
const error = require('./src/error')
const service = require('./src/service')
const CONSTANT = require('./src/property')

/**
 * Função que processa um evento recebendo dados de entrada para criar uma proposta.
 *
 * Este manipulador de lambda valida o corpo do evento, converte os dados de entrada e chama
 * o controller para processar a proposta. Em caso de sucesso, retorna um status 204.
 * Em caso de erro, registra informações detalhadas sobre o erro e retorna um status de erro apropriado.
 *
 * @param {Object} event - O evento que contém os dados de entrada.
 * @param {string} event.body - O corpo do evento que deve ser uma string JSON representando os dados da proposta.
 *
 * @returns {Promise<Object>} - Retorna uma promessa que resolve para um objeto de resposta da API,
 * contendo o status HTTP e, se aplicável, uma mensagem de sucesso ou erro.
 *
 */
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

        currentActivity = CONSTANT.MESSAGES.INDEX.CONVERTING_BODY
        const inputFormData = JSON.parse(event.body)

        quotationId = inputFormData?.lifeinsurance?.porto_quotation_id
        service.logger.info({ traceId: logMetadata.traceId(traceId), quotationId: logMetadata.quotationId(quotationId) }, CONSTANT.MESSAGES.INDEX.INPUT_REQUEST)

        currentActivity = CONSTANT.MESSAGES.INDEX.PROCESSING_PROPOSAL
        const requestData = await controller.proposalController.process(inputFormData, quotationId, traceId)

        service.logger.info({ traceId: logMetadata.traceId(traceId), quotationId: logMetadata.quotationId(quotationId), statusCode: logMetadata.httpStatus(requestData.statusCode) }, CONSTANT.MESSAGES.INDEX.SUCCESS)

        responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode

    } catch (ex) {
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'handler',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )

        const httpErrorData = factory.response.error(ex.message)
		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
    }

    const response = {
		isBase64Encoded: false,
		headers: {'carbon-trace-id': traceId},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}

module.exports.handler = lambdaHandler
