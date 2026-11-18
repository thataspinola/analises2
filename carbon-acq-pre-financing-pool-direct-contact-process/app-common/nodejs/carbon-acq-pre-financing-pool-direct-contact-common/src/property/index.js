/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE
exports.LOGGER = 'lambda_direct_contact_request_logger'
const WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_TELEPHONE_VALUE = 'telephone'
exports.WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_TELEPHONE = `${WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_TELEPHONE_VALUE}`
const WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_WHATSAPP_VALUE = 'whatsapp'
const SAP_CDC_PFP_PRODUCTS_VALUE = {
	AUTOMOVEL: 24,
	IMOVEL: 25,
	EQUIPAMENTO: 26,
	ELETRODOMES: 55,
	PESADOS: 94,
	SUSTENTAVEL: 124,
	BIKE: 154,
	AUTOMOVEL_DATA_CERTA: 230, 
}

const SAP_CDC_PFP_PRODUCT_NAMES_VALUE = {
	24: 'CONSÓRCIO - AUTOMÓVEL',
	25: 'CONSÓRCIO - IMÓVEL',
	26: 'CONSÓRCIO - EQ PROFISSIONAL',
	55: 'CONSÓRCIO - ELETRODOMÉSTICOS',
	94: 'CONSORCIO - PESADOS',
	124: 'CONSORCIO - SUSTENTAVEL',
	154: 'CONSORCIO BIKE',
	230: 'CONSÓRCIO - AUTOMÓVEL DATA CERTA'
}

exports.SAP_CDC_PFP_PRODUCTS = SAP_CDC_PFP_PRODUCTS_VALUE
exports.SAP_CDC_PFP_PRODUCT_NAMES = SAP_CDC_PFP_PRODUCT_NAMES_VALUE
exports.WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_WHATSAPP = `${WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_WHATSAPP_VALUE}`
exports.WHATSAPP_CONTACT_REQUEST_SCHEMA = {
	type: 'object',
	properties: {
		client: {
			type: 'object',
			properties: {
				fullName: { type: 'string' },
				cpfCnpj: { type: 'string' },
				cellPhone: { type: 'string', minLength: 10 },
				email: { type: 'string', format: 'email' },
				socialName: { type: 'string', nullable: true },
			},
			required: ['fullName', 'cpfCnpj', 'cellPhone', 'email'],
		},
		address: {
			type: 'object',
			properties: {
				zipCode: { type: 'string' },
			},
			required: ['zipCode'],
		},
		marketingOptOutFlag: { type: 'boolean' },
		channel: {
			enum: [
				WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_TELEPHONE_VALUE,
				WHATSAPP_CONTACT_REQUEST_SCHEMA_CHANNEL_WHATSAPP_VALUE,
			],
		},
		product: {
			enum: Object.keys(SAP_CDC_PFP_PRODUCTS_VALUE),
		},
		lead: {
			type: 'object',
			properties: {
				vdoCode: { type: 'string'}
			},
			required: ['vdoCode']
		},
		domain: { type: 'string', nullable: true },
		reference: { type: 'string', nullable: true },
		id_google: { type: 'string', nullable: true },
		session_google: { type: 'string', nullable: true },
		budget: {
			type: 'object',
			properties: {
				iof: { type: 'string' },
				quotationValidity: { type: 'string'},
				installments: { type: 'string'},
				installmentValue: { type: 'string' },
				fullPaymentValue: { type: 'string' },
				fullPaymentPriceOthers: { type: 'string' },
				installmentPriceOthers: { type: 'string' },
			}
		}
	},
	patternProperties: {
		'^utm_.*$': { type: 'string', nullable: true },
	},
	required: ['client', 'address', 'marketingOptOutFlag', 'channel', 'product', 'lead'],
}
exports.DIRECT_CONTACT_UPDATE_SCHEMA = {
	type: 'object',
	properties: {
		lead: {
		type: 'object',
			properties: {
				vdoCode: { type: 'string'},
				branchId: { type: 'string'},
			},
			required: ['vdoCode', 'branchId']
		},
	},
	required: ['lead'],
}

exports.CREATE_PRE_FINANCING_FLAG = "pre_financing_contact_request"
exports.UPDATE_PRE_FINANCING_FLAG = "pre_financing_contact_request_update"