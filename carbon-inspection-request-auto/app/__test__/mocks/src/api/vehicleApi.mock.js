const CONTROLLER_INSPECTION_MOCKS = require('../controller/inspectionController.mock')

const VEHICLE_SEARCH_ENDPOINT_SUCCESS_RESPONSE_DATA = [
	{
		descricao:
			'FIAT MOBI LIKE 1.0 8V FLEX - 5PORTAS - GASOLINA/ALCOOL - MANUAL - MODELO 2017',
		codigoVersao: 4047,
		anoModelo: 2017,
		anoFabricacao: 2016,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 1185,
			nomeModelo: 'MOBI',
			marca: {
				codigo: 4,
				descricao: 'FIAT',
			},
		},
		chassi: '9BD341A5XHY452911',
	},
]

exports.AXIOS_GET_API_VEHICLE_SEARCH_SUCCESS_RESPONSE = () => {
	return {
		status: 201,
		data: VEHICLE_SEARCH_ENDPOINT_SUCCESS_RESPONSE_DATA,
	}
}

exports.AXIOS_GET_API_VEHICLE_SEARCH_EMPTY_RESPONSE = () => {
	return {
		status: 201,
		data: undefined,
	}
}

exports.API_VEHICLE_SEARCH_VALID_INPUT = () => {
	return CONTROLLER_INSPECTION_MOCKS.CONTROLLER_VALID_INPUT().integrationData
		.orcamento.itens[0].veiculo.placa
}

exports.GET_API_VEHICLE_SEARCH_SUCCESS_RESPONSE = () => {
	return VEHICLE_SEARCH_ENDPOINT_SUCCESS_RESPONSE_DATA[0]
}
