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
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade de abertura de proposta`,
                errorMessage: ex.message
            }
        }

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
            )
            return factory.response.badRequestError(ex.message)
		}
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
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
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
            )
		}
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
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
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
        )
        throw ex
    }
} 

const submitProposal = async (inputDataParsed, sensediaToken, quotationId, traceId) => {
    let currentActivity = ''
    
    try{
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.CONVERTING_PAYLOAD
        const parsedToLifeProposal = factory.parseLifeProposal.toInputData(inputDataParsed)

        const maskedData  = dataMaskApply(parsedToLifeProposal, traceId, quotationId)
		service.logger.info(maskedData, 'Payload enviado para a abertura de proposta')

        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.GETTING_API
        await api.vida.vidaOn.proposal.aberturaApi.submitProposal(
            parsedToLifeProposal, 
            quotationId, 
            sensediaToken, 
            traceId
        )
    }catch(ex){
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
        )
        throw ex
    }
}

const dataMaskApply = (inputData, traceId, quotationId) => {
    let currentActivity = '';
    try {
        currentActivity = CONSTANT.MESSAGES.PROPOSAL_CONTROLLER.APPLYING_DATA_MASKKING

        const clonedInputData = JSON.parse(JSON.stringify(inputData))

        clonedInputData.proposta.contratante.grupo.segurado.pessoa.dadosPessoaFisica.numeroCpf =
            service.dataMask.maskCpf(clonedInputData.proposta.contratante.grupo.segurado.pessoa.dadosPessoaFisica.numeroCpf)
        clonedInputData.proposta.contratante.grupo.segurado.pessoa.email =
            service.dataMask.maskEmail(clonedInputData.proposta.contratante.grupo.segurado.pessoa.email)
        clonedInputData.proposta.contratante.grupo.segurado.pessoa.nome =
            service.dataMask.maskName(clonedInputData.proposta.contratante.grupo.segurado.pessoa.nome)
        clonedInputData.proposta.contratante.grupo.segurado.pessoa.telefones?.forEach(telefone => {
            telefone.numeroTelefone = service.dataMask.maskPhoneBrazil(telefone.numeroTelefone)
        })
        clonedInputData.proposta.contratante.grupo.segurado.pessoa.pessoaPEP.cpf =
            service.dataMask.maskCpf(clonedInputData.proposta.contratante.grupo.segurado.pessoa.pessoaPEP.cpf)
        clonedInputData.proposta.contratante.grupo.segurado.pessoa.pessoaPEP.nome =
            service.dataMask.maskName(clonedInputData.proposta.contratante.grupo.segurado.pessoa.pessoaPEP.nome)
        
        return clonedInputData
    } catch (ex) {
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: `TraceId: ${traceId} | QuotationId: ${quotationId}`,
                layer: 'ProposalController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
        )
        return 'N/A'
    }
}