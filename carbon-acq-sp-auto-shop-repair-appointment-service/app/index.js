const controller = require('./src/controller')
const factory = require('./src/factory')

const createResponse = (statusCode, body) => ({
	isBase64Encoded: false,
	headers: {},
	statusCode,
	body: JSON.stringify(body),
})

const lambdaHandler = async (event) => {
	try {
		const { queryStringParameters } = event

		if (!queryStringParameters || typeof queryStringParameters !== 'object') {
			throw new Error('Os queryStringParameters devem ser um objeto válido')
		}

		const requestData = await controller.request.process(queryStringParameters)
		return createResponse(requestData.statusCode, requestData.body)
	} catch (error) {
		const httpErrorData = factory.response.error(error.message)
		return createResponse(httpErrorData.statusCode, httpErrorData.body)
	}
}

module.exports.handler = lambdaHandler
