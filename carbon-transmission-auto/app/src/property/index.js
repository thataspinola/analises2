/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.QUEUE_MESSAGE_SCHEMA = {
	type: 'object',
	properties: {
		amount: { type: 'number' },
		chargeId: { type: 'string' },
		charges: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					amount: { type: 'number' },
					creditCard: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							preferred: { type: 'boolean' },
							saveCard: { type: 'boolean' },
						},
						required: [],
					},
					paymentMethod: { type: 'string' },
				},
				required: [],
			},
		},
		contactEmail: { type: 'string', format: 'email' },
		externalId: { type: 'string' },
		installments: { type: 'number', minimum: 1 },
		integrationData: {
			type: 'object',
			properties: {
				orcamento: {
					type: 'object',
					properties: {
						formaPagamentoEscolhida: {
							type: 'object',
							properties: {
								codigoFormaPagamento: { type: 'number' },
								quantidadeParcelas: { type: 'number' },
							},
							required: ['codigoFormaPagamento', 'quantidadeParcelas'],
						},
					},
					required: ['formaPagamentoEscolhida'],
				},
			},
			required: ['orcamento'],
		},
		orderNumber: { type: 'string' },
		orderPaymentId: { type: 'string' },
		productCode: { type: 'string' },
		proposalId: { type: 'string' },
		scope: { type: 'string' },
		status: { type: 'string' },
		transactionId: { type: 'string' },
	},
	required: [
		'amount',
		'chargeId',
		'charges',
		'contactEmail',
		'externalId',
		'installments',
		'integrationData',
		'orderNumber',
		'orderPaymentId',
		'productCode',
		'proposalId',
		'scope',
		'status',
		'transactionId',
	],
}

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.SENSEDIACLOUD_URL =
	process.env.SENSEDIACLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH =
	process.env.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH ||
	'automovel/proposta-criticas/v1/pagamento-checkout'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}
