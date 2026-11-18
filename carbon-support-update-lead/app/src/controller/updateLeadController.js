const factory = require('../factory')
const error = require('./../error')
const service = require('./../service')
const CONSTANT = require('../property')

const dynamicsLayer = require(CONSTANT.DYNAMICS_LIBRARY_LOCATION)
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	try {
		service.validation.inputData(inputRequest, CONSTANT.UPDATE_LEAD_SCHEMA)

		if (
			inputRequest.id_ramo == CONSTANT.ID_RAMO.travel ||
			inputRequest.id_ramo == CONSTANT.ID_RAMO.internationalTravel
		) {
			inputRequest.pmc_observacoes = addTravelPmcObervacoes(inputRequest)
		}

		const payload = factory.updateLeadFactory.getPayload(inputRequest)

		const SENSEDIA_CLOUD_TOKEN = await tokenLayer.getSensediaTokenHubCloud()
		const certificates = await tokenLayer.getPortoCertificates()
		const { statusCode, statusMessage } = await dynamicsLayer.updateLead(
			payload,
			SENSEDIA_CLOUD_TOKEN,
			certificates
		)

		service.logger.info(
			payload,
			`Enviado com sucesso: ${JSON.stringify(payload)}`
		)

		if (inputRequest.codigo_vdo) {
			await service.dynamoDb.deleteItem(inputRequest.codigo_vdo)
			service.logger.info(
				`Lead excluido da tabela 'em andamento' | codigo_vdo = ${inputRequest.codigo_vdo}`
			)
		}

		return factory.responseFactory.updateLeadSuccess(statusCode, statusMessage)
	} catch (exception) {
		service.logger.error(`Erro identificado: ${exception.message}`)

		if (exception.name == 'ValidationError') {
			throw new error.ValidationError(exception.message)
		}
		throw Error('Erro interno')
	}
}

function addTravelPmcObervacoes(data) {
	const observation = `
	Número do pedido: ${data.numero_pedido}. 
	Logradouro: ${data.logradouro}. 
	Número: ${data.numero}. 
	Bairro: ${data.bairro}. 
	Cidade: ${data.cidade}. 
	Complemento: ${data.complemento}. 
	Uf: ${data.uf}. 
	Sexo: ${data.sexo}. 
	Observações: ${data.pmc_observacoes}. `

	return observation
}
