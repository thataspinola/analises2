const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
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
jest.mock('../../../src/factory/otpRequestControllerResponsePayloadFactory')
jest.mock('../../../src/factory/sendRequestMessageFactory')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

const sqsMock = mockClient(SQSClient)

beforeAll(() => {
	Redis.mockImplementation(() => {
		return {
			exists: async () => {
				return true
			},
			set: async () => {},
			get: async () => {
				return JSON.stringify({
					pescod: 0,
					sqsMessages: [],
				})
			},
			del: async () => {},
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

	api.bcp.getDadosPessoa.mockImplementation(async (cpf, token) => {
		return MOCKS.API_BCP_GETDADOSPESSOA_EXISTS_RETURN()
	})

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	api.governancaDados.dadosPessoa.getPessoa.mockImplementation(
		async (cpf, token) => {
			return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN()
		}
	)

	api.portais.msUsuarios.usuario.getContatos.mockImplementation(
		async (cpf, sensediaToken) => {
			return MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_VALID_RETURN()
		}
	)

	factory.sendRequestMessage.getMessage.mockImplementation(
		(
			cpf,
			destinationNumber,
			emailDestinationAddress,
			corporativeHeader,
			pescod,
			formData
		) => {
			return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_BCP_DESTINATION_NUMBER_VALID_RETURN()
		}
	)

	sqsMock
		.on(SendMessageCommand)
		.resolves(MOCKS.CONTROLLER_OTPREQUEST_VALID_SQS_RESPONSE())

	factory.otpRequestControllerResponsePayload.getPayload.mockImplementation(
		(cellphone, email) => {
			return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_CELLPHONE_CELINTERACAO_VALID_RETURN()
		}
	)
})

describe('Given a valid input', () => {
	test('It should pass with no validation errors with data found in Access Manager with cellphone and email (equals from form input), send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(
				cpf,
				destinationNumber,
				emailDestinationAddress,
				corporativeHeader,
				pescod,
				formData
			) => {
				return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_ACCESSMANAGER_DESTINATION_NUMBER_VALID_RETURN()
			}
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_ACCESSMANAGER_CELLPHONE_OTHERTYPE_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_EMAIL_AND_CELLPHONE_EQUALS_ACCESSMANAGER_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAIL_AND_CELLPHONE_EQUALS_ACCESSMANAGER_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_ACCESSMANAGER_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_ACCESSMANAGER_RETURN()
		)
	})
	test('It should pass with no validation errors with data found in BCP with cellphone and email (equals from form input), send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_CELLPHONE_CELINTERACAO_VALID_RETURN()
			}
		)

		await expect(
			controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_EMAIL_AND_CELLPHONE_EQUALS_BCP_VALID_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_CELINTERACAO_BCP_RETURN()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_BCP_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_BCP_INPUT()
		)

		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_CELINTERACAO_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAIL_AND_CELLPHONE_EQUALS_BCP_FORMDATA_INPUT()
		)
	})
	test('It should pass with no validation errors with data found in Access Manager and BCP (both different from form input) with cellphone and email, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(
				cpf,
				destinationNumber,
				emailDestinationAddress,
				corporativeHeader,
				pescod,
				formData
			) => {
				return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_ACCESSMANAGER_DESTINATION_NUMBER_VALID_RETURN()
			}
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_ACCESSMANAGER_CELLPHONE_OTHERTYPE_VALID_RETURN()
			}
		)

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_ACCESSMANAGER_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_ACCESSMANAGER_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_ACCESSMANAGER_RETURN()
		)
	})
	test('It should pass with no validation errors with data not found in Access Manager but found in BCP (different from form input) with cellphone and email, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_CELLPHONE_CELINTERACAO_VALID_RETURN()
			}
		)

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_CELINTERACAO_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_CELINTERACAO_BCP_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_BCP_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_CELINTERACAO_BCP_RETURN()
		)
	})
	test('It should pass with no validation errors with data not found in Access Manager but found in BCP with cellphone (But not registered as CELULAR_INTEGRACAO), send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return null
			}
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)

		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return MOCKS.API_BCP_GETDADOSPESSOA_WITH_CELLPHONE_WITHOUT_CELINTERACAO_EXISTS_RETURN()
		})
		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(cpf, destinationNumber, corporativeHeader, pescod, formData) => {
				return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_BCP_DESTINATION_NUMBER_VALID_RETURN()
			}
		)
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(destinationNumber) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_CELLPHONE_CELULAR_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_CELULAR_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_CELULAR_BCP_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_BCP_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_CELULAR_BCP_RETURN()
		)
	})
	test('It should pass with no validation errors with data not found in Access Manager but found in BCP without cellphone but with email, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return null
			}
		)
		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)
		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return MOCKS.API_BCP_GETDADOSPESSOA_WITHOUTCELLPHONE_EXISTS_RETURN()
		})
		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(cpf, destinationNumber, corporativeHeader, pescod, formData) => {
				return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_BCP_WITHOUTCELLPHONE_VALID_RETURN()
			}
		)
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(destinationNumber) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_WITHOUTCELLPHONE_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_BCP_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_WITHOUTCELLPHONE_RETURN()
		)
	})
	test('It should pass with no validation errors with data only found in BCC, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)
		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)
		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return null
		})
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN()
			}
		)
		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCC_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)
		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors with data not found in both in Access Manager, BCP and BCC, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return null
		})

		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return null
			}
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(destinationNumber) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})
	test('It should pass with no validation errors with data not found in Access Manager but found in both in BCP and BCC but with no cellphone, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)

		api.bcp.getDadosPessoa.mockImplementationOnce(async (cpf, token) => {
			return MOCKS.API_BCP_GETDADOSPESSOA_WITH_NO_TELEPHONE_EXISTS_RETURN()
		})

		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			async (cpf, token) => {
				return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA_GETPESSOA_EXISTS_RETURN()
			}
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(destinationNumber) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
			}
		)

		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_BCP_INPUT()
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
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_JSON_INPUT()
			)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_JSON_INPUT_BAD_REQUEST()
		)
	})
	test('It should get an bad request response when receives a structure input that follows the expected schema but with an invalid CPF value in client.cpf field', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_JSON_INVALID_CPF_INPUT()
			)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_JSON_INVALID_CPF_INPUT_BAD_REQUEST()
		)
	})
	test('It should get an error response when an unexpected exception occur in input validation', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Error('Unexpected error')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INVALID_JSON_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Validação dos dados': Unexpected error`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when both Access Manager, BCP and BCC tries to get data throws an unexpected error', async () => {
		api.bcp.getDadosPessoa.mockImplementationOnce(
			(taxvat, mulesoftImpersonalTokenHub) => {
				throw new Error('BCP: Something went wrong')
			}
		)
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				throw new Error('BCC: Something went wrong')
			}
		)
		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				throw new Error('Access Manager: Something went wrong')
			}
		)
		const spyErrorConstructor = jest.spyOn(global, 'Error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyErrorConstructor).toHaveBeenCalledWith(
			'Both BCP and BCC taxvat search APIs calls failed'
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
	test('It should get an error response when get exception during api gateway token retrieve', async () => {
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
	test('It should get an error response when get exception during corporative header generation', async () => {
		jest.spyOn(Buffer, 'from').mockImplementationOnce(() => {
			throw new Error('Buffer.from: Something went wrong')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Geração do cabeçalho corporativo para chamada do ACT01': Buffer.from: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should get an error response when get exception during send message to SQS preparation or firing', async () => {
		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(cpf, destinationNumber, corporativeHeader, pescod, formData) => {
				throw new Error(
					'SendRequestMessageFactory getMessage: Something went wrong'
				)
			}
		)
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado durante a atividade 'Construção da mensagem para a fila de solicitação de disparo de SMS': SendRequestMessageFactory getMessage: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should pass with no validation errors with data not found in Access Manager but found in BCC and return success even when get exception during cache populate', async () => {
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
			(cellphone, email) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_BCP_CELLPHONE_CELULAR_VALID_RETURN()
			}
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)

		const spyServiceLoggerError = jest.spyOn(service.logger, 'warn')
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro (não bloqueante) identificado durante a atividade 'Adquirindo dados do cache': Redis instance from method exists: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_BCP_RETURN()
		)
	})
	test('It should get an error response when data not found in both in Access Manager, BCP and BCC and get exception during cache populate', async () => {
		Redis.mockImplementationOnce(() => {
			return {
				exists: async () => {
					return false
				},
				set: async () => {
					throw new Error(
						'Redis instance from method set: Something went wrong'
					)
				},
				get: async () => {},
				del: async () => {},
			}
		})

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return null
			}
		)

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
			`Erro identificado durante a atividade 'Adicionando/Atualizando dados do cache': Redis instance from method set: Something went wrong`
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
			`Erro identificado durante a atividade 'Construção do corpo do retorno': otpRequestControllerResponsePayload getPayload: Something went wrong`
		)
		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_INTERNAL_ERROR()
		)
	})
	test('It should pass with no validation errors with data not found in both in Access Manager, BCP and BCC, send message to queue and return success', async () => {
		const spyFactoryOtpRequestControllerResponsePayloadGetPayload = jest.spyOn(
			factory.otpRequestControllerResponsePayload,
			'getPayload'
		)
		const spyFactorySendRequestMessageGetMessage = jest.spyOn(
			factory.sendRequestMessage,
			'getMessage'
		)

		api.bcp.getDadosPessoa.mockImplementationOnce((cpf, token) => {
			return MOCKS.API_BCP_GETDADOSPESSOA_WITHOUTCELLPHONEANDEMAIL_EXISTS_RETURN()
		})

		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return null
			}
		)

		api.portais.msUsuarios.usuario.getContatos.mockImplementationOnce(
			async (cpf, sensediaToken) => {
				return MOCKS.API_PORTAIS_MSUSUARIOS_USUARIO_GETCONTATOS_WITHCELLPHONEEMAILEMPTYSTRING_VALID_RETURN()
			}
		)

		factory.sendRequestMessage.getMessage.mockImplementationOnce(
			(
				cpf,
				destinationNumber,
				emailDestinationAddress,
				corporativeHeader,
				pescod,
				formData
			) => {
				return MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_VALID_RETURN()
			}
		)

		factory.otpRequestControllerResponsePayload.getPayload.mockImplementationOnce(
			(destinationNumber) => {
				return MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
			}
		)
		const otpRequestProcessRequestResponse =
			await controller.otpRequest.processRequest(
				MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_VALID_INPUT()
			)
		expect(spyFactorySendRequestMessageGetMessage).toHaveBeenCalledWith(
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CPF_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_DESTINATIONNUMBER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_EMAILDESTINATIONADDRESS_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_CORPORATIVEHEADER_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_PESCOD_BCP_INPUT(),
			MOCKS.FACTORY_SENDREQUESTMESSAGE_GETMESSAGE_FORMDATA_INPUT()
		)

		expect(
			spyFactoryOtpRequestControllerResponsePayloadGetPayload
		).toHaveBeenCalledWith(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT()
		)

		expect(otpRequestProcessRequestResponse).toEqual(
			MOCKS.CONTROLLER_OTPREQUEST_PROCESSREQUEST_SUCCESS_RETURN()
		)
	})

	
})
