const integration = require('../integration')
const CONSTANTS = require('../property')
const factory = require('../factory')
const service = require('../service')

const api = require('../api')

const paymentDataLayer = require(CONSTANTS.PAYMENT_DATA_LIBRARY_LOCATION)
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

function validateInput(inputData) {
	service.validation.inputData(inputData)
}

async function retrievePaymentData(inputData) {
	try {
		if (inputData.transactionId) {
			return await paymentDataLayer.getPaymentData(
				inputData.scope,
				inputData.transactionId
			)
		}
	} catch (error) {
		service.logger.error(
			inputData,
			`Failed to retrieve original checkout data: ${error.message}`
		)

		throw new Error('Failed to retrieve original checkout data')
	}
}

async function getTokens() {
	try {
		const mulesoftToken = await tokenLayer.getMulesoftImpersonalTokenHubInternal()
		const commerceToken = await tokenLayer.getToken(
			CONSTANTS.COMMERCE_TOKEN_NAME
		)
		const certificates = await tokenLayer.getPortoCertificates()

		return { mulesoftToken, commerceToken, certificates }
	} catch (error) {
		service.logger.error(
			'Error retrieving token from gateways: ' + error.message
		)
		throw new Error('Error recovering the token for gateways call')
	}
}

async function getCommerceAdditionalData(paymentData, token) {
	const commerceResponse = await api.commerce.searchCriteria(
		paymentData.orderNumber,
		token
	)

	if (
		!Array.isArray(commerceResponse.items) ||
		commerceResponse.items.length === 0
	) {
		service.logger.error(
			'Invalid commerceResponse - items array is empty or not present.'
		)
		return null
	}

	const firstItemData = commerceResponse.items[0].items

	if (!Array.isArray(firstItemData) || firstItemData.length === 0) {
		service.logger.error(
			'Invalid item data - items array is empty or not present.'
		)
		return null
	}

	const item = firstItemData.find((item) => {
		if (typeof item.additional_data !== 'string') {
			service.logger.error(
				'Invalid additional data - additional_data is not a string.'
			)
			return null
		}

		try {
			const additionalData = JSON.parse(item.additional_data)

			return (
				additionalData.scope === paymentData.scope &&
				additionalData.external_id == paymentData.externalId
			)
		} catch (error) {
			service.logger.error(
				'Invalid additional data - additional_data must be a valid JSON'
			)
			return null
		}
	})

	if (!item) {
		service.logger.error(
			'Invalid item data - item data is empty or not present.'
		)
		return null
	}

	return JSON.parse(item.additional_data)
}

async function getAdditionalInfo(inputData) {
	try {
		const paymentData =
			inputData.paymentData ?? (await retrievePaymentData(inputData))

		const needInspection = paymentData?.integrationData?.need_inspection

		const { mulesoftToken, commerceToken, certificates } = await getTokens()

		let clientData = paymentData.integrationData?.proponente
		let brokerData = paymentData.integrationData?.brokerData
		let idBranch = paymentData.integrationData?.idBranch

		if (!brokerData || !clientData) {
			const additionalData = await getCommerceAdditionalData(
				paymentData,
				commerceToken
			)

			if (additionalData) {
				clientData = additionalData?.proposal?.data?.proponente
				brokerData = additionalData?.broker_data
			}
		}

		if (clientData) {
			const pescod = await api.governance.getPescod(
				clientData?.cpf,
				mulesoftToken,
				certificates
			)

			return factory.additionalData.mount(
				clientData,
				brokerData,
				pescod,
				needInspection,
				idBranch
			)
		} else {
			throw new Error('user data not found')
		}
	} catch (error) {
		service.logger.error(
			'Failed to retrieve additional information: ' + error.message
		)
		throw new Error('Failed to retrieve additional information')
	}
}

async function sendEmailMessage(inputData, additionalInfo) {
	try {
		if (
			inputData.scope == CONSTANTS.SCOPE.PD &&
			inputData.status == 'PENDING'
		) {
			service.logger.warn(
				'Não há envio de email para Equipamentos Portáteis no status PENDING.'
			)
			return
		}

		const emailMessage = factory.queueEmailSender.createMessage(
			inputData,
			additionalInfo
		)

		service.logger.info(emailMessage, '>> SQS Content <<')
		await integration.simpleQueueService.sendMessage(emailMessage)
	} catch (error) {
		service.logger.error('Failed to send email message: ' + error.message)
		throw new Error('Failed to send email message')
	}
}

exports.processRequest = async (inputData) => {
	validateInput(inputData)
	const additionalInfo = await getAdditionalInfo(inputData)
	await sendEmailMessage(inputData, additionalInfo)
	return factory.response.success()
}
