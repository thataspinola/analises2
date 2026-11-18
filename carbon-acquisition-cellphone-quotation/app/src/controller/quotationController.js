const CONST = require('../property')
const { quotationFactory, responseFactory } = require('../factory')
const { validationService, logger } = require('../service')
const { cellphoneApi } = require('../api')
const { ExternalApiError, CouponApiError, MaxTimeExceededError } = require('../common/errors')
const sqs = require('../service/sqs')
const activity = require('./activity')

const tokenLayer = require(CONST.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	let mulesoftToken
	let couponData
	try {
		await ppWebQuotationInsert(inputRequest)

		validationService.inputData(inputRequest)

		const couponData = await activity.couponHandler.execute(inputRequest)
		const payload = quotationFactory.makePayload(inputRequest, couponData)

		const beforeGetToken = new Date()
		mulesoftToken = await getToken()
		const portoCertificates = await tokenLayer.getPortoCertificates()

		logExecutionTime(beforeGetToken, new Date(), 'obter token')

		logger.info(payload, 'Payload enviado ao produto, para solicitar o hash de cotação')
		const beforePostQuotation = new Date()
		const quotationHash = await cellphoneApi.quotationRequest(
			payload,
			mulesoftToken,
			portoCertificates
		)
		logExecutionTime(beforePostQuotation, new Date(), 'POST calculo')

		if (!quotationHash?.hash) {
			throw new Error('Não foi retornado o resultado esperado')
		}

		const beforeGetQuotation = new Date()
		const quotation = await getQuotation(
			quotationHash.hash,
			payload.codigoCanal,
			mulesoftToken,
			portoCertificates
		)

		if (quotation?.riscoAceito === false && inputRequest?.idLead) {
			await activity.publishMessageDenyLead.execute(inputRequest.idLead)
		}

		logger.info(quotation, 'Cotação retornada pelo produto.')

		logExecutionTime(beforeGetQuotation, new Date(), 'GET calculo')
		logExecutionTime(beforeGetToken, new Date(), 'execucao total do calculo')

		return responseFactory.quotationSuccess(inputRequest, quotation, couponData)
	} catch (error) {
		if (error instanceof ExternalApiError && error.code === 500) {
			error.message = JSON.stringify(
				JSON.parse(error.message)?.mensagemError?.errorMessage?.payload
			)
		}
		throw error
	}
}

async function getToken() {
	try {
		const mulesoftToken = await tokenLayer.getMulesoftTokenHubInternal()

		return mulesoftToken
	} catch (error) {
		logger.error(error.message)
		throw Error(CONST.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getQuotation(hash, codigoCanal, token, portoCertificates) {
	let count = 0
	const startProcess = Date.now()

	do {
		if ('test' !== CONST.CURRENT_ENVIRONMENT.trim()) {
			logger.info(
				`aguardando ${CONST.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS} milisegundos`
			)
			await sleep(CONST.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS)
		}
		logger.info(`Realizando GET de cotação - ${++count}x para o hash ${hash}`)
		const quotation = await cellphoneApi.getCalculoResponse(
			hash,
			codigoCanal,
			token,
			portoCertificates
		)

		if (isValidQuotation(quotation)) {
			return quotation
		}
	} while (
		new Date().getTime() <
		new Date(startProcess + CONST.MAX_TIME_PROCESS_QUOTATION * 1000).getTime()
	)
	throw new MaxTimeExceededError()
}

function isValidQuotation(quotation) {
	if (
		quotation &&
		quotation.hasOwnProperty('pacotes') &&
		quotation.pacotes.some((item) => item.hasOwnProperty('parcelas'))
	) {
		return quotation
	}
}

async function ppWebQuotationInsert(inputRequest) {
	try {
		await sqs.queue.sendMessage(inputRequest, CONST.CARBON_QUEUE_URL)
		logger.info('Requisição da mensagem enviada com sucesso')
	} catch (error) {
		logger.error('Ocorreu um erro na requisição da mensagem')
	}
}

function logExecutionTime(startExecution, endExecution, description) {
	const duration = endExecution.getTime() - startExecution.getTime()
	logger.info(
		{
			step: description.replaceAll(' ', '_'),
			duration: duration,
		},
		`Tempo decorrido para ${description}: ${duration} milisegundos.`
	)
}
