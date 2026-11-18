const CONSTANT = require('../property')
const api = require('../api')
const factory = require('../factory')
const service = require('../service')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.sendEmail = async (event) => {
	service.logger.info(event, 'input request')
	try {
		if (!event || Object.keys(event).length === 0) {
			service.logger.error(
				'Bad request error occouried during createLead call: empty payload'
			)
			return
		}

		service.validation.inputData(event)
		let inputSendMail = setDefaultValues(event)

		try {
			inputSendMail.body = await getEmailBody(event)
		} catch (error) {
			service.logger.error(
				`error getting template or render: ${event.template} - metadata: ` +
					JSON.stringify(event.metadata)
			)

			throw error
		}

		const emailPayload = factory.mailService.payloadSendEmail(inputSendMail)

		const emailEndpointReturn = await api.mailServiceApi.sendEmail(
			emailPayload,
			await token.getSensediaTokenHub()
		)
		service.logger.info(
			`response API send-email: ${JSON.stringify(emailEndpointReturn)}`
		)
	} catch (error) {
		service.logger.error(error.message)
		throw error
	}
}

async function getEmailBody(input) {
	const emailBodyData = await service.emailContent.getEmailHtmlBody(
		input.template,
		input.metadata
	)
	return emailBodyData
}

function setDefaultValues(input) {
	return Object.assign({}, input, {
		applicationId: CONSTANT.MAILSERVICE_SENDEMAIL_APPLICATION_ID_CONTENT,
		unidadeNegocio: CONSTANT.MAILSERVICE_BUSINESS_UNIT_CONTENT,
		centroDeCustoPagador: CONSTANT.MAILSERVICE_CENTRO_DE_CUSTO_PAGADOR_CONTENT,
	})
}
