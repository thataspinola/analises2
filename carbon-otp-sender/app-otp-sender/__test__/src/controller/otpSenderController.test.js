const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const token = require('@porto-seguro/hub-vendas.carbon-token')
const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const Redis = require('ioredis')
const Errors = require('../../../src/error')

jest.mock('ioredis')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory/otpSenderControllerResponsePayloadFactory')
jest.mock(
	'../../../src/factory/governancaDados/dadosPessoa/pessoaPayloadFactory'
)
jest.mock(
	'../../../src/factory/seguranca/corporativa/portocom/geraTokenAaPayloadFactory'
)
jest.mock('../../../src/factory/corporativo/smsservice/sendSmsPayloadFactory')
jest.mock('../../../src/factory/sqs/emailSenderQueueMessageFactory')

afterEach(() => {
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

const sqsMock = mockClient(SQSClient)

beforeAll(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 16, 0, 0, 0, 0))

	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	service.cpfValidation.isValidCPF.mockImplementation(() => {
		return true //Return true (no validation error)
	})

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	Redis.mockImplementation(() => {
		return {
			exists: async () => {
				return false
			},
			set: async () => {},
			get: async () => {},
			del: async () => {},
		}
	})

	token.getSensediaTokenHub.mockImplementation(async () => {
		return MOCKS.SENSEDIA_HUB_TOKEN()
	})

	token.getSensediaTokenHubCloud.mockImplementation(async () => {
		return MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
	})

	token.getMulesoftImpersonalTokenHub.mockImplementation(async () => {
		return MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
	})

	factory.governancaDados.dadosPessoa.pessoa.getPayload.mockImplementation(
		(clientData) => {
			return MOCKS.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_RETURN()
		}
	)

	api.governancaDados.dadosPessoa.postPessoa.mockImplementation(
		async (pessoaPaylaod, token) => {
			return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RETURN()
		}
	)

	api.portais.msUsuarios.users.postStatus.mockImplementation(
		async (cpfCnpj, sensediaToken) => {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_SUCCESS_RETURN()
		}
	)

	api.portais.msUsuarios.users.activation.simple.postAntifraud.mockImplementation(
		async (cpfCnpj, corporativeHeaderValue, sensediaToken) => {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_POSTANTIFRAUD_VALID_RETURN()
		}
	)

	factory.seguranca.corporativa.portocom.geraTokenAaPayload.getPayload.mockImplementation(
		(cpf) => {
			return MOCKS.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAAPAYLOAD_GETPAYLOAD_VALID_RETURN()
		}
	)

	api.seguranca.corporativa.portocom.postGeraTokenAa.mockImplementation(
		async (postGeraTokenAaPayload, apiSensediaCloudTokenString) => {
			return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTGERATOKENAA_VALID_RETURN()
		}
	)

	factory.corporativo.smsservice.sendSmsPayload.getPayload.mockImplementation(
		(cellphone, otpCode) => {
			return MOCKS.FACTORY_CORPORATIVO_SMSSERVICE_SENDSMSPAYLOAD_GETPAYLOAD_RETURN()
		}
	)

	api.corporativo.smsservice.postSendSms.mockImplementation(
		async (sendSmsPayload, token) => {
			return MOCKS.API_CORPORATIVO_SMSSERVICE_POSTSENDSMS_VALID_RETURN()
		}
	)

	factory.sqs.emailSenderQueueMessage.getMessage.mockImplementation(
		(destinationEmail, clientName, otpCode) => {
			return MOCKS.FACTORY_SQS_EMAILSENDERQUEUEMESSAGE_GETMESSAGE_VALID_RETURN()
		}
	)

	service.sqs.emailSenderQueue.sendMessage.mockImplementation(
		async (message) => {
			return MOCKS.SERVICE_SQS_EMAIL_SENDER_QUEUE_SENDMESSAGE_VALID_RETURN()
		}
	)

    api.governancaDados.dadosPessoa.postPessoa.mockImplementation(
        async (pessoaPayload, token) => {
            return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_POSTPESSOA_SUCCESS_RETURN()
        }
    )

	sqsMock
		.on(SendMessageCommand)
		.resolves(
			MOCKS.SERVICE_SQS_EMAIL_SENDER_QUEUE_SENDMESSAGE_VALID_SQS_RESPONSE()
		)

	service.tokenAaService.gerarTokenAaComRetry.mockImplementation(
		async (postGeraTokenAaPayload, apiSensediaCloudTokenString) => {
			return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTGERATOKENAA_VALID_RETURN()
		}
	)
})

beforeEach(() => {
	factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
		(
			cpf,
			celular,
			email,
			otpCode,
			sendSmsMessageId,
			sendEmailQueueMessageId
		) => {
			return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
		}
	)
})

describe('Given a valid input', () => {
	test('It should pass with no validation errors and return success', async () => {
		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDSMSMESSAGEID_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDEMAILQUEUEMESSAGEID_INPUT()
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_SMS_SUCCESSFULLY_SENT()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors and return success and update cache pescod when pre existent value is null', async () => {
		const redisBaseObject = {
			exists: jest.fn(async () => {
				return true
			}),
			set: async () => {},
			get: async () => {
				return JSON.stringify(MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD())
			},
			del: async () => {},
		}

		Redis.mockImplementationOnce(() => {
			return redisBaseObject
		})

		const spyRedisSet = jest.spyOn(redisBaseObject, 'set')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(spyRedisSet).toHaveBeenCalledWith(
			MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD_CACHE_SET_KEY_INPUT(),
			MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD_CACHE_SET_DATA_INPUT()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors and return success and not update cache pescod when pre existent value is not null', async () => {
		const redisBaseObject = {
			exists: jest.fn(async () => {
				return true
			}),
			set: async () => {},
			get: async () => {
				return JSON.stringify(MOCKS.REDIS_CACHED_DATA())
			},
			del: async () => {},
		}

		Redis.mockImplementationOnce(() => {
			return redisBaseObject
		})

		const spyRedisSet = jest.spyOn(redisBaseObject, 'set')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(spyRedisSet).not.toHaveBeenCalled()

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors and return success, try update cache pescod when pre existent value is null and should not throws exception when get exception during cache update ', async () => {
		const redisBaseObject = {
			exists: jest.fn(async () => {
				return true
			}),
			set: async () => {
				throw new Error(MOCKS.CACHEUPDATEEXCEPTION_ERROR_MESSAGE())
			},
			get: async () => {
				return JSON.stringify(MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD())
			},
			del: async () => {},
		}

		const spyServiceLoggerWarn = jest.spyOn(service.logger, 'warn')

		Redis.mockImplementationOnce(() => {
			return redisBaseObject
		})

		const spyRedisSet = jest.spyOn(redisBaseObject, 'set')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(spyRedisSet).toHaveBeenCalledWith(
			MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD_CACHE_SET_KEY_INPUT(),
			MOCKS.REDIS_CACHED_DATA_WITH_NULL_PESCOD_CACHE_SET_DATA_INPUT()
		)

		expect(spyServiceLoggerWarn).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_WARN_CACHEUPDATEEXCEPTION_MESSAGE_INPUT()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors and return success if SMS sending fails but email sender queue message sending did not', async () => {
		const smsErrorMessage = 'Any smsservice postSendSms unexpected error'

		api.corporativo.smsservice.postSendSms.mockImplementationOnce(
			async (sendSmsPayload, token) => {
				throw new Error(smsErrorMessage)
			}
		)

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
			null,
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDEMAILQUEUEMESSAGEID_INPUT()
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_SMS_SUCCESSFULLY_SENT()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors and return success if email sender queue message sending fails but SMS sending did not', async () => {
		const emailSqsMessageErrorMessage =
			'Any emailSenderQueueService sendMessage unexpected error'

		service.sqs.emailSenderQueue.sendMessage.mockImplementationOnce(
			async (message) => {
				throw new Error(emailSqsMessageErrorMessage)
			}
		)

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDSMSMESSAGEID_INPUT(),
			null
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_SMS_SUCCESSFULLY_SENT()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should ignore message processing (when this is expected), log info with ignored data and pass with no validation errors and return success', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return true
				},
				set: async () => {},
				get: async () => {
					return JSON.stringify(
						MOCKS.REDIS_CACHED_DATA_WITH_MULTIPLE_MESSAGES()
					)
				},
				del: async () => {},
			}
		})

		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(cpf, cellphone, otpCode, sendSmsMessageId) => {
				return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_WITHOUTPROCESSING_RETURN()
			}
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			null,
			null,
			null
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_IGNORED_PROCESSING()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_WITHOUTMESSAGEPROCESSING_RETURN()
		)
	})
	test('It should create user in BCC (when this is expected) and pass with no validation errors and return success', async () => {
        const spyApiGovernancaDadosDadosPessoaPostPessoa = jest.spyOn(
            api.governancaDados.dadosPessoa,
            'postPessoa'
        )

        const spyFactoryGovernancaDadosDadosPessoaPessoaGetPayload = jest.spyOn(
            factory.governancaDados.dadosPessoa.pessoa,
            'getPayload'
        )

        const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
            factory.otpSenderControllerResponsePayload,
            'getPayload'
        )

        const otpSenderProcessRequestResponse =
            await controller.otpSender.processRequest(
                MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_WITH_NO_PESCOD_VALID_INPUT(),
                MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
            )

        expect(
            spyFactoryGovernancaDadosDadosPessoaPessoaGetPayload
        ).toHaveBeenCalledWith(
            MOCKS.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_CLIENTDATA_INPUT()
        )
        expect(spyApiGovernancaDadosDadosPessoaPostPessoa).toHaveBeenCalled()
        expect(
            spyFactoryOtpSenderControllerResponsePayloadGetPayload
        ).toHaveBeenCalledWith(
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDSMSMESSAGEID_INPUT(),
            MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDEMAILQUEUEMESSAGEID_INPUT()
        )

        expect(otpSenderProcessRequestResponse).toEqual(
            MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
        )
    })
	test('It should run antifraud (when this is expected) and pass with no validation errors and return success', async () => {
		const spyApiPortaisMsusuariosUsersActivationSimplePostAntifraud =
			jest.spyOn(
				api.portais.msUsuarios.users.activation.simple,
				'postAntifraud'
			)

		api.portais.msUsuarios.users.postStatus.mockImplementationOnce(
			async (cpfCnpj, sensediaToken) => {
				return MOCKS.API_PORTAIS_MSUSUARIOS_USERS_POSTSTATUS_NOTFOUND_RETURN()
			}
		)

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDSMSMESSAGEID_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDEMAILQUEUEMESSAGEID_INPUT()
		)
		expect(
			spyApiPortaisMsusuariosUsersActivationSimplePostAntifraud
		).toHaveBeenCalledWith(
			MOCKS.HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_TAXVAT(),
			MOCKS.HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_CORPORATIVEHEADER(),
			MOCKS.SENSEDIA_HUB_TOKEN()
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should ignore message processing (when this is expected), log info without ignored data (when exception occurs in this step) message and pass with no validation errors and return success', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return true
				},
				set: async () => {},
				get: async () => {
					return JSON.stringify(
						MOCKS.REDIS_CACHED_DATA_WITH_MULTIPLE_MESSAGES()
					)
				},
				del: async () => {},
			}
		})

		const errorMessage =
			'Any otpSenderControllerResponsePayload getPayLoad unexpected error'
		factory.otpSenderControllerResponsePayload.getPayload.mockImplementationOnce(
			(cpf, celular, email, otpCode, sendSmsMessageId) => {
				throw new Error(errorMessage)
			}
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const otpSenderProcessRequestResponse =
			await controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			null,
			null,
			null
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_IGNORED_PROCESSING_WITHOUT_DATA(
				errorMessage
			)
		)

		expect(otpSenderProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should throws exception when both proccess of SMS sending and email queue sender message sending fails', async () => {
		const smsErrorMessage = 'Any smsservice postSendSms unexpected error'
		const emailSqsMessageErrorMessage =
			'Any emailSenderQueueService sendMessage unexpected error'

		api.corporativo.smsservice.postSendSms.mockImplementationOnce(
			async (sendSmsPayload, token) => {
				throw new Error(smsErrorMessage)
			}
		)

		service.sqs.emailSenderQueue.sendMessage.mockImplementationOnce(
			async (message) => {
				throw new Error(emailSqsMessageErrorMessage)
			}
		)

		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(
				cpf,
				celular,
				email,
				otpCode,
				sendSmsMessageId,
				sendEmailQueueMessageId
			) => {
				return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
			}
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				'SMS send and email queue message send failed'
			)
		)
	})
	test('It should pass with no validation errors and return success without messageId return data when no email was set in message', async () => {
		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		const spyServiceSqsEmailSenderQueueSendMessage = jest.spyOn(
			service.sqs.emailSenderQueue,
			'sendMessage'
		)

		const spyServiceLoggerInfo = jest.spyOn(service.logger, 'info')

		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(
				cpf,
				celular,
				email,
				otpCode,
				sendSmsMessageId,
				sendEmailQueueMessageId
			) => {
				return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_WITHOUTEMAIL_VALID_RETURN()
			}
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_WITHBLANKEMAIL_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_SUCCESS_WITHOUTEMAIL_RETURN()
		)

		expect(spyServiceSqsEmailSenderQueueSendMessage).not.toHaveBeenCalled()

		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BLANKEMAIL_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_OTPCODE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_SENDSMSMESSAGEID_INPUT(),
			null
		)

		expect(spyServiceLoggerInfo).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_INFO_MESSAGE_SMS_SUCCESSFULLY_SENT_WITHOUT_EMAILSENDERQUEUEMESSAGE()
		)
	})
	test('It should throws exception when receives a structure input that not follows the expected schema', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Errors.ValidationError('Validation')
		})

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_INVALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_INVALID_JSON_INPUT_EXCEPTION_MESSAGE()
		)
	})
	test('It should throws exception when receives a structure input that follows the expected schema but with an invalid CPF value in client.cpf field', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})
		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_INVALID_PARSEDREQUESTMESSAGEBODY_TAXVAT_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_INVALID_CPF_INPUT_EXCEPTION_MESSAGE()
		)
	})
	test('It should throws exception when receives a structure with data that fires exception simulation and log data', async () => {
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(cpf, cellphone, otpCode, sendSmsMessageId) => {
				return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_WITHOUT_OTP_VALID_RETURN()
			}
		)
		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_EXCEPTION_SIMULATE_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_EXCEPTION_SIMULATE_MESSAGE()
		)

		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_ERROR_MESSAGE_EXCEPTION_SIMULATE()
		)
	})
	test('It should throws exception when receives a structure with data that fires exception simulation but is unable to log data for any reason', async () => {
		const errorMessage =
			'Any otpSenderControllerResponsePayload getPayLoad unexpected error'
		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(cpf, cellphone, otpCode, sendSmsMessageId) => {
				throw new Error(errorMessage)
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_EXCEPTION_SIMULATE_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_EXCEPTION_SIMULATE_MESSAGE()
		)

		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			MOCKS.SERVICE_LOGGER_ERROR_MESSAGE_EXCEPTION_SIMULATE_WITHOUT_DATA(
				errorMessage
			)
		)
	})
	test('It should throws exception when an exception occur during API Gateway token retrieve', async () => {
		const errorMessage = 'Any token getSensediaTokenHub unexpected error'
		token.getSensediaTokenHub.mockImplementationOnce(async () => {
			throw new Error(errorMessage)
		})
		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(cpf, cellphone, otpCode, sendSmsMessageId) => {
				return MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_WITHOUT_OTP_VALID_RETURN()
			}
		)
		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				errorMessage
			)
		)
	})
	test('It should throws exception when an exception occur during proccess of create user in BCC (when this is expected)', async () => {
		const errorMessage = 'Any dadosPessoa postPessoa unexpected error'

		api.governancaDados.dadosPessoa.postPessoa.mockImplementationOnce(
			async (pessoaPaylaod, token) => {
				throw new Error(errorMessage)
			}
		)

		const spyApiGovernancaDadosDadosPessoaPostPessoa = jest.spyOn(
			api.governancaDados.dadosPessoa,
			'postPessoa'
		)

		const spyFactoryGovernancaDadosDadosPessoaPessoaGetPayload = jest.spyOn(
			factory.governancaDados.dadosPessoa.pessoa,
			'getPayload'
		)

		const spyFactoryOtpSenderControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpSenderControllerResponsePayload,
			'getPayload'
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_WITH_NO_PESCOD_VALID_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				errorMessage
			)
		)

		expect(
			spyFactoryGovernancaDadosDadosPessoaPessoaGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_CLIENTDATA_INPUT()
		)
		expect(spyApiGovernancaDadosDadosPessoaPostPessoa).toHaveBeenCalled()
		expect(
			spyFactoryOtpSenderControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CPF_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPSENDERCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT(),
			null,
			null,
			null
		)
	})
	test('It should throws exception when an exception occur during proccess of buid success return', async () => {
		const errorMessage =
			'Any otpSenderControllerResponsePayload factory unexpected error'

		factory.otpSenderControllerResponsePayload.getPayload.mockImplementation(
			(
				cpf,
				celular,
				email,
				otpCode,
				sendSmsMessageId,
				sendEmailQueueMessageId
			) => {
				throw new Error(errorMessage)
			}
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				errorMessage
			)
		)
	})
	test('It should throws exception when an exception occur during proccess of enabling and generating OTP code', async () => {
		const errorMessage = 'Any users postStatus unexpected error'

		api.portais.msUsuarios.users.postStatus.mockImplementationOnce(
			async (cpfCnpj, sensediaToken) => {
				throw new Error(errorMessage)
			}
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_GENERIC_EXCEPTION_MESSAGE_BEGINNING(
				errorMessage
			)
		)
	})
	test('It should throws exception when receives an http response different than 200 during proccess of generate OTP code', async () => {
		service.tokenAaService.gerarTokenAaComRetry.mockImplementationOnce(
			async (postGeraTokenAaPayload, apiSensediaCloudTokenString) => {
				return MOCKS.API_SEGURANCA_CORPORATIVA_PORTOCOM_POSTGERATOKENAA_NOTOK_VALID_RETURN()
			}
		)

		await expect(
			controller.otpSender.processRequest(
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_PARSEDREQUESTMESSAGEBODY_INPUT(),
				MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_VALID_MESSAGEID_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_OTPSENDER_PROCESSREQUEST_OTPGENERATE_EXCEPTION_MESSAGE_BEGINNING()
		)
	})
})
