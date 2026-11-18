const api = require('../../../api')
const factory = require('../../../factory')
const service = require('../../../service')

exports.execute = async (parsedInputData) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API createLead'
	try {
		const payload =
			factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload(
				parsedInputData
			)

		currentActivity = 'Chamada do endpoint de API CreateLead lambda'
		service.logger.info(`${currentActivity} ${JSON.stringify(payload)}`)

		const response =
			await api.hubVendasCarbon.support.createLead.postCreateLead(payload)

		currentActivity = 'Retorno do endpoint de API CreateLead lambda'
		service.logger.info(`${currentActivity} ${JSON.stringify(response)}`)

		return response
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}
