const activity = require('./activity')
const service = require('../service')
const factory = require('../factory')

exports.process = async (parsedJsonInputBody) => {
	const startExecution = new Date()

	try {
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

		const startGetAppointmentService = new Date()
		const getAppointmentServiceResponseData =
			await activity.resolve.getAppointmentService.execute(
				parsedJsonInputBody,
				apiGatewayTokens.mulesoftToken,
				apiGatewayTokens.ca
			)
		logExecutionTime(
			startGetAppointmentService,
			new Date(),
			'getAppointmentService execution'
		)

		const startBuildSuccessResponse = new Date()
		const successReturn = activity.buildSuccessResponse.execute(
			getAppointmentServiceResponseData,
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
				'Erro no processamento da chamada da API do CORE: Mensagem com estrutura ou dado inválido.'
			)
			return factory.response.badRequestError(
				{ rawError: error },
				processRegisterError.message
			)
		}

		return factory.response.error(error.message)
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
