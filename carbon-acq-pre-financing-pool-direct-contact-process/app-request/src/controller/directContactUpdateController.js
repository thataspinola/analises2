const service = require('../service')
const factory = require('../factory')
const CONSTANT = require('../property')
const errors = require('./../error')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

const inputValidation = (parsedInput) => {
    let currentActivity = 'Validation data'
    try {
        service.validation.inputData(
            parsedInput,
            commonLibrary.DIRECT_CONTACT_UPDATE_SCHEMA
        )
    } catch (error) {
        const message = `Error identified during the activity '${currentActivity}': ${error.message}`
        if (error.name === errors.ValidationError.name) {
            service.logger.warn(message)
        } else {
            service.logger.error(message)
        }
        throw error
    }
}

const putMessageInQueue = async (message) => {
    const sqsResponse = await sqsClient.send(
        new SendMessageCommand({
            QueueUrl: `${CONSTANT.DIRECT_CONTACT_REQUESTS_QUEUE}`,
            MessageBody: JSON.stringify({
                flag: commonLibrary.UPDATE_PRE_FINANCING_FLAG,
                formData: message,
            }),
        })
    )

	return sqsResponse
}

exports.process = async (parsedInput) => {
    try{
        inputValidation(parsedInput)
		const sqsResponse = await putMessageInQueue(parsedInput)

		return factory.response.success(parsedInput, sqsResponse)
    } catch (error) {
        const processRegisterError = new Error(
            `Direct contact Update request error: ${error.message}`
        )
        if (error.name === errors.ValidationError.name) {
            service.logger.error(
                'Direct contact Update request error: Invalid input data structure.'
            )
        } else {
            service.logger.error(
                `Direct contact Update request error: Internal Error, ${error.message}`
            )
        }
        
        return factory.response.error(processRegisterError.message) 
    }
}