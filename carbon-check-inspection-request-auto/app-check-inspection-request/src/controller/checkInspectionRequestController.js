const {
	logger,
	validation,
	dynamoDb,
	dlq
} = require('../service')
const {
	TOKEN_LIBRARY_LOCATION,
	INSPECTION_REQUEST_SCHEMA,
	NODE_ENV,
	INSPECTION,
} = require('../property')
const api = require('../api')
const factory = require('../factory')
const token = require(TOKEN_LIBRARY_LOCATION)

exports.process = async (inputBody) => {
	logger.info({ inspectionRequestData: { ...inputBody } }, `Mensagem recebida ${inputBody.receivedFromDb ? 'do dynamoDb' : 'da fila'}`)

	let inspectionStatus = null
	let putPaymentRegisterResponse = null
	try {
		validation.inputData(inputBody, INSPECTION_REQUEST_SCHEMA)
		
		const { quotationNumber } =	inputBody

		const sensediaToken = await getSensediaTokenAuto(token)

		const protocolData = await api.autoQuotations.getProtocols(quotationNumber, sensediaToken)

		logger.info({
			inspectionRequestData: { ...inputBody },
			protocolData: { ...protocolData }},
			'Retorno da api de protocolos'
		)

		inspectionStatus = factory.status.getInspectionStatus(protocolData)

		const { numero: proposalId, origem: proposalOrigin } = protocolData.proposta
		
		const putPaymentRegisterPayload = factory.putPaymentRegister.getPayload(
			inspectionStatus,
			inputBody.idTransaction,
			`${proposalId}`,
			proposalOrigin
		)
	
		switch (inspectionStatus) {
			case (INSPECTION.OK): {
				logger.info({
					inspectionRequestData: { ...inputBody },
					payload: { ...putPaymentRegisterPayload }},
					'Payload enviado para a paymentRegister'
				)

				putPaymentRegisterResponse = await api.payment.putPaymentRegister(putPaymentRegisterPayload)

				logger.info({
					inspectionRequestData: { ...inputBody },
					putPaymentRegisterResponse: { ...putPaymentRegisterResponse }},
					'Retorno da api paymentRegister'
				)

				dynamoDb.deleteItemIfExists(inputBody)
				break
			}
			case (INSPECTION.REFUSED):
				logger.info({
					inspectionRequestData: { ...inputBody },
					protocolData: protocolData},
					'Orçamento recusado, não haverá reprocessamento.')
				break
			case (INSPECTION.ISSUED):
				logger.info({
					inspectionRequestData: { ...inputBody },
					protocolData: protocolData},
					'Orçamento emitido, não haverá reprocessamento.')
				break
			default:
				await putPaymentRegisterOnDb(inputBody)
				break
		}
	} catch (error) {
		let checkInspectionRequestAutoError = new Error('Erro no processamento')

		if (error.name === 'ValidationError') {
			checkInspectionRequestAutoError = new Error('Mensagem com estrutura ou dado inválido.')
		}

		logger.error({ 
			inspectionRequestData: { ...inputBody },
		 	error
		}, checkInspectionRequestAutoError.message)

		if (error.name === 'PaymentApiError') {
			if (!inputBody.attemptAfterPaymentError) {
				inputBody.attemptAfterPaymentError = true
				await putPaymentRegisterOnDb(inputBody)
			} else {
				dlq.sendMessage(inputBody)
				logger.info({ inspectionRequestData: { ...inputBody } }, 'Dados enviados para a Dlq')
			}
		} else {
			await putPaymentRegisterOnDb(inputBody)
		}
	}
}

const getSensediaTokenAuto = async (token) => {
	if (NODE_ENV === 'production') {
		return await token.getSensediaTokenHubCloud()
	}
	return await token.getSensediaTokenHub()
}

const putPaymentRegisterOnDb = async (inputBody) => {
	const createdMinsAgo = factory.ttl.getMinutesSinceInspectionRequest(inputBody)
	const ttl = factory.ttl.getTtlInMinutes(createdMinsAgo, inputBody.attemptAfterPaymentError)

	if (ttl === null) {
		dlq.sendMessage(inputBody)
		logger.info({ inspectionRequestData: { ...inputBody } }, 'Dados enviados para a Dlq')
	} else {
		await dynamoDb.putItem(inputBody, ttl)
		logger.info(
			{ inspectionRequestData: { ...inputBody } },
			`Dados enviados para o dynamoDb, o novo reprocessamento será a partir de ${ttl} minutos`
		)
	}
}

