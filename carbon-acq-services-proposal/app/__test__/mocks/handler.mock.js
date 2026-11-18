const MOCKS = require('./index.mock')

exports.VALID_INPUT_PAYLOAD = () => {
	return {
		body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()),
	}
}

exports.VALID_INPUT_WITH_COMBO_PAYLOAD = () => {
	return {
		body: JSON.stringify(
			MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_WITH_COMBO_INPUT()
		),
	}
}

exports.INVALID_INPUT_BODY_PAYLOAD = () => {
	return {
		body: {
			products: [
				{
					id: 2500,
					name: 'CONSERTO DE COOKTOP',
					sku: 'HC100',
					partnerId: 110,
					productQuantity: 1,
				},
			],
			serviceOrder: {
				requester: {
					name: 'Teste',
					documentNumber: '33207922880',
				},
				serviceAddresses: [
					{
						city: 'São Paulo',
						state: 'SP',
						zipCode: '01310100',
						neighborhood: 'Bela Vista',
						street: 'Avenida Paulista',
						latitude: -23.514836,
						streetNumber: '982',
						longitude: -46.3746187,
						addressType: 'ORIGEM',
						streetType: 'Avenida',
						phones: [
							{
								name: 'teste teste',
								areaCode: '11',
								number: '999999999',
								type: 'CELULAR',
							},
						],
					},
				],
			},
			coupon: 'TESTE',
			partnerProductId: '221',
		},
	}
}

exports.INVALID_INPUT_PAYLOAD = () => {
	return {
		body: JSON.stringify({
			products: [
				{
					id: 2500,
					name: 'CONSERTO DE COOKTOP',
					sku: 'HC100',
					partnerId: 110,
					productQuantity: 1,
				},
			],
			serviceOrder: {
				requester: {
					name: 'Teste',
					documentNumber: '33207922880',
				},
				serviceAddresses: [
					{
						city: 'São Paulo',
						state: 'SP',
						zipCode: '01310100',
						neighborhood: 'Bela Vista',
						street: 'Avenida Paulista',
						latitude: '-23.514836',
						streetNumber: '982',
						longitude: '-46.3746187',
						addressType: 'ORIGEM',
						streetType: 'Avenida',
						phones: [
							{
								name: 'teste teste',
								areaCode: '11',
								number: '999999999',
								type: 'CELULAR',
							},
						],
					},
				],
			},
			coupon: 'TESTE',
			partnerProductId: '221',
		}),
	}
}

exports.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT = () => {
	return {
		body: "{ invalid: 'JSON' ",
	}
}

exports.INVALID_INPUT_PAYLOAD_WITH_NON_STRING_BODY = () => {
	return {
		body: { invalid: 'data' },
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(
			MOCKS.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD.PAYLOAD_RETURN()
		),
	}
}

exports.BADREQUEST_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 400,
		body: JSON.stringify(
			MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT()
		),
	}
}

exports.INTERNALERROR_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: JSON.stringify(
			MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT()
		),
	}
}
