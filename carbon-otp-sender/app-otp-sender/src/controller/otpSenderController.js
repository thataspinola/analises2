const factory = require('../factory')
const service = require('../service')
const CONSTANT = require('../property')
const errors = require('../error')
const api = require('../api')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const Redis = require('ioredis')
const { createHash } = require('node:crypto')

const inputValidation = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(parsedInput, CONSTANT.OTP_SEND_SCHEMA)

		if (!service.cpfValidation.isValidCPF(parsedInput.taxvat)) {
			throw new errors.ValidationError('Número de CPF inválido')
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

const exceptionSimulation = (parsedInput) => {
	let currentActivity = 'Teste de exceção'
	try {
		if (parsedInput.corporativeheader === 'Except') {
			throw new Error('Fake failure')
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getApiGatewayTokens = async () => {
	let currentActivity = 'Obtenção do token Sensedia Token Hub'
	try {
		const sensediaToken = await token.getSensediaTokenHub()
		currentActivity = 'Obtenção do token Sensedia Token Hub Cloud'
		const sensediaCloudToken = await token.getSensediaTokenHubCloud()
		currentActivity = 'Obtenção do token Mulesoft Impersonal Token Hub'
		const mulesoftImpersonalTokenHub =
			await token.getMulesoftImpersonalTokenHub()

		return { sensediaToken, sensediaCloudToken, mulesoftImpersonalTokenHub }
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const tryGetDataFromCache = async (taxvat, sqsMessageId) => {
	let redisCache = null
	let cacheKey = null
	let existentCache = false
	let ignoreMessageProcessing = false
	let currentActivity = 'Iniciando conexão com o mecanismo de cache'
	try {
		redisCache = new Redis(CONSTANT.OTP_REDIS_CACHE_CONN_STRING)

		currentActivity = 'Verificando se disparo de SMS deve ser ignorado'
		cacheKey = createHash('md5').update(taxvat).digest('hex')
		let cacheContent = []
		existentCache = await redisCache.exists(cacheKey)
		if (existentCache) {
			const existentCacheData = await redisCache.get(cacheKey)
			cacheContent = JSON.parse(existentCacheData)
		}
		const currentMessageCacheContentIndex = cacheContent.sqsMessages.findIndex(
			(cacheContentItem) => cacheContentItem.messageId === sqsMessageId
		)

		ignoreMessageProcessing =
			currentMessageCacheContentIndex >= 0 &&
			currentMessageCacheContentIndex < cacheContent.sqsMessages.length - 1
	} catch (error) {
		service.logger.warn(
			`Erro (não bloqueante) identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}

	return { redisCache, cacheKey, existentCache, ignoreMessageProcessing }
}

const tryUpdateCacheData = async (
	redisCache,
	cacheKey,
	existentCache,
	pescod,
	messageId
) => {
	if (redisCache && cacheKey && existentCache) {
		let currentActivity = 'Obtendo dados mais recentes de cache'
		try {
			let cacheContent = []
			const existentCacheData = await redisCache.get(cacheKey)
			cacheContent = JSON.parse(existentCacheData)

			const currentMessageCacheContentIndex =
				cacheContent.sqsMessages.findIndex(
					(cacheContentItem) => cacheContentItem.messageId === messageId
				)

			let updateCache = false
			if (
				currentMessageCacheContentIndex >= 0 &&
				cacheContent.sqsMessages.length > 1
			) {
				cacheContent.sqsMessages.splice(currentMessageCacheContentIndex, 1)
				updateCache = true
			}

			if (!cacheContent.pescod && pescod) {
				cacheContent.pescod = pescod
				updateCache = true
			}

			if (updateCache) {
				currentActivity = 'Atualizando registro de cache'
				await redisCache.set(cacheKey, JSON.stringify(cacheContent))
			}
		} catch (error) {
			service.logger.warn(
				`Erro (não bloqueante) identificado durante a atividade '${currentActivity}': ${error.message}`
			)
		}
	}
}

const createPessoaBccAndGetPescod = async (
	taxvat,
	formData,
	mulesoftImpersonalTokenHub
) => {
	let currentActivity = 'Construção do payload para o cadastro de pessoa - BCC'
	try {

		currentActivity = 'verificar se a pessoa já existe'
		const checkPesCodeExistBcc =
			await api.governancaDados.dadosPessoa.getPessoa(
				taxvat,
				mulesoftImpersonalTokenHub
		)

		if (checkPesCodeExistBcc && checkPesCodeExistBcc.codigoPessoa) {
			service.logger.info(`Registro já existe - BCC ${checkPesCodeExistBcc.codigoPessoa}`)
		} else {
			const createBccEntryPayload =
				factory.governancaDados.dadosPessoa.pessoa.getPayload({
					taxvat: taxvat,
					nome: formData.nome,
					nomeSocial: formData.nomeSocial,
					email: formData.email,
					celular: formData.celular,
				})

			currentActivity = 'Criação de novo cadastro de pessoa - BCC'
			const novoCadastroPessoa = await api.governancaDados.dadosPessoa.postPessoa(
				createBccEntryPayload,
				mulesoftImpersonalTokenHub
			) 
			service.logger.info(
				`Adicionado novo registro de pessoa - BCC. Pescod ${novoCadastroPessoa.codigoPessoa}`
			)
			return novoCadastroPessoa.codigoPessoa
		}

		
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const enableAndGenerateOtpCode = async (
	taxvat,
	corporativeheader,
	sensediaToken,
	sensediaCloudToken
) => {
	let currentActivity = 'Verificação do status do CPF na base de usuarios'
	try {
		const statusResponse = await api.portais.msUsuarios.users.postStatus(
			taxvat,
			sensediaToken
		)
		let antifraudElapsedMiliseconds = 0
		if (statusResponse.status === 404) {
			currentActivity = 'Verificação do status do CPF no Anti Fraude'
			const beforeAntifraudDateTime = new Date()
			const antifraudResponse =
				await api.portais.msUsuarios.users.activation.simple.postAntifraud(
					taxvat,
					corporativeheader,
					sensediaToken
				)
			const afterAntifraudDateTime = new Date()
			antifraudElapsedMiliseconds +=
				afterAntifraudDateTime.getTime() - beforeAntifraudDateTime.getTime()
			service.logger.info(
				`Tempo gasto com execução do antifraud: ${antifraudElapsedMiliseconds} milisegundos`
			)
		}

		currentActivity =
			'Construção do payload para chamada do gerador de token AA'
		const geraTokenAaPayload =
			factory.seguranca.corporativa.portocom.geraTokenAaPayload.getPayload(
				taxvat
			)
		currentActivity = 'Geração do token AA'
		let geraTokenAaResponse = await service.tokenAaService.gerarTokenAaComRetry(
			geraTokenAaPayload,
			sensediaCloudToken
		)

		if (geraTokenAaResponse.status !== 200) {
			throw new Error(
				`Could not get token AA. Status: ${
					geraTokenAaResponse.status
				} Data: ${JSON.stringify(geraTokenAaResponse.data)}`
			)
		}

		return geraTokenAaResponse.data.otp
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const sendOtpCodeSmsAndGetSentMessageIds = async (
	processingTaxvat,
	processingClientName,
	processingDestinationNumber,
	processingEmailDestinationAddress,
	processingOtpCode,
	sensediaToken
) => {
	let currentActivity =
		'Construção do payload para chamada de envio do SMS com o codigo de verificacao'
	try {
		let sendSmsResponse = null
		let sendEmailQueueMessageReturn = null
		const sendSmsPayload =
			factory.corporativo.smsservice.sendSmsPayload.getPayload(
				processingDestinationNumber,
				processingOtpCode
			)

		let otpEmailSenderQueueMessage = null
		if (processingEmailDestinationAddress?.trim()) {
			currentActivity =
				'Construção da mensagem que será enviada para a fila de envio de email com o codigo de verificacao'
			otpEmailSenderQueueMessage =
				factory.sqs.emailSenderQueueMessage.getMessage(
					processingEmailDestinationAddress,
					processingClientName,
					processingOtpCode
				)
		}

		currentActivity = 'Envio de SMS e email com o codigo de verificacao'
		const beforeSmsSendAndEmailQueueMessageSendDateTime = new Date()
		const [postSendSmsPromiseReturn, sendEmailQueueMessagePromiseReturn] =
			otpEmailSenderQueueMessage
				? await Promise.allSettled([
						api.corporativo.smsservice.postSendSms(
							sendSmsPayload,
							sensediaToken
						),
						service.sqs.emailSenderQueue.sendMessage(
							otpEmailSenderQueueMessage
						),
				  ])
				: await Promise.allSettled([
						api.corporativo.smsservice.postSendSms(
							sendSmsPayload,
							sensediaToken
						),
						Promise.resolve({ MessageId: null }),
				  ])
		const afterSmsSendAndEmailQueueMessageSendDateTime = new Date()

		if (
			![
				postSendSmsPromiseReturn.status,
				sendEmailQueueMessagePromiseReturn.status,
			].includes('fulfilled')
		) {
			throw new Error('SMS send and email queue message send failed')
		}

		if (postSendSmsPromiseReturn.status === 'fulfilled') {
			sendSmsResponse = postSendSmsPromiseReturn.value
		} else {
			service.logger.error(
				`SMS send failed. Reason: ${JSON.stringify(
					postSendSmsPromiseReturn.reason
				)}`
			)
		}

		if (sendEmailQueueMessagePromiseReturn.status === 'fulfilled') {
			sendEmailQueueMessageReturn = sendEmailQueueMessagePromiseReturn.value
		} else {
			service.logger.error(
				`Email queue message send failed. Reason: ${JSON.stringify(
					sendEmailQueueMessagePromiseReturn.reason
				)}`
			)
		}

		try {
			const details = factory.otpSenderControllerResponsePayload.getPayload(
				processingTaxvat,
				processingDestinationNumber,
				processingEmailDestinationAddress,
				processingOtpCode,
				sendSmsResponse ? sendSmsResponse.mensagem : null,
				sendEmailQueueMessageReturn
					? sendEmailQueueMessageReturn.MessageId
					: null
			)

			service.logger.info(
				`Código de verificacao disparado. Tempo decorrido na ação de disparo: ${
					afterSmsSendAndEmailQueueMessageSendDateTime.getTime() -
					beforeSmsSendAndEmailQueueMessageSendDateTime.getTime()
				} milisegundos. Dados: ${JSON.stringify(details)}`
			)
		} catch (error) {
			service.logger.info(
				`Código de verificacao disparado. Tempo decorrido na ação de disparo: ${
					afterSmsSendAndEmailQueueMessageSendDateTime.getTime() -
					beforeSmsSendAndEmailQueueMessageSendDateTime.getTime()
				} milisegundos. Dados: Não foi possível exibir os dados`
			)
		}

		return {
			smsMessageId: sendSmsResponse ? sendSmsResponse.mensagem : null,
			emailQueueMessageId: sendEmailQueueMessageReturn
				? sendEmailQueueMessageReturn.MessageId
				: null,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const buildSuccessResponse = (
	taxvat,
	destinationNumber,
	emailDestinationAddress,
	otpCode,
	smsSentMessageId,
	sendEmailQueueMessageId
) => {
	let currentActivity = 'Construção do payload de retorno'
	try {
		const returnPayload = factory.otpSenderControllerResponsePayload.getPayload(
			taxvat,
			destinationNumber,
			emailDestinationAddress,
			otpCode,
			smsSentMessageId,
			sendEmailQueueMessageId
		)
		return returnPayload
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

function sendName(nome, nomeSocial) {
	if (nomeSocial && nomeSocial != '') {
		return nomeSocial
	}

	return nome
}

exports.processRequest = async (parsedRequestMessageBody, messageId) => {
	let processingTaxvat = null
	let processingClientName = null
	let processingDestinationNumber = null
	let processingEmailDestinationAddress = null
	let processingOtpCode = null
	let processingSendSmsMessageId = null
	let processingSendEmailQueueMessageId = null
	let processingClientSocialName = null
	try {
		inputValidation(parsedRequestMessageBody)

		const receivedPayload = factory.otpSenderInputDataPayloadFactory.getPayload(
			parsedRequestMessageBody
		)

		service.logger.info(`Received payload: ${receivedPayload}`)

		processingTaxvat = parsedRequestMessageBody.taxvat
		processingDestinationNumber = parsedRequestMessageBody.destinationnumber
		processingEmailDestinationAddress =
			parsedRequestMessageBody.emaildestinationaddress
		processingClientName = parsedRequestMessageBody.formData.nome
		processingClientSocialName = parsedRequestMessageBody.formData.nomeSocial

		exceptionSimulation(parsedRequestMessageBody)

		const { redisCache, cacheKey, existentCache, ignoreMessageProcessing } =
			await tryGetDataFromCache(processingTaxvat, messageId)

		let pescod = null
		if (!ignoreMessageProcessing) {
			const { sensediaToken, sensediaCloudToken, mulesoftImpersonalTokenHub } =
				await getApiGatewayTokens()

			if (!parsedRequestMessageBody.pescod) {
				pescod = await createPessoaBccAndGetPescod(
					processingTaxvat,
					parsedRequestMessageBody.formData,
					mulesoftImpersonalTokenHub
				)
			} else {
				pescod = parsedRequestMessageBody.pescod
			}

			processingOtpCode = await enableAndGenerateOtpCode(
				processingTaxvat,
				parsedRequestMessageBody.corporativeheader,
				sensediaToken,
				sensediaCloudToken
			)

			const processingSendMessageIds = await sendOtpCodeSmsAndGetSentMessageIds(
				processingTaxvat,
				sendName(processingClientName, processingClientSocialName),
				processingDestinationNumber,
				processingEmailDestinationAddress,
				processingOtpCode,
				sensediaToken
			)

			processingSendSmsMessageId = processingSendMessageIds.smsMessageId
			processingSendEmailQueueMessageId =
				processingSendMessageIds.emailQueueMessageId
		} else {
			try {
				const details = factory.otpSenderControllerResponsePayload.getPayload(
					processingTaxvat,
					processingDestinationNumber,
					processingEmailDestinationAddress,
					processingOtpCode,
					processingSendSmsMessageId,
					processingSendEmailQueueMessageId
				)

				service.logger.info(
					`Envio do SMS com o codigo de verificacao ignorado. Dados: ${JSON.stringify(
						details
					)}`
				)
			} catch (error) {
				service.logger.info(
					`Envio do SMS com o codigo de verificacao ignorado. Dados: Não foi possível exibir os dados - ${error.message}`
				)
			}
		}

		const successReturn = buildSuccessResponse(
			processingTaxvat,
			processingDestinationNumber,
			processingEmailDestinationAddress,
			processingOtpCode,
			processingSendSmsMessageId,
			processingSendEmailQueueMessageId
		)

		await tryUpdateCacheData(
			redisCache,
			cacheKey,
			existentCache,
			pescod,
			messageId
		)

		return successReturn
	} catch (error) {
		const processRegisterError = new Error(
			`OTP send request processing error: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				'OTP send request processing error: Mensagem com estrutura ou dado inválido.'
			)
		} else {
			try {
				const details = factory.otpSenderControllerResponsePayload.getPayload(
					processingTaxvat,
					processingDestinationNumber,
					processingEmailDestinationAddress,
					processingOtpCode,
					processingSendSmsMessageId,
					processingSendEmailQueueMessageId
				)
				service.logger.error(
					`OTP send request processing error: Erro interno. Dados: ${JSON.stringify(
						details
					)}`
				)
			} catch (detailsError) {
				service.logger.error(
					`OTP send request processing error: Erro interno. Dados: Não foi possível exibir os dados - ${detailsError.message}`
				)
			}
		}

		throw processRegisterError
	}
}
