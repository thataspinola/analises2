const MOCKS = require('../../../../index.mock')

const VALID_RETURN_VALUE = {
	products: [
		{
			id: 2500,
			name: 'CONSERTO DE COOKTOP',
			sku: 'HC100',
			partnerId: 110,
			productQuantity: 1,
		},
	],
	exclusivePortoCardCampaign: {
		id: 80,
		description: 'CAMPANHA FIXA DE 20% DE DESCONTO CARTÃO PORTO',
		name: 'CARTAO PORTO',
		partnerName: 'Porto Faz',
		discountTypeId: 114,
		discountValue: 20,
		originalValue: 319.9,
		finalDiscountValue: 63.98,
		discountByCouponFlag: false,
	},
	paymentMethod: {
		portoCard: {
			installment: {
				1: 255.92,
				2: 127.96,
				3: 85.31,
				4: 63.98,
				5: 51.18,
				6: 42.65,
				7: 36.56,
				8: 31.99,
				9: 28.44,
				10: 25.59,
			},
		},
		otherCardBrands: {
			installment: {
				1: 319.9,
				2: 159.95,
				3: 106.63,
				4: 79.98,
			},
		},
	},
	quantity: 1,
	initialValue: 319.9,
	portoCardDiscountValue: 63.98,
	finalValuePortoCard: 255.92,
	finalValue: 319.9,
}

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RETURN_VALUE,
	}
}

exports.VALID_PAYLOAD_INPUT = () => {
	return MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT().serviceProvision
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

exports.API_MILEAGE_VALID_PAYLOAD_INPUT = {
	products: [
		{
			id: 1618,
			name: 'REMOCAO DE CARRO',
			sku: 'HC100',
			partnerId: 110,
			mileage: {
				distanceKM: 426,
				highwayFlag: false,
			},
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
}

exports.API_CATEGORY_VALID_PAYLOAD_INPUT = {
	products: [
		{
			id: 2483,
			name: 'LIMPEZA DE SOFA',
			sku: 'HC100',
			partnerId: 110,
			categoryId: 44,
			items: [
				{
					id: 54,
					description: '2 lugares',
					quantity: 0,
				},
				{
					id: 52,
					description: '4 lugares',
					quantity: 1,
				},
				{
					id: 53,
					description: '3 lugares',
					quantity: 1,
				},
			],
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
}

exports.API_COMBO_VALID_PAYLOAD_INPUT = {
	products: [
		{
			id: 2373,
			name: 'CONSERTO HIDRAULICO SIMPLES',
			sku: 'HC100',
			partnerId: 110,
			comboId: 53,
			itens: [
				{
					productId: 2409,
					description: 'CONSERTO HIDRAULICO DE DISPOSITIVOS DE JARDIM',
					quantity: 1,
				},
				{
					productId: 2417,
					description: 'CONSERTO HIDRAULICO DE VASO SANITARIO OU BIDE',
					quantity: 1,
				},
				{
					productId: 2344,
					description: 'FIXACAO DE BATEDOR OU PRENDEDOR EM PORTA DE MADEIRA',
					quantity: 1,
				},
			],
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
}

exports.RESPONSE_API_MILEAGE = {
	products: [
		{
			id: 1618,
			name: 'REMOCAO DE CARRO',
			sku: 'HC100',
			partnerId: 110,
			quilometragem: {
				distanciaKM: 426,
				flagRodovia: false,
			},
		},
	],
	paymentMethod: {
		portoCard: {
			installment: {
				1: 1179,
				2: 589.5,
				3: 393,
				4: 294.75,
				5: 235.8,
				6: 196.5,
				7: 168.43,
				8: 147.38,
				9: 131,
				10: 117.9,
			},
		},
		otherCardBrands: {
			installment: {
				1: 1179,
				2: 589.5,
				3: 393,
				4: 294.75,
			},
		},
	},
	quantity: 1,
	valorAdicional: 907.1,
	initialValue: 271.9,
	finalValuePortoCard: 1179,
	finalValue: 1179,
}

exports.RESPONSE_API_CATEGORY = {
	products: [
		{
			id: 2483,
			name: 'LIMPEZA DE SOFA',
			sku: 'HC100',
			partnerId: 110,
			idCategoria: 44,
			itens: [
				{
					id: 54,
					description: '2 lugares',
					quantity: 0,
					valorItem: 10,
				},
				{
					id: 52,
					description: '4 lugares',
					quantity: 1,
					valorItem: 484.9,
				},
				{
					id: 53,
					description: '3 lugares',
					quantity: 1,
					valorItem: 399.9,
				},
			],
		},
	],
	paymentMethod: {
		otherCardBrands: {
			installment: {
				1: 884.8,
				2: 442.4,
				3: 294.93,
				4: 221.2,
			},
		},
	},
	quantity: 2,
	valorAdicional: 884.8,
	finalValue: 884.8,
}

exports.RESPONSE_API_COMBO = {
	products: [
		{
			id: 2373,
			name: 'CONSERTO HIDRAULICO SIMPLES',
			sku: 'HC100',
			partnerId: 110,
			idCombo: 53,
			itens: [
				{
					idProduto: 2409,
					description: 'CONSERTO HIDRAULICO DE DISPOSITIVOS DE JARDIM',
					quantity: 1,
				},
				{
					idProduto: 2417,
					description: 'CONSERTO HIDRAULICO DE VASO SANITARIO OU BIDE',
					quantity: 1,
				},
				{
					idProduto: 2344,
					description: 'FIXACAO DE BATEDOR OU PRENDEDOR EM PORTA DE MADEIRA',
					quantity: 1,
				},
			],
		},
	],
	paymentMethod: {
		otherCardBrands: {
			installment: {
				1: 279.9,
				2: 139.95,
				3: 93.3,
				4: 69.98,
			},
		},
	},
	quantity: 1,
	initialValue: 279.9,
	finalValue: 279.9,
}
