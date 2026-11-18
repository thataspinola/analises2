const activity = require('./activity')
const service = require('../service')
const factory = require('../factory')

exports.process = async (parsedJsonInputBody) => {
	const startExecution = new Date()

	try {
		service.logger.info(parsedJsonInputBody)

		const startInputValidation = new Date()
		activity.inputValidation.execute(parsedJsonInputBody)
		logExecutionTime(
			startInputValidation,
			new Date(),
			'inputValidation execution'
		)

		activity.exceptionSimulation.execute(parsedJsonInputBody)
		const startApiGatewayTokens = new Date()
		const apiGatewayTokens = await activity.getApiGatewayTokens.execute()
		logExecutionTime(
			startApiGatewayTokens,
			new Date(),
			'getApiGatewayTokens execution'
		)

		const startDateToUse = new Date()
		const dateToUse =
			await activity.serviceAppointment.parseServiceDateTime.execute(
				parsedJsonInputBody.serviceDateTime
			)
		logExecutionTime(startDateToUse, new Date(), 'dateToUse execution')

		const startPostServiceAppointmentResponse = new Date()
		const postServiceAppointmentResponse =
			await activity.serviceAppointment.postServiceAppointment.execute(
				parsedJsonInputBody,
				apiGatewayTokens.impersonalUserToken,
				apiGatewayTokens.ca,
				dateToUse
			)
		logExecutionTime(
			startPostServiceAppointmentResponse,
			new Date(),
			'postServiceAppointmentResponse execution'
		)

		const startResponse = new Date()
		const response = activity.buildSuccessResponse.execute(
			postServiceAppointmentResponse
		)
		logExecutionTime(startResponse, new Date(), 'response execution')

		logExecutionTime(startExecution, new Date(), 'Total process execution')
		return response
	} catch (error) {
		const serviceAppointmentError = new Error(
			`Erro no processamento: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Erro no processamento: Mensagem com estrutura ou dado inválido.'
			)
			return factory.requestControllerResponse.badRequestError(
				serviceAppointmentError.message
			)
		}
		return factory.requestControllerResponse.error(error.message)
	}
}

function logExecutionTime(startTime, endTime, description) {
	const duration = endTime.getTime() - startTime.getTime()
	service.logger.info(
		{
			step: description.replace(/ /g, '_'),
			duration: duration,
		},
		`Tempo decorrido para ${description}: ${duration} milisegundos.`
	)
}
