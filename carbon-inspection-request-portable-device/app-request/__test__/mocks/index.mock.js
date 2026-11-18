exports.API_PROPOSAL = require('./src/api/proposalApi.mock')

exports.CONTROLLER_INSPECTION_REQUEST = require('./src/controller/inspectionController.mock')
exports.FACTORY_RESPONSE = require('./src/factory/responseFactory.mock')
exports.FACTORY_AXIOS_HANDLER_ERROR = require('./src/factory/axiosHandlerErrorFactory.mock')
exports.FACTORY_GOOGLE_ANALYTICS = require('./src/factory/googleAnalytics.mock')

exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

function mockInspectionRequest(events) {
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
	return mockInspectionRequest([
		{
			tipo_documento_comercial: '00006',
			endosso: '00006',
			codigo_empresa: '00006',
			composicao_valor_parcela: '00006',
			codigo_ramo: '00006',
			codigo_modalidade: '00006',
			parcela: '00006',
			contrato_comercial: '00006',
			evento_emissao: '00006',
			flag_produto_seguro: '00006',
			codigo_agregador: '00006',
			flag_sinalizador_processo: '00006',
			integrationData: {
				correlationId: '5547a10e-60d0-4f43-9740-5161e8d2e45b',
				pacote: 1,
				codigoCanal: 58,
				proponente: {
					cpf: '70050937200',
					dataNascimento: '10/05/1980',
					nomePessoa: 'ROBERTO TRINDADE',
					faixaRenda: 2,
					estadoCivil: 2,
					sexo: 'M',
					enderecos: [
						{
							bairro: 'guilhermina',
							cidade: 'santos',
							complemento: 'apt',
							complementoCep: '000',
							latitude: 41.19301,
							logradouro: 'Rozario',
							longitude: 41.19301,
							numero: 131,
							numeroCep: 16650,
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
					valor: 10023,
					valorReais: 10023,
					cartao: {
						tokenCartao: '3dd2dd96-a48b-49c8-a3e7-abb9e4b82c14',
						codigoBandeira: 'MASTER',
					},
				},
			},
		},
	])
}

exports.HANDLER_SUCCESS_RESPONSE = () => {
	return {
		batchItemFailures: [],
	}
}

exports.HANDLER_ERROR_RESPONSE = () => {
	return {
		batchItemFailures: [{ itemIdentifier: '1234567890' }],
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
