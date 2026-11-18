const api = require('../api')
const service = require('../service')
const factory = require('../factory')
const CONSTANT = require('../property')
const errors = require('../error')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

const getSensediaTokenAuto = async (token) => {
	if (CONSTANT.NODE_ENV === 'production') {
		return await token.getSensediaTokenCarbonCloud()
	}
	return await token.getSensediaTokenHubCloud()
}

const inputValidation = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(parsedInput, CONSTANT.QUEUE_MESSAGE_SCHEMA)
		if (
			parsedInput.externalId.search(parsedInput.proposalId.padStart(8, '0')) ===
			-1
		) {
			throw new errors.ValidationError('Formato inválido do externalId')
		}
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

const getApiGatewayTokens = async () => {
	let currentActivity = 'Obtenção do token Sensedia Token Hub'
	try {
		const sensediaTokenCarbonCloud = await getSensediaTokenAuto(token)
		return { sensediaTokenCarbonCloud }
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const sendProductPaymentResult = async (
	parsedSQSMessage,
	sensediaTokenCarbonCloud
) => {
	let currentActivity =
		'Construção do payload para o envio da confirmação de pagamento'
	let postPagamentoCheckoutPayload
	try {
		postPagamentoCheckoutPayload =
			factory.automovel.propostaCriticasApi.postPagamentoCheckoutPayload.getPayload(
				parsedSQSMessage
			)

		currentActivity = 'Envio da confirmação de pagamento'
		const postPagamentoCheckoutResponseData =
			await api.automovel.propostaCriticas.postPagamentoCheckout(
				postPagamentoCheckoutPayload,
				sensediaTokenCarbonCloud
			)

		service.logger.info(
			{ ...postPagamentoCheckoutPayload },
			'payload enviado para o produto'
		)
		return postPagamentoCheckoutResponseData
	} catch (error) {
		service.logger.error(
			{ objetoEnviado: postPagamentoCheckoutPayload },
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

exports.processSqsMessage = async (jsonParsedMessage) => {
	const allowedLogData = {
		orderNumber: 'N/A',
		orderPaymentId: 'N/A',
		externalId: 'N/A',
		status: 'N/A',
	}
	try {
		inputValidation(jsonParsedMessage)

		allowedLogData.orderNumber = jsonParsedMessage.orderNumber
		allowedLogData.orderPaymentId = jsonParsedMessage.orderPaymentId
		allowedLogData.externalId = jsonParsedMessage.externalId
		allowedLogData.status = jsonParsedMessage.status

		const { sensediaTokenCarbonCloud } = await getApiGatewayTokens()

		const apiResponse = await sendProductPaymentResult(
			jsonParsedMessage,
			sensediaTokenCarbonCloud
		)

		service.logger.info('Registro da Transmissão efetuado com sucesso.', {
			...allowedLogData,
			apiResponse,
		})

		return factory.response.buildResponse(
			'Informe do pagamento disparado com sucesso'
		)
	} catch (error) {
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Auto insurance transmission processing error: Mensagem com estrutura ou dado inválido.'
			)
		} else {
			service.logger.error(
				`Auto insurance transmission processing error: Erro interno. Dados: ${JSON.stringify(
					allowedLogData
				)}`
			)
		}
		throw new Error(
			`Auto insurance transmission processing error: ${error.message}`
		)
	}
}
