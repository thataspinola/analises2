const api = require('../api')
const service = require('../service')
const factory = require('../factory')
const CONSTANT = require('../property')

const dynamicsLayer = require(CONSTANT.DYNAMICS_LIBRARY_LOCATION)
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	service.logger.info({ request: { ...inputRequest } }, 'INPUT REQUEST')

	//TODO remover após correção no front-end (time de plataforma)
	if (inputRequest.susepCode === 'null') {
		inputRequest.susepCode = null
	}

	service.logger.info('chamando create lead tradicional, com BCC')
	service.validation.inputData(inputRequest, CONSTANT.CREATE_LEAD_SCHEMA)
	const beforeFullExecution = new Date()

	if (inputRequest.pescod && inputRequest.skipConsentWhenUpdateExistingBcc) {
		const registerUpdatePayload =
			factory.service.sns.registerUpdate.getPayload(inputRequest)
		const messageIdSentToRegisterUpdateSNSTopic =
			await service.sns.registerUpdateSnsService.sendSnsMessage(
				registerUpdatePayload
			)
		service.logger.info(
			{ payload: { ...registerUpdatePayload } },
			`Payload enviado para a o register update via mensagem ${
				messageIdSentToRegisterUpdateSNSTopic ?? 'N/A'
			}`
		)
	} else {
		inputRequest.pescod = await getPesCod(inputRequest)
	}

	const beforeGetToken = new Date()
	const sensediaTokenCarbonCloud =
		await tokenLayer.getSensediaTokenCarbonCloudInternal()
	const sensediaTokenHubCloud = await tokenLayer.getSensediaTokenHubCloudInternal()
	const portoCertificates = await tokenLayer.getPortoCertificates()
	logExecutionTime(beforeGetToken, new Date(), 'obter o token')

	const createLeadPayload =
		factory.createLead.makeCreateLeadPayload(inputRequest)

	service.logger.info(
		{ request: { ...createLeadPayload } },
		'payload enviado para a criacao do lead'
	)
	const beforeGetLead = new Date()
	const dynamicsResponse = await dynamicsLayer.createLead(
		createLeadPayload,
		sensediaTokenCarbonCloud,
		sensediaTokenHubCloud,
		portoCertificates
	)
	logExecutionTime(beforeGetLead, new Date(), 'obter o susep')
	logExecutionTime(beforeFullExecution, new Date(), 'execucao total')

	if (inputRequest.origin === CONSTANT.LEAD_ORIGEM_HUB_SIMULADOR) {
		const leadInProgress = factory.dynamoDb.makePayloadLeadInProgress(
			dynamicsResponse,
			inputRequest
		)

		service.logger.info(
			{ request: { ...leadInProgress } },
			'lead em andamento a ser armazenado no service.dynamoDb'
		)

		await service.dynamoDb.leadInProgress.putItem(leadInProgress)

		service.logger.info(
			{ request: { ...leadInProgress } },
			'lead em andamento armazenado no service.dynamoDb com sucesso'
		)
	}

	const createLeadResponseSuccess = factory.response.createLeadSuccess(
		dynamicsResponse,
		inputRequest.pescod
	)

	service.logger.info(
		{ response: { ...createLeadResponseSuccess } },
		'response da criacao do lead'
	)

	return createLeadResponseSuccess
}

async function getPesCod(inputRequest) {
	const beforeGetPescod = new Date()

	const payload = factory.createLead.makeregisterCompletePayload(inputRequest)

	service.logger.info(
		{ payloadRegisterComplete: { ...payload } },
		'log enviado para o register-complete'
	)
	const result = await api.carbonRegisterCompleteApi.getPesCod(payload)

	logExecutionTime(beforeGetPescod, new Date(), 'obter o pescod')

	return result.codigoPessoa
}

function logExecutionTime(startExecution, endExecution, description) {
	const duration = endExecution.getTime() - startExecution.getTime()
	service.logger.info(
		{
			step: description.replaceAll(' ', '_'),
			duration: duration,
		},
		`Tempo decorrido para ${description}: ${duration} milisegundos.`
	)
}
