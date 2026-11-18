const activity = require('./activity')
const service = require('../service')
const factory = require('../factory')

exports.process = async (parsedInputFormData) => {
	const startExecution = new Date()

	try {
		const startInputValidation = new Date()
		activity.inputValidation.execute(parsedInputFormData)
		logExecutionTime(
			startInputValidation,
			new Date(),
			'inputValidation execution'
		)

		activity.exceptionSimulation.execute(parsedInputFormData)

		const startApiGatewayTokens = new Date()
		const apiGatewayTokens = await activity.getApiGatewayTokens.execute()
		logExecutionTime(
			startApiGatewayTokens,
			new Date(),
			'getApiGatewayTokens execution'
		)

		const startSearchCapsAppointment = new Date()
		const searchCapsAppointmentResponseData =
			await activity.resolve.searchCapsAppointment.execute(
				parsedInputFormData,
				apiGatewayTokens.mulesoftToken,
				apiGatewayTokens.ca
			)
		logExecutionTime(
			startSearchCapsAppointment,
			new Date(),
			'SearchCapsAppointment execution'
		)

		const startBuildSuccessResponse = new Date()
		const successReturn = activity.buildSuccessResponse.execute(
			searchCapsAppointmentResponseData
		)
		logExecutionTime(
			startBuildSuccessResponse,
			new Date(),
			'buildSuccessResponse execution'
		)

		service.logger.info(JSON.stringify(successReturn))
		logExecutionTime(startExecution, new Date(), 'Total process execution')

		return successReturn
	} catch (error) {
		const processRegisterError = new Error(
			`Erro no processamento da chamada da API do CORE: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				`Erro na validação dos dados: ${error.message}`
			)
			return factory.response.badRequestError(
				{ rawError: error },
				processRegisterError.message
			)
		}

		return factory.response.error(error.message, error.code)
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
