const service = require('../../../service')
const api = require('../../../api')
const errors = require('../../../common/errors')
const CONSTANTS = require('../../../../src/property')

exports.execute = async (hash, codigoCanal, token, portoCertificates) => {
	let currentActivity = 'Obtendo cotação'
	try {
		let count = 0
		const startProcess = Date.now()

		do {
			if ('test' !== CONSTANTS.CURRENT_ENVIRONMENT.trim()) {
				service.logger.info(
					`aguardando ${CONSTANTS.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS} milisegundos`
				)
				await sleep(CONSTANTS.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS)
			}
			service.logger.info(
				`Realizando GET de cotação - ${++count}x para o hash ${hash}`
			)
			const quotation = await api.portableDevice.getCalculoResponse(
				hash,
				codigoCanal || CONSTANTS.CHANNEL_CODE,
				token,
				portoCertificates
			)

			if (isValidQuotation(quotation)) {
				return quotation
			}
		} while (
			new Date().getTime() <
			new Date(
				startProcess + CONSTANTS.MAX_TIME_PROCESS_QUOTATION * 1000
			).getTime()
		)
		throw new errors.MaxTimeExceededError()
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'getQuotationActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

function isValidQuotation(quotation) {
	if (
		quotation?.hasOwnProperty('pacotes') &&
		quotation.pacotes.some((item) => item.hasOwnProperty('parcelas'))
	) {
		return quotation
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
