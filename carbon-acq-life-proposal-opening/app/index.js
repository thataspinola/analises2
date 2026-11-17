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

        const maskInputEnvet = maskInput(inputFormData, traceId, quotationId)
        service.logger.info({ Event: maskInputEnvet, status: CONSTANT.MESSAGES.INDEX.INPUT_REQUEST })

        currentActivity = CONSTANT.MESSAGES.INDEX.PROCESSING_PROPOSAL
        const requestData = await controller.proposalController.process(inputFormData, quotationId, traceId)

        service.logger.info({ quotationId, status: CONSTANT.MESSAGES.INDEX.SUCCESS })

        responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode

    } catch (ex) {
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'handler',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
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

const maskInput = (inputEvent, traceId, quotationId) => {
    try {
        const clonedInputEvent = JSON.parse(JSON.stringify(inputEvent))

        const maskedClient = {
            ...clonedInputEvent.lifeinsurance.client,
            cpf: service.dataMask.maskCpf(clonedInputEvent.lifeinsurance.client.cpf),
            email: service.dataMask.maskEmail(clonedInputEvent.lifeinsurance.client.email),
            cellPhone: service.dataMask.maskPhoneBrazil(clonedInputEvent.lifeinsurance.client.cellPhone),
            name: service.dataMask.maskName(clonedInputEvent.lifeinsurance.client.name),
        }

        const maskedPep = {
            cpf: service.dataMask.maskCpf(clonedInputEvent.lifeinsurance.personPep.cpf),
            name: service.dataMask.maskName(clonedInputEvent.lifeinsurance.personPep.name)
        }

        clonedInputEvent.lifeinsurance.client = maskedClient
        clonedInputEvent.lifeinsurance.personPep = maskedPep

        return clonedInputEvent

    } catch (ex) {
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'handler',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }

        service.logger.warn(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
        )
        return 'N/A'
    }
}

module.exports.handler = lambdaHandler