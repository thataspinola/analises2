exports.CONTROLLER_PROFESSION_WITH_FILTER_VALID_RESPONSE = () => {
	return {
		statusCode: 200,
		body: [
			{
				codigo: '5151-05',
				descricao: 'Agente de saúde',
			},
		],
	}
}

exports.CONTROLLER_PROFESSION_VALID_RESPONSE = () => {
	return {
		statusCode: 200,
		body: [
			{
				codigo: '01',
				descricao: 'Profissional de saúde nas forças armadas',
			},
			{
				codigo: '3222-30',
				descricao: 'Auxiliar ou técnico nos serviços de saúde',
			},
			{
				codigo: '5152-15',
				descricao: 'Auxiliar de laboratório da saúde',
			},
			{
				codigo: '5151-05',
				descricao: 'Agente de saúde',
			},
		],
	}
}

exports.VALID_API_RESPONSE = () => {
	return [
		{
			codigo: '01',
			descricao: 'Profissional de saúde nas forças armadas',
		},
		{
			codigo: '3222-30',
			descricao: 'Auxiliar ou técnico nos serviços de saúde',
		},
		{
			codigo: '5152-15',
			descricao: 'Auxiliar de laboratório da saúde',
		},
		{
			codigo: '5151-05',
			descricao: 'Agente de saúde',
		},
	]
}

exports.HANDLER_VALID_RESPONSE = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify([
			{
				codigo: '01',
				descricao: 'Profissional de saúde nas forças armadas',
			},
			{
				codigo: '3222-30',
				descricao: 'Auxiliar ou técnico nos serviços de saúde',
			},
			{
				codigo: '5152-15',
				descricao: 'Auxiliar de laboratório da saúde',
			},
			{
				codigo: '5151-05',
				descricao: 'Agente de saúde',
			},
		]),
	}
}

exports.HANDLER_RESPONSE_ERROR_500 = () => {
	return {
		body: JSON.stringify({ status: 'error', message: 'error get professions' }),
		headers: {},
		isBase64Encoded: false,
		statusCode: 500,
	}
}

exports.HANDLER_RESPONSE_ERROR_400 = () => {
	return {
		body: JSON.stringify({ status: 'error', message: 'Unknown Server Error' }),
		headers: {},
		isBase64Encoded: false,
		statusCode: 400,
	}
}

exports.PRODUCT_PROFESSION_RESPONSE = () => {
	return {
		status: 200,
		data: [
			{
				codigo: '01',
				descricao: 'Profissional de saúde nas forças armadas',
			},
			{
				codigo: '3222-30',
				descricao: 'Auxiliar ou técnico nos serviços de saúde',
			},
			{
				codigo: '5152-15',
				descricao: 'Auxiliar de laboratório da saúde',
			},
			{
				codigo: '5151-05',
				descricao: 'Agente de saúde',
			},
		],
	}
}

exports.PRODUCT_PROFESSION_EMPTY_RESPONSE = () => {
	return []
}

exports.CONTROLLER_ERROR_RESPONSE = () => {
	return {
		body: {
			description: 'Error to get professions data, please try again',
			status: 'error',
		},
		statusCode: 500,
	}
}
