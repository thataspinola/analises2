const api = require('../../../api')
const service = require('../../../service')
const errors = require('../../../error')
const factory = require('../../../factory')

exports.execute = async (inputParsedData) => {
	service.logger.info(
		`Iniciando remoção do item ${inputParsedData?.cartItemUid} do carrinho ${inputParsedData?.cartCommerceId}.`
	)
	try {
		if (
			!inputParsedData ||
			!inputParsedData.cartCommerceId ||
			!inputParsedData.cartItemUid
		) {
			service.logger.error(
				'ID do carrinho ou UID do item não fornecido para remoção.'
			)
			throw new errors.ValidationError(
				'ID do carrinho e UID do item são obrigatórios para remover.'
			)
		}

		const updatedCart =
			await api.commerceMagento.porto.cartGraphQL.removeCartItemAPI(
				inputParsedData.cartCommerceId,
				inputParsedData.cartItemUid,
				inputParsedData.customerToken || ''
			)

		service.logger.info(
			`Item ${inputParsedData.cartItemUid} removido do carrinho ${inputParsedData.cartCommerceId} com sucesso. Carrinho atualizado.`
		)
		return updatedCart
	} catch (err) {
		service.logger.error(
			`Erro ao remover item ${inputParsedData?.cartItemUid} do carrinho ${
				inputParsedData?.cartCommerceId
			}: ${err.message}${err.stack ? `\nStack: ${err.stack}` : ''}`
		)
		throw err
	}
}
