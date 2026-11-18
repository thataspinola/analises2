const handler = require('../..')
const uuidV4 = require('uuid').v4()

const mockInspectionRequest = (events) => {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `${uuidV4}`,
			receiptHandle: 'MessageReceiptHandle',
			body: JSON.stringify(event),
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1523232000000',
				SenderId: '123456789012',
				ApproximateFirstReceiveTimestamp: '1523232000001',
			},
			messageAttributes: {},
			md5OfBody: '{{{md5_of_body}}}',
			eventSource: 'aws:sqs',
			eventSourceARN: 'arn:aws:sqs:ca-central-1:123456789012:MyQueue',
			awsRegion: 'ca-central-1',
		}

		records.push(response)
	}

	return {
		Records: records,
	}
}

const mockedLocalData = [
	{
		orderNumber: '3000672475',
		externalId: '00001',
		productCode: 61,
		scope: 'auto',
		amount: 100,
		contactEmail: 'teste@teste.com.br',
		installments: 1,
		charges: [
			{
				paymentMethod: 'CREDIT_CARD',
				amount: 300.0,
				creditCard: {
					id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
					preferred: true,
					saveCard: false,
				},
			},
		],
		integrationData: {
			codigoParceiro: 71,
            numeroCotacao: 3000672475,
            susep: "COL10J",
            idProductType: null,
            company_code: 1001,
            idBranch: 27,
            orcamento: {
                codigo: 1,
                itens: [
                    {
                        apoliceBonus: {
                            documentoSegurado: {
                                numero: "18818364529",
                                tipo: 1
                            },
                            apolice: null,
                            ci: null,
                            fimVigencia: null,
                            inicioVigencia: null,
                            item: null,
                            sucursal: null
                        },
                        veiculo: {
                            chassi: "9BD373165C5003812",
                            dataSaidaVeiculo: null,
                            nomeBeneficiario: "Willian Salvador",
                            placa: "EDP8108"
                        }
                    }
                ],
                formaPagamentoEscolhida: {
                    codigoFormaPagamento: 97,
                    quantidadeParcelas: 3,
                    flagCheckout: true,
                    meioPagamento: {
                        dadosCartao: {
                            numeroCartao: null,
                            mesValidade: 4,
                            anoValidade: 2028,
                            tipoClasseCalculoPremio: 2,
                            bandeiraCartao: {
                                codigoBandeiraCartao: 21
                            },
                            nomeCartao: "WILLIAN SALVADOR"
                        }
                    }
                }
            },
            pessoaPep: [],
            segurado: {
                pessoa: {
                    documentos: [
                        {
                            numeroDocumento: "18818364529",
                            tipoIdentificacao: {
                                codigo: 1,
                                descricao: null
                            },
                            codigoPais: 31
                        }
                    ],
                    tipoVinculoPep: {
                        codigo: 2,
                        descricao: null
                    },
                    enderecos: [
                        {
                            bairro: "Jardim Chapadão",
                            descricaoComplementoEndereco: "aparto 25 - bloco 45 - condominio das flores",
                            flagEndCorrespondencia: true,
                            nomeLogradouro: "R Mte Líbano",
                            numeroCep: "13070",
                            numeroCepComplemento: "086",
                            numeroImovelLogradouro: "39",
                            tipoFinalidade: {
                                codigo: 1,
                                descricao: null
                            },
                            tipoLogradouro: 8
                        }
                    ],
                    enderecosEletronicos: [
                        {
                            texto: "willian.salvador@portoseguro.com.br"
                        }
                    ],
                    faixaRendaMensal: {
                        codigo: 99,
                        descricao: null
                    },
                    ocupacao: {
                        codigo: 589,
                        descricao: "Outros trabalhadores dos serviços"
                    },
                    paisNascimento: {
                        codigo: 31,
                        descricao: null
                    },
                    telefones: [
                        {
                            ddd: "19",
                            numero: "997430822",
                            tipoFinalidade: {
                                codigo: 1,
                                descricao: null
                            }
                        }
                    ]
                }
            }
        },
		leadIdentifier: "1767808192986",
        isOnline: false,
        status: "PENDING",
        orderNumber: "000022681",
        charges: [
            {
                paymentMethod: "CREDIT_CARD",
                amount: 1999.86,
                creditCard: {
                    isProposalCode: false,
                    saveCard: false,
                    id: "666c47f7-3a1c-48b8-a9d2-1e53a368d3cc",
                    flag: "VISA"
                }
            }
        ],
        loggedCPF: "18818364529"
	},
]

const sqsInputData = mockInspectionRequest(mockedLocalData)

handler
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
