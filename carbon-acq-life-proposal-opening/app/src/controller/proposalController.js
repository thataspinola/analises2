const logMetadata = require('../service/logMetadata')
const CONSTANT = require('../property')
const service = require('../service')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const factory = require('../factory')
const api = require('../api')

/**
 * Processa os dados de entrada, validando-os e enviando-os para a API do Sensedia.
 *
 * @param {Object} inputDataParsed - Os dados de entrada.
 * @return {Object} - Return um objeto factory.response
 */
exports.process = async (inputDataParsed, quotationId, traceId) => {
    try {
        validationService(inputDataParsed, quotationId, traceId)

        const sensediaToken = await getToken(quotationId, traceId)

        await submitProposal(inputDataParsed, sensediaToken, quotationId, traceId)

        return factory.response.success()
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

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                log.carbonErrorData.currentActivity
            )
            return factory.response.badRequestError(ex.message)
		}

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )

        return factory.response.error(ex.message)
    }
}

const validationService = (inputDataParsed, quotationId, traceId) => {
    let currentActivity = ``

    try {
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.VALIDATION
        service.validationService.inputData(inputDataParsed, CONSTANT.PROPOSAL_SCHEMA)
    }catch(ex){
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                log.carbonErrorData.currentActivity
            )
		}

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )
        throw ex
    }
}

const getToken = async (quotationId, traceId) => {
    let currentActivity = ``
    try{
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.GETTING_TOKEN
        return await tokenLayer.getSensediaTokenCarbonCloud()
    }catch(ex){
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )
        throw ex
    }
}

const submitProposal = async (inputDataParsed, sensediaToken, quotationId, traceId) => {
    let currentActivity = ''

    try{
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.CONVERTING_PAYLOAD
        const parsedToLifeProposal = factory.parseLifeProposal.toInputData(inputDataParsed)
        service.logger.info({ traceId: logMetadata.traceId(traceId), quotationId: logMetadata.quotationId(quotationId) }, 'Submitting life proposal')

        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.GETTING_API
        await api.vida.vidaOn.proposal.aberturaApi.submitProposal(
            parsedToLifeProposal,
            quotationId,
            sensediaToken,
            traceId
        )
    }catch(ex){
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )
        throw ex
    }
}
