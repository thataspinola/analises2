const payload = {
	customerName: 'Willian Salvador',
	proposalId: null,
	externalId: '58000000000524',
	productCode: 'eb12742c-0cd5-4a4c-ae37-6b3cf248bc6b',
	amount: 707.76,
	installments: 1,
	scope: 'phone',
	itemId: '7317',
	contactEmail: 'willian.salvador@portoseguro.com.br',
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
		correlationId: 'e91c19ba-4934-4ba4-ab5e-4627d6459378',
		vdoCode: '1709054031450',
		pacote: 4,
		codigoCanal: 58,
		proponente: {
			cpf: '95395590064',
			dataNascimento: '11/02/1985',
			nomePessoa: 'Willian Salvador',
			faixaRenda: '2',
			estadoCivil: '2',
			sexo: 'M',
			codigoOcupacao: 135,
			descricaoOcupacao: 'ACOUGUEIRO',
			enderecos: [
				{
					bairro: 'Centro',
					cidade: 'Divinópolis',
					complemento: '',
					complementoCep: '002',
					latitude: 41.19301,
					logradouro: 'Avenida Primeiro de Junho',
					longitude: 41.19301,
					numero: 66,
					numeroCep: '35500',
					tipoLogradouro: 'AV',
					uf: 'MG',
				},
			],
			telefone: 19997430822,
			tipoTelefone: 1,
			tipoPessoa: 'F',
			codigoTipoPessoa: 1,
			email: 'willian.salvador@portoseguro.com.br',
		},
		pagamento: {
			encargos: 0,
			iof: 48.64,
			juros: 0,
			parcela: 1,
			codigoPagamento: 62,
			valor: '707.76',
			valorReais: '707.76',
			cartao: {
				tokenCartao: 'df3a8ad9-796a-4ff6-97f5-22aa0748647e',
				bandeira: 2,
			},
			numeroOrcamento: 58000000000524,
		},
		analytics: {
			client_id: '1429755955.1708958266',
			user_id: 'bc0bad48cd23d8c8e2ef81ca301d0025',
			user_properties: {
				client_bcp: {
					value: 83169128,
				},
				client_id: {
					value: 'bc0bad48cd23d8c8e2ef81ca301d0025',
				},
			},
			events: [
				{
					name: 'select_content',
					params: {
						ev_category: 'hub-vendas:holding:checkout:pagamento',
						ev_action: 'evento-vinculo:purchase:sucesso',
						session_id: '2024127141233629319138-6T4XUGKR',
						timestamp: 1709054096,
						channel: 'hub-vendas',
						brand: 'porto',
						product: 'seguro-celular',
						subproduct: '',
						vertical: 'holding',
						service_protocol: null,
						proposal_id: null,
					},
				},
			],
		},
	},
	leadIdentifier: '1709054031450',
	isOnline: false,
	status: 'PENDING',
	orderNumber: '000003064',
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 707.76,
			creditCard: {
				id: 'df3a8ad9-796a-4ff6-97f5-22aa0748647e',
				flag: 'MASTERCARD',
			},
		},
	],
	loggedCPF: '953.955.900-64',
}

exports.VALID_GOOGLE_ANALYTICS_MESSAGE = {
	client_id: '1429755955.1708958266',
	user_id: 'bc0bad48cd23d8c8e2ef81ca301d0025',
	user_properties: {
		client_bcp: {
			value: 83169128,
		},
		client_id: {
			value: 'bc0bad48cd23d8c8e2ef81ca301d0025',
		},
	},
	events: [
		{
			name: 'select_content',
			params: {
				ev_category: 'hub-vendas:holding:checkout:pagamento',
				ev_action: 'evento-vinculo:purchase:sucesso',
				session_id: '2024127141233629319138-6T4XUGKR',
				timestamp: 1709054096,
				channel: 'hub-vendas',
				brand: 'porto',
				product: 'seguro-celular',
				subproduct: '',
				vertical: 'holding',
				service_protocol: '000003064',
				proposal_id: 123456,
			},
		},
	],
}

exports.VALID_API_RESPONSE = (constructor = {}) => {
	return { numeroProposta: 123456 }
}

exports.VALID_CONTROLLER_INPUT_REQUEST = (constructor = {}) => {
	return payload
}

exports.VALID_CONTROLLER_INPUT_REQUEST_WITHOU_ANALYTICS_DATA = (
	constructor = {}
) => {
	const input = JSON.parse(JSON.stringify(payload))
	delete input.integrationData.analytics
	return input
}

exports.CONTROLLER_SUCCESS_RESPONSE = (constructor = {}) => {
	return {
		statusCode: 200,
		body: constructor.body,
	}
}

exports.VALID_LAYER_DATABASE_INPUT = (constructor = {}) => {
	return {
		...payload,
		idTransaction: '000063',
	}
}
