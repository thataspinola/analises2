const CONSTANTS = require('../property')
const factory = require('../factory')
const service = require('../service')
const errors = require('../error')
const dealsDataLayer = require(CONSTANTS.DEALS_DATA_LIBRARY_LOCATION)

exports.process = async (cpf) => {
	try {
		inputValidation(cpf)

		const deals = await getDeals(cpf)

		const response = factory.dataFormatFactory.buildResponse(cpf, deals)

		return factory.response.success(response)
	} catch (error) {
		service.logger.error(`Erro identificado: ${error.message}`)

		if (error.name == 'ValidationError') {
			return factory.response.error(error.message, 400)
		}

		return factory.response.error('Erro interno')
	}
}

function inputValidation(cpf) {
	if (!cpf) {
		throw new errors.ValidationError(
			'Não foi possível processar a requisição, por favor revise os dados'
		)
	}
	if (cpf.length !== 11 || !service.cpfValidation.isValidCPF(cpf)) {
		throw new errors.ValidationError('Número de CPF inválido')
	}
}

async function getDeals(cpf) {
	return await dealsDataLayer.getDealsData({ document: cpf })
}
