const handler = require('../..')
const uuid = require('uuid')

const mockNotification = (events) => {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `${uuid.v4()}`,
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
		externalId: '1801521588',
		productCode: '61',
		amount: 100,
		installments: 4,
		scope: 'travel',
		itemId: '3481',
		contactEmail: 'teste.reis@teste.com',
		paymentData: {
			tipo_documento_comercial: '01',
			endosso: '',
			codigo_empresa: '001',
			composicao_valor_parcela: '01',
			codigo_ramo: '1369',
			parcela: '',
			contrato_comercial: '',
			evento_emissao: '01',
			flag_sinalizador_processo: 'O',
			flag_produto_seguro: 'S',
			codigo_agregador: '',
			codigo_modalidade: '0',
		},
		integrationData: {
			numeroOrcamento: '00630395',
			dataOperacao: '2023-10-24T03:00:00.000Z',
			valor: 247.24,
			codigoFormaPagamento: 97,
			quantidadeParcelas: '4',
			opcaoPrecificacao: 1,
			idFormaPagamento: 'a0a0t000003rBKqAAM',
			propostas: [
				{
					numero: '1801521588',
				},
			],
		},
		chargeId: '412a2634-210b-452a-b6ec-45a53ed9157c',
		status: 'PAGA',
		orderNumber: '000003017',
		orderPaymentId: '7f6e1d3b-0716-4125-b358-9bd370a7568a',
		charges: [
			{
				paymentMethod: 'CREDIT_CARD',
				amount: 247.24,
				creditCard: {
					id: '1b1aa8bd-d3d7-4ea2-a979-57115949dfb8',
					flag: 'MASTERCARD',
				},
			},
		],
	},
]

const sqsInputData = mockNotification(mockedLocalData)

handler
	.handler(sqsInputData)
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})
