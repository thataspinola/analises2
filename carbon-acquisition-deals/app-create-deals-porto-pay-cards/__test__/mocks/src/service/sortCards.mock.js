exports.GIVEN_CARDS = () => {
	return [
		CARTAO_VISA_MULTI,
		CARTAO_MASTERCARD_PORTO,
		CARTAO_MASTERCARD_MULTI,
		CARTAO_ELO_MULTI,
		CARTAO_VISA_PORTO,
	]
}

exports.EXPECTED_ORDER_CARDS = () => {
	return [
		CARTAO_VISA_PORTO,
		CARTAO_MASTERCARD_PORTO,
		CARTAO_VISA_MULTI,
		CARTAO_MASTERCARD_MULTI,
		CARTAO_ELO_MULTI,
	]
}

const CARTAO_VISA_PORTO = {
	idCartao: '25b3b4f0-1c8f-474d-8949-9f7096745ef0',
	numeroCartao: '400000XXXXXX0010',
	bandeira: 'VISA',
	cartaoPorto: true,
	cartaoOculto: false,
}

const CARTAO_MASTERCARD_PORTO = {
	idCartao: 'dc79dff4-0273-39a7-8d18-5936b84ed424',
	numeroCartao: '536537XXXXXX0116',
	bandeira: 'MASTERCARD',
	cartaoPorto: true,
	cartaoOculto: false,
}

const CARTAO_VISA_MULTI = {
	idCartao: '25b3b4f0-1c8f-474d-8949-9f7096745ef0',
	numeroCartao: '400000XXXXXX0010',
	bandeira: 'VISA',
	cartaoPorto: false,
	cartaoOculto: false,
}

const CARTAO_MASTERCARD_MULTI = {
	idCartao: '6f801861-8ab9-48b7-b148-20631489fd5b',
	numeroCartao: '527187XXXXXX7035',
	bandeira: 'MASTERCARD',
	cartaoPorto: false,
	cartaoOculto: false,
}

const CARTAO_ELO_MULTI = {
	idCartao: 'r6843861-5dr7-53r9-g634-54831769fd5b',
	numeroCartao: '825745XXXXXX2545',
	bandeira: 'ELO',
	cartaoPorto: false,
	cartaoOculto: false,
}
