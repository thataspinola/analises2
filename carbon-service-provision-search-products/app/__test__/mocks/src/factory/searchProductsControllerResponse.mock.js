const ERROR_MESSAGE_CONTENT = 'Some error message'

const SUCCESS_BODY_CONTENT_VALUE = [
	{
		idParceiro: 110,
		produtos: [
			{
				idProduto: 2484,
				idProdutoParceiro: 142,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'LI001',
				nome: 'INSTALACAO DE LINHA BRANCA (FOGAO)',
				especialidade: '1361',
				problema: '488',
				origem: '9',
				assunto: 'P01',
				valorInicial: '299.0',
			},
			{
				idProduto: 2325,
				idProdutoParceiro: 462,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'ER006',
				nome: 'CONSERTO ELETRICO (CHUVEIRO ELETRICO)',
				especialidade: '437',
				problema: '540',
				origem: '9',
				assunto: 'VD2',
			},
			{
				idProduto: 2306,
				idProdutoParceiro: 467,
				idTipoServico: 28,
				idTipoCobranca: 7,
				sku: 'EC100',
				nome: 'CONSERTO ELETRICO SIMPLES',
				especialidade: '437',
				problema: '586',
				origem: '9',
				assunto: 'PP7',
				combos: [
					{
						id: 55,
						situacao: 'A',
						itens: [
							{
								descricao: 'CONSERTO ELETRICO (SENSOR DE PRESENCA)',
								idProduto: 2326,
							},
							{
								descricao: 'CONSERTO ELETRICO (DISJUNTOR)',
								idProduto: 2322,
							},
							{
								descricao: 'CONSERTO ELETRICO (INTERRUPTOR)',
								idProduto: 2321,
							},
							{
								descricao: 'CONSERTO ELETRICO (TORNEIRA ELETRICA)',
								idProduto: 2323,
							},
							{
								descricao: 'CONSERTO ELETRICO (CAMPAINHA)',
								idProduto: 2324,
							},
							{
								descricao: 'CONSERTO ELETRICO (SUBSTITUICAO DE TOMADA)',
								idProduto: 2320,
							},
						],
					},
				],
			},
			{
				idProduto: 2410,
				idProdutoParceiro: 506,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'HR015',
				nome: 'CONSERTO HIDRAULICO (VALVULA DE DESCARGA)',
				especialidade: '438',
				problema: '503',
				origem: '9',
				assunto: 'PPJ',
			},
			{
				idProduto: 2373,
				idProdutoParceiro: 512,
				idTipoServico: 28,
				idTipoCobranca: 7,
				sku: 'HC100',
				nome: 'CONSERTO HIDRAULICO SIMPLES',
				assunto: 'AS3',
				valorInicial: '180.0',
				combos: [
					{
						id: 53,
						situacao: 'A',
						itens: [
							{
								descricao:
									'FIXACAO DE BATEDOR OU PRENDEDOR EM PORTA DE MADEIRA',
								idProduto: 2344,
							},
							{
								descricao:
									'CONSERTO HIDRAULICO (SUBSTITUICAO DE TANQUE DE LAVAR ROUPA)',
								idProduto: 2408,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (REGISTRO)',
								idProduto: 2402,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (LAVATORIOS)',
								idProduto: 2414,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (DISPOSITIVOS DE JARDIM)',
								idProduto: 2409,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (TUBULACOES EM PVC OU CPVC)',
								idProduto: 2412,
							},
							{
								descricao:
									'CONSERTO HIDRAULICO (SUBSTITUICAO DE BOIA DE CAIXA D AGUA)',
								idProduto: 2405,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (COLAGEM DE CUBAS)',
								idProduto: 2400,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (SIFAO)',
								idProduto: 2404,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (TORNEIRA OU MISTURADOR)',
								idProduto: 2398,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (VASO SANITARIO OU BIDE)',
								idProduto: 2417,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (DUCHA HIGIENICA)',
								idProduto: 2406,
							},
							{
								descricao: 'CONSERTO HIDRAULICO (VALVULA - RALINHO)',
								idProduto: 2411,
							},
						],
					},
				],
			},
			{
				idProduto: 2474,
				idProdutoParceiro: 561,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'LD001',
				nome: 'DESENTUPIMENTO DE CALHA E CONDUTORES',
				especialidade: '1465',
				problema: '584',
				origem: '9',
				assunto: 'SOE',
			},
			{
				idProduto: 2303,
				idProdutoParceiro: 566,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'DI001',
				nome: 'DESENTUPIMENTO DE RALO',
				especialidade: '1541',
				problema: '1105',
				origem: '9',
				assunto: 'PPJ',
			},
			{
				idProduto: 2304,
				idProdutoParceiro: 567,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'DI002',
				nome: 'DESENTUPIMENTO DE PIA',
				especialidade: '1541',
				problema: '1104',
				origem: '9',
				assunto: 'X',
			},
			{
				idProduto: 2305,
				idProdutoParceiro: 568,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'DI003',
				nome: 'DESENTUPIMENTO DE VASO SANITARIO',
				especialidade: '1541',
				problema: '1106',
				origem: '9',
				assunto: 'RCS',
			},
			{
				idProduto: 2300,
				idProdutoParceiro: 569,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'DE001',
				nome: 'DESENTUPIMENTO DE TUBULACAO DE ESGOTO',
				especialidade: '1561',
				problema: '1107',
				origem: '9',
				assunto: 'PP7',
			},
			{
				idProduto: 2499,
				idProdutoParceiro: 581,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'LR003',
				nome: 'CONSERTO DE LINHA BRANCA (FORNO ELETRICO OU A GAS)',
				especialidade: '1341',
				problema: '886',
				origem: '9',
				assunto: 'RCS',
			},
			{
				idProduto: 2502,
				idProdutoParceiro: 582,
				idTipoServico: 28,
				idTipoCobranca: 6,
				sku: 'LR006',
				nome: 'CONSERTO DE LINHA BRANCA (GELADEIRA OU REFRIGERADOR)',
				especialidade: '1383',
				problema: '483',
				origem: '9',
				assunto: 'RCS',
			},
			{
				idProduto: 2506,
				idProdutoParceiro: 583,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'LR011',
				nome: 'CONSERTO DE LINHA BRANCA (SECADORA DE ROUPA ELETRICA OU A GAS)',
				especialidade: '1421',
				problema: '485',
				origem: '9',
				assunto: 'PJA',
			},
			{
				idProduto: 2501,
				idProdutoParceiro: 584,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'LR005',
				nome: 'CONSERTO DE LINHA BRANCA (FREEZER OU CONGELADOR)',
				especialidade: '1381',
				problema: '496',
				origem: '9',
				assunto: 'RCS',
			},
			{
				idProduto: 3238,
				idProdutoParceiro: 2490,
				idTipoServico: 28,
				idTipoCobranca: 1,
				sku: 'PR004',
				nome: '[CAMPANHA] HIGIENIZACAO DE AR CONDICIONADO + LIMPEZA DE LAVA E SECA',
				especialidade: '2581',
				problema: '2485',
				origem: '9',
				assunto: 'P01',
			},
		],
	},
]

exports.DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.ERROR_MESSAGE = () => {
	return ERROR_MESSAGE_CONTENT
}

const ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	message: ERROR_MESSAGE_CONTENT,
}

exports.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'Requisição inválida',
		},
	}
}

const BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	message: ERROR_MESSAGE_CONTENT,
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.SUCCESS_BODY_CONTENT = () => {
	return SUCCESS_BODY_CONTENT_VALUE
}

exports.SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: [],
	}
}
