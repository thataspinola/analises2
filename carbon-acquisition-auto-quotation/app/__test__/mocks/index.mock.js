const CONSTANT = require('../../src/property')

const VALID_INPUT_DATA = 
	{ 
		body: JSON.stringify({
			scope: 'auto',
			auto: {
				portoSalesCommission: '10.0',
				azulSalesCommission: '10.0',
				person: {
					client: {
						cpf: '33994753813',
						name: 'Maria Santos',
						cellPhone: '11222225555',
						email: 'jose.frederico@portoseguro.com.br',
					},
				},
				address: {
					zipCode: '13013161',
					street: 'Avenida Andrade Neves',
					number: '1000',
					complement: '',
					neighborhood: 'Centro',
					city: 'Campinas',
					state: 'SP',
				},
				origin: 35,
				reference: 'hub',
				susepCode: 'CM208J',
				vdoCode: 'timestamp',
				pmcInfo: 'string - pmc_observacoes',
				idGoogle: '1529945973.1680023402',
				utmSource: 'google',
				utmMedium: 'cpl',
				utmContent: 'vs_bike_seguro-bike_hq',
				marketingOptInFlag: true,
				partnerCode: CONSTANT.PARTNER_CODE,
				conductors: {
					person: [
						{
							cpf: '33994753813',
						},
					],
				},
				zipCodeOvernightStay: '13046460',
				bonusPolicy: {
					congenere: 1,
					bonus: {
						value: 5,
						origin: 1,
					},
				},
				productDetails: {
					vehicleModel: 'NOVO LOGAN',
					yearModel: 2016,
					yearManufacture: 2016,
					brandNewCar: 'Não',
					vehicleCode: 895,
					plate: 'FYP0099',
					chassis: '93Y4SRD04GJ505830',
				},
				sessionId:
					'69056f4cd208aaa854568639d2823726405e6ebf55931492dc3ce3aaa678f539',
				ipAddress: '10.95.174.37',
				userAgent: 'Porto Seguro/1.52.0 (iPhone11)',
				idLead: 'fb4c687-a120-4f92-a138-7bbd43fa3ede',
				shoppingToken: 'ID_DO_CARRINHO',
				customerToken: '',
				typeUse: 1
			},
			pescod: '82786660'
		})
	}

exports.VALID_INPUT_DATA = VALID_INPUT_DATA

exports.VALID_INPUT_DATA_PARSED = JSON.parse(VALID_INPUT_DATA.body)

const VEHICLE_API_SUCCESS_RESPONSE = {
	numeroCotacao: 3000616647,
	statusCotacao: [
		{
			codigo: 2,
			descricao: 'Escolhemos as melhores ofertas para você !',
		},
	],
	dataCriacao: '2023-10-31T13:51:52.000Z',
	dataValidade: '2023-11-20T13:51:54.717Z',
	orcamentos: [
		{
			codigo: 3,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 971,
			valorPremioFinalCartao: 922.45,
			item: {
				coberturas: [
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 712.56,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.97,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 7.0,
					},
				],
				assistencias: [
					{
						codigo: 55,
						descricao: 'Assistência - 1000 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 11,
					descricao:
						'De acordo com os dados informados até o momento, não há necessidade de agendamento de vistoria prévia. A validação completa da obrigatoriedade de VP será realizada após a transmissão da proposta.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 4,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3270.05,
			valorPremioFinalCartao: 3106.52,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2286.3,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 5,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3903.66,
			valorPremioFinalCartao: 3708.45,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2876.36,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 5.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 1,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Porto Seguro',
			},
			valorPremioFinal: 4666.77,
			valorPremioFinalCartao: 4433.41,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3060.03,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
					{
						codigo: 12,
						descricao: '76 - Vidros, retrovisores, lanternas e faróis',
						valorImportanciaSegurada: 10000.0,
						valorPremio: 513.93,
						franquias: [
							{
								codigo: 24,
								descricao: 'Faróis Convencionais',
								valorFranquia: 354.0,
							},
							{
								codigo: 27,
								descricao: 'Lanternas Convencionais',
								valorFranquia: 199.0,
							},
							{
								codigo: 28,
								descricao: 'Lanternas de LED',
								valorFranquia: 566.0,
							},
							{
								codigo: 22,
								descricao: 'Vidros Para-Brisa, Teto Solar ou Panorâmico',
								valorFranquia: 322.0,
							},
							{
								codigo: 30,
								descricao: 'Retrovisores ',
								valorFranquia: 270.0,
							},
							{
								codigo: 29,
								descricao: 'Vidros Laterais ',
								valorFranquia: 98.0,
							},
							{
								codigo: 23,
								descricao: 'Vidros Traseiros',
								valorFranquia: 312.0,
							},
							{
								codigo: 26,
								descricao: 'Faróis de Xenon',
								valorFranquia: 1504.0,
							},
							{
								codigo: 25,
								descricao: 'Faróis de LED',
								valorFranquia: 1222.0,
							},
						],
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 159,
						descricao: 'Desconto Cliente Auto',
						percentual: 10.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 3.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 8,
						nomeSegmento: 'Tradicional',
						codigoMarca: 1001,
					},
				},
			},
			tipoOferta: {
				codigo: 1,
				descricao: 'Oferta Recomendada Porto Seguro',
			},
		},
		{
			codigo: 2,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 3,
				descricao: 'Itaú Seguro Auto',
			},
			valorPremioFinal: 4957.84,
			valorPremioFinalCartao: 4709.93,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3845.03,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 193,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 50,
						nomeSegmento: 'Itaú Seguro Auto',
						codigoMarca: 1003,
					},
				},
			},
		},
	],
	parcelamento: [
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 2,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '369.45',
					descricao: 'R$ 369,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4433.41',
					descricao: 'R$ 4.433,41 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '388.90',
					descricao: 'R$ 388,90 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '466.68',
					descricao: 'R$ 466,68 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '392.49',
					descricao: 'R$ 392,49 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4709.93',
					descricao: 'R$ 4.709,93 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '413.15',
					descricao: 'R$ 413,15 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '495.78',
					descricao: 'R$ 495,78 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '76.87',
					descricao: 'R$ 76,87 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '922.45',
					descricao: 'R$ 922,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 12,
					valor: '80.92',
					descricao: 'R$ 80,92 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '97.10',
					descricao: 'R$ 97,10 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '258.88',
					descricao: 'R$ 258,88 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3106.52',
					descricao: 'R$ 3.106,52 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '272.50',
					descricao: 'R$ 272,50 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '327.01',
					descricao: 'R$ 327,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '309.04',
					descricao: 'R$ 309,04 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3708.45',
					descricao: 'R$ 3.708,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '325.31',
					descricao: 'R$ 325,31 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '390.37',
					descricao: 'R$ 390,37 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
	],
}

exports.VEHICLE_API_SUCCESS_RESPONSE_WITH_UNPERMITTED = {
	numeroCotacao: 3000616647,
	statusCotacao: [
		{
			codigo: 2,
			descricao: 'Escolhemos as melhores ofertas para você !',
		},
	],
	dataCriacao: '2023-10-31T13:51:52.000Z',
	dataValidade: '2023-11-20T13:51:54.717Z',
	orcamentos: [
		{
			codigo: 3,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 971,
			valorPremioFinalCartao: 922.45,
			item: {
				coberturas: [
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 712.56,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.97,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 7.0,
					},
				],
				assistencias: [
					{
						codigo: 55,
						descricao: 'Assistência - 1000 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 11,
					descricao:
						'De acordo com os dados informados até o momento, não há necessidade de agendamento de vistoria prévia. A validação completa da obrigatoriedade de VP será realizada após a transmissão da proposta.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 4,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3270.05,
			valorPremioFinalCartao: 3106.52,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2286.3,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 5,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3903.66,
			valorPremioFinalCartao: 3708.45,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2876.36,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 5.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 1,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Porto Seguro',
			},
			valorPremioFinal: 4666.77,
			valorPremioFinalCartao: 4433.41,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3060.03,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
					{
						codigo: 12,
						descricao: '76 - Vidros, retrovisores, lanternas e faróis',
						valorImportanciaSegurada: 10000.0,
						valorPremio: 513.93,
						franquias: [
							{
								codigo: 24,
								descricao: 'Faróis Convencionais',
								valorFranquia: 354.0,
							},
							{
								codigo: 27,
								descricao: 'Lanternas Convencionais',
								valorFranquia: 199.0,
							},
							{
								codigo: 28,
								descricao: 'Lanternas de LED',
								valorFranquia: 566.0,
							},
							{
								codigo: 22,
								descricao: 'Vidros Para-Brisa, Teto Solar ou Panorâmico',
								valorFranquia: 322.0,
							},
							{
								codigo: 30,
								descricao: 'Retrovisores ',
								valorFranquia: 270.0,
							},
							{
								codigo: 29,
								descricao: 'Vidros Laterais ',
								valorFranquia: 98.0,
							},
							{
								codigo: 23,
								descricao: 'Vidros Traseiros',
								valorFranquia: 312.0,
							},
							{
								codigo: 26,
								descricao: 'Faróis de Xenon',
								valorFranquia: 1504.0,
							},
							{
								codigo: 25,
								descricao: 'Faróis de LED',
								valorFranquia: 1222.0,
							},
						],
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 159,
						descricao: 'Desconto Cliente Auto',
						percentual: 10.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 3.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 8,
						nomeSegmento: 'Tradicional',
						codigoMarca: 1001,
					},
				},
			},
			tipoOferta: {
				codigo: 1,
				descricao: 'Oferta Recomendada Porto Seguro',
			},
		},
		{
			codigo: 2,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Itaú Seguro Auto',
			},
			valorPremioFinal: 4957.84,
			valorPremioFinalCartao: 4709.93,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3845.03,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 193,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 50,
						nomeSegmento: 'Itaú Seguro Auto',
						codigoMarca: 1003,
					},
				},
			},
		},
		{
			codigo: 2,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Outro Seguro',
			},
			valorPremioFinal: 4957.84,
			valorPremioFinalCartao: 4709.93,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3845.03,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 193,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 77,
						nomeSegmento: 'Outro Seguro',
						codigoMarca: 1005,
					},
				},
			},
		},
	],
	parcelamento: [
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 2,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '369.45',
					descricao: 'R$ 369,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4433.41',
					descricao: 'R$ 4.433,41 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '388.90',
					descricao: 'R$ 388,90 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '466.68',
					descricao: 'R$ 466,68 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '392.49',
					descricao: 'R$ 392,49 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4709.93',
					descricao: 'R$ 4.709,93 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '413.15',
					descricao: 'R$ 413,15 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '495.78',
					descricao: 'R$ 495,78 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '76.87',
					descricao: 'R$ 76,87 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '922.45',
					descricao: 'R$ 922,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '80.92',
					descricao: 'R$ 80,92 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '97.10',
					descricao: 'R$ 97,10 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '258.88',
					descricao: 'R$ 258,88 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3106.52',
					descricao: 'R$ 3.106,52 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '272.50',
					descricao: 'R$ 272,50 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '327.01',
					descricao: 'R$ 327,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '309.04',
					descricao: 'R$ 309,04 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3708.45',
					descricao: 'R$ 3.708,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '325.31',
					descricao: 'R$ 325,31 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '390.37',
					descricao: 'R$ 390,37 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
	],
}

exports.VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_PARCELAMENTO = {
	...VEHICLE_API_SUCCESS_RESPONSE.numeroCotacao,
	...VEHICLE_API_SUCCESS_RESPONSE.statusCotacao,
	...VEHICLE_API_SUCCESS_RESPONSE.dataCriacao,
	...VEHICLE_API_SUCCESS_RESPONSE.dataValidade,
	...VEHICLE_API_SUCCESS_RESPONSE.orcamentos,
}

exports.VEHICLE_API_SUCCESS_RESPONSE_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2 = {
	numeroCotacao: 3000616647,
	statusCotacao: [
		{
			codigo: 2,
			descricao: 'Escolhemos as melhores ofertas para você !',
		},
	],
	dataCriacao: '2023-10-31T13:51:52.000Z',
	dataValidade: '2023-11-20T13:51:54.717Z',
	orcamentos: [
		{
			codigo: 3,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 971.01,
			valorPremioFinalCartao: 922.45,
			item: {
				coberturas: [
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 712.56,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.97,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 7.0,
					},
				],
				assistencias: [
					{
						codigo: 55,
						descricao: 'Assistência - 1000 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 11,
					descricao:
						'De acordo com os dados informados até o momento, não há necessidade de agendamento de vistoria prévia. A validação completa da obrigatoriedade de VP será realizada após a transmissão da proposta.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 34,
						nomeSegmento: 'Azul Leve',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 4,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3270.05,
			valorPremioFinalCartao: 3106.52,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2286.3,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 10.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 37,
						nomeSegmento: 'Azul Auto Roubo',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 5,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 3903.66,
			valorPremioFinalCartao: 3708.45,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 2876.36,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 714.05,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 38.82,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.14,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 158,
						descricao: 'Desconto Cartão Porto Bank - Primeira Compra',
						percentual: 5.0,
					},
					{
						codigo: 142, //  itau
						percentual: 5.0,
					},
				],
				assistencias: [
					{
						codigo: 54,
						descricao: 'Assistência Gratuita - 400 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
		},
		{
			codigo: 1,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Porto Seguro',
			},
			valorPremioFinal: 4666.77,
			valorPremioFinalCartao: 4433.41,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3060.03,
						franquias: [
							{
								codigo: 1,
								descricao: 'Obrigatória',
								valorFranquia: 5674.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
					{
						codigo: 12,
						descricao: '76 - Vidros, retrovisores, lanternas e faróis',
						valorImportanciaSegurada: 10000.0,
						valorPremio: 513.93,
						franquias: [
							{
								codigo: 24,
								descricao: 'Faróis Convencionais',
								valorFranquia: 354.0,
							},
							{
								codigo: 27,
								descricao: 'Lanternas Convencionais',
								valorFranquia: 199.0,
							},
							{
								codigo: 28,
								descricao: 'Lanternas de LED',
								valorFranquia: 566.0,
							},
							{
								codigo: 22,
								descricao: 'Vidros Para-Brisa, Teto Solar ou Panorâmico',
								valorFranquia: 322.0,
							},
							{
								codigo: 30,
								descricao: 'Retrovisores ',
								valorFranquia: 270.0,
							},
							{
								codigo: 29,
								descricao: 'Vidros Laterais ',
								valorFranquia: 98.0,
							},
							{
								codigo: 23,
								descricao: 'Vidros Traseiros',
								valorFranquia: 312.0,
							},
							{
								codigo: 26,
								descricao: 'Faróis de Xenon',
								valorFranquia: 1504.0,
							},
							{
								codigo: 25,
								descricao: 'Faróis de LED',
								valorFranquia: 1222.0,
							},
						],
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 159,
						descricao: 'Desconto Cliente Auto',
						percentual: 10.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 142, //  itau
						percentual: 3.0,
					},
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 6,
						nomeSegmento: 'Auto Sênior',
						codigoMarca: 1001,
					},
				},
			},
			tipoOferta: {
				codigo: 1,
				descricao: 'Oferta Recomendada Porto Seguro',
			},
		},
		{
			codigo: 2,
			inicioVigencia: '2023-10-31',
			fimVigencia: '2024-10-31',
			empresa: {
				codigo: 1,
				descricao: 'Porto Seguro',
			},
			valorPremioFinal: 4957.84,
			valorPremioFinalCartao: 4709.93,
			item: {
				coberturas: [
					{
						codigo: 1,
						descricao: 'Compreensiva',
						valorImportanciaSegurada: 45242.0,
						valorPremio: 3845.03,
						franquias: [
							{
								codigo: 3,
								descricao: '50% da Obrigatória',
								valorFranquia: 2837.0,
							},
						],
						codigosTextos: [],
					},
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 720.88,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000.0,
						valorPremio: 45.01,
						codigosTextos: [],
					},
					{
						codigo: 5,
						descricao: 'Acidentes Pessoais Passageiros',
						valorImportanciaSegurada: 1000.0,
						valorPremio: 6.18,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 159,
						descricao: 'Desconto Cartão Porto Bank - Proponente',
						percentual: 10.0,
					},
					{
						codigo: 15,
						descricao: 'Desconto Promocional',
						percentual: 10.0,
					},
					{
						codigo: 196,
						descricao: "Desconto à vista - Segunda Compra Cartão Porto Bank",
						percentual: 5.0
					}
				],
				assistencias: [
					{
						codigo: 21,
						descricao:
							'31 - Essencial - Assistência Km ilimitado / Serviços à residência',
						codigosTextos: [178, 175, 39, 88, 12, 13],
						descricoesTextos: [
							'Lucro Cessantes 30 Dias (R$70,00/Dia - Lmi R$2.100,00)',
						],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [
					{
						codigo: 28,
						descricao: 'Extensão de Perímetro Básico ',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 10,
						descricao: 'Porto Plus',
						codigosTextos: [57],
					},
					{
						codigo: 11,
						descricao: 'Estapar',
						codigosTextos: [9],
						descricoesTextos: ['Desinfecção Automotiva'],
					},
					{
						codigo: 19,
						descricao: 'Coleta de Documentos (Moto Coleta)',
						codigosTextos: [],
						descricoesTextos: [],
					},
					{
						codigo: 8,
						descricao: 'Taxa especial na Porto Seguro Financeira',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 6,
						nomeSegmento: 'Auto Sênior',
						codigoMarca: 1001,
					},
				},
			},
		},
	],
	parcelamento: [
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '388.90',
					descricao: 'R$ 388,90 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 1,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '466.68',
					descricao: 'R$ 466,68 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4666.77',
					descricao: 'R$ 4.666,77 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '392.49',
					descricao: 'R$ 392,49 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4709.93',
					descricao: 'R$ 4.709,93 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '413.15',
					descricao: 'R$ 413,15 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 2,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '495.78',
					descricao: 'R$ 495,78 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '4957.84',
					descricao: 'R$ 4.957,84 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '76.87',
					descricao: 'R$ 76,87 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '922.45',
					descricao: 'R$ 922,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '80.92',
					descricao: 'R$ 80,92 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 3,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '97.10',
					descricao: 'R$ 97,10 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '971.01',
					descricao: 'R$ 971,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '258.88',
					descricao: 'R$ 258,88 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3106.52',
					descricao: 'R$ 3.106,52 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '272.50',
					descricao: 'R$ 272,50 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 4,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '327.01',
					descricao: 'R$ 327,01 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3270.05',
					descricao: 'R$ 3.270,05 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 3,
			codigoFormaPagamento: 97,
			ordenacao: 0,
			parcelamentos: [
				{
					numero: 12,
					valor: '309.04',
					descricao: 'R$ 309,04 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3708.45',
					descricao: 'R$ 3.708,45 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 97,
			ordenacao: 2,
			parcelamentos: [
				{
					numero: 12,
					valor: '325.31',
					descricao: 'R$ 325,31 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
		{
			codigoOrcamento: 5,
			tipoClasseCalculoPremio: 1,
			codigoFormaPagamento: 62,
			ordenacao: 3,
			parcelamentos: [
				{
					numero: 10,
					valor: '390.37',
					descricao: 'R$ 390,37 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
				{
					numero: 1,
					valor: '3903.66',
					descricao: 'R$ 3.903,66 sem juros sem encargos',
					juros: 0.0,
					encargos: 0.0,
				},
			],
		},
	],
}

const VEHICLE_API_RESPONSE_WITH_INCONVERTIBLE_OBJECT = {
	numeroCotacao: 3130399492,
	statusCotacao: [
		{
			codigo: 2,
			descricao: 'Escolhemos as melhores ofertas para você !',
		},
	],
	dataCriacao: '2024-02-10T01:37:03.000Z',
	dataValidade: '2024-02-29T03:00:00.000Z',
	orcamentos: [
		{
			codigo: 1,
			inicioVigencia: '2024-02-15',
			fimVigencia: '2025-02-15',
			empresa: {
				codigo: 35,
				descricao: 'Azul Seguros',
			},
			valorPremioFinal: 952.64,
			valorPremioFinalCartao: 952.64,
			item: {
				coberturas: [
					{
						codigo: 3,
						descricao: 'RCF-V Danos Materiais',
						valorImportanciaSegurada: 50000,
						valorPremio: 706.66,
						codigosTextos: [],
					},
					{
						codigo: 4,
						descricao: 'RCF-V Danos Corporais',
						valorImportanciaSegurada: 50000,
						valorPremio: 37.26,
						codigosTextos: [],
					},
				],
				descontos: [
					{
						codigo: 142,
						percentual: 5,
					},
				],
				assistencias: [
					{
						codigo: 55,
						descricao: 'Assistência - 1000 Km',
						codigosTextos: [],
						descricoesTextos: [],
					},
				],
				rastreador: {
					concessao: {
						codigo: 2,
					},
					rastreadorInstalado: {
						codigo: 2,
					},
					tipoConcessao: {
						codigo: 31,
					},
				},
				beneficios: [],
				vistoriaPrevia: {
					tipo: 5,
					descricao:
						'Identificamos que a vistoria prévia é necessária para o veículo. Clique em agendar para enviar a solicitação.',
				},
				produtoComercial: {
					segmento: {
						codigoSegmento: 30,
						nomeSegmento: 'Azul Tradicional',
						codigoMarca: 1002,
					},
				},
			},
			tipoOferta: {
				codigo: 2,
				descricao: 'Oferta Recomendada Azul Seguros',
			},
		},
	],
}

exports.RESPONSE_FACTORY_QUOTATIONS_WITHOUT_TIPO_CLASSE_CALULO_PREMIO_2 = [
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '3',
			name: 'Azul Seguro',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description: 'Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: false
				},
				{
					description: 'Colisão Total',
					isIncluded: false
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: false
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: false
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 971,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 971.01,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 971.01,
			porto_card_last_installment_value: 80.92,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú Uniclass',
			itau_discount_percentage: 7,
			first_installment_value: 971.01,
			last_installment_value: 97.1,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 34,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '4',
			name: 'Azul Seguro Roubo e Furto',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Indenização máxima (FIPE) 90%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Sem troca de peças',
					isIncluded: false
				},
				{
					description: 'Indenização máxima (FIPE) 90%',
					isIncluded: true
				}
			],
			amount: 3270.1,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 3270.05,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 3270.05,
			porto_card_last_installment_value: 272.5,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú Personnalité',
			itau_discount_percentage: 10,
			first_installment_value: 3270.05,
			last_installment_value: 327.01,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 37,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '5',
			name: 'Azul Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 3903.7,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 3903.66,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 3903.66,
			porto_card_last_installment_value: 325.31,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú',
			itau_discount_percentage: 5,
			first_installment_value: 3903.66,
			last_installment_value: 390.37,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 30,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '1',
			name: 'Porto Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Assistência para vidros, Lanternas, Retrovisores e faróis; Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: true
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 4666.8,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 4666.77,
			porto_card_discount_percentage: 10,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 4666.77,
			porto_card_last_installment_value: 388.9,
			other_card_discount_percentage: 0,
			recommend_budget: true,
			itau_account_type: 'Itaú',
			itau_discount_percentage: 3,
			first_installment_value: 4666.77,
			last_installment_value: 466.68,
			isFirstPaymentDiscount: false,
			company_code: 1001,
			segment_code: 6,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '2',
			name: 'Porto Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 4957.8,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 4957.84,
			porto_card_discount_percentage: 10,
			porto_card_discount_percentage_total: 15,
			porto_card_first_installment_value: 4957.84,
			porto_card_last_installment_value: 413.15,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: undefined,
			itau_discount_percentage: undefined,
			first_installment_value: 4957.84,
			last_installment_value: 495.78,
			isFirstPaymentDiscount: false,
			company_code: 1001,
			segment_code: 6,
			shopping_token: undefined
		},
	},
]

const RESPONSE_FACTORY_QUOTATIONS = [
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '3',
			name: 'Azul Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description: 'Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: false
				},
				{
					description: 'Colisão Total',
					isIncluded: false
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: false
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: false
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 971,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 971.01,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 971.01,
			porto_card_last_installment_value: 80.92,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú Uniclass',
			itau_discount_percentage: 7,
			first_installment_value: 971.01,
			last_installment_value: 97.1,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 30,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '4',
			name: 'Azul Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 3270.1,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 3270.05,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 3270.05,
			porto_card_last_installment_value: 272.5,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú Personnalité',
			itau_discount_percentage: 10,
			first_installment_value: 3270.05,
			last_installment_value: 327.01,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 30,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '5',
			name: 'Azul Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 3903.7,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 3903.66,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 3903.66,
			porto_card_last_installment_value: 325.31,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: 'Itaú',
			itau_discount_percentage: 5,
			first_installment_value: 3903.66,
			last_installment_value: 390.37,
			isFirstPaymentDiscount: false,
			company_code: 1002,
			segment_code: 30,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '1',
			name: 'Porto Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Assistência para vidros, Lanternas, Retrovisores e faróis; Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: true
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 4666.8,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 4433.41,
			porto_card_discount_percentage: 10,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 4433.41,
			porto_card_last_installment_value: 369.45,
			other_card_discount_percentage: 0,
			recommend_budget: true,
			itau_account_type: 'Itaú',
			itau_discount_percentage: 3,
			first_installment_value: 4666.77,
			last_installment_value: 466.68,
			isFirstPaymentDiscount: true,
			company_code: 1001,
			segment_code: 8,
			shopping_token: undefined
		},
	},
	{
		porto_quotation_id: 3000616647,
		quotation_date: '2023-10-31T13:51:52.000Z',
		expiration_date: '2023-11-20T13:51:54.717Z',
		product_attributes: {
			budget_number: '2',
			name: 'Itaú Seguro Tradicional',
			start_date: '2023-10-31',
			end_date: '2024-10-31',
			coverages: {
				description:
					'Colisão Parcial; Colisão Total; Incêndio, Roubo e Furto; Cobertura para danos materiais a terceiros (RCF); Cobertura para danos corporais a terceiros (RCF); Cobertura para os ocupantes do veículo (APP); Peças originais; Indenização máxima (FIPE) 100%',
			},
			coverage_items: [
				{
					description: 'Colisão Parcial',
					isIncluded: true
				},
				{
					description: 'Colisão Total',
					isIncluded: true
				},
				{
					description: 'Incêndio, Roubo e Furto',
					isIncluded: true
				},
				{ 
					description: 'Cobertura para danos materiais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para danos corporais a terceiros (RCF)',
					isIncluded: true
				},
				{
					description: 'Cobertura para os ocupantes do veículo (APP)',
					isIncluded: true
				},
				{
					description: 'Danos Morais e Estéticos',
					isIncluded: false
				},
				{
					description: 'Assistência para vidros, Lanternas, Retrovisores e faróis',
					isIncluded: false
				},
				{
					description: 'Roda, pneu e suspensão',
					isIncluded: false
				},
				{
					description: "Custos de defesa auto",
					isIncluded: false,
				},
				{
					description: 'Danos aos Vidros e Retrovisores e Faróis e Lanternas',
					isIncluded: false
				},
				{
					description: 'Peças originais',
					isIncluded: true
				},
				{
					description: 'Indenização máxima (FIPE) 100%',
					isIncluded: true
				}
			],
			amount: 4957.8,
			installments: 10,
			porto_card_installments: 12,
			porto_card_amount: 4957.84,
			porto_card_discount_percentage: 0,
			porto_card_discount_percentage_total: 0,
			porto_card_first_installment_value: 4957.84,
			porto_card_last_installment_value: 413.15,
			other_card_discount_percentage: 0,
			recommend_budget: false,
			itau_account_type: undefined,
			itau_discount_percentage: undefined,
			first_installment_value: 4957.84,
			last_installment_value: 495.78,
			isFirstPaymentDiscount: false,
			company_code: 1003,
			segment_code: 50,
			shopping_token: undefined
		},
	},
]

exports.CONTROLLER_SUCCESS_RESPONSE = {
	susepCode: 'CM208J',
	idLead: 'fb4c687-a120-4f92-a138-7bbd43fa3ede',
	pescod: '82786660',
	quotation_data: VEHICLE_API_SUCCESS_RESPONSE,
	quotations: RESPONSE_FACTORY_QUOTATIONS,
}

exports.CONTROLLER_BAD_RESPONSE_CODE_4 = {
	message: {
		codigo: 4,
		descricao: 'No momento não temos ofertas disponíveis para você.',
	},
	statusCode: 409,
}

exports.CONTROLLER_BAD_RESPONSE_CODE_5 = {
	message: {
		codigo: 5,
		descricao:
			'Sua solicitação de Cotação está sendo analisada pela Porto Seguro. Em instantes retornaremos com as melhores ofertas para você.',
	},
	statusCode: 409,
}

exports.CONTROLLER_BAD_RESPONSE = {
	message: {
		codigo: 3,
		descricao: 'Teste de mensagem genérica de erro na geração da cotação.',
	},
	statusCode: 400,
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_NEW_INSURANCE = {
	codigoParceiro: 71,
	tipoSeguro: 0,
	segurado: {
		pessoa: {
			tipo: 1,
			documento: {
				tipo: 1,
				numero: '33994753813',
			},
			telefone: {
				tipoFinalidade: 1,
				ddd: '11',
				numero: '222225555',
			},
			email: 'jose.frederico@portoseguro.com.br',
			nomeSocialPessoa: null,
		},
	},
	condutores: [
		{
			pessoa: {
				tipo: 1,
				documento: {
					tipo: 1,
					numero: '33994753813',
				},
				nomeSocialPessoa: null,
			},
		},
	],
	cepPernoite: '13046460',
	susep: 'CM208J',
	veiculo: {
		codigoVersao: 895,
		anoModelo: 2016,
		anoFabricacao: 2016,
		placa: 'FYP0099',
		flagZeroKm: 'N',
		tipoUso: 1
	},
	apoliceBonus: {
		bonus: {
			valor: 5,
			origem: 1,
		},
	},
	condicoesComerciais: [
		{
			empresa: {
				codigo: 1,
			},
			marca: {
				codigo: 1001
			},
			percentualComissaoAplicado: '10.0',
			agravo: '0',
		},
		{
			empresa: {
				codigo: 1,
			},
			marca: {
				codigo: 1002
			},
			percentualComissaoAplicado: '10.0',
			agravo: '0',
		},
	]
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_RENOVATION_CONGENERE = {
	codigoParceiro: CONSTANT.PARTNER_CODE,
	tipoSeguro: 6,
	segurado: {
		pessoa: {
			tipo: 1,
			documento: {
				tipo: 1,
				numero: '33994753813',
			},
			telefone: {
				tipoFinalidade: 1,
				ddd: '11',
				numero: '222225555',
			},
			email: 'jose.frederico@portoseguro.com.br',
			nomeSocialPessoa: null,
		},
	},
	condutores: [
		{
			pessoa: {
				tipo: 1,
				documento: {
					tipo: 1,
					numero: '33994753813',
				},
				nomeSocialPessoa: null,
			},
		},
	],
	cepPernoite: '13046460',
	susep: 'CM208J',
	veiculo: {
		codigoVersao: 895,
		anoModelo: 2016,
		anoFabricacao: 2016,
		placa: 'FYP0099',
		flagZeroKm: 'N',
		tipoUso: 1
	},
	apoliceBonus: {
		congenere: 1,
		bonus: {
			valor: 5,
		},
	},
	condicoesComerciais: [
		{
			empresa: {
				codigo: 1,
			},
			marca: {
				codigo: 1001
			},
			percentualComissaoAplicado: '10.0',
			agravo: '0',
		},
		{
			empresa: {
				codigo: 1,
			},
			marca: {
				codigo: 1002
			},
			percentualComissaoAplicado: '10.0',
			agravo: '0',
		},
	],
}

exports.RESPONSE_FACTORY_QUOTATIONS = RESPONSE_FACTORY_QUOTATIONS

exports.RESPONSE_FACTORY_QUOTATIONS_SUCCESS = {
	susepCode: 'CM208J',
	idLead: 'fb4c687-a120-4f92-a138-7bbd43fa3ede',
	pescod: '82786660',
	quotation_data: VEHICLE_API_SUCCESS_RESPONSE,
	quotations: RESPONSE_FACTORY_QUOTATIONS,
}

exports.RESPONSE_FACTORY_QUOTATIONS_BAD_REQUEST_CODE_4 = {
	message: {
		codigo: 4,
		descricao: 'No momento não temos ofertas disponíveis para você.',
	},
	statusCode: 409,
}

exports.RESPONSE_FACTORY_QUOTATIONS_BAD_REQUEST_CODE_5 = {
	message: {
		codigo: 5,
		descricao:
			'Sua solicitação de Cotação está sendo analisada pela Porto Seguro. Em instantes retornaremos com as melhores ofertas para você.',
	},
	statusCode: 409,
}

exports.RESPONSE_FACTORY_QUOTATIONS_BAD_REQUEST = (code, descricao) => ({
	message: {
		codigo: code,
		descricao: descricao,
	},
	statusCode: 400,
})

exports.VEHICLE_API_SUCCESS_RESPONSE = VEHICLE_API_SUCCESS_RESPONSE

exports.VEHICLE_API_RESPONSE_WITH_INCONVERTIBLE_OBJECT =
	VEHICLE_API_RESPONSE_WITH_INCONVERTIBLE_OBJECT

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

const API_CARTCHECKOUT_VALID_RETURN_VALUE = {
	cartId: 'tokenCommerceCreateCartGeneration',
}

exports.API_CARTCHECKOUT_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: API_CARTCHECKOUT_VALID_RETURN_VALUE,
	}
}

exports.API_CARTCHECKOUT_VALID_PAYLOAD_INPUT = () => {
	return {
		shoppingToken: 'ID_DO_CARRINHO',
		customerToken: '',
	}
}

exports.API_CARTCHECKOUT_VALID_RETURN = () => {
	return API_CARTCHECKOUT_VALID_RETURN_VALUE.cartId
}

exports.CARTFACTORY_PAYLOAD_RETURN = () => {
	return {
		cartCommerceId: 'ID_DO_CARRINHO',
		customerToken: '',
	}
}