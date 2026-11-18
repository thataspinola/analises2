const api = require('../api')
const service = require('../service')
const factory = require('../factory')
const CONSTANTS = require('../property')
const layerToken = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.getQuotation = async (data) => {
	try {
		validationService(data, CONSTANTS.QUOTATION_SCHEMA)
		
        const token = await layerToken.getSensediaTokenCarbonCloud()
		const quotationResponse = await api.vidaOnApi.ofertas(data, token)
        
		switch (quotationResponse.status) {
			case 201:
				return factory.responseSuccess.quotationSuccess(
					quotationResponse.data,
					data.lifeinsurance.date_of_birth
				)
			default:
				service.logger.error(
					`Error getting quotation for input ${
						data.lifeinsurance.date_of_birth
					} - response: ${JSON.stringify(quotationResponse)}`
				)
				return service.error.filterError(quotationResponse?.data?.codigo)
		}
	} catch (ex) {
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: ``,
                layer: 'QuotationController',
                currentActivity: `Erro identificado durante a atividade de obter cotação`,
                errorMessage: ex.message
            }
        }

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
            )
            return factory.responseError.UnknownError()
		}
        
        service.logger.error(
            log,
            `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
        )

		return factory.responseError.UnknownError()
	}
}

const validationService = (data, schema) => {
    let currentActivity = ``

    try {
        currentActivity = CONSTANTS.MESSAGES.QUOTATION_CONTROLLER.VALIDATION
        service.validation.inputData(data, schema)
    }catch(ex){
        const log = {
            rawError: ex,
            carbonErrorData: {
                identifiers: ``,
                layer: 'QuotationController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
                errorMessage: ex.message
            }
        }

        if (ex.name == 'ValidationError') {
			service.logger.warn(
                log,
                `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
            )
		}else{
            service.logger.error(
                log,
                `${log.carbonErrorData.currentActivity}. Error: ${log.carbonErrorData.errorMessage}` 
            )
        }
        throw ex
    }
}