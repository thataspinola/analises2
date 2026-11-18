const CONSTANTS = require('../property')

const factory = require('../factory')
const service = require('../service')
const api = require('../api')

const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const paymentDataLayer = require(CONSTANTS.PAYMENT_DATA_LIBRARY_LOCATION)

exports.process = async (itemInput) => {
	let currentActivity = 'Iniciando o controller'
	try {
		currentActivity = 'Validando os dados recebidos'
		service.validation.inputData(itemInput, CONSTANTS.QUEUE_MESSAGE_SCHEMA)

		service.logger.info(
			{ objectoRecebido: { ...itemInput } },
			'objeto Recebido'
		)

		currentActivity = 'Obtendo do token sensidia'
		const sensediaToken = await getSensediaTokenAuto(tokenLayer)

		const vehicleData = itemInput.integrationData.orcamento.itens[0].veiculo
		if (vehicleData.placa && !vehicleData.chassi) {
			currentActivity = 'Chamando a API para recuperar dados do veículo'
			const vehicleApiResponse = await api.vehicleApi.get(vehicleData.placa)
			itemInput.integrationData.orcamento.itens[0].veiculo.chassi =
				vehicleApiResponse.chassi
		}

		currentActivity = 'Construindo payload para transmissão de proposta'
		const proposalTransmissionPayload =
			factory.api.proposalTransmission.getPayload(itemInput)

		service.logger.info(
			{ objectoEnviadoProduto: { ...proposalTransmissionPayload } },
			'objeto encaminhado para a transmissão do produto'
		)

		currentActivity = 'Chamando a API Sensidia de transmissao de proposta'
		const proposalTransmissionResponse = await api.proposalTransmission.post(
			proposalTransmissionPayload,
			sensediaToken
		)

		const idTransaction =
			`${itemInput?.integrationData?.numeroCotacao}` +
			`${itemInput?.integrationData?.orcamento?.codigo}`
		itemInput.idTransaction = idTransaction

		currentActivity = 'Chamando a layer que salva informações da proposta'
		await paymentDataLayer.savePaymentData(itemInput)

		currentActivity = 'Envio da mensagem para a fila de checagem de status'
		const checkInspectionRequestQueueMessageId =
			await sendMessageToCheckInspectionRequest(itemInput, idTransaction)

		const observation =
			proposalTransmissionResponse.data &&
			proposalTransmissionResponse.status === 200
				? CONSTANTS.REQUIRED_INSPECTION_OBSERVATION
				: undefined

		currentActivity = 'Construindo payload para atualizacao de lead'
		const updatePayload = factory.api.updateLead.getPayload(
			itemInput,
			observation
		)

		currentActivity = 'Chamando api gateway de atualizacao de lead'
		const updateResponse = await api.updateLeadApi.put(updatePayload)

		const allowedLogData = {
			orderNumber: itemInput.orderNumber,
			idTransaction: idTransaction,
			checkInspectionRequestQueueMessageId:
				checkInspectionRequestQueueMessageId ?? 'N/A',
			updateLeadApiResponse: updateResponse,
			numeroCotacao: itemInput?.integrationData?.numeroCotacao,
			susep: itemInput?.integrationData?.susep,
			codigoFormaPagamento:
				itemInput?.integrationData?.orcamento?.formaPagamentoEscolhida
					?.codigoFormaPagamento,
			tipoClasseCalculoPremio:
				itemInput?.integrationData?.orcamento?.formaPagamentoEscolhida
					?.meioPagamento?.dadosCartao?.tipoClasseCalculoPremio,
			leadIdentifier: itemInput.leadIdentifier,
			codigoMarca: itemInput?.integrationData?.company_code
		}

		service.logger.info(
			{ ...allowedLogData, ...proposalTransmissionResponse.data },
			'transmissao concluida com sucesso'
		)

		return factory.response.success('Success')
	} catch (error) {
		service.logger.error(
			{
				numeroCotacao: itemInput?.integrationData?.numeroCotacao,
				susep: itemInput?.integrationData?.susep,
				codigoFormaPagamento:
					itemInput?.integrationData?.orcamento?.formaPagamentoEscolhida
						?.codigoFormaPagamento,
				tipoClasseCalculoPremio:
					itemInput?.integrationData?.orcamento?.formaPagamentoEscolhida
						?.meioPagamento?.dadosCartao?.tipoClasseCalculoPremio,
				leadIdentifier: itemInput.leadIdentifier,
				codigoMarca: itemInput?.integrationData?.company_code
			},
			`transmissao concluida com erro: '${currentActivity}': ${error.message}`
		)

		throw error
	}
}

async function sendMessageToCheckInspectionRequest(itemInput, idTransaction) {
	const inspectionRequestQueueMessage =
		factory.service.sqs.checkInspectionRequestQueueMessage.getMessage(
			itemInput,
			idTransaction
		)

	const inspectionRequestQueueMessageId = service.sqs.queueService.sendMessage(
		inspectionRequestQueueMessage,
		CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
	)

	return inspectionRequestQueueMessageId
}

const getSensediaTokenAuto = async (token) => {
	if (CONSTANTS.NODE_ENV === 'production') {
		return await tokenLayer.getSensediaTokenHubCloud()
	}
	return await tokenLayer.getSensediaTokenHub()
}
