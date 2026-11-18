const CONSTANTS = require('../../../../../src/property')
const CONTROLLER_INSPECTION_MOCKS = require('../../controller/inspectionController.mock')

const PAYLOAD_SUCCESS_RETURN_VALUE = {
	...CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT().integrationData,
	codigoParceiro: CONSTANTS.PARTNER_CODE,
}

exports.GETPAYLOAD_VALID_INPUT = () => {
	return CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT()
}

exports.GETPAYLOAD_SUCCESS_RETURN = () => {
	return PAYLOAD_SUCCESS_RETURN_VALUE
}

exports.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_PLATE = () => {
	let returnValue = JSON.parse(JSON.stringify(PAYLOAD_SUCCESS_RETURN_VALUE))
	delete returnValue.orcamento.itens[0].veiculo.placa
	return returnValue
}

exports.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_DATACARD = () => {
	let returnValue = JSON.parse(JSON.stringify(PAYLOAD_SUCCESS_RETURN_VALUE))
	delete returnValue.orcamento.formaPagamentoEscolhida.meioPagamento.dadosCartao
	return returnValue
}

exports.GETPAYLOAD_SUCCESS_RETURN_WITHOUT_PAYMENTMETHOD = () => {
	let returnValue = JSON.parse(JSON.stringify(PAYLOAD_SUCCESS_RETURN_VALUE))
	returnValue.orcamento.formaPagamentoEscolhida.meioPagamento.dadosCartao.mesValidade = 12
	returnValue.orcamento.formaPagamentoEscolhida.meioPagamento.dadosCartao.anoValidade = 2023
	returnValue.orcamento.formaPagamentoEscolhida.meioPagamento.dadosCartao.nomeCartao =
		returnValue.orcamento.itens[0].veiculo.nomeBeneficiario
	return returnValue
}

exports.GETPAYLOAD_VALID_INPUT_WITHOUT_PLATE = () => {
	return CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT_WITHOUT_PLATE()
}

exports.GETPAYLOAD_VALID_INPUT_WITHOUT_DATACARD = () => {
	let returnValue = JSON.parse(
		JSON.stringify(CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT())
	)
	delete returnValue.integrationData.orcamento.formaPagamentoEscolhida
		.meioPagamento.dadosCartao
	return returnValue
}

exports.GETPAYLOAD_VALID_INPUT_WITHOUT_PAYMENTMETHOD = () => {
	return CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT_WITHOUT_DATACARD()
}
