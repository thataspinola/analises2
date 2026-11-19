const logMetadata = require('../../../../service/logMetadata')
const CONSTANT = require('../../../../property')
const error = require('../../../../error')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.submitProposal = async (lifeProposalInputData, quotationId, token, traceId) => {
	let currentActivity = CONSTANT.MESSAGES.OPEN_PROPOSAL_API.CONFIGING
	const config = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_PATH}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			partner: CONSTANT.PARTNER_HEADER_VALUE,
			'carbon-trace-id': `${traceId}`
		},
		data: { ...lifeProposalInputData },
	}

	try {
		currentActivity = CONSTANT.MESSAGES.OPEN_PROPOSAL_API.REQUESTING
		await axios(config)
	} catch (ex) {
		const errorHandled = factory.axiosHandlerError(ex)

		const externalApiError = new error.ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			ex.stack
		)

		const log = {
            error: logMetadata.errorSummary(ex),
            carbonErrorData: {
                traceId: logMetadata.traceId(traceId),
                quotationId: logMetadata.quotationId(quotationId),
                layer: 'Integration',
                currentActivity: `Erro identificado durante a atividade '${currentActivity}'`,
            }
        }

        service.logger.error(
            log,
            log.carbonErrorData.currentActivity
        )

		throw externalApiError
	}
}
