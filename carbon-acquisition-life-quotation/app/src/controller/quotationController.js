const logMetadata = require('../service/logMetadata')
const api = require('../api')
const service = require('../service')
const factory = require('../factory')
const CONSTANTS = require('../property')
const layerToken = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const { ValidationError } = require('../error')

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
				service.logger.error({ statusCode: logMetadata.httpStatus(quotationResponse.status) }, 'Life quotation upstream rejected the request')
				return service.error.filterError(quotationResponse?.data?.codigo)
		}
	} catch (ex) {
        const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                layer: 'QuotationController',
                currentActivity: `Erro identificado durante a atividade de obter cotação`,
            }
        }

        if (ex instanceof ValidationError) {
			service.logger.warn(
                log,
                log.carbonErrorData.currentActivity
            )
            return factory.responseError.invalidRequest()
		}

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
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
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                layer: 'QuotationController',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        if (ex instanceof ValidationError) {
			service.logger.warn(
                log,
                log.carbonErrorData.currentActivity
            )
		}else{
            service.logger.error(
                log,
                log.carbonErrorData.currentActivity
            )
        }
        throw ex
    }
}
