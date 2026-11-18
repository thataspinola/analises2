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

exports.SENSEDIA_TOKEN_HUB_CLOUD = () => {
	return 'token-sensedia-token-hub-cloud'
}

exports.VALID_AXIOS_RESPONSE = () => {
	return [
		{
			codigoProposta: '085b9e10-85e8-4327-9027-0d2266fe386e',
			codigoOferta: '4e1052dd-dc3a-4e24-b823-401e81cb99da',
			dataHoraInclusao: '2024-05-28T12:34:19.465Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Concluída',
				},
			],
		},
		{
			codigoProposta: '1500ecd6-08ab-4656-a397-6a0cdf9d409a',
			codigoOferta: 'abc23b13-2f36-45a0-9923-a0bba29df1aa',
			dataHoraInclusao: '2024-05-22T12:47:03.199Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
		{
			codigoProposta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
			codigoOferta: '4e1052dd-dc3a-4e24-b823-401e81cb99da',
			dataHoraInclusao: '2024-05-28T12:34:19.465Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Pendente',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
		{
			codigoProposta: 'bb546902-b1b5-4b9b-ae25-de05cce485bb',
			codigoOferta: '522a94bb-1880-4dc2-b4f1-0fed0fd2d47b',
			dataHoraInclusao: '2024-06-05T12:44:41.492Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Pendente',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
		{
			codigoProposta: 'b7d6eb9c-e427-4c9a-a04a-83c3eb43abea',
			codigoOferta: '3ad2f3b9-7c49-4304-91fa-7019cb23d29d',
			dataHoraInclusao: '2024-05-29T16:40:22.503Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
		{
			codigoProposta: 'a740eff6-f1b4-4d6c-a05b-fcc83621a9a7',
			codigoOferta: '9c00a925-bb96-4a99-9c8f-37b8ceff68e5',
			dataHoraInclusao: '2024-05-23T18:43:53.363Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Pendente',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Em Processamento',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
	]
}

exports.VALID_FILTER_RESPONSE = () => {
	return [
		{
			codigoProposta: '1500ecd6-08ab-4656-a397-6a0cdf9d409a',
			codigoOferta: 'abc23b13-2f36-45a0-9923-a0bba29df1aa',
			dataHoraInclusao: '2024-05-22T12:47:03.199Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
		{
			codigoProposta: 'b7d6eb9c-e427-4c9a-a04a-83c3eb43abea',
			codigoOferta: '3ad2f3b9-7c49-4304-91fa-7019cb23d29d',
			dataHoraInclusao: '2024-05-29T16:40:22.503Z',
			situacao: 'Pendências',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Pendente',
				},
			],
		},
	]
}

exports.VALID_FACTORY_DATA_RETURN = () => {
	return [
		{
			codigoProposta: '1500ecd6-08ab-4656-a397-6a0cdf9d409a',
		},
		{
			codigoProposta: 'b7d6eb9c-e427-4c9a-a04a-83c3eb43abea',
		},
	]
}

exports.VALID_FACTORY_SAVE_RETURN = () => {
	return {
		scope: 'card-proposals',
		document: this.VALID_DOCUMENT(),
		data: JSON.stringify(this.VALID_FACTORY_DATA_RETURN()),
	}
}
