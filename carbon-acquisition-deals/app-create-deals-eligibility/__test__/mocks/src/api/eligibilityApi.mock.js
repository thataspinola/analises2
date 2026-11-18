exports.VALID_RESPONSE_API = () => {
	return {
		codigoOferta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '05636844964',
		situacao: 'Incluída',
		dataHoraInclusao: '2023-11-17T13:16:37.713Z',
		dataHoraValidadeOferta: '2023-11-17T14:16:31.973Z',
		elegibilidade: {
			codigoElegibilidade: '2be8c653-6e6f-42e7-98a4-b7bb44728b6e',
			produtos: [
				{
					codigoProduto: 1,
					nomeProduto: 'Cartao',
					propensao: 0,
					valor: null,
					valorDesconto: 0,
				},
				{
					codigoProduto: 8,
					nomeProduto: 'Tag ConnectCar',
					propensao: 0,
					valor: null,
					valorDesconto: 0,
				},
			],
		},
		valorTransacao: 0,
	}
}

exports.VALID_RESPONSE_SUCCESS = () => {
	return {
		codigoOferta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '05636844964',
		situacao: 'Incluída',
		dataHoraInclusao: '2023-11-17T13:16:37.713Z',
		dataHoraValidadeOferta: '2023-11-17T14:16:31.973Z',
		elegibilidade: {
			codigoElegibilidade: '2be8c653-6e6f-42e7-98a4-b7bb44728b6e',
			produtos: [
				{
					codigoProduto: 1,
					nomeProduto: 'Cartao',
					propensao: 0,
					valor: null,
					valorDesconto: 0,
				},
				{
					codigoProduto: 8,
					nomeProduto: 'Tag ConnectCar',
					propensao: 0,
					valor: null,
					valorDesconto: 0,
				},
			],
		},
		valorTransacao: 0,
	}
}

exports.VALID_PAYLOAD = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '05636844964',
		codigoCampanha: '4',
	}
}

exports.SENSIDIA_TOKEN = () => {
	return '123456'
}
