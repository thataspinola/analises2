const logMetadata = require('../service/logMetadata')
const CONSTANT = require('./../property')
const service = require('./../service')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const factory = require('./../factory')
const api = require('../api/vida')

exports.process = async (inputData, traceId, quotationId) => {
	try {
		validationService(inputData, traceId, quotationId)

		const {tokenSensediaCloudInternal, certificates} = await getApiGatewayTokens(traceId, quotationId)

		const apiResponseData = await proposalConfirmation(
            inputData,
            tokenSensediaCloudInternal,
            certificates,
            traceId,
            quotationId
        )

		return factory.response.success(apiResponseData)
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

const validationService = (inputData, traceId, quotationId) =>{
	let currentActivity = ''
	try {
		currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.VALIDATION
		service.validationService.inputData(inputData, CONSTANT.PROPOSAL_SCHEMA)
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

const getApiGatewayTokens = async (traceId, quotationId) =>{
	let currentActivity = ``
    try{
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.GETTING_TOKEN
        const tokenSensediaCloudInternal = await tokenLayer.getSensediaTokenCarbonCloudInternal()

        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.GETTING_CERTIFICATES
		const certificates = await tokenLayer.getPortoCertificates()

        return { tokenSensediaCloudInternal, certificates}
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

const proposalConfirmation = async (inputData, token, certificates, traceId, quotationId) =>{
	let currentActivity = ''

    try{
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.POSTTING_PROPOSAL_CONFIRMATION
        const apiResponseData = await api.vidaon.v1.proposta.confirmation.Post(
			inputData,
			token,
            certificates,
			traceId,
            quotationId
		)

		return apiResponseData
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
