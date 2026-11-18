const CONSTANTS = require('../../../../../src/property')
const CONTROLLER_INSPECTION_MOCKS = require('../../controller/inspectionController.mock')

const GETPAYLOAD_SUCCESS_RETURN_VALUE = {
	codigo_vdo: '12345',
	id_ramo: CONSTANTS.ID_RAMO_UPDATE_LEAD,
	status: CONSTANTS.UPDATE_LEAD_STATUS_MESSAGE,
	razao_status: CONSTANTS.UPDATE_LEAD_REASON_STATUS,
	pmc_observacoes: CONSTANTS.REQUIRED_INSPECTION_OBSERVATION,
	id_tipo_produto: 31,
}

exports.GETPAYLOAD_VALID_INPUT = () => {
	return CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT()
}

exports.OBSERVATION = () => {
	return CONSTANTS.REQUIRED_INSPECTION_OBSERVATION
}

exports.GETPAYLOAD_SUCCESS_RETURN = () => {
	return GETPAYLOAD_SUCCESS_RETURN_VALUE
}

exports.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_IDPRODUCTTYPE = () => {
	const returnValue = GETPAYLOAD_SUCCESS_RETURN_VALUE
	delete returnValue.id_tipo_produto
	return returnValue
}

exports.GETPAYLOAD_VALID_INPUT_WITHOUT_IDPRODUCTTYPE = () => {
	let returnValue = CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT()
	delete returnValue.integrationData.idProductType
	return returnValue
}
