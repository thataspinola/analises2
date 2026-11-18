const { PublishCommand, SNSClient } = require('@aws-sdk/client-sns')
const CONSTANT = require('../../property')
const service = require('../../service')

const consentsSnsClient = new SNSClient({
	region: CONSTANT.AWS_REGION,
})

/**
 * Function to extract SNS Message formatted Attributes
 * @param {Object} attributes
 * @returns
 */
function getMessageFormattedAttributes(attributes) {
	const attributesKeys = Object.keys(attributes)

	const formattedAttributes = attributesKeys.reduce(
		(reducingFormattedAttributesArray, attributeKey) => {
			reducingFormattedAttributesArray[attributeKey] = {
				DataType: 'String',
				StringValue: attributes[attributeKey],
			}
			return reducingFormattedAttributesArray
		},
		{}
	)

	return formattedAttributes
}

exports.sendConsentMessage = async (attributes, payload) => {
	{
		try {
			const timeNow = new Date().toISOString()

			const snsMessage = {
				eventTime: timeNow,
				...attributes,
				payload: payload,
			}

			let params = {
				Message: JSON.stringify(snsMessage),
				TopicArn: CONSTANT.CONSENTS_SNS_TOPIC_ARN,
			}

			if (attributes) {
				params.MessageAttributes = getMessageFormattedAttributes({
					eventTime: timeNow,
					...attributes,
				})
			}

			const consetsSnsClientSendResult = await consentsSnsClient.send(
				new PublishCommand(params)
			)

			service.logger.info(
				`Requisição para a registro de consetimento foi realizada`
			)

			return consetsSnsClientSendResult?.MessageId ?? null
		} catch (error) {
			service.logger.error(
				`Erro ao enviar a requisição do registro de consentimento: ${error.message}`
			)
			throw new Error(`Error to send message to SNS - ${error.message}`)
		}
	}
}
