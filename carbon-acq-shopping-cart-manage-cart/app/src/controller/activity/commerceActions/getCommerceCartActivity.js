const api = require('../../../api')
const service = require('../../../service')
const errors = require('../../../error')
const factory = require('../../../factory')

exports.execute = async (inputParsedData) => {
	service.logger.info(
		`Iniciando consulta do carrinho para ID: ${inputParsedData?.cartCommerceId}.`
	)
	try {
		if (!inputParsedData || !inputParsedData.cartCommerceId) {
			service.logger.error('ID do carrinho não fornecido para consulta.')
			throw new errors.ValidationError(
				'ID do carrinho é obrigatório para consultar.'
			)
		}

		const cartDetails = await api.commerceMagento.porto.cartGraphQL.getCartAPI(
			inputParsedData.cartCommerceId,
			inputParsedData.customerToken || ''
		)

		service.logger.info(
			`Consulta do carrinho ${inputParsedData.cartCommerceId} finalizada com sucesso.`
		)
		return cartDetails
	} catch (err) {
		service.logger.error(
			`Erro ao consultar carrinho ${inputParsedData?.cartCommerceId}: ${
				err.message
			}${err.stack ? `\nStack: ${err.stack}` : ''}`
		)
		throw err
	}
}
