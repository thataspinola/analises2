const API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD_REQUEST = {
	numeroCotacao: '3000672475',
	orcamento: {
		codigo: '3',
	},
}

const API_PROPOSAL_TRANSMISSION_RESPONSE_BODY = {
	vistoriaPrevia: {
        mensagem:
            'Para a contratação do seu seguro é preciso efetuar a vistoria prévia digital. Baixe o APP da vistoria através do link',
        link: 'https://washmlpsocorro/vponline/',
    },
}

exports.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD = () => {
	return API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD_REQUEST
}

exports.POST_API_PROPOSAL_TRANSMISSION_SUCCESS_RETURN = () => {
	return {
		data: API_PROPOSAL_TRANSMISSION_RESPONSE_BODY,
		status: 200,
	}
}

exports.POST_API_PROPOSAL_TRANSMISSION_EMPTY_RESPONSE = () => {
	return {
		data: '',
		status: 200,
	}
}

exports.POST_API_PROPOSAL_TRANSMISSION_INPROCESS_RETURN = () => {
	return {
		status: 400,
		data: {
			code: 400,
			errors: [
				{
					errorMessage:
						'Proposta em Processo de Emissão, consulte o Protocolo mais tarde!',
				},
			],
		},
	}
}
