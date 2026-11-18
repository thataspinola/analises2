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
		orderNumber: '00006',
		externalId: '00001',
		productCode: 61,
		scope: 'phone',
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
		paymentData: {
			tipo_documento_comercial: '01',
			endosso: '00006',
			codigo_empresa: '001',
			composicao_valor_parcela: '01',
			codigo_ramo: 171,
			codigo_modalidade: '434',
			parcela: '1',
			contrato_comercial: '123',
			evento_emissao: '01',
			flag_produto_seguro: 'S',
			codigo_agregador: '12345',
			flag_sinalizador_processo: 'O',
		},
		integrationData: {
			correlationId: 'add44bd5-4908-4d5b-a1e6-9ca3c0eb14ae',
			pacote: 4,
			codigoCanal: 58,
			proponente: {
				codigoTipoPessoa: 1,
				cpf: '23165917019',
				nomePessoa: 'RICARDO TERPINS',
				dataNascimento: '10/05/1980',
				faixaRenda: 4,
				estadoCivil: 2,
				sexo: 'M',
				codigoOcupacao: 160,
				descricaoOcupacao: 'ANALISTA DE SISTEMAS',
				enderecos: [
					{
						bairro: 'guilhermina',
						cidade: 'santos',
						complemento: 'apt',
						latitude: 41.19301,
						logradouro: 'Rozario',
						longitude: 41.19301,
						numero: 131,
						numeroCep: 16650,
						complementoCep: '000',
						tipoLogradouro: 'R',
						uf: 'SP',
					},
				],
				telefone: 11959777800,
				tipoTelefone: 1,
				tipoPessoa: 'F',
				email: 'nichole.abdala@portoseguro.com.br',
			},
			pagamento: {
				encargos: 0,
				iof: 10,
				juros: 0,
				parcela: 1,
				codigoPagamento: 62,
				valor: 2519.77,
				valorReais: 2519.77,
				cartao: {
					tokenCartao: '3dd2dd96-a48b-49c8-a3e7-abb9e4b82c14',
					bandeira: 1,
				},
				numeroOrcamento: 58000000000494,
			},
			analytics: {
				client_id: '433012227.1708441867',
				user_id: '48b094eefc444375824983ac86796c2f',
				user_properties: {
					client_bcp: {
						value: 82661878,
					},
					client_id: {
						value: '48b094eefc444375824983ac86796c2f',
					},
				},
				events: [
					{
						name: 'select_content',
						params: {
							ev_category: 'hub-vendas =>holding =>checkout =>pagamento',
							ev_action: 'evento-vinculo =>purchase =>sucesso',
							session_id: '2024120161127610156227-6T4XUGKR',
							timestamp: 1708456491,
							channel: 'hub-vendas',
							brand: 'porto',
							product: 'seguro-celular',
							subproduct: '',
							vertical: 'holding',
							service_protocol: null,
							proposal_id: null,
						},
					},
				],
			},
		},
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
