const factory = require('../factory')
const service = require('../service')
const CONSTANT = require('../property')
const errors = require('../error')
const api = require('../api')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const { createHash } = require('node:crypto')
const Redis = require('ioredis')

const getPescodBcp = async (taxvat, mulesoftImpersonalTokenHub) => {
	let currentActivity = 'Verificação da existência de cadastro de pessoa - BCP'
	try {
		let pescod = null
		const cadastroExistenteBcp = await api.bcp.getDadosPessoa(
			taxvat,
			mulesoftImpersonalTokenHub
		)
		if (cadastroExistenteBcp && cadastroExistenteBcp.pescod) {
			pescod = cadastroExistenteBcp.pescod
			service.logger.info(
				`Identificado existência do registro de pessoa - BCP. Pescod ${cadastroExistenteBcp.pescod}`
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

const getPescodBcc = async (taxvat, mulesoftImpersonalTokenHub) => {
	let currentActivity = 'Verificação da existência de cadastro de pessoa - BCC'
	try {
		let pescod = null

		const cadastroExistenteBcc =
			await api.governancaDados.dadosPessoa.getPessoa(
				taxvat,
				mulesoftImpersonalTokenHub
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

const inputValidation = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(parsedInput, CONSTANT.OTP_REQUEST_SCHEMA)

		if (!service.cpfValidation.isValidCPF(parsedInput.taxvat)) {
			throw new errors.ValidationError('Número de CPF inválido')
		}
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error}`
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
		if (parsedInput.taxvat === '01234567890') {
			throw new Error(
				`API error: code '500' data: '{ "message": "Fake failure" }'`
			)
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const tryGetDataFromCache = async (taxvat) => {
	let redisCache = null
	let cacheKey = null
	let existentCache = false
	let pescod = null
	let currentActivity = 'Iniciando conexão com o mecanismo de cache'
	try {
		redisCache = new Redis(CONSTANT.OTP_REDIS_CACHE_CONN_STRING)

		currentActivity = 'Obtendo o pescod a partir dos dados em cache'
		cacheKey = createHash('md5').update(taxvat).digest('hex')
		let cacheContent = []
		existentCache = await redisCache.exists(cacheKey)
		if (existentCache) {
			const existentCacheData = await redisCache.get(cacheKey)
			cacheContent = JSON.parse(existentCacheData)
			pescod = cacheContent.pescod
		}
	} catch (error) {
		service.logger.warn(
			`Erro (não bloqueante) identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}

	return { redisCache, cacheKey, existentCache, pescod }
}

const getApiGatewayTokens = async () => {
	let currentActivity = 'Obtenção do token Sensedia Token Hub Cloud'
	try {
		const sensediaCloudToken = await token.getSensediaTokenHubCloud()

		currentActivity = 'Obtenção do token Mulesoft Impersonal Token Hub'
		const mulesoftImpersonalTokenHub =
			await token.getMulesoftImpersonalTokenHub()

		return { sensediaCloudToken, mulesoftImpersonalTokenHub }
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const validateOtpCode = async (taxvat, otpCode, sensediaCloudToken) => {
	let currentActivity =
		'Construção do payload para chamada do validador de token AA'
	try {
		let isValidOtpCode = false
		let invalidTokenMessage = 'N/A'
		const validaTokenAaPayload =
			factory.seguranca.corporativa.portocom.validaTokenAaPayload.getPayload(
				taxvat,
				otpCode
			)

		currentActivity = 'Validação do token AA'
		const validaTokenAaResponse =
			await api.seguranca.corporativa.portocom.postValidaTokenAa(
				validaTokenAaPayload,
				sensediaCloudToken
			) //Retorna apenas 200 e 404, outros codigos da throw em exception

		if (validaTokenAaResponse.status === 404) {
			if (validaTokenAaResponse.data.message) {
				invalidTokenMessage = CONSTANT.GENERIC_RESPONSE_MESSAGE_TOKEN
			} else {
				throw new Error(
					'Unexpected validation token HTTP 404 error response data'
				)
			}
		} else {
			isValidOtpCode = true
		}
		return {
			isValidOtpCode,
			invalidTokenMessage,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getPessoaPescod = async (taxvat, mulesoftImpersonalTokenHub) => {
	let currentActivity = 'Buscando cadastro de pessoa - BCP/BCC'
	try {
		const beforeGetPessoaPescodDateTime = new Date()
		const [getPescodBcpResponse, getPescodBccResponse] =
			await Promise.allSettled([
				getPescodBcp(taxvat, mulesoftImpersonalTokenHub),
				getPescodBcc(taxvat, mulesoftImpersonalTokenHub),
			])

		if (
			![getPescodBcpResponse.status, getPescodBccResponse.status].includes(
				'fulfilled'
			)
		) {
			throw new Error('Both BCP and BCC taxvat search APIs calls failed')
		}

		if (
			getPescodBcpResponse.status === 'fulfilled' &&
			getPescodBcpResponse.value
		) {
			pescod = `${getPescodBcpResponse.value}`
		} else if (
			getPescodBccResponse.status === 'fulfilled' &&
			getPescodBccResponse.value
		) {
			pescod = `${getPescodBccResponse.value}`
		} else {
			throw new Error('Unable to determine pescod')
		}
		const afterGetPessoaPescodDateTime = new Date()
		service.logger.info(
			`Tempo decorrido para obter pescod das bases: ${
				afterGetPessoaPescodDateTime.getTime() -
				beforeGetPessoaPescodDateTime.getTime()
			} milisegundos.`
		)
		return pescod
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const tryUpdateCacheData = async (redisCache, cacheKey, existentCache) => {
	if (redisCache && cacheKey && existentCache) {
		let currentActivity = 'Obtendo dados mais recentes de cache'
		try {
			let cacheContent = null
			const existentCacheData = await redisCache.get(cacheKey)
			cacheContent = JSON.parse(existentCacheData)

			if (cacheContent.sqsMessages.length > 1) {
				cacheContent.sqsMessages.splice(0, cacheContent.sqsMessages.length - 1)
				currentActivity = 'Atualizando registro de cache'
				await redisCache.set(cacheKey, JSON.stringify(cacheContent))
			} else {
				currentActivity = 'Removendo registro de cache'
				await redisCache.del(cacheKey)
			}
		} catch (error) {
			service.logger.warn(
				`Erro (não bloqueante) identificado durante a atividade '${currentActivity}': ${error.message}`
			)
		}
	}
}

const buildBadRequestResponse = (taxvat, otpCode, invalidTokenMessage) => {
	let currentActivity = 'Construção do payload de retorno'
	try {
		service.logger.info(
			`OTP inválido. Dados: ${JSON.stringify({
				cpf: `${taxvat.substring(0, 4)}******`,
				otp: `***${otpCode.substring(3)}`,
			})}`
		)
		const returnResponse = factory.response.badRequestError(invalidTokenMessage)
		return returnResponse
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const buildSuccessResponse = (taxvat, otpCode, pescod) => {
	let currentActivity = 'Construção do payload de retorno'
	try {
		service.logger.info(
			`OTP válido. Dados: ${JSON.stringify({
				cpf: `${taxvat.substring(0, 4)}******`,
				otp: `***${otpCode.substring(3)}`,
			})}`
		)

		const successBodyContent =
			factory.otpRequestControllerResponsePayload.getPayload(pescod)
		const successResponse = factory.response.success(successBodyContent)

		return successResponse
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

exports.processRequest = async (parsedInput) => {
	try {
		const logTaxvat = `${parsedInput.taxvat ?? '???????????'}`
		const logOtpCode = `${parsedInput.codigo ?? '??????'}`
		service.logger.info(
			`Recebida solicitação de validação de OTP. Dados: ${JSON.stringify({
				cpf: `${logTaxvat.substring(0, 4)}******`,
				otp: `***${logOtpCode.substring(3)}`,
			})}`
		)

		inputValidation(parsedInput)

		exceptionSimulation(parsedInput)

		const {
			redisCache,
			cacheKey,
			existentCache,
			pescod: cachedPescod,
		} = await tryGetDataFromCache(parsedInput.taxvat)

		let pescod = cachedPescod

		const { sensediaCloudToken, mulesoftImpersonalTokenHub } =
			await getApiGatewayTokens()

		const { isValidOtpCode, invalidTokenMessage } = await validateOtpCode(
			parsedInput.taxvat,
			parsedInput.codigo,
			sensediaCloudToken
		)

		if (isValidOtpCode && !pescod) {
			pescod = await getPessoaPescod(
				parsedInput.taxvat,
				mulesoftImpersonalTokenHub
			)
		}

		let returnResponse = null
		if (!isValidOtpCode) {
			returnResponse = buildBadRequestResponse(
				parsedInput.taxvat,
				parsedInput.codigo,
				invalidTokenMessage
			)
		} else {
			returnResponse = buildSuccessResponse(
				parsedInput.taxvat,
				parsedInput.codigo,
				pescod
			)
		}

		await tryUpdateCacheData(redisCache, cacheKey, existentCache)

		return returnResponse
	} catch (error) {
		if (error.name == 'ValidationError') {
			return factory.response.badRequestError(
				'Não foi possível processar a requisição, por favor revise os dados'
			)
		}
		return factory.response.error(
			'Erro interno na validação de login de uso único'
		)
	}
}
