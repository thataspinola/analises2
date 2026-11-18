const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const service = require('../../../src/service')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const Redis = require('ioredis')
const Errors = require('../../../src/error')
const { createHash } = require('node:crypto')

jest.mock('ioredis')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory/otpRequestControllerResponsePayloadFactory')
jest.mock(
	'../../../src/factory/seguranca/corporativa/portocom/validaTokenAaPayloadFactory'
)

afterEach(() => {
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

beforeAll(() => {
	Redis.mockImplementation(() => {
		return {
			exists: async (cacheKey) => {
				let returnValue = false
				try {
					const CPF_CACHED_WITH_PESCOD = createHash('md5')
						.update(MOCKS.IOREDISCACHE_KEY_CPF_WITHPESCOD())
						.digest('hex')
					const CPF_CACHED_WITHOUT_PESCOD = createHash('md5')
						.update(MOCKS.IOREDISCACHE_KEY_CPF_WITHOUTPESCOD())
						.digest('hex')

					switch (cacheKey) {
						case CPF_CACHED_WITH_PESCOD:
							returnValue = true
							break
						case CPF_CACHED_WITHOUT_PESCOD:
						default:
							returnValue = false
							break
					}
				} catch (error) {
					console.error('Unexpected error on Redis.exists mock')
				}
				return returnValue
			},
			get: async (cacheKey) => {
				let returnValue = JSON.stringify({})
				try {
					const CPF_CACHED_WITH_PESCOD = createHash('md5')
						.update(MOCKS.IOREDISCACHE_KEY_CPF_WITHPESCOD())
						.digest('hex')
					const CPF_CACHED_WITHOUT_PESCOD = createHash('md5')
						.update(MOCKS.IOREDISCACHE_KEY_CPF_WITHOUTPESCOD())
						.digest('hex')

					switch (cacheKey) {
						case CPF_CACHED_WITH_PESCOD:
							returnValue = JSON.stringify(
								MOCKS.IOREDISCACHE_VALUE_CPF_WITHPESCOD()
							)
							break
						case CPF_CACHED_WITHOUT_PESCOD:
							returnValue = JSON.stringify(
								MOCKS.IOREDISCACHE_VALUE_CPF_WITHOUTPESCOD()
							)
							break
					}
				} catch (error) {
					console.error('Unexpected error on Redis.get mock')
				}
				return returnValue
			},

			set: async (cacheKey) => {
				return 'OK'
			},

			del: async (cacheKey) => {
				return 'OK'
			},
		}
	})

	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	service.cpfValidation.isValidCPF.mockImplementation(() => {
		return true //Return true (no validation error)
	})

	token.getMulesoftImpersonalTokenHub.mockImplementation(async () => {
		return MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
	})

	token.getSensediaTokenHubCloud.mockImplementation(async () => {
		return MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
	})

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	factory.seguranca.corporativa.portocom.validaTokenAaPayload.getPayload.mockImplementation(
		(cpf, otp) => {
			return MOCKS.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAAPAYLOAD_GETPAYLOAD_VALID_RETURN()
		}
	)

	api.seguranca.corporativa.portocom.postValidaTokenAa.mockImplementation(
		async (postValidaTokenAaPayload, apiSensediaCloudTokenString) => {
			return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_VALID_RETURN()
		}
	)

	api.bcp.getDadosPessoa.mockImplementation(async (cpf, token) => {
		return MOCKS.API_BCP_GETDADOSPESSOA_EXISTS_RETURN()
	})

	api.governancaDados.dadosPessoa.getPessoa.mockImplementation((cpf, token) => {
		return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN()
	})

	factory.otpRequestControllerResponsePayload.getPayload.mockImplementation(
		(pescod) => {
			return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
		}
	)
})

describe('Given a valid input', () => {
	test('It should pass with no validation errors and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactoryResponseSuccess = jest.spyOn(factory.response, 'success')

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactoryResponseSuccess).toHaveBeenCalledWith(
			MOCKS.FACTORY_REQUEST_SUCCESS_BODYCONTENT_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_PESCOD_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should get an bad request response when receives a structure input that not follows the expected schema', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Errors.ValidationError('Validation')
		})
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_INPUT()
			)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_BAD_REQUEST()
		)
	})
	test('It should get an bad request response when receives a structure input that not follows the expected schema (all fields missing)', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Errors.ValidationError('Validation')
		})
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_NO_FIELDS_INVALID_INPUT()
			)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_BAD_REQUEST()
		)
	})
	test('It should get an bad request response when receives a structure input that follows the expected schema but with an invalid CPF value in client.cpf field', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_TAXVAT_INPUT()
			)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_BAD_REQUEST()
		)
	})
	test('It should get an bad request response when provided otp code is invalid', async () => {
		api.seguranca.corporativa.portocom.postValidaTokenAa.mockImplementationOnce(
			async (postValidaTokenAaPayload, apiSensediaCloudTokenString) => {
				return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_NOTFOUND_INVALIDTOKEN_RESPONSE()
			}
		)

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_CODIGO_INPUT()
			)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALIDCODE_BAD_REQUEST()
		)
	})
	test('It should get an bad request response when provided taxvat not exists', async () => {
		api.seguranca.corporativa.portocom.postValidaTokenAa.mockImplementationOnce(
			async (postValidaTokenAaPayload, apiSensediaCloudTokenString) => {
				return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_NOTFOUND_RETURN()
			}
		)

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_TAXVAT_NOTEXISTS_INPUT()
			)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_TAXVAT_NOTEXISTS_BAD_REQUEST()
		)
	})
	test('It should get an error response when token validation returns an unexpected 404 response', async () => {
		api.seguranca.corporativa.portocom.postValidaTokenAa.mockImplementationOnce(
			async (postValidaTokenAaPayload, apiSensediaCloudTokenString) => {
				return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_UNEXPECTED_NOTFOUND_RETURN()
			}
		)
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Validação do token AA': Unexpected validation token HTTP 404 error response data`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when an unexpected exception occur in input validation', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Error('Unexpected error')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Validação dos dados': Error: Unexpected error`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when receives value that triggers the exception simulation', async () => {
		const spyErrorConstructor = jest.spyOn(global, 'Error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_EXCEPTION_SIMULATE_INPUT()
			)
		expect(spyErrorConstructor).toHaveBeenCalledWith(
			`API error: code '500' data: '{ "message": "Fake failure" }'`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when get exception during sensedia api gateway token retrieve', async () => {
		token.getSensediaTokenHubCloud.mockImplementationOnce(async () => {
			throw new Error('Token generation: Something went wrong')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Obtenção do token Sensedia Token Hub Cloud': Token generation: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when pescod does not exists in cache and get exception during CA api gateway token retrieve', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return false
				},
				set: async () => {},
				get: async () => {},
				del: async () => {},
			}
		})

		token.getMulesoftImpersonalTokenHub.mockImplementationOnce(async () => {
			throw new Error('Token generation: Something went wrong')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Obtenção do token Mulesoft Impersonal Token Hub': Token generation: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should pass with no errors when pescod exists in cache and the final cache update works when there is more then one message registered to the same pescod', async () => {
		const redisBaseObject = {
			exists: jest.fn(async () => {
				return true
			}),
			set: async () => {
				return 'OK'
			},
			get: async () => {
				return JSON.stringify(
					MOCKS.IOREDISCACHE_VALUE_CPF_WITHPESCOD_AND_MULTIPLE_MESSAGES()
				)
			},
			del: async () => {},
		}

		Redis.mockImplementationOnce(() => {
			return redisBaseObject
		})

		const ioredisKeyWithPescod = createHash('md5')
			.update(MOCKS.IOREDISCACHE_KEY_CPF_WITHPESCOD())
			.digest('hex')

		const spyRedisSet = jest.spyOn(redisBaseObject, 'set')
		const spyRedisDel = jest.spyOn(redisBaseObject, 'del')

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)

		expect(spyRedisSet).toHaveBeenCalledWith(
			ioredisKeyWithPescod,
			MOCKS.IOREDISCACHE_VALUE_CPF_WITHPESCOD_FROM_MULTIPLE_MESSAGES_WITHOUT_FIRST_JSON_STRING()
		)

		expect(spyRedisDel).not.toHaveBeenCalled()

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no errors when pescod exists in cache and get exception during final cache update', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return true
				},
				set: async () => {},
				get: async () => {
					return JSON.stringify(MOCKS.IOREDISCACHE_VALUE_CPF_WITHPESCOD())
				},
				del: async () => {
					throw new Error('Unexpected error when tried to delete cache entry')
				},
			}
		})

		const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
			`Erro (não bloqueante) identificado durante a atividade 'Removendo registro de cache': Unexpected error when tried to delete cache entry`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no errors when pescod does not exists in cache and is found in BCP and return success even when get exception during cache populate', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					throw new Error(
						'Redis instance from method exists: Something went wrong'
					)
				},
				set: async () => {},
				get: async () => {},
				del: async () => {},
			}
		})
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(pescod) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_FROM_CONTROLLER_BCP_PESCOD_VALID_RETURN()
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'warn')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro (não bloqueante) identificado durante a atividade 'Obtendo o pescod a partir dos dados em cache': Redis instance from method exists: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN()
		)
	})
	test('It should pass with no errors when pescod does not exists in cache and is found in BCC and return success even when get exception during cache populate', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					throw new Error(
						'Redis instance from method exists: Something went wrong'
					)
				},
				set: async () => {},
				get: async () => {},
				del: async () => {},
			}
		})
		api.bcp.getDadosPessoa.mockImplementationOnce(async (cpf, token) => {
			return null
		})

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(pescod) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_FROM_CONTROLLER_BCC_PESCOD_VALID_RETURN()
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'warn')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro (não bloqueante) identificado durante a atividade 'Obtendo o pescod a partir dos dados em cache': Redis instance from method exists: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCC_RETURN()
		)
	})
	test('It should get an error response when pescod does not exists in cache and is not found in both in BCP and BCC', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return false
				},
				set: async () => {},
				get: async () => {},
				del: async () => {},
			}
		})

		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return null
		})

		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return null
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Buscando cadastro de pessoa - BCP/BCC': Unable to determine pescod`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when pescod does not exists in cache and BCP and BCC calls get exceptions', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return false
				},
				set: async () => {},
				get: async () => {},
				del: async () => {},
			}
		})

		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			throw new Error('Unexpected BCP getDadosPessoa error')
		})

		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				throw new Error('Unexpected DadosPessoa getPessoa error')
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Buscando cadastro de pessoa - BCP/BCC': Both BCP and BCC taxvat search APIs calls failed`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when when prepare to return success', async () => {
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			() => {
				throw new Error(
					'otpRequestControllerResponsePayload getPayload: Something went wrong'
				)
			}
		)
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Construção do payload de retorno': otpRequestControllerResponsePayload getPayload: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when when prepare to return bad request', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

		api.seguranca.corporativa.portocom.postValidaTokenAa.mockImplementationOnce(
			async (postValidaTokenAaPayload, apiSensediaCloudTokenString) => {
				return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTVALIDATOKENAA_NOTFOUND_INVALIDTOKEN_RESPONSE()
			}
		)

		jest
			.spyOn(factory.response, 'badRequestError')
			.mockImplementationOnce(() => {
				throw new Error('Unexpected response factory badRequestError error')
			})

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Construção do payload de retorno': Unexpected response factory badRequestError error`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
})
