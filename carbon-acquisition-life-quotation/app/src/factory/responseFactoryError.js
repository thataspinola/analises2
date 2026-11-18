exports.invalidRequest = () => ({
	statusCode: 400,
	body: {
		status: 'error',
		custom: false,
		message: 'Invalid request body',
	},
})

exports.systemUnavailable = (errorCode) => {
	const response = {
		statusCode: 500,
		body: {
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, nosso sistema está indisponível no momento',
				subtitle:
					'Estamos trabalhando para que volte a funcionar o quanto antes.',
				description: 'Por favor, tente de novo mais tarde.',
			}
		}
	}

	return response
}

exports.UnableCompleteQuotation = (errorCode) => {
	const response = {
		statusCode: 500,
		body: {
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, não foi possível concluir seu orçamento',
				subtitle:
					'Nosso sistema está indisponível no momento. Estamos trabalhando para que volte a funcionar o quanto antes.',
				description: 'Por favor, tente de novo mais tarde.',
			}
		}
	}

	return response
}

exports.insuranceBroker = (errorCode) => {
	const response = {
		statusCode: 500,
		body: {
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Um corretor entrará em contato para continuar sua cotação',
				subtitle:
					'A partir dos dados informados identificamos a necessidade do acompanhamento de um corretor para finalizar a cotação do seu seguro.',
				description: 'Agora, é com a gente. Aguarde nosso contato :)',
			}
		}
	}

	return response
}

exports.invalidDiscountCoupon = (errorCode) => {
	const response = {
		statusCode: 500,
		body: {
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, o cupom de desconto não está funcionando',
				subtitle: 'Você pode excluir o cupom ou tentar novamente mais tarde.',
				description: null,
			}
		}
	}

	return response
}

exports.UnknownError = (errorCode) => {
	const response = {
		statusCode: 500,
		body: {
			codigo_erro: errorCode,
			custom: false,
		}
	}

	return response
}

exports.error = (message) => {
	const response = {
		statusCode: 500,
		body: {
			status: 'error',
			custom: false,
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}
