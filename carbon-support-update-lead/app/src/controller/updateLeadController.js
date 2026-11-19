const factory = require('../factory')
const error = require('./../error')
const service = require('./../service')
const CONSTANT = require('../property')

const dynamicsLayer = require(CONSTANT.DYNAMICS_LIBRARY_LOCATION)
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	let currentOperation = 'validate_input'
	try {
		service.validation.inputData(inputRequest, CONSTANT.UPDATE_LEAD_SCHEMA)

		if (
			inputRequest.id_ramo == CONSTANT.ID_RAMO.travel ||
			inputRequest.id_ramo == CONSTANT.ID_RAMO.internationalTravel
		) {
			inputRequest.pmc_observacoes = addTravelPmcObervacoes(inputRequest)
		}

		currentOperation = 'build_payload'
		const payload = factory.updateLeadFactory.getPayload(inputRequest)

		currentOperation = 'get_token'
		const SENSEDIA_CLOUD_TOKEN = await tokenLayer.getSensediaTokenHubCloud()
		currentOperation = 'get_certificates'
		const certificates = await tokenLayer.getPortoCertificates()
		currentOperation = 'update_lead'
		const { statusCode, statusMessage } = await dynamicsLayer.updateLead(
			payload,
			SENSEDIA_CLOUD_TOKEN,
			certificates
		)

		service.logger.info(
			{ operation: 'update_lead' },
			'Atualização de lead enviada com sucesso'
		)

		if (inputRequest.codigo_vdo) {
			currentOperation = 'delete_in_progress_lead'
			await service.dynamoDb.deleteItem(inputRequest.codigo_vdo)
			service.logger.info(
				{ operation: 'delete_in_progress_lead' },
				'Lead removido da tabela de registros em andamento'
			)
		}

		return factory.responseFactory.updateLeadSuccess(statusCode, statusMessage)
	} catch (exception) {
		service.logger.error(
			{ operation: currentOperation, errorType: exception.name === 'ValidationError' ? 'validation' : 'internal' },
			'Falha na atualização de lead'
		)

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
