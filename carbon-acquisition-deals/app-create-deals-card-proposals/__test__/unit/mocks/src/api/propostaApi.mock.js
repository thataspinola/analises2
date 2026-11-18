exports.VALID_DOCUMENT = () => {
	return '00000017400'
}

exports.VALID_SENSEDIA_TOKEN_HUB_CLOUD = () => {
	return 'sensedia-token-hub-cloud'
}

exports.URL_PATH_PROPOSTA = () => {
	return 'https://portoapicloud-hml.portoseguro.com.br/portobank/pis-workflow/proposta/v1/proposta'
}

exports.RESPONSE_EMPTY_API = () => {
	return null
}

exports.SUCCESS_RETURN_BODY_VALUE = () => {
	return [
		{
			codigoProposta: '085b9e10-85e8-4327-9027-0d2266fe386e',
			codigoOferta: '4e1052dd-dc3a-4e24-b823-401e81cb99da',
			dataHoraInclusao: '2024-05-28T12:34:19.465Z',
			situacao: 'Aprovada',
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
