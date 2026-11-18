const paymentDataLayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
const MOCKS = require('../../mocks/emailNotificationController.mock')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const integration = require('../../../src/integration')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const errors = require('../../../src/error')
const api = require('../../../src/api')

jest.mock('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/integration')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

describe('Suite de testes de emailNotificationController.js', () => {
	beforeAll(() => {
		tokenLayer.getToken = jest.fn(async () => {
			return MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		})
		tokenLayer.getMulesoftImpersonalTokenHub.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
	})
	afterEach(() => {
		jest.clearAllMocks()
	})

	test.skip('Deve processar a chamada com sucesso ao existir somente transactionId', async () => {
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)
		tokenLayer.getMulesoftImpersonalTokenHub.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
		api.commerce.searchCriteria.mockResolvedValueOnce(MOCKS.COMMERCE_RESPONSE)
		api.governance.getPescod.mockResolvedValueOnce(MOCKS.PESCOD)
		factory.additionalData.mount.mockReturnValue(MOCKS.ADDITIONAL_DATA)
		factory.queueEmailSender.createMessage.mockReturnValue(MOCKS.EMAIL_MESSAGE)
		integration.simpleQueueService.sendMessage.mockResolvedValueOnce()
		factory.response.success.mockReturnValue({ statusCode: 200 })

		const response = await controller.emailNotification.processRequest(
			MOCKS.VALID_INPUT_DATA
		)

		expect(service.validation.inputData).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA
		)
		expect(tokenLayer.getToken).toHaveBeenCalledWith('COMMERCE_STAGE_CARBON')
		expect(tokenLayer.getMulesoftImpersonalTokenHub).toHaveBeenCalled()

		expect(api.commerce.searchCriteria).toHaveBeenCalledWith(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE.orderNumber,
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)
		expect(api.governance.getPescod).toHaveBeenCalledWith(
			MOCKS.CLIENT_DATA.cpf,
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
		expect(factory.additionalData.mount).toHaveBeenCalledWith(
			MOCKS.CLIENT_DATA,
			MOCKS.BROKER_DATA,
			MOCKS.PESCOD,
			MOCKS.NEED_INSPECTION
		)
		expect(factory.queueEmailSender.createMessage).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA,
			MOCKS.ADDITIONAL_DATA
		)
		expect(integration.simpleQueueService.sendMessage).toHaveBeenCalledWith(
			MOCKS.EMAIL_MESSAGE
		)
		expect(response).toEqual({
			statusCode: 200,
		})
	})

	test.skip('Deve processar a chamada com sucesso ao existir somente paymentData', async () => {
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)
		tokenLayer.getMulesoftImpersonalTokenHub.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
		api.commerce.searchCriteria.mockResolvedValueOnce(MOCKS.COMMERCE_RESPONSE)
		api.governance.getPescod.mockResolvedValueOnce(MOCKS.PESCOD)
		factory.additionalData.mount.mockReturnValue(MOCKS.ADDITIONAL_DATA)
		factory.queueEmailSender.createMessage.mockReturnValue(MOCKS.EMAIL_MESSAGE)
		integration.simpleQueueService.sendMessage.mockResolvedValueOnce()
		factory.response.success.mockReturnValue({ statusCode: 200 })

		const response = await controller.emailNotification.processRequest(
			MOCKS.VALID_INPUT_DATA_WITH_PAYMENT_DATA
		)

		expect(service.validation.inputData).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA_WITH_PAYMENT_DATA
		)
		expect(tokenLayer.getToken).toHaveBeenCalledWith('COMMERCE_STAGE_CARBON')
		expect(tokenLayer.getMulesoftImpersonalTokenHub).toHaveBeenCalled()

		expect(api.commerce.searchCriteria).toHaveBeenCalledWith(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE.orderNumber,
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)
		expect(api.governance.getPescod).toHaveBeenCalledWith(
			MOCKS.CLIENT_DATA.cpf,
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
		expect(factory.additionalData.mount).toHaveBeenCalledWith(
			MOCKS.CLIENT_DATA,
			MOCKS.BROKER_DATA,
			MOCKS.PESCOD,
			MOCKS.NEED_INSPECTION
		)
		expect(factory.queueEmailSender.createMessage).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA_WITH_PAYMENT_DATA,
			MOCKS.ADDITIONAL_DATA
		)
		expect(integration.simpleQueueService.sendMessage).toHaveBeenCalledWith(
			MOCKS.EMAIL_MESSAGE
		)
		expect(response).toEqual({
			statusCode: 200,
		})
	})

	test.skip('Deve retornar um erro quando a recuperação do token falhar', async () => {
		const error = new Error('Token retrieval failed')
		tokenLayer.getToken.mockRejectedValue(error)

		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			'Error retrieving token from gateways: ' + error.message
		)
	})

	test('Deve retornar um erro quando a validação da entrada falhar', () => {
		const validationError = new errors.ValidationError('Validation failed')
		service.validation.inputData.mockImplementation(() => {
			throw validationError
		})

		expect(() =>
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Validation failed')
	})

	test.skip('Deve lidar com erros ao recuperar informações adicionais quando a Layer de PaymentData responder com erro', async () => {
		service.validation.inputData.mockReturnValue(undefined)

		const error = new Error('Error retrieving paymentDataLayer data')

		paymentDataLayer.getPaymentData.mockRejectedValueOnce(error)

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			`Failed to retrieve original checkout data for:  scope ${MOCKS.VALID_INPUT_DATA.scope} and transactionId ${MOCKS.VALID_INPUT_DATA.transactionId}, ${error.message}`
		)
	})

	test('Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder com erro', async () => {
		service.validation.inputData.mockReturnValue(undefined)
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)

		const error = new Error('Error retrieving commerce data')
		api.commerce.searchCriteria.mockRejectedValueOnce(error)

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			`Failed to retrieve additional information: ${error.message}`
		)
	})

	test.skip.each([[], null])(
		'Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder com o array items vazio ou inexistente',
		async (itemsInvalidValue) => {
			service.validation.inputData.mockReturnValue(undefined)
			paymentDataLayer.getPaymentData.mockResolvedValueOnce(
				MOCKS.PAYMENT_DATA_LAYER_RESPONSE
			)
			tokenLayer.getToken.mockResolvedValueOnce(
				MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
			)

			api.commerce.searchCriteria.mockResolvedValueOnce({
				...MOCKS.COMMERCE_RESPONSE,
				items: itemsInvalidValue,
			})

			await expect(
				controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow('Failed to retrieve additional information')

			expect(service.logger.error).toHaveBeenCalledWith(
				'Failed to retrieve additional information: Invalid commerceResponse - items array is empty or not present.'
			)
		}
	)

	test.skip.each([[], null])(
		'Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder com o array items do primeiro objeto vazio ou inexistente',
		async (itemsInvalidValue) => {
			service.validation.inputData.mockReturnValue(undefined)
			paymentDataLayer.getPaymentData.mockResolvedValueOnce(
				MOCKS.PAYMENT_DATA_LAYER_RESPONSE
			)
			tokenLayer.getToken.mockResolvedValueOnce(
				MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
			)

			api.commerce.searchCriteria.mockResolvedValueOnce({
				...MOCKS.COMMERCE_RESPONSE,
				items: [
					{
						items: itemsInvalidValue,
					},
				],
			})

			await expect(
				controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
			).rejects.toThrow('Failed to retrieve additional information')

			expect(service.logger.error).toHaveBeenCalledWith(
				'Failed to retrieve additional information: Invalid item data - items array is empty or not present.'
			)
		}
	)

	test.skip('Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder e o additional_data tiver um tipo diferente de string', async () => {
		service.validation.inputData.mockReturnValue(undefined)
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)

		api.commerce.searchCriteria.mockResolvedValueOnce({
			...MOCKS.COMMERCE_RESPONSE,
			items: [
				{
					items: [
						{
							additional_data: {},
						},
					],
				},
			],
		})

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			'Failed to retrieve additional information: Invalid additional data - additional_data is not a string.'
		)
	})

	test.skip('Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder e o additional_data não for um JSON válido', async () => {
		service.validation.inputData.mockReturnValue(undefined)
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)

		api.commerce.searchCriteria.mockResolvedValueOnce({
			...MOCKS.COMMERCE_RESPONSE,
			items: [
				{
					items: [
						{
							additional_data: 'ABCDFG',
						},
					],
				},
			],
		})

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			'Failed to retrieve additional information: Invalid additional data - additional_data must be a valid JSON'
		)
	})

	test.skip('Deve lidar com erros ao recuperar informações adicionais quando o Commerce responder e o item data correspondente a transação for vazio ou inexistente', async () => {
		service.validation.inputData.mockReturnValue(undefined)
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)

		api.commerce.searchCriteria.mockResolvedValueOnce({
			...MOCKS.COMMERCE_RESPONSE,
			items: [
				{
					items: [
						{
							additional_data: '{"scope": "otherScope"}',
						},
					],
				},
			],
		})

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to retrieve additional information')

		expect(service.logger.error).toHaveBeenCalledWith(
			'Failed to retrieve additional information: Invalid item data - item data is empty or not present.'
		)
	})

	test('Deve lidar com erros quando houver um erro ao enviar uma mensagem de email', async () => {
		service.validation.inputData.mockReturnValue()
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE
		)

		api.commerce.searchCriteria.mockResolvedValueOnce(MOCKS.COMMERCE_RESPONSE)
		api.governance.getPescod.mockResolvedValueOnce(MOCKS.PESCOD)
		factory.additionalData.mount.mockReturnValue(MOCKS.ADDITIONAL_DATA)
		factory.queueEmailSender.createMessage.mockReturnValue(MOCKS.EMAIL_MESSAGE)

		const error = new Error('Error sending email')
		integration.simpleQueueService.sendMessage.mockRejectedValueOnce(error)

		await expect(
			controller.emailNotification.processRequest(MOCKS.VALID_INPUT_DATA)
		).rejects.toThrow('Failed to send email message')

		expect(service.logger.error).toHaveBeenCalledWith(
			`Failed to send email message: ${error.message}`
		)
	})

	test('Deve processar a chamada com sucesso e enviar uma mensagem sqs de email', async () => {
		service.validation.inputData.mockReturnValue()
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE_PD
		)
		api.commerce.searchCriteria.mockResolvedValueOnce(MOCKS.COMMERCE_RESPONSE)
		api.governance.getPescod.mockResolvedValueOnce(MOCKS.PESCOD)
		factory.additionalData.mount.mockReturnValue(MOCKS.ADDITIONAL_DATA_PD)
		factory.queueEmailSender.createMessage.mockReturnValue(
			MOCKS.EMAIL_MESSAGE_PD
		)
		factory.response.success.mockReturnValue({ statusCode: 200 })

		const response = await controller.emailNotification.processRequest(
			MOCKS.VALID_INPUT_DATA_PD
		)

		expect(integration.simpleQueueService.sendMessage).toHaveBeenCalledWith(
			MOCKS.EMAIL_MESSAGE_PD
		)

		expect(response).toEqual({
			statusCode: 200,
		})
	})

	test('Não deve enviar um email quando o escopo é portable_device e status PENDING', async () => {
		service.validation.inputData.mockReturnValue()
		paymentDataLayer.getPaymentData.mockResolvedValueOnce(
			MOCKS.PAYMENT_DATA_LAYER_RESPONSE_PD
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.COMMERCE_STAGE_CARBON
		)
		tokenLayer.getToken.mockResolvedValueOnce(
			MOCKS.TOKEN_LAYER_RESPONSE.MULESOFT_IMPERSONAL_TOKEN_HUB
		)
		api.commerce.searchCriteria.mockResolvedValueOnce(MOCKS.COMMERCE_RESPONSE)
		api.governance.getPescod.mockResolvedValueOnce(MOCKS.PESCOD)
		factory.additionalData.mount.mockReturnValue(MOCKS.ADDITIONAL_DATA_PD)
		factory.response.success.mockReturnValue({ statusCode: 200 })

		const response = await controller.emailNotification.processRequest(
			MOCKS.VALID_INPUT_DATA_PD_PENDING
		)

		expect(factory.queueEmailSender.createMessage).not.toHaveBeenCalledWith()
		expect(
			integration.simpleQueueService.sendMessage
		).not.toHaveBeenCalledWith()

		expect(response).toEqual({
			statusCode: 200,
		})
	})
})
