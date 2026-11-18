const CONSTANTS = require('../../property')

exports.getPayload = (itemInput, observation) => {
	let payload = {
		codigo_vdo: itemInput.leadIdentifier,
		id_ramo:
			itemInput.integrationData.idBranch || CONSTANTS.ID_RAMO_UPDATE_LEAD,
		status: CONSTANTS.UPDATE_LEAD_STATUS_MESSAGE,
		razao_status: CONSTANTS.UPDATE_LEAD_REASON_STATUS,
		pmc_observacoes: observation,
	}

	if (itemInput.integrationData.idProductType) {
		payload = {
			...payload,
			id_tipo_produto: itemInput.integrationData.idProductType,
		}
	}
	return payload
}
