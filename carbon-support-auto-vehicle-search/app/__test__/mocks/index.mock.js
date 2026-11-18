exports.VALID_INPUT_DATA = {
	queryStringParameters: {
		plate: 'FYP0099',
		description: 'LOGAN',
		yearModel: 2016,
	},
}

const VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE = [
	{
		descricao:
			'BMW X6 M COMPETIT.4.4 32V BI-TB AUT COMPETITION - 5 PORTAS - GASOLINA - AUTOMATICO',
		codigoVersao: 15624,
		anoModelo: 2023,
		anoFabricacao: 2023,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 167,
			marca: {
				codigo: 64,
				descricao: 'BMW'
			},
			nomeModelo: 'X6',
		},
		chassi: 'WBSCY0102P9R37418',
		premium: true,
		versao:
			'M COMPETIT.4.4 32V BI-TB AUT COMPETITION'
	},
]

const VEHICLE_DATA_FACTORY_PER_PLATE_WITH_MOTO_RESPONSE = [
	{
		descricao:
			'HONDA MOTO CG 125 FAN ES - 0PORTAS - GASOLINA - MANUAL',
		codigoVersao: 15178,
		anoModelo: 2014,
		anoFabricacao: 2013,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 811,
			marca: {
				codigo: 11,
				descricao: 'HONDA',
			},
			nomeModelo: 'MOTO CG 125',
		},
		tipoVeiculo: 'moto',
		chassi: '9C2JC4120ER012157',
		premium: false,
		versao: 'FAN ES'
	},
]

const VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE = [
	{
		descricao:
			'RENAULT NOVO LOGAN AUTHENTIQUE 1.0 16V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL',
		codigoVersao: 4139,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		versao: 'AUTHENTIQUE 1.0 16V FLEX'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN AUTHENTIQUE PLUS 1.0 16V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL',
		codigoVersao: 3588,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'AUTHENTIQUE PLUS 1.0 16V FLEX'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN DYNAMIQUE 1.6 8V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL',
		codigoVersao: 2714,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'DYNAMIQUE 1.6 8V FLEX'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN DYNAMIQUE EASY-R 1.6 8V AUT. - 4PORTAS - GASOLINA/ALCOOL - AUTOMÁTICO',
		codigoVersao: 3138,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'DYNAMIQUE EASY-R 1.6 8V AUT.'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN EXPRESSION 1.0 16V HI-POWER - 4PORTAS - GASOLINA/ALCOOL - MANUAL',
		codigoVersao: 2715,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'EXPRESSION 1.0 16V HI-POWER'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN EXPRESSION 1.6 8V HI-POWER - 4PORTAS - GASOLINA/ALCOOL - MANUAL',
		codigoVersao: 2716,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'EXPRESSION 1.6 8V HI-POWER'
	},
	{
		descricao:
			'RENAULT NOVO LOGAN EXPRESSION EASY-R 1.6 8V AUT. - 4PORTAS - GASOLINA/ALCOOL - AUTOMÁTICO',
		codigoVersao: 3137,
		anoModelo: 2016,
		anoFabricacao: undefined,
		flagZeroKm: 'N',
		modelo: {
			codigoModelo: 895,
			nomeModelo: 'NOVO LOGAN',
			marca: {
				codigo: 75,
				descricao: 'RENAULT'
			},
		},
		premium: false,
		tipoVeiculo: undefined,
		versao:	'EXPRESSION EASY-R 1.6 8V AUT.'
	},
]

exports.DESCRIPTION_SUCCESS =
	'BMW X6 M COMPETIT.4.4 32V BI-TB AUT COMPETITION - 5 PORTAS - GASOLINA - AUTOMATICO - MODELO 2023'

exports.CONTROLLER_SUCCESS_RESPONSE_PER_PLATE = [
	...VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE,
]

exports.CONTROLLER_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL = [
	...VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE,
]

exports.VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE = {
	page: 1,
	perPage: 1,
	totalElements: 1,
	totalPages: 1,
	valoresMercado: [
		{
			anoFabricacao: 2023,
			anoModelo: 2023,
			anoReferencia: 2023,
			codigoVersao: 15624,
			codigoVersaoLegado: 8961,
			flagZeroKm: 'N',
			mesReferencia: 8,
			valorMercado: 10513970,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 22,
					descricao: 'PICKUPS_PESADAS_PESSOAS',
				},
				chassi: 'WBSCY0102P9R37418',
				flagVeiculoBlindado: 'N',
				flagVeiculoPCD: 'N',
				modelo: {
					codigoModelo: 167,
					marca: {
						codigo: 64,
						descricao: 'BMW'
					},
					nomeModelo: 'X6',
				},
				nomeVersao:
					'BMW X6 M COMPETIT.4.4 32V BI-TB AUT COMPETITION - 5 PORTAS - GASOLINA - AUTOMATICO - CAT.23 - COD.15624',
				quantidadeCilindrada: 4400,
				tabelaReferencia: [
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 9285,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 612132,
						digitoVeiculoTabela: 9,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 612131,
						digitoVeiculoTabela: 7,
					},
				],
				tipoCambio: {
					codigo: 2,
				},
				tipoCombustivel: {
					codigo: 2,
				},
			},
		},
	],
}

exports.VEHICLE_API_SUCCESS_RESPONSE_PER_DESCRIPTION_AND_YEAR_MODEL = {
	page: 1,
	perPage: 7,
	totalPages: 1,
	totalElements: 7,
	valoresMercado: [
		{
			codigoVersao: 4139,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 36668.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN AUTHENTIQUE 1.0 16V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL - CAT.10 - COD.4139\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1000,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 1,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002441,
						digitoVeiculoTabela: 6,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25135,
						digitoVeiculoTabela: 6,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002427,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002442,
						digitoVeiculoTabela: 8,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002428,
						digitoVeiculoTabela: 3,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 4765,
		},
		{
			codigoVersao: 3588,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 38414.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN AUTHENTIQUE PLUS 1.0 16V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL - CAT.10 - COD.3588\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1000,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 1,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002458,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25226,
						digitoVeiculoTabela: 3,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 4087,
		},
		{
			codigoVersao: 2714,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 38685.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN DYNAMIQUE 1.6 8V FLEX - 4PORTAS - GASOLINA/ALCOOL - MANUAL - CAT.10 - COD.2714\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1600,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 1,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002440,
						digitoVeiculoTabela: 4,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25208,
						digitoVeiculoTabela: 5,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002437,
						digitoVeiculoTabela: 4,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002445,
						digitoVeiculoTabela: 3,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002438,
						digitoVeiculoTabela: 6,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002439,
						digitoVeiculoTabela: 8,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 3007,
		},
		{
			codigoVersao: 3138,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 38719.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN DYNAMIQUE EASY-R 1.6 8V AUT. - 4PORTAS - GASOLINA/ALCOOL - AUTOMÁTICO - CAT.10 - COD.3138\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1600,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 2,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002446,
						digitoVeiculoTabela: 5,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002448,
						digitoVeiculoTabela: 9,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002449,
						digitoVeiculoTabela: 0,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002447,
						digitoVeiculoTabela: 7,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25218,
						digitoVeiculoTabela: 2,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002450,
						digitoVeiculoTabela: 7,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 3529,
		},
		{
			codigoVersao: 2715,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 36821.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN EXPRESSION 1.0 16V HI-POWER - 4PORTAS - GASOLINA/ALCOOL - MANUAL - CAT.10 - COD.2715\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1000,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 1,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002429,
						digitoVeiculoTabela: 5,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002443,
						digitoVeiculoTabela: 0,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002461,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002432,
						digitoVeiculoTabela: 5,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25136,
						digitoVeiculoTabela: 4,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002430,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002431,
						digitoVeiculoTabela: 3,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 3008,
		},
		{
			codigoVersao: 2716,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 39203.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN EXPRESSION 1.6 8V HI-POWER - 4PORTAS - GASOLINA/ALCOOL - MANUAL - CAT.10 - COD.2716\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1600,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 1,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002436,
						digitoVeiculoTabela: 2,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002435,
						digitoVeiculoTabela: 0,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002434,
						digitoVeiculoTabela: 9,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002433,
						digitoVeiculoTabela: 7,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002462,
						digitoVeiculoTabela: 3,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25139,
						digitoVeiculoTabela: 9,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002444,
						digitoVeiculoTabela: 1,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002464,
						digitoVeiculoTabela: 7,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002465,
						digitoVeiculoTabela: 9,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 3009,
		},
		{
			codigoVersao: 3137,
			anoModelo: 2016,
			flagZeroKm: 'N',
			valorMercado: 36711.0,
			mesReferencia: 9,
			anoReferencia: 2023,
			versaoVeiculo: {
				categoriaTarifariaOriginal: {
					codigo: 23,
					descricao: 'PICKUPS_PESADAS_PESSOAS_IMPORTADAS',
				},
				nomeVersao:
					'\tRENAULT NOVO LOGAN EXPRESSION EASY-R 1.6 8V AUT. - 4PORTAS - GASOLINA/ALCOOL - AUTOMÁTICO - CAT.10 - COD.3137\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 1600,
				tipoCombustivel: {
					codigo: 8,
				},
				tipoCambio: {
					codigo: 2,
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002452,
						digitoVeiculoTabela: 0,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002454,
						digitoVeiculoTabela: 4,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002466,
						digitoVeiculoTabela: 0,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002453,
						digitoVeiculoTabela: 2,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002467,
						digitoVeiculoTabela: 2,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002451,
						digitoVeiculoTabela: 9,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002455,
						digitoVeiculoTabela: 6,
					},
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 25217,
						digitoVeiculoTabela: 4,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 4002463,
						digitoVeiculoTabela: 5,
					},
				],
				modelo: {
					codigoModelo: 895,
					nomeModelo: 'NOVO LOGAN',
					marca: {
						codigo: 75,
						descricao: 'RENAULT'
					},
				},
			},
			codigoVersaoLegado: 3528,
		},
	],
}

exports.VEHICLE_API_ERROR_400_RESPONSE = {
	code: 0,
	errors: [
		{
			errorMessage: 'string',
			field: 'string',
			index: 0,
			obj: 'string',
			objectName: 'string',
		},
	],
	message: 'string',
	objectName: 'string',
}

exports.VEHICLE_API_ERROR_500_RESPONSE = {
	code: 0,
	errors: [
		{
			errorMessage: 'string',
			field: 'string',
			index: 0,
			obj: 'string',
			objectName: 'string',
		},
	],
	message: 'string',
	objectName: 'string',
}

exports.VEHICLE_API_SUCCESS_RESPONSE_PER_PLATE_WITH_MOTO = {
	page: 1,
	perPage: 1,
	totalPages: 1,
	totalElements: 1,
	valoresMercado: [
		{
			codigoVersao: 15178,
			anoModelo: 2014,
			anoFabricacao: 2013,
			flagZeroKm: 'N',
			valorMercado: 8254.0,
			mesReferencia: 5,
			anoReferencia: 2024,
			versaoVeiculo: {
				nomeVersao:
					'HONDA MOTO CG 125 FAN ES - 0PORTAS - GASOLINA - MANUAL - CAT.30 - COD.15178\t',
				flagVeiculoPCD: 'N',
				flagVeiculoBlindado: 'N',
				quantidadeCilindrada: 125,
				tipoCombustivel: {
					codigo: 2,
					descricao: 'GASOLINA',
				},
				tipoCambio: {
					codigo: 1,
					descricao: 'MANUAL',
				},
				tabelaReferencia: [
					{
						codigoTipoTabela: 2,
						codigoVeiculoTabela: 811091,
						digitoVeiculoTabela: 3,
					},
					{
						codigoTipoTabela: 3,
						codigoVeiculoTabela: 1901610,
						digitoVeiculoTabela: 4,
					},
				],
				chassi: '9C2JC4120ER012157',
				modelo: {
					codigoModelo: 811,
					nomeModelo: 'MOTO CG 125',
					marca: {
						codigo: 11,
						descricao: 'HONDA',
					},
				},
				categoriaTarifariaOriginal: {
					codigo: 30,
					descricao: 'BICICLETAS_MOTONETAS_COM_SEM_REBOQUE',
				},
			},
			codigoVersaoLegado: 99814,
		},
	],
}

exports.VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE =
	VEHICLE_DATA_FACTORY_PER_PLATE_RESPONSE

exports.VEHICLE_DATA_FACTORY_PER_PLATE_WITH_MOTO_RESPONSE =
	VEHICLE_DATA_FACTORY_PER_PLATE_WITH_MOTO_RESPONSE

exports.VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE =
	VEHICLE_DATA_FACTORY_PER_DESCRIPTION_AND_YEAR_MODEL_RESPONSE
