exports.API_EMAIL_NOTIFICATION = require('./src/api/emailNotificationApi.mock')

exports.CONTROLLER_INSPECTION_FAIL = require('./src/controller/inspectionFailController.mock')

exports.FACTORY_EMAIL_NOTIFICATION = require('./src/factory/api/emailNotificationFactory.mock')
exports.FACTORY_AXIOS_HANDLER_ERROR = require('./src/factory/axiosHandlerErrorFactory.mock')

exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

function mockInspectionFail(events) {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `1234567890`,
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

exports.VALID_HANDLER_INPUT = () => {
	return mockInspectionFail([
		{
			customerName: 'José das Couves Pereira',
			proposalId: null,
			externalId: '58000000007370',
			productCode: 'eb12742c-0cd5-4a4c-ae37-6b3cf248bc6b',
			amount: 1,
			installments: 1,
			scope: 'portable_device',
			itemId: '3192',
			contactEmail: 'jose.pereira@portoseguro.com.br',
			paymentData: {
				tipo_documento_comercial: '01',
				endosso: '',
				codigo_empresa: '001',
				composicao_valor_parcela: '01',
				codigo_ramo: '171',
				parcela: '',
				contrato_comercial: '',
				evento_emissao: '01',
				flag_sinalizador_processo: 'O',
				flag_produto_seguro: 'S',
				codigo_agregador: '',
				codigo_modalidade: '434',
			},
			integrationData: {
				correlationId: 'a0fc6060-ad27-4559-8786-8dee32120d1c',
				vdoCode: '1704301942460',
				pacote: 4,
				codigoCanal: 58,
				proponente: {
					cpf: '86203960055',
					dataNascimento: '13/10/1987',
					nomePessoa: 'José das Couves Pereira',
					faixaRenda: '5',
					estadoCivil: '1',
					sexo: 'F',
					codigoOcupacao: 135,
					descricaoOcupacao: 'ACOUGUEIRO',
					enderecos: [
						{
							bairro: 'Recreio',
							cidade: 'Rio das Ostras',
							complemento: '',
							complementoCep: '350',
							latitude: 41.19301,
							logradouro: 'Rua Nova Iguaçu',
							longitude: 41.19301,
							numero: 123,
							numeroCep: '28895',
							tipoLogradouro: 'R',
							uf: 'RJ',
						},
					],
					telefone: 22992290616,
					tipoTelefone: 1,
					tipoPessoa: 'F',
					codigoTipoPessoa: 1,
					email: 'jose.pereira@portoseguro.com.br',
				},
				pagamento: {
					encargos: 0,
					iof: 94.83,
					juros: 0,
					parcela: 1,
					codigoPagamento: 62,
					valor: '1,379.76',
					valorReais: '1,379.76',
					cartao: {
						tokenCartao: 'd3d56cd1-e508-491f-8785-664537205bff',
						bandeira: 2,
					},
					numeroOrcamento: 58000000007370,
				},
			},
			leadIdentifier: '1704301942460',
			isOnline: false,
			status: 'PENDING',
			orderNumber: '000005334',
			charges: [
				{
					paymentMethod: 'CREDIT_CARD',
					amount: 1,
					creditCard: {
						id: 'd3d56cd1-e508-491f-8785-664537205bff',
						flag: 'MASTERCARD',
					},
				},
			],
			loggedCPF: '862.039.600-55',
		},
	])
}

exports.HANDLER_SUCCESS_RESPONSE = () => {
	return {
		batchItemFailures: [],
	}
}

exports.INVALID_HANDLER_INPUT = () => {
	return {
		Records: [
			{ messageId: `1313991234`, body: JSON.stringify({ foo: 'bar' }) },
			{ messageId: `1234567890`, body: 'Not a JSON string' },
		],
	}
}

exports.HANDLER_ERROR_RESPONSE = () => {
	return {
		batchItemFailures: [{ itemIdentifier: '1234567890' }],
	}
}
