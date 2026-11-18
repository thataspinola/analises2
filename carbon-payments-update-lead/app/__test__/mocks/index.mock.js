const VALID_INPUT_DATA = {
	leadIdentifier: '123456',
	externalId: '1801525946',
	productCode: '61',
	amount: 86.3,
	installments: 3,
	scope: 'phone',
	itemId: '2750',
	contactEmail: 'jose@das.couves',
	paymentData: {
		tipo_documento_comercial: '01',
		endosso: '',
		codigo_empresa: '001',
		composicao_valor_parcela: '01',
		codigo_ramo: '1369',
		parcela: '',
		contrato_comercial: '',
		evento_emissao: '01',
		flag_sinalizador_processo: 'O',
		flag_produto_seguro: 'S',
		codigo_agregador: '',
		codigo_modalidade: '0',
	},
	integrationData: {
		numeroOrcamento: '00640140',
		dataOperacao: '2023-12-21T03:00:00.000Z',
		valor: 86.3,
		codigoFormaPagamento: 62,
		quantidadeParcelas: '3',
		opcaoPrecificacao: 0,
		idFormaPagamento: 'a0a0t000002RsveAAC',
		propostas: [{ numero: '1801525946' }],
	},
	isOnline: true,
	chargeId: '665ddd71-819d-4bed-9bf5-ff1c096d996d',
	status: 'PAGA',
	orderNumber: '000004863',
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 1404.86,
			creditCard: {
				id: 'a09e4d83-efaa-4377-aff4-c1695486e163',
				flag: 'VISA',
			},
		},
	],
	loggedCPF: '03657648097',
	orderPaymentId: '3e4dcd70-8ea8-4edb-a95d-32745c97bba5',
}

exports.VALID_INPUT_DATA_PAID = VALID_INPUT_DATA

exports.VALID_INPUT_DATA_PAID_WITH_ID_TYPE_PRODUCT = {
	...VALID_INPUT_DATA,
	integrationData: {
		...VALID_INPUT_DATA.integrationData,
		idProductType: 7,
	},
}

exports.VALID_INPUT_DATA_REJECTED = {
	leadIdentifier: '123456',
	externalId: '1801525946',
	productCode: '61',
	amount: 86.3,
	installments: 3,
	scope: 'auto',
	itemId: '2750',
	contactEmail: 'jose@das.couves',
	paymentData: {
		tipo_documento_comercial: '01',
		endosso: '',
		codigo_empresa: '001',
		composicao_valor_parcela: '01',
		codigo_ramo: '1369',
		parcela: '',
		contrato_comercial: '',
		evento_emissao: '01',
		flag_sinalizador_processo: 'O',
		flag_produto_seguro: 'S',
		codigo_agregador: '',
		codigo_modalidade: '0',
	},
	integrationData: {
		numeroOrcamento: '00640140',
		dataOperacao: '2023-12-21T03:00:00.000Z',
		valor: 86.3,
		codigoFormaPagamento: 62,
		quantidadeParcelas: '3',
		opcaoPrecificacao: 0,
		idFormaPagamento: 'a0a0t000002RsveAAC',
		propostas: [{ numero: '1801525946' }],
	},
	isOnline: true,
	chargeId: '665ddd71-819d-4bed-9bf5-ff1c096d996d',
	status: 'REJEITADA',
	orderNumber: '000004863',
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 1404.86,
			creditCard: {
				id: 'a09e4d83-efaa-4377-aff4-c1695486e163',
				flag: 'VISA',
			},
		},
	],
	loggedCPF: '03657648097',
	orderPaymentId: '3e4dcd70-8ea8-4edb-a95d-32745c97bba5',
}

exports.API_PAYLOAD = {
	codigo_vdo: '123456',
	id_ramo: '27',
	fase: 6,
	status: 1,
	razao_status: '778210129',
}

exports.API_RESPONSE_SUCCESS = { data: 'mockData' }

exports.API_RESPONSE_ERROR = new Error('Request failed')

exports.ERROR_DETAILS = { message: 'Error message', status: 500 }

const EXPECT_PAYLOAD_PHONE = {
	codigo_vdo: '123456',
	id_ramo: 143,
	fase: 6,
	status: '1',
	razao_status: '778210124',
}

exports.EXPECT_PAYLOAD_PHONE_PAID = EXPECT_PAYLOAD_PHONE

exports.EXPECT_PAYLOAD_PHONE_PAID_WITH_ID_TYPE_PRODUCT = {
	...EXPECT_PAYLOAD_PHONE,
	id_tipo_produto: 7,
}

exports.EXPECT_PAYLOAD_AUTO_REJECTED = {
	codigo_vdo: '123456',
	id_ramo: 27,
	fase: 6,
	status: '1',
	razao_status: '778210129',
}

exports.INPUT_PAYLOAD_LIFE = (status) => {
	return {
		customerName: 'DANQPCMLA UIX WOLF',
		proposalId: '01547108',
		externalId: '1801547108',
		productCode: 'b2337254-5eaf-4438-b814-396599736283',
		amount: 434.38,
		installments: 1,
		scope: 'lifeinsurance',
		itemId: '4470',
		contactEmail: 'eduardo.rabello@portoseguro.com.br',
		paymentData: {
			tipo_documento_comercial: '01',
			endosso: '',
			codigo_empresa: '001',
			composicao_valor_parcela: '01',
			codigo_ramo: '1391',
			codigo_modalidade: '20',
			parcela: '',
			contrato_comercial: '',
			evento_emissao: '01',
			flag_produto_seguro: 'S',
			codigo_agregador: '',
			flag_sinalizador_processo: 'O',
		},
		integrationData: {
			numeroOrcamento: '00875650',
			dataOperacao: '2025-09-30T03:00:00.000Z',
			valor: 434.38,
			opcaoPrecificacao: 0,
			codigoFormaPagamento: 62,
			quantidadeParcelas: '1',
			idFormaPagamento: 'a0a0t000002RsveAAC',
			propostas: [
				{
					numero: '01547108',
				},
			],
		},
		leadIdentifier: '00875650',
		isOnline: true,
		chargeId: '5f11056f-e1c8-461a-92a2-d0c4a63ef7aa',
		status: status,
		orderNumber: '000019507',
		charges: [
			{
				paymentMethod: 'CREDIT_CARD',
				amount: 434.38,
				creditCard: {
					isProposalCode: false,
					saveCard: false,
					id: 'f63fa797-3c8b-4a68-8ea7-898407fbaa9e',
					flag: 'Mastercard',
				},
			},
		],
		loggedCPF: '69477883077',
		orderPaymentId: '185ec53e-6524-4740-a473-d0e6d43de100',
	}
}

exports.EXPECT_PAYLOAD_LIFE_PAGA = {
	codigo_vdo: '00875650',
	id_ramo: 303,
	fase: 6,
	status: '1',
	razao_status: '778210124',
}

exports.EXPECT_PAYLOAD_LIFE_REJEITADA = {
	codigo_vdo: '00875650',
	id_ramo: 303,
	fase: 6,
	status: '1',
	razao_status: '778210129',
}

exports.INPUT_PAYLOAD_PORTABLE_DEVICE = (status) => {
	return {
		customerName: null,
		proposalId: '01546989',
		externalId: '1801546989',
		productCode: '61',
		amount: 51.2,
		installments: 1,
		scope: 'portable_device',
		itemId: '2862',
		contactEmail: 'rodrigo.coitim@portoseguro.com.br',
		paymentData: {
			tipo_documento_comercial: '01',
			endosso: '',
			codigo_empresa: '001',
			composicao_valor_parcela: '01',
			codigo_ramo: '171',
			parcela: '',
			contrato_comercial: '',
			evento_emissao: '01',
			flag_sinalizador_processo: 'O',
			flag_produto_seguro: 'S',
			codigo_agregador: '',
			codigo_modalidade: '434',
		},
		integrationData: {
			numeroOrcamento: '00874861',
			dataOperacao: '2025-09-22T03:00:00.000Z',
			valor: 51.2,
			codigoFormaPagamento: 62,
			quantidadeParcelas: '1',
			opcaoPrecificacao: 0,
			idFormaPagamento: 'a0a0t000002RsveAAC',
			idBranch: 201,
			propostas: [
				{
					numero: '1801546989',
				},
			],
		},
		leadIdentifier: '1758546366756',
		isOnline: true,
		chargeId: 'df5c0d36-e3ee-45a0-a97b-052d6556a095',
		status: status,
		orderNumber: '000019315',
		charges: [
			{
				paymentMethod: 'CREDIT_CARD',
				amount: 51.2,
				creditCard: {
					isProposalCode: false,
					saveCard: false,
					id: '85c9e574-55cd-4295-94c3-a3155bd50e43',
					flag: 'MASTERCARD',
				},
			},
		],
		loggedCPF: '72833842007',
		orderPaymentId: '14c9afdf-5b7f-4170-ae63-5e8f25b876ed',
	}
}

exports.EXPECT_PAYLOAD_PORTABLE_DEVICE_PAGA = {
	codigo_vdo: '1758546366756',
	id_ramo: 201,
	fase: 6,
	status: '1',
	razao_status: '778210124',
}

exports.EXPECT_PAYLOAD_PORTABLE_DEVICE_REJEITADA = {
	codigo_vdo: '1758546366756',
	id_ramo: 201,
	fase: 6,
	status: '1',
	razao_status: '778210129',
}

exports.INVALID_INPUT_DATA_WITHOUT_SCOPE_IDBRANCH = {
	leadIdentifier: '123456',
	externalId: '1801525946',
	productCode: '61',
	amount: 86.3,
	installments: 3,
	itemId: '2750',
	contactEmail: 'jose@das.couves',
	paymentData: {
		tipo_documento_comercial: '01',
		endosso: '',
		codigo_empresa: '001',
		composicao_valor_parcela: '01',
		codigo_ramo: '1369',
		parcela: '',
		contrato_comercial: '',
		evento_emissao: '01',
		flag_sinalizador_processo: 'O',
		flag_produto_seguro: 'S',
		codigo_agregador: '',
		codigo_modalidade: '0',
	},
	integrationData: {
		numeroOrcamento: '00640140',
		dataOperacao: '2023-12-21T03:00:00.000Z',
		valor: 86.3,
		codigoFormaPagamento: 62,
		quantidadeParcelas: '3',
		opcaoPrecificacao: 0,
		idFormaPagamento: 'a0a0t000002RsveAAC',
		propostas: [{ numero: '1801525946' }],
	},
	isOnline: true,
	chargeId: '665ddd71-819d-4bed-9bf5-ff1c096d996d',
	status: 'PAGA',
	orderNumber: '000004863',
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 1404.86,
			creditCard: {
				id: 'a09e4d83-efaa-4377-aff4-c1695486e163',
				flag: 'VISA',
			},
		},
	],
	loggedCPF: '03657648097',
	orderPaymentId: '3e4dcd70-8ea8-4edb-a95d-32745c97bba5',
}
