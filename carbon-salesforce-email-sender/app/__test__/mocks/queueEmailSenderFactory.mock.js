exports.VALID_INPUT_DATA = {
	scope: 'scopeTest',
	status: 'SUCCESS',
}

exports.VALID_INPUT_DATA_PENDING = {
	scope: 'scopeTest',
	status: 'PENDING',
}

exports.ADDITIONAL_DATA = {
	pescod: '123456',
	clientEmail: 'jose@das.couves',
	clientName: 'José das Couves',
	brokerName: 'João Ninguém',
	brokerPhone: '11999999999',
	brokerEmail: 'joao.ninguem@broker.com',
	needInspection: true,
}

exports.ADDITIONAL_DATA_WITHOUT_INSPECTION = {
	pescod: '123456',
	clientEmail: 'jose@das.couves',
	clientName: 'José das Couves',
	brokerName: 'João Ninguém',
	brokerPhone: '11999999999',
	brokerEmail: 'joao.ninguem@broker.com',
	needInspection: false,
}

exports.PROPERTIES = {
	NODE_ENV: 'test',
	PRODUCTS_INFO: {
		scopeTest: {
			name: 'Test',
			coastCenter: '101010',
			definition_keys: {
				SUCCESS: 'Trans_email_ApoliceEmitida',
				ERROR: 'Trans_email_PedidoNaoIdentifi',
				PENDING: 'Trans_email_PedidoRecebido',
				WITHOUT_INSPECTION: 'Trans_email_CelSemVistoria',
			},
			campaign: {
				SUCCESS: 'FluxoProposta-PedidoEmitido',
				ERROR: 'FluxoProposta-PedidoNaoIdentificado',
				PENDING: 'FluxoProposta-PedidoRecebido',
			},
		},
	},
	SCOPE: {
		PD: 'portable_device'
	}
}

exports.EXPECTED_EMAIL_MESSAGE_SUCCESS = {
	scope: 'scopeTest',
	payload: {
		contactEmail: 'jose@das.couves',
		definitionKey: 'UAT_Trans_email_ApoliceEmitida',
		pescod: '123456',
		attributes: {
			Produto: 'Test',
			Area: 'Hub',
			Centro_de_Custo: '101010',
			PrimeiroNome: 'José',
			NomeCorretor: 'João Ninguém',
			TelefoneCorretor: '11999999999',
			EmailCorretor: 'joao.ninguem@broker.com',
			Nome_Campanha: 'FluxoProposta-PedidoEmitido',
		},
	},
}

exports.EXPECTED_EMAIL_MESSAGE_SUCCESS_WITHOUT_BROKER_DATA = {
	scope: 'scopeTest',
	payload: {
		contactEmail: 'jose@das.couves',
		definitionKey: 'UAT_Trans_email_ApoliceEmitida',
		pescod: '123456',
		attributes: {
			Produto: 'Test',
			Area: 'Hub',
			Centro_de_Custo: '101010',
			PrimeiroNome: 'José',
			NomeCorretor: null,
			TelefoneCorretor: null,
			EmailCorretor: null,
			Nome_Campanha: 'FluxoProposta-PedidoEmitido',
		},
	},
}

exports.EXPECTED_EMAIL_MESSAGE_SUCCESS_WITHOUT_INSPECTION = {
	scope: 'scopeTest',
	payload: {
		contactEmail: 'jose@das.couves',
		definitionKey: 'HML_Trans_email_CelSemVistoria',
		pescod: '123456',
		attributes: {
			Produto: 'Test',
			Area: 'Hub',
			Centro_de_Custo: '101010',
			PrimeiroNome: 'José',
			NomeCorretor: 'João Ninguém',
			TelefoneCorretor: '11999999999',
			EmailCorretor: 'joao.ninguem@broker.com',
			Nome_Campanha: 'FluxoProposta-PedidoRecebido',
		},
	},
}

exports.EXPECTED_EMAIL_MESSAGE_ERROR = {
	scope: 'scopeTest',
	payload: {
		contactEmail: 'jose@das.couves',
		definitionKey: 'PROD_Trans_email_PedidoNaoIdentifi',
		pescod: '123456',
		attributes: {
			Produto: 'Test',
			Area: 'Hub',
			Centro_de_Custo: '101010',
			PrimeiroNome: 'José',
			NomeCorretor: 'João Ninguém',
			TelefoneCorretor: '11999999999',
			EmailCorretor: 'joao.ninguem@broker.com',
			Nome_Campanha: 'FluxoProposta-PedidoNaoIdentificado',
		},
	},
}
