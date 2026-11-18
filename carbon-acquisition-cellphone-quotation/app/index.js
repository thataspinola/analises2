const controller = require('./src/controller')
const common = require('./src/common')
const factory = require('./src/factory')
const service = require('./src/service')

module.exports.handler = async (event) => {
	let responseBody = null
    let responseStatusCode = null

	try {
		if (!event || Object.keys(event).length === 0)
			throw new common.errors.ValidationError('A requisição está vazia, envie uma válida')

		const inputData = service.xss.sanitizeInput(event)

		const response = await controller.quotationController.process(inputData)
		const requestData = factory.responseFactory.controllerSuccess(response)

		responseStatusCode = requestData.statusCode
		responseBody = requestData.body
	} catch (error) {
		service.logger.error(error, 'Erro durante a execução da lambda.')

		const httpErrorData =  factory.responseFactory.controllerError(error)
		responseStatusCode = httpErrorData.statusCode
		responseBody = httpErrorData.body
	}

	const awsRestAPIGatewayResponse = {
        isBase64Encoded: false,
        headers: {},
        statusCode: responseStatusCode,
        body: responseBody,
    }

	return awsRestAPIGatewayResponse
}
