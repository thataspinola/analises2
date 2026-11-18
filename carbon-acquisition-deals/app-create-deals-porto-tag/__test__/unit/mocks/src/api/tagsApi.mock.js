exports.VALID_DOCUMENT = () => {
	return '00000017400'
}

exports.VALID_PORTOSEG_TOKEN_HUB = () => {
	return 'porto-seg-token-hub'
}

exports.URL_PATH_PROPOSTA = () => {
	return 'https://apihlg-portoseg.sensedia.com/portotag/v2/tags'
}

exports.RESPONSE_EMPTY_API = () => {
	return null
}

exports.SUCCESS_RETURN_BODY_VALUE = () => {
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
