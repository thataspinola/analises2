const CONSTANT = require('../property')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const service = require('../service')
const API = require('../api')
const logger = require('../../logger')
const factory = require('./../factory')
const activity = require('./activity')

exports.create = async (inputData, correlationId, context) => {
	let currentActivity = 'Iniciando validação'
	try {
		service.validation.inputData(inputData, CONSTANT.SCHEMA.travelQuotationSchema)

		currentActivity = 'obtendo token'
		const token = await getToken()

		currentActivity = 'executando atividade de cupom'
		const coupon = await couponHandlerActivity(inputData)

		currentActivity = 'Criando payload de cotação'
		const quotation = createQuotation(inputData)

		currentActivity = 'criando oferta'
		const oferta = await createOfertas(
			quotation,
			token,
			correlationId,
			coupon,
			resolveTimeout(context, CONSTANT.OFERTA_API_TIMEOUT_MS)
		)

		return oferta
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`,
			`CorrelationId: ${correlationId}`
		)

		throw error
	}
}


/**
 * Calcula o timeout de uma chamada externa a partir do tempo que resta de execução
 * da lambda, reservando margem para montar e devolver a resposta. Sem isso a lambda
 * pode ser encerrada antes do `catch`, e quem chama recebe uma resposta sem statusCode.
 * @param {object} context Context da lambda
 * @param {number} ceilingMs Teto configurado para a chamada
 * @returns {number} Timeout em milissegundos
 */
function resolveTimeout(context, ceilingMs) {
	if (!context || typeof context.getRemainingTimeInMillis !== 'function') {
		return ceilingMs
	}

	const budget =
		context.getRemainingTimeInMillis() - CONSTANT.LAMBDA_RESPONSE_RESERVE_MS

	return Math.max(CONSTANT.MIN_API_TIMEOUT_MS, Math.min(ceilingMs, budget))
}

async function createOfertas(payload, token, correlationId, coupon, timeout) {
	const oferta = await API.vida.viagemOn.oferta.post(
		payload,
		token,
		correlationId,
		timeout
	)

	if (Array.isArray(oferta)) {
		return oferta.map(of => ({
			...of,
			cupomAplicado: coupon ? {
				codigo: coupon.codigo,
				percentualDesconto: coupon.percentualDesconto,
				descricao: coupon.descricao
			} : null
		}))
	}

	return oferta
}

async function getToken() {
	const beforeGetToken = new Date()
	const SENSEDIA_HUB_TOKEN = await tokenLayer.getSensediaTokenHub()
	logExecutionTime(beforeGetToken, new Date(), 'Obter o token')

	return SENSEDIA_HUB_TOKEN
}

function logExecutionTime(startExecution, endExecution, description) {
	logger.info(
		`Tempo decorrido para ${description}: ${endExecution.getTime() - startExecution.getTime()
		} milisegundos.`
	)
}

function createQuotation(inputPayload) {
	return factory.quotation.create(inputPayload)
}

async function couponHandlerActivity(inputData) {
	const coupon = await activity.couponHandler.execute(inputData)
	if (coupon) {
		return {
			codigo: coupon.codigo,
			percentualDesconto: coupon.percentualDesconto,
			descricao: coupon.descricao
		}
	}

	return null
}