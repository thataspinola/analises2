const CONSTANT = require('../../property')

exports.getMessage = (data, observation = undefined) => {
	let message = {
		codigo_vdo: data.vdoCode,
		razao_status: CONSTANT.UPDATE_LEAD_REASON_STATUS,
		status: CONSTANT.UPDATE_LEAD_STATUS,
		pmc_observacoes: observation,
		id_ramo: data.idBranch || 27,
	}

	if (data.idProductType){
		message = {
			...message,
			id_tipo_produto: data.idProductType
		}
	}

	return message
}
