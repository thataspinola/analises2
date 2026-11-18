const CONSTANT = require('../property')
const sqs = require('../service/sqs')
const { quotationFactory, responseFactory, cartFactory } = require('../factory')
const {
	denyLeadQueueMessage,
	updateLeadQueueMessage,
} = require('../factory/sqs')
const { validationService } = require('../service')
const { logger } = require('../../config')
const { vehicleApi, cartApi } = require('../api')
const { BusinessError } = require('../error')

const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	validationService.inputData(inputRequest)
	const payload = quotationFactory.makePayload(inputRequest)
	const createCartPayload = cartFactory.getRequestPayload(inputRequest)

	const sensediaToken = await getToken()

	logger.info(
		{
			idLead: inputRequest?.auto?.idLead,
			vdoCode: inputRequest?.auto?.vdoCode,
			objetoEnviadoProduto: { ...payload },
		},
		'objeto enviado para obter a cotacao'
	)

	try {
		const promises = []

		promises.push(vehicleApi.generateQuote(payload, sensediaToken))
		if (inputRequest.auto.newJourney === 1) {
			promises.push(cartApi.postCommerceCreateCart(createCartPayload))
		}

		const [quotation, cartId] = await Promise.all(promises)

		logger.info(
			{
				idLead: inputRequest?.auto?.idLead,
				vdoCode: inputRequest.auto.vdoCode,
				objetoDevolvidoProduto: { ...quotation },
			},
			'cotacao devolvida pelo produto'
		)

		logger.info(`Carrinho criado com id: ${cartId}`)

		const statusCotacao = quotation?.statusCotacao[0]

		if (!statusCotacao) {
			sendMessageToUpdateLead(inputRequest.auto)

			return responseFactory.quotationError()
		}

		switch (statusCotacao.codigo) {
			case 2:
				return responseFactory.quotationSuccess(inputRequest, quotation, cartId)
			case 4:
				await sendMessageToDenyLead(
					statusCotacao.descricao,
					inputRequest.auto.idLead
				)

				return responseFactory.quotationError(statusCotacao, 409)
			case 5:
				await sendMessageToUpdateLead(
					inputRequest.auto,
					CONSTANT.QUOTATION_ERROR_OBSERVATION
				)

				return responseFactory.quotationError(statusCotacao, 409)
			default:
				await sendMessageToUpdateLead(inputRequest.auto)

				return responseFactory.quotationError(statusCotacao)
		}
	} catch (error) {
		if (!(error instanceof BusinessError)) {
			await sendMessageToUpdateLead(inputRequest.auto)
		}
		throw error
	}
}

async function getToken() {
	try {
		return CONSTANT.NODE_ENV === 'production'
			? tokenLayer.getSensediaTokenHubCloud()
			: tokenLayer.getSensediaTokenHub()
	} catch (err) {
		throw new Error(CONSTANT.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}

async function sendMessageToUpdateLead(data, observation) {
	const message = updateLeadQueueMessage.getMessage(data, observation)

	logger.info(
		message,
		'Enviando para a fila de Atualização do Lead (Update-Lead-Queue)'
	)

	return sqs.queueService.sendMessage(
		message,
		CONSTANT.UPDATE_LEAD_AUTO_QUEUE_URL
	)
}

async function sendMessageToDenyLead(motivo, idLead) {
	if (!idLead) return
	
	const message = denyLeadQueueMessage.getMessage(motivo, idLead)

	return sqs.queueService.sendMessage(
		message,
		CONSTANT.DENY_LEAD_AUTO_QUEUE_URL
	)
}
