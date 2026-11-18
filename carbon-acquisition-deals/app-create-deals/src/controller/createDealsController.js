const CONSTANTS = require('../property')
const factory = require('../factory')
const service = require('../service')
const errors = require('../error')
const integration = require('../integration')

exports.process = async (inputData) => {
	try {
		inputValidation(inputData)

		await sendCreateDealsTopicMessage(inputData)

		return {
			statusCode: 200,
			body: {
				status: 200,
				message: 'success',
			},
		}
	} catch (error) {
		service.logger.error(`Erro identificado: ${error.message}`)

		if (error.name == 'ValidationError') {
			return factory.response.error(error.message, 400)
		}

		return factory.response.error('Erro interno')
	}
}

function inputValidation(inputData) {
	let currentActivity = 'Validação dos dados'
	try {
		service.logger.info(`Validando dados`)
		service.schemaValidation.validate(inputData, CONSTANTS.INPUT_SCHEMA)

		if (!service.cpfValidation.isValidCPF(inputData.documento)) {
			throw new errors.ValidationError('Número de CPF inválido')
		}
		service.logger.info(`Dados validados`)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name == 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}
		throw error
	}
}

const sendCreateDealsTopicMessage = async (inputData) => {
	let currentActivity =
		'Enviando mensagem ao tópico requisitando a criação das oportunidades'
	try {
		service.logger.info(`Preparando envio de mensagem pela notificação`)
		const sendCreateDealsMessageResult = await integration.sns.sendNotification(
			inputData
		)

		service.logger.info(
			`Mensagem enviada para tópico requisitando a criação de oportunidades. Mensagem: ${sendCreateDealsMessageResult}`
		)
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}
