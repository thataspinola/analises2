exports.VALID_RETURN_VALUE = 'tokenCommerceCreateCartGeneration'

const VALID_CREATE_EMPTY_CART_RETURN_VALUE = {
	createEmptyCart: this.VALID_RETURN_VALUE,
}
exports.VALID_CREATE_EMPTY_CART_RETURN = () => {
	return VALID_CREATE_EMPTY_CART_RETURN_VALUE
}
exports.RESPONSE_AXIOS_CREATE_EMPTY_CART_SUCCESS = () => ({
	status: 200,
	data: {
		data: VALID_CREATE_EMPTY_CART_RETURN_VALUE,
	},
})

const VALID_CREATE_FETCH_CART_RETURN_VALUE = {
	cart: { id: this.VALID_RETURN_VALUE },
}
exports.VALID_CREATE_FETCH_CART_RETURN = () => {
	return VALID_CREATE_FETCH_CART_RETURN_VALUE
}
exports.RESPONSE_AXIOS_FETCH_CART_SUCCESS = () => ({
	status: 200,
	data: {
		data: VALID_CREATE_FETCH_CART_RETURN_VALUE,
	},
})

const VALID_CREATE_ASSIGN_CUSTOMER_CART_RETURN_VALUE = {
	assignCustomerToGuestCart: { id: this.VALID_RETURN_VALUE },
}
exports.VALID_CREATE_ASSIGN_CUSTOMER_CART_RETURN = () => {
	return VALID_CREATE_ASSIGN_CUSTOMER_CART_RETURN_VALUE
}
exports.RESPONSE_AXIOS_ASSIGN_CUSTOMER_SUCCESS = () => ({
	status: 200,
	data: {
		data: VALID_CREATE_ASSIGN_CUSTOMER_CART_RETURN_VALUE,
	},
})

const VALID_GET_CART_RETURN_VALUE = {
	cart: {
		total_quantity: 3,
		items: [
			{
				uid: 'NTM5MjY=',
				id: '53926',
				proposal_id: 'rersolve_2',
				ga_properties: {
					item_id: 'item_id',
					item_name: 'item_name',
					item_category: 'item_category',
					item_brand: 'item_brand',
					item_variant: 'item_variant',
				},
				lead_identifier: 'rersolve_2',
				custom_price: 4600,
				product_name: 'Orçamento 1: Atualizado',
				product_scope: 'Porto Resolve',
				prices: {
					installments: {
						value: 816.5,
						quantity: 6,
					},
					price: {
						value: 4600,
						currency: 'BRL',
					},
					discounts: null,
					row_total_including_tax: {
						value: 4600,
					},
				},
				product: {
					name: 'Porto Resolve',
					sku: 'PORTO_RESOLVE',
				},
				quotation_data: {
					summary: [
						{
							label: 'Placa do carro',
							value:
								'GM - Chevrolet Celta 1.0 / Super / N. Piq. 1.o MPFi VHC 8V 3p',
						},
					],
					coverage: {
						title: 'Oficina',
						items: [
							{
								label:
									'R. Dr. Diogo de Faria, 1202 - Vila Clementino - São Paulo/SP - CEP 04037-004',
								value: '0',
							},
						],
					},
					details: {
						title: 'Agendado para',
						items: [
							{
								label: '23/12/2024',
								value: ' 12h às 14h',
							},
						],
					},
					information:
						'Ao pagar o valor restante do orçamento, daremos continuidade ao reparo do seu veículo e você será informado quando estiver pronto para retirada pelo e-mail cadastrado.',
				},
				broker_data: {
					id: null,
					email: null,
					name: null,
					phone: null,
					susep_code: null,
				},
			},
			{
				uid: 'NTQwMzE=',
				id: '54031',
				proposal_id: 'rersolve_2',
				ga_properties: {
					item_id: 'item_id',
					item_name: 'item_name',
					item_category: 'item_category',
					item_brand: 'item_brand',
					item_variant: 'item_variant',
				},
				lead_identifier: 'rersolve_2',
				custom_price: 4600,
				product_name: 'Orçamento 1: Atualizado',
				product_scope: 'Porto Resolve',
				prices: {
					installments: {
						value: 816.5,
						quantity: 6,
					},
					price: {
						value: 4600,
						currency: 'BRL',
					},
					discounts: null,
					row_total_including_tax: {
						value: 4600,
					},
				},
				product: {
					name: 'Porto Resolve',
					sku: 'PORTO_RESOLVE',
				},
				quotation_data: {
					summary: [
						{
							label: 'Placa do carro',
							value:
								'GM - Chevrolet Celta 1.0 / Super / N. Piq. 1.o MPFi VHC 8V 3p',
						},
					],
					coverage: {
						title: 'Oficina',
						items: [
							{
								label:
									'R. Dr. Diogo de Faria, 1202 - Vila Clementino - São Paulo/SP - CEP 04037-004',
								value: '0',
							},
						],
					},
					details: {
						title: 'Agendado para',
						items: [
							{
								label: '23/12/2024',
								value: ' 12h às 14h',
							},
						],
					},
					information:
						'Ao pagar o valor restante do orçamento, daremos continuidade ao reparo do seu veículo e você será informado quando estiver pronto para retirada pelo e-mail cadastrado.',
				},
				broker_data: {
					id: null,
					email: null,
					name: null,
					phone: null,
					susep_code: null,
				},
			},
			{
				uid: 'NTQwNTg=',
				id: '54058',
				proposal_id: 'rersolve_2',
				ga_properties: {
					item_id: 'item_id',
					item_name: 'item_name',
					item_category: 'item_category',
					item_brand: 'item_brand',
					item_variant: 'item_variant',
				},
				lead_identifier: 'rersolve_2',
				custom_price: 4600,
				product_name: 'Orçamento 1: Atualizado',
				product_scope: 'Porto Resolve',
				prices: {
					installments: {
						value: 816.5,
						quantity: 6,
					},
					price: {
						value: 4600,
						currency: 'BRL',
					},
					discounts: null,
					row_total_including_tax: {
						value: 4600,
					},
				},
				product: {
					name: 'Porto Resolve',
					sku: 'PORTO_RESOLVE',
				},
				quotation_data: {
					summary: [
						{
							label: 'Placa do carro',
							value:
								'GM - Chevrolet Celta 1.0 / Super / N. Piq. 1.o MPFi VHC 8V 3p',
						},
					],
					coverage: {
						title: 'Oficina',
						items: [
							{
								label:
									'R. Dr. Diogo de Faria, 1202 - Vila Clementino - São Paulo/SP - CEP 04037-004',
								value: '0',
							},
						],
					},
					details: {
						title: 'Agendado para',
						items: [
							{
								label: '23/12/2024',
								value: ' 12h às 14h',
							},
						],
					},
					information:
						'Ao pagar o valor restante do orçamento, daremos continuidade ao reparo do seu veículo e você será informado quando estiver pronto para retirada pelo e-mail cadastrado.',
				},
				broker_data: {
					id: null,
					email: null,
					name: null,
					phone: null,
					susep_code: null,
				},
			},
		],
	},
}

exports.VALID_GET_CART_RETURN = () => {
	return VALID_GET_CART_RETURN_VALUE.cart
}

exports.RESPONSE_AXIOS_GET_CART_SUCCESS = () => ({
	status: 200,
	data: {
		data: VALID_GET_CART_RETURN_VALUE,
	},
})

const INVALID_GET_CART_RETURN_VALUE = {
	cart: null,
}

exports.RESPONSE_AXIOS_GET_CART_INVALID_DATA = () => ({
	status: 200,
	data: {
		data: INVALID_GET_CART_RETURN_VALUE,
	},
})

const VALID_REMOVE_CART_ITEM_RETURN_VALUE = {
	removeItemFromCart: {
		cart: {
			total_quantity: 2,
			items: [
				{
					uid: 'NTM5MjY=',
					id: '53926',
					proposal_id: 'rersolve_2',
					ga_properties: {},
					lead_identifier: 'rersolve_2',
					custom_price: 4600,
					product_name: 'Orçamento 1: Atualizado',
					product_scope: 'Porto Resolve',
					prices: {},
					product: {},
					quotation_data: {},
					broker_data: {},
				},
				{
					uid: 'NTQwMzE=',
					id: '54031',
					proposal_id: 'rersolve_2',
					ga_properties: {},
					lead_identifier: 'rersolve_2',
					custom_price: 4600,
					product_name: 'Orçamento 1: Atualizado',
					product_scope: 'Porto Resolve',
					prices: {},
					product: {},
					quotation_data: {},
					broker_data: {},
				},
			],

			prices: {
				grand_total: { value: 9200, currency: 'BRL' },
			},
		},
	},
}

exports.VALID_REMOVE_CART_ITEM_RETURN = () => {
	return VALID_REMOVE_CART_ITEM_RETURN_VALUE.removeItemFromCart.cart
}

exports.RESPONSE_AXIOS_REMOVE_CART_ITEM_SUCCESS = () => ({
	status: 200,
	data: {
		data: VALID_REMOVE_CART_ITEM_RETURN_VALUE,
	},
})

const INVALID_REMOVE_CART_ITEM_RETURN_VALUE = {
	removeItemFromCart: null,
}

exports.RESPONSE_AXIOS_REMOVE_CART_ITEM_INVALID_DATA = () => ({
	status: 200,
	data: {
		data: INVALID_REMOVE_CART_ITEM_RETURN_VALUE,
	},
})

exports.RESPONSE_AXIOS_GRAPHQL_ERROR = () => ({
	status: 200,
	data: {
		errors: [{ message: 'GraphQL error occurred' }],
	},
})

exports.RESPONSE_AXIOS_INVALID_DATA_SHAPE = () => ({
	status: 200,
	data: { foo: 'bar' },
})

exports.RESPONSE_AXIOS_HTTP_500_ERROR = () => ({
	status: 500,
	data: { message: 'Internal Server Error' },
})

exports.INPUT_NO_PARAMS = () => []

exports.INPUT_NULL_CART_NO_TOKEN = () => [null]

exports.INPUT_EMPTY_CART_NO_TOKEN = () => ['']

exports.INPUT_UNDEFINED_CART_WITH_TOKEN = () => [
	undefined,
	'VALID_CUSTOMER_TOKEN',
]

exports.INPUT_VALID_CART_NO_TOKEN = () => [this.VALID_RETURN_VALUE]

exports.INPUT_INVALID_CART_NO_TOKEN = () => ['NONEXISTENT_CART', '']

exports.INPUT_INVALID_CART_WITH_TOKEN = () => [
	'NONEXISTENT_CART',
	'VALID_CUSTOMER_TOKEN',
]

exports.INPUT_VALID_REMOVE_ITEM_PARAMS = () => [
	'VALID_CART_ID',
	'NTQwNTg=',
	'VALID_CUSTOMER_TOKEN',
]

exports.INPUT_VALID_REMOVE_ITEM_NO_TOKEN_PARAMS = () => [
	'VALID_CART_ID',
	'NTQwNTg=',
]

exports.INPUT_INVALID_REMOVE_ITEM_UID = () => [
	'VALID_CART_ID',
	'INVALID_CART_ITEM_UID',
	'VALID_CUSTOMER_TOKEN',
]

exports.EXPECTED_NEW_CART_ID = () => {
	return { createEmptyCart: this.VALID_RETURN_VALUE }
}

exports.EXPECTED_EXISTING_CART_ID = () => {
	return { createEmptyCart: this.VALID_RETURN_VALUE }
}

exports.EXPECTED_ASSIGNED_CART_ID = () => {
	return { createEmptyCart: this.VALID_RETURN_VALUE }
}

exports.EXPECTED_CART_AFTER_ITEM_REMOVAL = () => {
	return VALID_REMOVE_CART_ITEM_RETURN_VALUE.removeItemFromCart.cart
}
