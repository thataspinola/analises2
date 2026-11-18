const api = require('../../../api')
const factory = require('../../../factory')
const service = require('../../../service')

exports.execute = async (parsedInputData) => {
	let currentActivity = 'Chamada do endpoint de API CreateLead lambda'
	try {
		const payload =
			factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload(
				parsedInputData
			)

		service.logger.info(`${currentActivity} ${JSON.stringify(payload)}`)

		const response =
			await api.hubVendasCarbon.support.createLead.postCreateLead(payload)
		currentActivity = 'Retorno do endpoint de API CreateLead lambda'
		service.logger.info(`${currentActivity} ${JSON.stringify(response)}`)

		currentActivity =
			'Alterando o email do lead de acordo com o cadastro Petlove'
		if (response.susepCode == 'CM056J') {
			response.brokerEmail = 'diamante@aguiacorretagem.com.br'
		} else if (response.susepCode == 'CMHE2J') {
			response.brokerEmail = 'comercial@INRICORRETORA.COM.BR'
		} else {
			service.logger.info(
				`A criação do lead não devolveu a susep CM056J nem a CMHE2J`
			)
		}
		service.logger.info(`${currentActivity} ${JSON.stringify(response)}`)

		return response
	} catch (error) {
		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'PostCreateLeadActivity',
				currentActivity: `Erro identificado durante a atividade: '${currentActivity}'`,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)
		throw error
	}
}
