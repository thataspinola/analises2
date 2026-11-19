exports.CONTEXT = () => {
	return {}
}

exports.LAMBDA_TOKEN_HANDLER_RESPONSE = () => {
	return {
		SENSEDIA_CADASTRO: 'token',
	}
}

exports.API_VIDAON_INCOME_BRACKET_VALID_RETURN = () => {
	return [
		{
			codigo: '39000',
			descricao: 'Acima de R$ 30.000,00',
		},
		{
			codigo: '2500',
			descricao: 'Até R$ 2.500,00',
		},
		{
			codigo: '16000',
			descricao: 'R$ 12.000,01 a R$ 16.000,00',
		},
		{
			codigo: '20000',
			descricao: 'R$ 16.000,01 a R$ 20.000,00',
		},
		{
			codigo: '30000',
			descricao: 'R$ 20.000,01 a R$ 30.000,00',
		},
		{
			codigo: '4000',
			descricao: 'R$ 2.500,01 a R$ 4.000,00',
		},
		{
			codigo: '8000',
			descricao: 'R$ 4.000,01 a R$ 8.000,00',
		},
		{
			codigo: '12000',
			descricao: 'R$ 8.000,01 a R$ 12.000,00',
		},
	]
}

exports.HANDLER_VALID_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(
			JSON.stringify([
				{
					codigo: '39000',
					descricao: 'Acima de R$ 30.000,00',
				},
				{
					codigo: '2500',
					descricao: 'Até R$ 2.500,00',
				},
				{
					codigo: '16000',
					descricao: 'R$ 12.000,01 a R$ 16.000,00',
				},
				{
					codigo: '20000',
					descricao: 'R$ 16.000,01 a R$ 20.000,00',
				},
				{
					codigo: '30000',
					descricao: 'R$ 20.000,01 a R$ 30.000,00',
				},
				{
					codigo: '4000',
					descricao: 'R$ 2.500,01 a R$ 4.000,00',
				},
				{
					codigo: '8000',
					descricao: 'R$ 4.000,01 a R$ 8.000,00',
				},
				{
					codigo: '12000',
					descricao: 'R$ 8.000,01 a R$ 12.000,00',
				},
			])
		),
	}
}

exports.CONTROLLER_FAIXA_RENDA_VALID_RESPONSE = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify([
			{
				codigo: '39000',
				descricao: 'Acima de R$ 30.000,00',
			},
			{
				codigo: '2500',
				descricao: 'Até R$ 2.500,00',
			},
			{
				codigo: '16000',
				descricao: 'R$ 12.000,01 a R$ 16.000,00',
			},
			{
				codigo: '20000',
				descricao: 'R$ 16.000,01 a R$ 20.000,00',
			},
			{
				codigo: '30000',
				descricao: 'R$ 20.000,01 a R$ 30.000,00',
			},
			{
				codigo: '4000',
				descricao: 'R$ 2.500,01 a R$ 4.000,00',
			},
			{
				codigo: '8000',
				descricao: 'R$ 4.000,01 a R$ 8.000,00',
			},
			{
				codigo: '12000',
				descricao: 'R$ 8.000,01 a R$ 12.000,00',
			},
		]),
	}
}

exports.CONTROLLER_FAIXA_RENDA_ERROR_DEFAULT = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: 'Fake error',
	}
}
