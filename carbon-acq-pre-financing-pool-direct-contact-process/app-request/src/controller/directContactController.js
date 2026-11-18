const factory = require('../factory')
const service = require('../service')
const CONSTANT = require('../property')
const {
	errors,
	WHATSAPP_CONTACT_REQUEST_SCHEMA,
} = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')

exports.processRequest = async (parsedInput) => {
	try {
		service.validation.inputData(parsedInput, WHATSAPP_CONTACT_REQUEST_SCHEMA)

		const isValidCpf = service.cpfValidation.isValidCPF(
			parsedInput.client.cpfCnpj
		)
		const isValidCnpj = service.cnpjValidation.isValidCNPJ(
			parsedInput.client.cpfCnpj
		)
		if (!isValidCpf && !isValidCnpj) {
			throw new errors.ValidationError('Número de CPF/CNPJ inválido')
		}

		const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })
		const sqsResponse = await sqsClient.send(
			new SendMessageCommand({
				QueueUrl: `${CONSTANT.DIRECT_CONTACT_REQUESTS_QUEUE}`,
				MessageBody: JSON.stringify({
					flag: commonLibrary.CREATE_PRE_FINANCING_FLAG,
					formData: parsedInput,
				}),
			})
		)

		return factory.response.success(parsedInput, sqsResponse)
	} catch (error) {
		if (error.name == 'ValidationError') {
			return factory.response.badRequestError(error.message)
		}

		service.logger.error(error.message)

		return factory.response.error(
			'Erro interno ao registrar solicitação de contato direto'
		)
	}
}
