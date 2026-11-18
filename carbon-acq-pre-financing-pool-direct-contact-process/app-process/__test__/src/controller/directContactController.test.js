const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const token = require('@porto-seguro/hub-vendas.carbon-token')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')
jest.mock('../../../src/factory/sns')
jest.mock('../../../src/factory/sqs')
jest.mock('../../../src/factory/controller')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}

	service.validation.inputData.mockImplementation(() => {
		//Do nothing (no validation errors)
	})

	service.cpfValidation.isValidCPF.mockImplementation(() => {
		return true //Return true (no validation error)
	})

	service.cnpjValidation.isValidCNPJ.mockImplementation(() => {
		return true //Return true (no validation error)
	})

	token.getMulesoftImpersonalTokenHub.mockImplementation(() => {
		return MOCKS.MULESOFT_IMPERSONAL_TOKEN_HUB()
	})

	token.getSensediaTokenHub.mockImplementation(() => {
		return MOCKS.SENSEDIA_HUB_TOKEN()
	})

	token.getSensediaTokenHubCloud.mockImplementation(() => {
		return MOCKS.SENSEDIA_HUB_CLOUD_TOKEN()
	})

	api.governancaDados.dadosPessoa.getPessoa.mockImplementation((cpf, token) => {
		return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA.GETPESSOA_EXISTS_RETURN()
	})

	factory.api.governancaDados.dadosPessoa.pessoa.getPayload = jest.fn(() => {
		return MOCKS.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA.GETPAYLOAD_VALID_RETURN()
	})

	api.governancaDados.dadosPessoa.postPessoa.mockImplementation(
		(pessoaPayload, token) => {
			return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA.POSTPESSOA_SUCCESS_RETURN()
		}
	)

	factory.api.auditoria.rastreabilidadeCdc.consentimentos.getPayload = jest.fn(
		() => {
			return MOCKS.FACTORY_API_AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOSPAYLOAD.GETPAYLOAD_VALID_RETURN()
		}
	)

	api.auditoria.rastreabilidadeCdc.postConsentimentos.mockImplementation(
		(consentPayload, sensediaToken) => {
			return MOCKS.API_AUDITORIA_RASTREABILIDADECDC.POSTCONSENTIMENTOS_SUCCESS_RESPONSE()
		}
	)

	factory.api.producaoComercial.multicanal.leads.semSeguro.getPayload = jest.fn(
		() => {
			return MOCKS.FACTORY_API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS_SEMSEGUROPAYLOAD.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN()
		}
	)

	api.producaoComercial.multicanal.leads.postSemSeguro.mockImplementation(
		(leadPayload, sensediaCloudToken) => {
			return MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS.POSTSEMSEGURO_WITH_WHATSAPP_CHANNEL_SUCCESS_RESPONSE()
		}
	)

	factory.api.zenvia.portoAssistencia.whatsappPortoBotTrigger.getPayload =
		jest.fn(() => {
			return MOCKS.FACTORY_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_GETPAYLOAD_VALID_RETURN()
		})

	api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger.mockImplementation(
		(whatsappPortoBotTriggerPayload) => {
			return MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE()
		}
	)

	factory.controller.directContact.processedDataReport.getDataReport.mockImplementation(
		(
			taxvat,
			cellphone,
			emailAddress,
			pescod,
			consentRegistered,
			sendConsentTopicMessageId,
			leadId,
			sendAnalyticsCollectMessageId,
			isCnpjDocument
		) => {
			return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CPF_SUCCESS_RETURN()
		}
	)

	factory.sns.consents.getSendConsentMessageAttributes.mockImplementation(
		(pescod) => {
			return MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEATTRIBUTES_VALID_RETURN()
		}
	)

	factory.sns.consents.getSendConsentMessagePayload.mockImplementation(
		(clientData, marketingOptOutFlag, product, pescod) => {
			return MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_VALID_RETURN()
		}
	)

	factory.sqs.analyticsCollect.getSendAnalyticsCollectMessagePayload.mockImplementation(
		(parsedInput, pescod, isCnpjDocument, leadId, leadVinculo) => {
			return MOCKS.FACTORY_SQS_ANALYTICSCOLLECT.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCPF_WHATSAPP_VALID_RETURN()
		}
	)

	service.sns.consents.sendConsentMessage.mockImplementation(
		(attributes, payload) => {
			return MOCKS.SERVICE_SNS_CONSENTS.SENDCONSENTMESSAGE_VALID_RETURN()
		}
	)

	service.sqs.analyticsCollect.sendMessage.mockImplementation((message) => {
		return MOCKS.SERVICE_SQS_ANALYTICSCOLLECT.SENDMESSAGE_VALID_RETURN()
	})
})

describe('Given a valid input', () => {
	test('With a valid CPF, It should pass with no exceptions, register consent, register lead, trigger whatsapp porto bot and return success', async () => {
		service.cnpjValidation.isValidCNPJ.mockImplementationOnce(() => {
			return false //Return false - is not a CNPJ
		})
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return true //Return true - is a CPF
		})
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_VALID_WHATSAPP_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CPF_SUCCESS_RETURN()
		)
	})
	test('With a valid CNPJ, It should pass with no exceptions, register consent, register lead, trigger whatsapp porto bot and return success', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false //Return false - is not a CPF
		})
		service.cnpjValidation.isValidCNPJ.mockImplementationOnce(() => {
			return true //Return true - is a CNPJ
		})
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA.GETPESSOA_PJ_EXISTS_RETURN()
			}
		)
		factory.controller.directContact.processedDataReport.getDataReport.mockImplementationOnce(
			(
				taxvat,
				cellphone,
				emailAddress,
				pescod,
				consentRegistered,
				sendConsentTopicMessageId,
				leadId,
				isCnpjDocument
			) => {
				return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CNPJ_SUCCESS_RETURN()
			}
		)
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_PJ_VALID_WHATSAPP_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CNPJ_SUCCESS_RETURN()
		)
	})
	test('It should pass with no exceptions, create new bcc entry, register consent, register lead, trigger whatsapp porto bot and return success', async () => {
		api.governancaDados.dadosPessoa.getPessoa.mockImplementationOnce(
			(cpf, token) => {
				return MOCKS.API_GOVERNANCADADOS_DADOSPESSOA.GETPESSOA_NOT_EXISTS_RETURN()
			}
		)
		factory.controller.directContact.processedDataReport.getDataReport.mockImplementationOnce(
			(
				taxvat,
				cellphone,
				emailAddress,
				pescod,
				consentRegistered,
				sendConsentTopicMessageId,
				leadId,
				isCnpjDocument
			) => {
				return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CREATEPESSOA_SUCCESS_RETURN()
			}
		)
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_VALID_WHATSAPP_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_WHATSAPP_CREATEPESSOA_SUCCESS_RETURN()
		)
	})
	test('It should get an exception when receive an invalid json structure as string input, throwing an error', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Error('Validation')
		})
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_INVALID_JSON_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_INVALID_JSON_INPUT_EXCEPTION_MESSAGE()
		)
	})
	test('It should get an exception when receive an valid json structure as string input but with an invalid CPF and CNPJ value in client.cpfCnpj field, throwing an error', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})
		service.cnpjValidation.isValidCNPJ.mockImplementationOnce(() => {
			return false
		})
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_VALID_WHATSAPP_INVALID_CPF_INPUT()
			)
		).rejects.toThrow(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_VALID_WHATSAPP_INVALID_CPF_INPUT_EXCEPTION_MESSAGE()
		)
	})
	test('It should pass with no exceptions, register consent, register lead and return success', async () => {
		factory.controller.directContact.processedDataReport.getDataReport.mockImplementationOnce(
			(
				taxvat,
				cellphone,
				emailAddress,
				pescod,
				consentRegistered,
				sendConsentTopicMessageId,
				leadId,
				isCnpjDocument
			) => {
				return MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_TELEPHONE_SUCCESS_RETURN()
			}
		)
		await expect(
			controller.directContact.processContact(
				MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_VALID_TELEPHONE_INPUT()
			)
		).resolves.toEqual(
			MOCKS.CONTROLLER_DIRECTCONTACT.PROCESSCONTACT_TELEPHONE_SUCCESS_RETURN()
		)
	})
})
