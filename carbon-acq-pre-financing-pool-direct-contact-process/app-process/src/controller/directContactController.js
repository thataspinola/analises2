const factory = require('../factory')
const service = require('../service')
const api = require('../api')
const CONSTANT = require('../property')
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

const inputValidation = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedInput.formData,
			commonLibrary.WHATSAPP_CONTACT_REQUEST_SCHEMA
		)

		const isValidCpf = service.cpfValidation.isValidCPF(
			parsedInput.formData.client.cpfCnpj
		)
		const isValidCnpj = service.cnpjValidation.isValidCNPJ(
			parsedInput.formData.client.cpfCnpj
		)

		if (!isValidCpf && !isValidCnpj) {
			throw new commonLibrary.errors.ValidationError('Número de CPF/CNPJ inválido')
		}

		const isCnpjDocument = !isValidCpf && isValidCnpj //Will consider as CNPJ document when the number is not a valid CPF number AND is a valid CNPJ number
		return {
			isCnpjDocument,
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
		if (parsedInput.formData.client.fullName === 'Except') {
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
		currentActivity = 'Obtenção do token Mulesoft Impersonal Token Hub'
		const mulesoftImpersonalTokenHub =
			await token.getMulesoftImpersonalTokenHub()

		currentActivity = 'Obtenção do token Sensedia cloud Impersonal Token Hub'
		const sensediaTokenCarbonCloudInternal = 
			await token.getSensediaTokenCarbonCloudInternal()
		
		currentActivity = 'Obtenção dos certificados'
		const certificates = await token.getPortoCertificates()

		return { sensediaToken, sensediaTokenCarbonCloudInternal, mulesoftImpersonalTokenHub, certificates }
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getPescodBcc = async (
	taxvat,
	isCnpjDocument,
	mulesoftImpersonalTokenHub
) => {
	let currentActivity = 'Verificação da existência de cadastro de pessoa - BCC'
	try {
		const beforeGetPessoaDateTime = new Date()
		let pescod = null
		const cadastroExistenteBcc =
			await api.governancaDados.dadosPessoa.getPessoa(
				taxvat,
				isCnpjDocument,
				mulesoftImpersonalTokenHub
			)
		const afterGetPessoaDateTime = new Date()
		service.logger.info(
			`Tempo decorrido para varificar existência de cadastro de pessoa - BCC: ${
				afterGetPessoaDateTime.getTime() - beforeGetPessoaDateTime.getTime()
			} milisegundos.`
		)
		if (cadastroExistenteBcc !== null && cadastroExistenteBcc.codigoPessoa) {
			pescod = cadastroExistenteBcc.codigoPessoa
			service.logger.info(
				`Identificado existência do registro de pessoa - BCC. Pescod ${cadastroExistenteBcc.codigoPessoa}`
			)
		}
		return pescod
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const createPessoaBccAndGetPescod = async (
	clientData,
	isCnpjDocument,
	mulesoftImpersonalTokenHub
) => {
	let currentActivity = 'Construção do payload para o cadastro de pessoa - BCC'
	try {
		const createBccEntryPayload =
			factory.api.governancaDados.dadosPessoa.pessoa.getPayload(
				clientData,
				isCnpjDocument
			)

		currentActivity = 'Criação de novo cadastro de pessoa - BCC'
		const novoCadastroPessoa = await api.governancaDados.dadosPessoa.postPessoa(
			createBccEntryPayload,
			mulesoftImpersonalTokenHub
		)
		service.logger.info(
			`Adicionado novo registro de pessoa - BCC. Pescod ${
				novoCadastroPessoa?.codigoPessoa ?? 'N/A'
			}`
		)
		return novoCadastroPessoa?.codigoPessoa
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const tryRegisterConsent = async (pesCod, parsedInput, sensediaToken) => {
	let currentActivity =
		'Construção do payload para o registro de consentimento no SAP CDC'
	let consentRegistered = false
	try {
		const consentPayload =
			factory.api.auditoria.rastreabilidadeCdc.consentimentos.getPayload(
				parsedInput.formData.client,
				parsedInput.formData.marketingOptOutFlag,
				parsedInput.formData.product,
				pesCod,
				parsedInput.formData.domain
			)
		currentActivity = 'Registro de consentimento no SAP CDC'
		const consentimentoData =
			await api.auditoria.rastreabilidadeCdc.postConsentimentos(
				consentPayload,
				sensediaToken
			)
		consentRegistered = true
		service.logger.info(
			`Consentimento registrado no SAP CDC. Dados resultantes: ${JSON.stringify(
				consentimentoData
			)}`
		)
	} catch (error) {
		service.logger.warn(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}
	return consentRegistered
}

const sendConsentTopicMessage = async (pesCod, parsedInput) => {
	let currentActivity =
		'Construção do payload para o envio da mensagem para o topico de registro de consentimento no SAP CDC'
	try {
		const sendConsentMessagePayload =
			factory.sns.consents.getSendConsentMessagePayload(
				parsedInput.formData.client,
				parsedInput.formData.marketingOptOutFlag,
				parsedInput.formData.product,
				pesCod,
				parsedInput.formData.domain
			)

		currentActivity =
			'Construção dos atributos para o envio da mensagem para o topico de registro de consentimento no SAP CDC'

		const sendConsentMessageAttributes =
			factory.sns.consents.getSendConsentMessageAttributes(pesCod)

		currentActivity =
			'Envio da mensagem para o topico de registro de consentimento no SAP CDC'

		const sendConsentMessageResult =
			await service.sns.consents.sendConsentMessage(
				sendConsentMessageAttributes,
				sendConsentMessagePayload
			)

		service.logger.info(
			`Mensagem enviada para o topico de registro de consentimento no SAP CDC. Id da mensagem: ${
				sendConsentMessageResult ?? 'N/A'
			}`
		)
		return sendConsentMessageResult
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const createLead = async (
	parsedInput,
	pesCod,
	isCnpjDocument,
	sensediaTokenCarbonCloudInternal,
	certificates
) => {
	let leadSemSeguroData = null
	let currentActivity =
		'Construção do payload para o registro de lead (Sem Seguro) no Dynamics'
	try {
		const leadPayload =
			factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload(
				parsedInput.formData,
				pesCod,
				isCnpjDocument
			)
		currentActivity = 'Registro de lead (Sem Seguro) no Dynamics'

		leadSemSeguroData =
			await api.producaoComercial.multicanal.leads.postSemSeguro(
				leadPayload,
				sensediaTokenCarbonCloudInternal,
				certificates
			)

		service.logger.info(
			leadPayload,
			`Lead registrado no Dynamics. Id do lead resultante: ${leadSemSeguroData.id}`
		)
	} catch (error) {
		if (
			error.name === 'DuplicatedLeadError' ||
			error.name === 'BlockListError'
		) {
			service.logger.warn(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
		} else {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
	}
	return leadSemSeguroData
}

const triggerWhatsAppBot = async (parsedInput, leadId) => {
	let currentActivity =
		'Construção do payload para o disparo do gatilho de início de comunicação direta via WhatsApp via Bot Porto'
	try {
		const whatsappPortoBotTriggerPayload =
			factory.api.zenvia.portoAssistencia.whatsappPortoBotTrigger.getPayload(
				parsedInput.formData,
				leadId
			)
		currentActivity =
			'Disparo do gatilho de início de comunicação direta via WhatsApp via Bot Porto'
		const whatsappPortoBotTriggerData =
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				whatsappPortoBotTriggerPayload
			)
		service.logger.info(
			`Gatilho de início de comunicação direta via WhatsApp via Bot Porto disparado com sucesso. Dados resultantes: ${JSON.stringify(
				whatsappPortoBotTriggerData
			)}`
		)
	} catch (error) {
		service.logger.warn(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}
}

const buildSuccessResponse = (
	processingTaxvat,
	processingDestinationNumber,
	processingEmailDestinationAddress,
	processingPescod,
	consentRegistered,
	sendConsentTopicMessageId,
	createdLeadId,
	sendAnalyticsCollectMessageId,
	isCnpjDocument
) => {
	let currentActivity = 'Construção do payload de retorno'
	try {
		const returnPayload =
			factory.controller.directContact.processedDataReport.getDataReport(
				processingTaxvat,
				processingDestinationNumber,
				processingEmailDestinationAddress,
				processingPescod,
				consentRegistered,
				sendConsentTopicMessageId,
				createdLeadId,
				sendAnalyticsCollectMessageId,
				isCnpjDocument
			)
		return returnPayload
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const isAnalyticsTaggingPossible = (parsedInput) => {
	let returnValue = false
	let currentActivity = 'Verificação se o tagueamento será possível: ID Google'
	try {
		const idGoogleProvided = parsedInput?.formData?.id_google
		currentActivity =
			'Verificação se o tagueamento será possível: Session Google'
		const sessionGoogleProvided = parsedInput?.formData?.session_google
		returnValue = idGoogleProvided && sessionGoogleProvided
		if (!returnValue) {
			let analyticsTaggingUnavailableMessage =
				'Tagueamento do Lead no Analytics não será possível devido a: '
			if (!idGoogleProvided) {
				analyticsTaggingUnavailableMessage +=
					'Identificador do google não recebido; '
			}
			if (!sessionGoogleProvided) {
				analyticsTaggingUnavailableMessage +=
					'Identificador de sessão do google não recebido; '
			}
			service.logger.warn(analyticsTaggingUnavailableMessage)
		}
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.warn(message)
	}
	return returnValue
}

const sendAnalyticsCollectQueueMessage = async (
	parsedInput,
	pescod,
	isCnpjDocument,
	leadId,
	leadVinculo
) => {
	let currentActivity =
		'Construção da mensagem que será enviada para a fila de envio de tagueamento para o Google Analytics'
	try {
		const analyticsCollectQueueMessage =
			factory.sqs.analyticsCollect.getSendAnalyticsCollectMessagePayload(
				parsedInput,
				pescod,
				isCnpjDocument,
				leadId,
				leadVinculo
			)

		currentActivity =
			'Envio da mensagem para a fila de envio de tagueamento para o Google Analytics'
		const analyticsCollectQueueSendMessageResult =
			await service.sqs.analyticsCollect.sendMessage(
				analyticsCollectQueueMessage
			)

		service.logger.info(
			`Mensagem enviada para a fila de envio de tagueamento para o Google Analytics. Id da mensagem: ${
				analyticsCollectQueueSendMessageResult ?? 'N/A'
			}`
		)
		return analyticsCollectQueueSendMessageResult
	} catch (error) {
		service.logger.warn(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}
}

const creatLeadCache = async (parsedInput, createdLeadId) => {
	try{
		const vdoCode = parsedInput.formData.lead.vdoCode
		const branchId = String(commonLibrary.SAP_CDC_PFP_PRODUCTS[parsedInput.formData.product])
		
		await service.dynamoDb.preFinancingLeadDataCache.create(vdoCode, branchId, createdLeadId)
	}catch(error){
		const processRegisterError = new Error(
			`Direct contact request processing error: ${error.message}`
		)
		
		service.logger.error(
			`Direct contact request processing error: Internal Error. Data: ${error.message}`
		)
	}
}

exports.processContact = async (parsedInput) => {
	let processingTaxvat = null
	let processingTaxvatCnpj = false
	let processingDestinationNumber = null
	let processingEmailDestinationAddress = null
	let processingPescod = null
	let consentRegistered = false
	let sendConsentTopicMessageId = null
	let sendAnalyticsCollectMessageId = null
	let createdLeadId = null
	try {
		const { isCnpjDocument } = inputValidation(parsedInput)
		processingTaxvatCnpj = isCnpjDocument
		exceptionSimulation(parsedInput)
		processingTaxvat = parsedInput.formData.client.cpfCnpj
		processingDestinationNumber = parsedInput.formData.client.cellPhone.replace(
			CONSTANT.PHONENUMBER_CLEANUP_REGEX,
			''
		)
		processingEmailDestinationAddress = parsedInput.formData.client.email

		const { sensediaToken, sensediaTokenCarbonCloudInternal, mulesoftImpersonalTokenHub, certificates } =
			await getApiGatewayTokens()

		let pescod = await getPescodBcc(
			parsedInput.formData.client.cpfCnpj,
			isCnpjDocument,
			mulesoftImpersonalTokenHub
		)
		if (!pescod) {
			pescod = await createPessoaBccAndGetPescod(
				parsedInput.formData.client,
				isCnpjDocument,
				mulesoftImpersonalTokenHub
			)
		}
		processingPescod = pescod
		consentRegistered = await tryRegisterConsent(
			pescod,
			parsedInput,
			sensediaToken
		)
		if (!consentRegistered) {
			const sendConsentTopicMenssageResult = await sendConsentTopicMessage(
				pescod,
				parsedInput
			)
			sendConsentTopicMessageId = sendConsentTopicMenssageResult
		}
		const createdLead = await createLead(
			parsedInput,
			pescod,
			isCnpjDocument,
			sensediaTokenCarbonCloudInternal,
			certificates
		)
		createdLeadId = createdLead?.id
		const createLeadVinculoPorto = createdLead?.vinculo_porto

		await creatLeadCache(parsedInput, createdLeadId)

		if (
			parsedInput.formData.channel === commonLibrary.WHATSAPP_CONTACT_REQUEST_CHANNEL_WHATSAPP
		) {
			await triggerWhatsAppBot(parsedInput, createdLead?.id)
		}

		if (isAnalyticsTaggingPossible(parsedInput)) {
			sendAnalyticsCollectMessageId = await sendAnalyticsCollectQueueMessage(
				parsedInput,
				pescod,
				isCnpjDocument,
				createdLeadId,
				createLeadVinculoPorto
			)
		}

		const successReturn = buildSuccessResponse(
			processingTaxvat,
			processingDestinationNumber,
			processingEmailDestinationAddress,
			processingPescod,
			consentRegistered,
			sendConsentTopicMessageId,
			createdLeadId,
			sendAnalyticsCollectMessageId,
			processingTaxvatCnpj
		)
		return successReturn
	} catch (error) {
		const processRegisterError = new Error(
			`Direct contact request processing error: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Direct contact request processing error: Mensagem com estrutura ou dado inválido.'
			)
		} else {
			try {
				const details =
					factory.controller.directContact.processedDataReport.getDataReport(
						processingTaxvat,
						processingDestinationNumber,
						processingEmailDestinationAddress,
						processingPescod,
						consentRegistered,
						sendConsentTopicMessageId,
						createdLeadId,
						sendAnalyticsCollectMessageId,
						processingTaxvatCnpj
					)
				service.logger.error(
					`Direct contact request processing error: Erro interno. Dados: ${JSON.stringify(
						details
					)}`
				)
			} catch (detailsError) {
				service.logger.error(
					`Direct contact request processing error: Erro interno. Dados: Não foi possível exibir os dados - ${detailsError.message}`
				)
			}
		}

		throw processRegisterError
	}
}
