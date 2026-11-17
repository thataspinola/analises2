const controller = require('./src/controller')
const factory = require('./src/factory')
const { ValidationError } = require('./src/error')

const lambdaHandler = async (event) => {
	try {
		const { queryStringParameters } = event

		if (!queryStringParameters || typeof queryStringParameters !== 'object') {
			throw new ValidationError(
				'Os queryStringParameters devem ser um objeto válido'
			)
		}

		const requestData = await controller.request.process(queryStringParameters)

		responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		let httpErrorData
		if (error.code === 400) {
			httpErrorData = factory.response.badRequestError(error.message)
		} else {
			httpErrorData = factory.response.error(error.message)
		}
		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
	}

	const awsRestAPIGatewayResponse = {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return awsRestAPIGatewayResponse
}

module.exports.handler = lambdaHandler
