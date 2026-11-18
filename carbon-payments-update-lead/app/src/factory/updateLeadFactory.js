const CONSTANTS = require('../property')

exports.createPayload = (data) => {
	let message = {
		codigo_vdo: data.leadIdentifier,
		id_ramo: data.integrationData.idBranch || CONSTANTS.BRANCH_IDS[data.scope],
		fase: CONSTANTS.PHASE,
		status: CONSTANTS.PAYMENT_STATUS,
		razao_status: CONSTANTS.REASON_STATUS[data.status],
	}

	if (data.integrationData.idProductType) {
		message = {
			...message,
			id_tipo_produto: data.integrationData.idProductType,
		}
	}

	return message
}