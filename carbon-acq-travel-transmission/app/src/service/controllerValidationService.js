/**
 * Função responsável por validar os dados originais de entrada do serviço
 * @param {object} checkoutItemData dados original oriundo do checkout
 * @throws {Error} Erros são tratados como erro, pois o chamador é uma aplicação interna
 */
exports.checkoutItemData = (checkoutItemData) => {
	if (!checkoutItemData) {
		throw new Error(`No payload received to process the request`)
	}

	if (!checkoutItemData.orderPaymentId) {
		throw new Error(`The field 'orderPaymentId' was not found in the request`)
	}

	if (!checkoutItemData.orderNumber) {
		throw new Error(`The field 'orderNumber' was not found in the request`)
	}

	if (!checkoutItemData.chargeId) {
		throw new Error(`The field 'chargeId' was not found in the request`)
	}

	if (!checkoutItemData.integrationData) {
		throw new Error(`The field 'integrationData' was not found in the request`)
	}
}
