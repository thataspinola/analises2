const CONSTANTS = require('../../src/property')

exports.INPUT_REQUEST_QUOTATION = () => {
	return {
		body: JSON.stringify({
			lifeinsurance: {
				date_of_birth: '1990-06-22',
				salesMedium: 'HUB',
				susep: 'CMHUBJ',
			}
		})
	}
}

exports.INPUT_REQUEST_QUOTATION_API = () => {
	return JSON.parse(this.INPUT_REQUEST_QUOTATION().body)
}

exports.INPUT_REQUEST_INVALID = {
	lifeinsurance: {},
}

exports.RESPONSE_QUOTATION_ERRO = (errorCode) => {
	return {
		status: 400,
		data: {
			codigo: errorCode || 'OR04',
			message:
				'Para os critérios e informações fornecidas, não há planos de ofertas disponívéis para gerar seu orçamento. Verifique os limites e condições de contratação e tente novamente mais tarde.',
		},
	}
}

exports.RESPONSE_QUOTATION_DATA_SUCCESS = (dateOfBirth) => {
	return {
		statusCode: 200,
		body: {
			quotations: [
				{
					porto_quotation_id: '00553289',
					cpf: null,
					product_attributes: JSON.stringify({
						budget_id: '00553289',
						name: 'Seguro de Vida',
						sku: 'SEGURO_DE_VIDA',
						price: 154.48,
						quotation_date: '2022-12-05',
						initial_data: '2022-12-05',
						offer_info: 'Cobertura R$ 150 mil',
						labelDuration: CONSTANTS.PRODUCT_DURATION,
						labelBenefits: CONSTANTS.PRODUCT_BENEFITS,
						boost_difference: CONSTANTS.BOOST_DIFFERENCE,
						coverages: JSON.stringify([
							{
								AFI: {
									name: 'AssistênciaFuneralFamiliar',
									description:
										'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
									special_observation: 'caracteristicaespecialvalor',
									amount: 5100,
									grace_period: 'tests',
									max_limit: 5000,
									protection_type: 'Família',
								},
								BAS: {
									name: 'Assistência',
									description: 'Descrição',
									special_observation: null,
									amount: 150000,
									grace_period: null,
									max_limit: 150000,
									protection_type: 'Família',
								},
							},
						]),
						payments: JSON.stringify([
							{
								code: 97,
								name: 'CartãoPorto', //nomeFormaPagamento
								description: 'CARTAOPORTOSEGURO', //descricao
								quantity: [
									{
										quantity: 1,
										first_installment: '131.32',
										other_installments: null,
										discount: -15.0,
										interest: 0,
									},
									{
										quantity: 2,
										first_installment: '65.66',
										other_installments: '65.66',
										discount: -15.0,
										interest: 0,
									},
								],
							},
							{
								code: 62,
								name: 'CartãodeCrédito',
								description: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								quantity: [
									{
										quantity: 1,
										first_installment: '139.03',
										other_installments: null,
										discount: -10.0,
										interest: 0,
									},
									{
										quantity: 2,
										first_installment: '69.51',
										other_installments: '69.52',
										discount: -10.0,
										interest: 0,
									},
								],
							},
						]),
						recommendation: true,
					}),
					quotation_data: JSON.stringify({
						date_of_birth: dateOfBirth,
						orcamento: {
							vigenciaFinal: '2023-12-04',
							qtdDiasVigencia: 365,
							canalDistribuicao: 'COR',
							susepOrcamento: 'COLJ10',
							dataCalculo: '2022-12-05',
							numeroOrcamento: '00553289',

							coberturas: [
								{
									franquia: null,
									sigla: 'AFI',
									obrigatorio: false,
									moeda: 'BRL',
									limitemaximo: 5000,
									tipoGarantia: 'Cobertura',
									caracteristica: 'Adicional',
									nome: 'AssistênciaFuneralFamiliar',
									tipo: 'Monetário',
									inclui: null,
									includentes: [],
									excludentes: [],
									descricao:
										'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
									carencias: 'tests',
									valor: 5100,
									tipoprotecao: 'Família',
									caracteristicaespecialvalor: 'caracteristicaespecialvalor',
									limiteminimo: 5000,
									caracteristicaespecialtipo: null,
								},
								{
									franquia: null,
									sigla: 'BAS',
									moeda: 'BRL',
									limitemaximo: 150000,
									caracteristica: 'Principal',
									valor: 150000,
									tipoprotecao: 'Família',
									caracteristicaespecialvalor: null,
									limiteminimo: 30000,
									caracteristicaespecialtipo: null,
									nome: 'Assistência',
									descricao: 'Descrição',
									carencias: null,
								},
							],

							meioComercializacao: 'SFC',
							vigenciaInicial: '2022-12-05',
						},
						parcelamentos: [
							{
								opcao: 3,
								encargos: 0,
								iof: 0.5,
								codigo: 97,
								valorPrimeiraParcela: '131.32',
								descontoAgravo: -15.0,
								custoapolice: 0,
								qtdParcelas: 1,
								juros: 0,
								valorDemaisParcelas: null,
								meioRecebimentoPrimeiraParcela: 'P',
								descricao: 'CARTAOPORTOSEGURO',
								nomeFormaPagamento: 'CartãoPorto',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: null,
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000001jSRDAA2',
							},
							{
								opcao: 3,
								encargos: 0,
								iof: 0.5,
								codigo: 97,
								valorPrimeiraParcela: '65.66',
								descontoAgravo: -15.0,
								custoapolice: 0,
								qtdParcelas: 2,
								juros: 0,
								valorDemaisParcelas: '65.66',
								meioRecebimentoPrimeiraParcela: 'P',
								descricao: 'CARTAOPORTOSEGURO',
								nomeFormaPagamento: 'CartãoPorto',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: 'P',
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000001jSRDAA2',
							},
							{
								opcao: 2,
								encargos: 0,
								iof: 0.53,
								codigo: 62,
								valorPrimeiraParcela: '139.03',
								descontoAgravo: -10.0,
								custoapolice: 0,
								qtdParcelas: 1,
								juros: 0,
								valorDemaisParcelas: null,
								meioRecebimentoPrimeiraParcela: 'Q',
								descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								nomeFormaPagamento: 'CartãodeCrédito',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: null,
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000002RsveAAC',
							},
							{
								opcao: 2,
								encargos: 0,
								iof: 0.53,
								codigo: 62,
								valorPrimeiraParcela: '69.51',
								descontoAgravo: -10.0,
								custoapolice: 0,
								qtdParcelas: 2,
								juros: 0,
								valorDemaisParcelas: '69.52',
								meioRecebimentoPrimeiraParcela: 'Q',
								descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								nomeFormaPagamento: 'CartãodeCrédito',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: 'Q',
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000002RsveAAC',
							},
						],
					}),
				},
				{
					porto_quotation_id: '00553288',
					cpf: null,
					product_attributes: JSON.stringify({
						budget_id: '00553288',
						name: 'Seguro de Vida',
						sku: 'SEGURO_DE_VIDA',
						price: 154.48,
						quotation_date: '2022-12-05',
						initial_data: '2022-12-05',
						offer_info: 'Cobertura R$ 31 mil',
						labelDuration: CONSTANTS.PRODUCT_DURATION,
						labelBenefits: CONSTANTS.PRODUCT_BENEFITS,
						boost_difference: CONSTANTS.BOOST_DIFFERENCE,
						coverages: JSON.stringify([
							{
								AFI: {
									name: 'AssistênciaFuneralFamiliar',
									description:
										'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
									special_observation: 'caracteristicaespecialvalor',
									amount: 5100,
									grace_period: 'tests',
									max_limit: 5000,
									protection_type: 'Família',
								},
								BAS: {
									name: 'Assistência',
									description: 'Descrição',
									special_observation: null,
									amount: 31000,
									grace_period: null,
									max_limit: 150000,
									protection_type: 'Família',
								},
							},
						]),
						payments: JSON.stringify([
							{
								code: 97,
								name: 'CartãoPorto', //nomeFormaPagamento
								description: 'CARTAOPORTOSEGURO', //descricao
								quantity: [
									{
										quantity: 1,
										first_installment: '131.32',
										other_installments: null,
										discount: -15.0,
										interest: 0,
									},
									{
										quantity: 2,
										first_installment: '65.66',
										other_installments: '65.66',
										discount: -15.0,
										interest: 0,
									},
								],
							},
							{
								code: 62,
								name: 'CartãodeCrédito',
								description: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								quantity: [
									{
										quantity: 1,
										first_installment: '139.03',
										other_installments: null,
										discount: -10.0,
										interest: 0,
									},
									{
										quantity: 2,
										first_installment: '69.51',
										other_installments: '69.52',
										discount: -10.0,
										interest: 0,
									},
								],
							},
						]),
						recommendation: false,
					}),
					quotation_data: JSON.stringify({
						date_of_birth: dateOfBirth,
						orcamento: {
							vigenciaFinal: '2023-12-04',
							qtdDiasVigencia: 365,
							canalDistribuicao: 'COR',
							susepOrcamento: 'COLJ10',
							dataCalculo: '2022-12-05',
							numeroOrcamento: '00553288',

							coberturas: [
								{
									franquia: null,
									sigla: 'AFI',
									obrigatorio: false,
									moeda: 'BRL',
									limitemaximo: 5000,
									tipoGarantia: 'Cobertura',
									caracteristica: 'Adicional',
									nome: 'AssistênciaFuneralFamiliar',
									tipo: 'Monetário',
									inclui: null,
									includentes: [],
									excludentes: [],
									descricao:
										'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
									carencias: 'tests',
									valor: 5100,
									tipoprotecao: 'Família',
									caracteristicaespecialvalor: 'caracteristicaespecialvalor',
									limiteminimo: 5000,
									caracteristicaespecialtipo: null,
								},
								{
									franquia: null,
									sigla: 'BAS',
									moeda: 'BRL',
									limitemaximo: 150000,
									caracteristica: 'Principal',
									valor: 31000,
									tipoprotecao: 'Família',
									caracteristicaespecialvalor: null,
									limiteminimo: 30000,
									caracteristicaespecialtipo: null,
									nome: 'Assistência',
									descricao: 'Descrição',
									carencias: null,
								},
							],

							meioComercializacao: 'SFC',
							vigenciaInicial: '2022-12-05',
						},
						parcelamentos: [
							{
								opcao: 3,
								encargos: 0,
								iof: 0.5,
								codigo: 97,
								valorPrimeiraParcela: '131.32',
								descontoAgravo: -15.0,
								custoapolice: 0,
								qtdParcelas: 1,
								juros: 0,
								valorDemaisParcelas: null,
								meioRecebimentoPrimeiraParcela: 'P',
								descricao: 'CARTAOPORTOSEGURO',
								nomeFormaPagamento: 'CartãoPorto',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: null,
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000001jSRDAA2',
							},
							{
								opcao: 3,
								encargos: 0,
								iof: 0.5,
								codigo: 97,
								valorPrimeiraParcela: '65.66',
								descontoAgravo: -15.0,
								custoapolice: 0,
								qtdParcelas: 2,
								juros: 0,
								valorDemaisParcelas: '65.66',
								meioRecebimentoPrimeiraParcela: 'P',
								descricao: 'CARTAOPORTOSEGURO',
								nomeFormaPagamento: 'CartãoPorto',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: 'P',
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000001jSRDAA2',
							},
							{
								opcao: 2,
								encargos: 0,
								iof: 0.53,
								codigo: 62,
								valorPrimeiraParcela: '139.03',
								descontoAgravo: -10.0,
								custoapolice: 0,
								qtdParcelas: 1,
								juros: 0,
								valorDemaisParcelas: null,
								meioRecebimentoPrimeiraParcela: 'Q',
								descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								nomeFormaPagamento: 'CartãodeCrédito',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: null,
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000002RsveAAC',
							},
							{
								opcao: 2,
								encargos: 0,
								iof: 0.53,
								codigo: 62,
								valorPrimeiraParcela: '69.51',
								descontoAgravo: -10.0,
								custoapolice: 0,
								qtdParcelas: 2,
								juros: 0,
								valorDemaisParcelas: '69.52',
								meioRecebimentoPrimeiraParcela: 'Q',
								descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
								nomeFormaPagamento: 'CartãodeCrédito',
								agrupamento: 'CartaoCredito',
								meioRecebimentoDemaisParcelas: 'Q',
								antecipacaoComissao: true,
								idFormaPagamento: 'a0a0t000002RsveAAC',
							},
						],
					}),
				},
			],
		}
	}
}

exports.RESPONSE_OFERTAS_DATA_SUCCESS = () => {
	return {
		status: 201,
		data: this.OFERTAS_DATA(),
	}
}

exports.OFERTAS_DATA = () => {
	return [
		{
			orcamento: {
				vigenciaFinal: '2023-12-04',
				qtdDiasVigencia: 365,
				canalDistribuicao: 'COR',
				susepOrcamento: 'COLJ10',
				dataCalculo: '2022-12-05',
				numeroOrcamento: '00553288',
				coberturas: [
					{
						franquia: null,
						sigla: 'AFI',
						obrigatorio: false,
						moeda: 'BRL',
						limitemaximo: 5000,
						tipoGarantia: 'Cobertura',
						caracteristica: 'Adicional',
						nome: 'AssistênciaFuneralFamiliar',
						tipo: 'Monetário',
						inclui: null,
						includentes: [],
						excludentes: [],
						descricao:
							'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
						carencias: 'tests',
						valor: 5100,
						tipoprotecao: 'Família',
						caracteristicaespecialvalor: 'caracteristicaespecialvalor',
						limiteminimo: 5000,
						caracteristicaespecialtipo: null,
					},
					{
						franquia: null,
						sigla: 'BAS',
						moeda: 'BRL',
						limitemaximo: 150000,
						caracteristica: 'Principal',
						valor: 31000,
						tipoprotecao: 'Família',
						caracteristicaespecialvalor: null,
						limiteminimo: 30000,
						caracteristicaespecialtipo: null,
						nome: 'Assistência',
						descricao: 'Descrição',
						carencias: null,
					},
				],

				meioComercializacao: 'SFC',
				vigenciaInicial: '2022-12-05',
			},
			calculos: [
				{
					opcao: 0,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.58,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: 0,
								monetario: 0,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 153.9,
							total: 154.48,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 1,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.56,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -5,
								monetario: -7.7,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 146.21,
							total: 146.76,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 2,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.53,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -10,
								monetario: -15.39,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 138.52,
							total: 139.03,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 3,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.5,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -15,
								monetario: -23.08,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 130.81,
							total: 131.32,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
			],
			parcelamentos: [
				{
					opcao: 3,
					encargos: 0,
					iof: 0.5,
					codigo: 97,
					valorPrimeiraParcela: '131.32',
					descontoAgravo: -15.0,
					custoapolice: 0,
					qtdParcelas: 1,
					juros: 0,
					valorDemaisParcelas: null,
					meioRecebimentoPrimeiraParcela: 'P',
					descricao: 'CARTAOPORTOSEGURO',
					nomeFormaPagamento: 'CartãoPorto',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: null,
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000001jSRDAA2',
				},
				{
					opcao: 3,
					encargos: 0,
					iof: 0.5,
					codigo: 97,
					valorPrimeiraParcela: '65.66',
					descontoAgravo: -15.0,
					custoapolice: 0,
					qtdParcelas: 2,
					juros: 0,
					valorDemaisParcelas: '65.66',
					meioRecebimentoPrimeiraParcela: 'P',
					descricao: 'CARTAOPORTOSEGURO',
					nomeFormaPagamento: 'CartãoPorto',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: 'P',
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000001jSRDAA2',
				},
				{
					opcao: 2,
					encargos: 0,
					iof: 0.53,
					codigo: 62,
					valorPrimeiraParcela: '139.03',
					descontoAgravo: -10.0,
					custoapolice: 0,
					qtdParcelas: 1,
					juros: 0,
					valorDemaisParcelas: null,
					meioRecebimentoPrimeiraParcela: 'Q',
					descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
					nomeFormaPagamento: 'CartãodeCrédito',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: null,
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000002RsveAAC',
				},
				{
					opcao: 2,
					encargos: 0,
					iof: 0.53,
					codigo: 62,
					valorPrimeiraParcela: '69.51',
					descontoAgravo: -10.0,
					custoapolice: 0,
					qtdParcelas: 2,
					juros: 0,
					valorDemaisParcelas: '69.52',
					meioRecebimentoPrimeiraParcela: 'Q',
					descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
					nomeFormaPagamento: 'CartãodeCrédito',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: 'Q',
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000002RsveAAC',
				},
			],
			retornoAceitacao: {
				avisos: [],
				analises: [],
				recusas: [],
				decisoes: [],
				pendencias: [],
			},
		},
		{
			orcamento: {
				vigenciaFinal: '2023-12-04',
				qtdDiasVigencia: 365,
				canalDistribuicao: 'COR',
				susepOrcamento: 'COLJ10',
				dataCalculo: '2022-12-05',
				numeroOrcamento: '00553289',
				coberturas: [
					{
						franquia: null,
						sigla: 'AFI',
						obrigatorio: false,
						moeda: 'BRL',
						limitemaximo: 5000,
						tipoGarantia: 'Cobertura',
						caracteristica: 'Adicional',
						nome: 'AssistênciaFuneralFamiliar',
						tipo: 'Monetário',
						inclui: null,
						includentes: [],
						excludentes: [],
						descricao:
							'PrestaçãodeserviçosoureembolsodasdespesascomofuneraldoSeguradoefamiliares',
						carencias: 'tests',
						valor: 5100,
						tipoprotecao: 'Família',
						caracteristicaespecialvalor: 'caracteristicaespecialvalor',
						limiteminimo: 5000,
						caracteristicaespecialtipo: null,
					},
					{
						franquia: null,
						sigla: 'BAS',
						moeda: 'BRL',
						limitemaximo: 150000,
						caracteristica: 'Principal',
						valor: 150000,
						tipoprotecao: 'Família',
						caracteristicaespecialvalor: null,
						limiteminimo: 30000,
						caracteristicaespecialtipo: null,
						nome: 'Assistência',
						descricao: 'Descrição',
						carencias: null,
					},
				],

				meioComercializacao: 'SFC',
				vigenciaInicial: '2022-12-05',
			},
			calculos: [
				{
					opcao: 0,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.58,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: 0,
								monetario: 0,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 153.9,
							total: 154.48,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 1,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.56,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -5,
								monetario: -7.7,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 146.21,
							total: 146.76,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 2,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.53,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -10,
								monetario: -15.39,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 138.52,
							total: 139.03,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
				{
					opcao: 3,
					tarifa: '5/12/2022',
					precificacao: {
						encargos: 0,
						iof: 0.5,
						descontoAgravo: [
							{
								tipo: 'FPG',
								percentual: -15,
								monetario: -23.08,
							},
							{
								tipo: 'TEC',
								percentual: 0,
								monetario: 0,
							},
						],
						premio: {
							comercial: 130.81,
							total: 131.32,
							puro: 78.49,
							puroCarregado: 153.9,
						},
					},
				},
			],
			parcelamentos: [
				{
					opcao: 3,
					encargos: 0,
					iof: 0.5,
					codigo: 97,
					valorPrimeiraParcela: '131.32',
					descontoAgravo: -15.0,
					custoapolice: 0,
					qtdParcelas: 1,
					juros: 0,
					valorDemaisParcelas: null,
					meioRecebimentoPrimeiraParcela: 'P',
					descricao: 'CARTAOPORTOSEGURO',
					nomeFormaPagamento: 'CartãoPorto',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: null,
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000001jSRDAA2',
				},
				{
					opcao: 3,
					encargos: 0,
					iof: 0.5,
					codigo: 97,
					valorPrimeiraParcela: '65.66',
					descontoAgravo: -15.0,
					custoapolice: 0,
					qtdParcelas: 2,
					juros: 0,
					valorDemaisParcelas: '65.66',
					meioRecebimentoPrimeiraParcela: 'P',
					descricao: 'CARTAOPORTOSEGURO',
					nomeFormaPagamento: 'CartãoPorto',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: 'P',
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000001jSRDAA2',
				},
				{
					opcao: 2,
					encargos: 0,
					iof: 0.53,
					codigo: 62,
					valorPrimeiraParcela: '139.03',
					descontoAgravo: -10.0,
					custoapolice: 0,
					qtdParcelas: 1,
					juros: 0,
					valorDemaisParcelas: null,
					meioRecebimentoPrimeiraParcela: 'Q',
					descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
					nomeFormaPagamento: 'CartãodeCrédito',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: null,
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000002RsveAAC',
				},
				{
					opcao: 2,
					encargos: 0,
					iof: 0.53,
					codigo: 62,
					valorPrimeiraParcela: '69.51',
					descontoAgravo: -10.0,
					custoapolice: 0,
					qtdParcelas: 2,
					juros: 0,
					valorDemaisParcelas: '69.52',
					meioRecebimentoPrimeiraParcela: 'Q',
					descricao: 'CARTAODECREDITO(TODASPARC.EMCARTAO)',
					nomeFormaPagamento: 'CartãodeCrédito',
					agrupamento: 'CartaoCredito',
					meioRecebimentoDemaisParcelas: 'Q',
					antecipacaoComissao: true,
					idFormaPagamento: 'a0a0t000002RsveAAC',
				},
			],
			retornoAceitacao: {
				avisos: [],
				analises: [],
				recusas: [],
				decisoes: [],
				pendencias: [],
			},
		},
	]
}

exports.RESPONSE_OFERTAS_ERROR = () => {
	return {
		response: {
			status: 400,
			data: {
				codigo: 'OR04',
				message:
					'Para os critérios e informações fornecidas, não há planos de ofertas disponívéis para gerar seu orçamento. Verifique os limites e condições de contratação e tente novamente mais tarde.',
			},
		},
	}
}

exports.PRICE_100 = () => {
	return { 
		calculos: [
			{
				precificacao: {
					descontoAgravo: [
						{ tipo: 'FPG', percentual: 0 }
					],
					premio: { total: 100 }
				}
			} 
		], 
		parcelamentos: [] 
	}
}

exports.PRICE_NULL = () => {
	return { calculos: [], parcelamentos: [ { descontoAgravo: 0, qtdParcelas: 1, valorPrimeiraParcela: 200 }] }
}

exports.PRICE_0_1 = () => {
	return { calculos: [], parcelamentos: [] }
}

exports.CALCULATIONS_154_48 = () => {
	return [
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'FPG', percentual: 0 }
				],
				premio: { total: 154.48 }
			}
		}
	]
}

exports.CALCULATIONS_FPG_1 = () => {
	return [
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'FPG', percentual: 1 }
				],
				premio: { total: 154.48 }
			}
		}
	]
}

exports.CALCULATIONS_NOT_DESCONTOAGRAVO = () => {
	return [
		{
			precificacao: {
				premio: { total: 154.48 }
			}
		}
	]
}

exports.CALCULATIONS_NO_DISCOUNT = () => {
	return  [
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'XYZ', percentual: 0 }
				],
				premio: { total: 154.48 }
			}
		},
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'FPG', percentual: 1 }
				],
				premio: { total: 100 }
			}
		}
	]
}

exports.CALCULATIONS_DISCOUNT_FPG = () => {
	return  [
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'XYZ', percentual: 1 }
				],
				premio: { total: 100 }
			}
		},
		{
			precificacao: {
				descontoAgravo: [
					{ tipo: 'FPG', percentual: 0 }
				],
				premio: { total: 200 }
			}
		}
	]
}

exports.INTALLMENT_FIRST_VALUE = () => {
	return [
		{ descontoAgravo: 0, qtdParcelas: 1, valorPrimeiraParcela: 100 },
		{ descontoAgravo: 5, qtdParcelas: 2, valorPrimeiraParcela: 200 },
	]
}

exports.INTALLMENT_NOT_DISCONTO_AGRAVO = () => {
	return [
		{ descontoAgravo: 5, qtdParcelas: 2, valorPrimeiraParcela: 200 },
		{ descontoAgravo: 10, qtdParcelas: 3, valorPrimeiraParcela: 300 },
	]
}

exports.INTALLMENT_WITH_DISCONTO_AGRAVO_QTDPARCELA_GREATER_THAN_0 = () => {
	return [
		{ descontoAgravo: 1, qtdParcelas: 1, valorPrimeiraParcela: 150 },
		{ descontoAgravo: 0, qtdParcelas: 2, valorPrimeiraParcela: 250 },
	]
}

exports.RESPONSE_HENDLER_SUCCES = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(this.RESPONSE_QUOTATION_DATA_SUCCESS(
			JSON.parse(this.INPUT_REQUEST_QUOTATION().body).lifeinsurance.date_of_birth
		).body)
	}
}

exports.RESPONSE_CONTROLLER_ERROR = () => {
	return  {
		statusCode: 500,
		body: {
			custom: false,
		}
	}
}

exports.RESPONSE_CONTROLLER_ERROR_CUSTON_FALSE = (errorCode) => {
	return  {
		statusCode: 500,
		body: JSON.stringify({
			codigo_erro: errorCode,
			custom: false
		}),
		headers: {},
		isBase64Encoded: false,
	}
}

exports.RESPONSE_HANDLER_ERROR_RETRY = (errorCode) => {
	return {
		statusCode: 500,
		body: JSON.stringify({
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, não foi possível concluir seu orçamento',
				subtitle: 'Nosso sistema está indisponível no momento. Estamos trabalhando para que volte a funcionar o quanto antes.',
				description: 'Por favor, tente de novo mais tarde.',
			},
		}),
		headers: {},
		isBase64Encoded: false,
	}
}

exports.RESPONSE_HANDLER_ERROR = (errorCode) => {
	return {
		statusCode: 500,
		body: JSON.stringify({
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, nosso sistema está indisponível no momento',
				subtitle: 'Estamos trabalhando para que volte a funcionar o quanto antes.',
				description: 'Por favor, tente de novo mais tarde.',
			},
		}),
		headers: {},
		isBase64Encoded: false,
	}
}

exports.RESPONSE_HANDLER_ERROR_INVALID_COUPON = (errorCode) => {
	return {
		statusCode: 500,
		body: JSON.stringify({
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Poxa, o cupom de desconto não está funcionando',
				subtitle: 'Você pode excluir o cupom ou tentar novamente mais tarde.',
				description: null,
			},
		}),
		headers: {},
		isBase64Encoded: false,
	}
}

exports.RESPONSE_HANDLER_ERROR_WAIT_FOR_OUR_CONTACT = (errorCode) => {
	return {
		statusCode: 500,
		body: JSON.stringify({
			codigo_erro: errorCode,
			custom: true,
			erro: {
				title: 'Um corretor entrará em contato para continuar sua cotação',
				subtitle: 'A partir dos dados informados identificamos a necessidade do acompanhamento de um corretor para finalizar a cotação do seu seguro.',
				description: 'Agora, é com a gente. Aguarde nosso contato :)',
			},
		}),
		headers: {},
		isBase64Encoded: false,
	}
}

exports.SCHEMA_NOT_SUSEP = () => {
	return {
		lifeinsurance: {
			date_of_birth: '1990-06-22',
			salesMedium: 'HUB',
		}
	}
}

exports.SCHEMA_VALIDE = () => {
	return {
		lifeinsurance: {
			date_of_birth: '1990-06-22',
			salesMedium: 'HUB',
			susep: 'CMHUBJ',
		}
	}
}

exports.VALIDATION_SERVICE_INVALID_INPUT_DATA = (property) => {
	return `The attributes values are not valid: ${property}`
}

exports.SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			lifeinsurance: {
				type: 'object',
				properties: {
					date_of_birth: { type: 'string' },
					salesMedium: { type: 'string' },
					susep: { type: 'string' },
				},
				required: [
					'date_of_birth', 
					'salesMedium',
					'susep',
				]
			}
		},
		required: ['lifeinsurance'],
	}
}