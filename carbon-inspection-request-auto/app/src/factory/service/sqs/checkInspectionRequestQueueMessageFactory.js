const CONSTANTS = require('../../../property')

exports.getMessage = (itemInput, idTransaction) => {
	const actualDate = new Date()
	const message = {
		orderNumber: itemInput.orderNumber,
		externalId: itemInput.externalId,
		productCode: itemInput.productCode,
		scope: itemInput.scope,
		amount: itemInput.amount,
		contactEmail: itemInput.contactEmail,
		installments: itemInput.installments,
		charges: itemInput.charges,
		idTransaction: idTransaction,
		inspectionStatusProcessCount: 0,
		inspectionRequestDate: actualDate.toISOString(),
		inspectionStatus: CONSTANTS.PENDING_STATUS,
		quotationNumber: `${itemInput.integrationData?.numeroCotacao}`,
	}

	return message
}
