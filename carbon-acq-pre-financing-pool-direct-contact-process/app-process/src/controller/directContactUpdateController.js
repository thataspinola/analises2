const service = require('../service')
const api = require('../api')
const CONSTANT = require('../property')
const errors = require('./../error')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

const inputValidation = (parsedInput) => {
    let currentActivity = 'Validation data'
    try {
        service.validation.inputData(
            parsedInput.formData,
            commonLibrary.DIRECT_CONTACT_UPDATE_SCHEMA
        )
    } catch (error) {
        const message = `Error identified during the activity '${currentActivity}': ${error.message}`
        if (error.name == errors.ValidationError.name) {
            service.logger.warn(message)
        } else {
            service.logger.error(message)
        }
        throw error
    }
}

const getApiGatewayTokens = async () => {
    let currentActivity = 'Get token Sensedia carbon cloud internal Token'
    try {
        const sensediaToken = await token.getSensediaTokenCarbonCloudInternal()

        currentActivity = 'Get certificados'
        const certificates = await token.getPortoCertificates()

        return { sensediaToken, certificates }
    } catch (error) {
        service.logger.error(
            `Error identified during the activity '${currentActivity}': ${error.message}`
        )
        throw error
    }
}

const getLeadCache = async (vdoCode, branchId) => {
    let currentActivity = 
        `Get lead data cache in ${CONSTANT.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME} table`
    
    try {
        const preFinancingLeadCache = 
            await service.dynamoDb.preFinancingLeadDataCache.get(vdoCode, branchId)
        
        if(preFinancingLeadCache.hasOwnProperty('LEAD_ID') 
            && !preFinancingLeadCache.LEAD_ID
        ){
            throw new errors.LeadNotFoundError('Pre Financing lead not found')
        }

        return preFinancingLeadCache.LEAD_ID
    } catch (error) {
        const message = `Error identified during the activity '${currentActivity}': ${error.message}`
        if (error.name == errors.LeadNotFoundError.name
        ) {
            service.logger.warn(message)
        } else {
            service.logger.error(message)
        }
        throw error
    }
}

const updateLead = async (leadId, token, certificates) => {
    let currentActivity = `Request updated lead api of multicanal`
    
    try {
        await api.producaoComercial.multicanal.leads.putContactRequestLead(leadId, token, certificates)
        return
    } catch (error) {
        const message = `Error identified during the activity '${currentActivity}': ${error.message}`
       
        service.logger.error(message)
        throw error
    }
}

exports.process = async (parsedInput) => {
    try{
        inputValidation(parsedInput)

        const lead = parsedInput.formData.lead
        const leadCache = await getLeadCache(lead.vdoCode, lead.branchId)

        const { sensediaToken, certificates } = await getApiGatewayTokens()
        
        service.logger.info(parsedInput, 'atualização de lead: ' + leadCache)
        await updateLead(leadCache, sensediaToken, certificates)

        service.logger.info(`Message ${lead.vdoCode} process with success.`)
    } catch (error) {
        const processRegisterError = new Error(
            `Direct contact request Update processing error: ${error.message}`
        )
        if (error.name === errors.ValidationError.name) {
            service.logger.error(
                'Direct contact request Update processing error: Invalid input data structure.'
            )
        } else {
            service.logger.error(
                `Direct contact request Update processing error: Internal Error. 
                vdoCode: ${parsedInput.formData.lead.vdoCode} and branchId: ${parsedInput.formData.lead.branchId}`
            )
        }

        throw processRegisterError
    }
}