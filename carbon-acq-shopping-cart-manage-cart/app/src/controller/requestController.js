const activity = require('./activity')
const CONSTANT = require('../property')
const service = require('../service')
const factory = require('../factory')

exports.process = async (parsedInputData, httpMethod) => {
	const startExecution = new Date()

	try {
		const startInputValidation = new Date()
		activity.inputValidation.execute(
			parsedInputData,
			CONSTANT.INPUT_DATA_SCHEMA
		)
		logExecutionTime(
			startInputValidation,
			new Date(),
			'inputValidation execution'
		)

		activity.exceptionSimulation.execute(parsedInputData)

		let commerceCartResult = null

		switch (httpMethod.toUpperCase()) {
			case 'POST':
				service.logger.info('Executando POST para criação/manage de carrinho.')
				const startPostExecution = new Date()
				commerceCartResult =
					await activity.commerce.postCommerceCreateCart.execute(
						parsedInputData
					)
				logExecutionTime(
					startPostExecution,
					new Date(),
					'postCommerceCreateCart execution'
				)
				break
			case 'GET':
				service.logger.info('Executando GET para consulta de carrinho.')
				const startGetExecution = new Date()

				commerceCartResult = await activity.commerce.getCommerceCart.execute(
					parsedInputData
				)
				logExecutionTime(
					startGetExecution,
					new Date(),
					'getCommerceCart execution'
				)
				break
			case 'DELETE':
				service.logger.info(
					'Executando DELETE para remoção de item do carrinho.'
				)
				const startDeleteExecution = new Date()

				commerceCartResult =
					await activity.commerce.removeCommerceCartItem.execute(
						parsedInputData
					)
				logExecutionTime(
					startDeleteExecution,
					new Date(),
					'removeCommerceCartItem execution'
				)
				break
			default:
				service.logger.error(`Método HTTP não suportado: ${httpMethod}`)

				return factory.controllerResponse.badRequestError(
					`Método HTTP não suportado: ${httpMethod}`
				)
		}

		const startReturnSuccess = new Date()
		const returnSuccess = factory.controllerResponse.success(commerceCartResult)
		logExecutionTime(startReturnSuccess, new Date(), 'returnSuccess execution')

		logExecutionTime(startExecution, new Date(), 'Total process execution')

		return returnSuccess
	} catch (error) {
		const proposalServicesError = new Error(
			`Erro no processamento: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Erro no processamento: Mensagem com estrutura ou dado inválido.'
			)
			return factory.controllerResponse.badRequestError(
				proposalServicesError.message
			)
		}
		return factory.controllerResponse.error(error.message)
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
