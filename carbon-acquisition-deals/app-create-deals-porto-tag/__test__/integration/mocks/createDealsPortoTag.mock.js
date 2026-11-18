exports.VALID_DOCUMENT = () => {
	return '00000017400'
}

exports.VALID_INPUT_CONTROLLER = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

exports.SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: this.VALID_AXIOS_RESPONSE(),
	}
}

exports.HANDLER_RESPONSE_SUCCESS = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(this.VALID_AXIOS_RESPONSE()),
	}
}

exports.PORTOSEG_TOKEN_HUB = () => {
	return 'portoseg-token-hub'
}

exports.VALID_AXIOS_RESPONSE = () => {
	return [
		{
			id: '007fd362-f2a1-44df-a717-8f5cf7d4c265',
			tagNumber: '6760894718',
			document: '13307669702',
			name: 'ELVIS PRESLEY',
			email: 'alexandro.silva@portoseguro.com.br',
			status: 'ACTIVATED',
			requestPaymentStatus: 'FREE',
			creditCardFlag: null,
			creditCardLogo: null,
			cellPhoneCode: '34',
			cellPhone: '991840229',
			requestDate: '2023-10-02T13:50:23',
			activationDate: '2023-10-02T13:50:23',
			blockingReason: null,
			blockDate: null,
			requestChannel: 'APP',
			activationChannel: 'APP',
			deactivationChannel: 'EVENTUAL',
			deactivationDate: '2024-03-25T10:04:05',
			requestPaymentAmount: 0.0,
			vehicle: {
				plate: 'XTE-1234',
				nickname: 'carro xte',
			},
			sendReceipt: false,
			deactivationReason: null,
			tracking: 725690,
			pointToPoint: [],
			isVisible: true,
			isPointToPointActive: false,
		},
	]
}

exports.VALID_FACTORY_SAVE_RETURN = () => {
	return {
		scope: 'porto-tag',
		document: this.VALID_DOCUMENT(),
		data: JSON.stringify(this.VALID_AXIOS_RESPONSE()),
	}
}
