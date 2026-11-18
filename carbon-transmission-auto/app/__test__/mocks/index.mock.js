const factory = require('../utils/factory')

exports.API_AUTOMOVEL_PROPOSTACRITICAS_PAGAMENTOCHECKOUT = require('./api/automovel/propostaCriticasApi/index.mock')

exports.CONTROLLER_AUTOCONTROLLER = require('./controller/autoController.mock')

exports.FACTORY_AUTOMOVEL_PROPOSTA_CRITICAS_POSTPAGAMENTOCHECKOUTPAYLOAD = require('./factory/automovel/propostaCriticasApi/postPagamentoCheckoutPayloadFactory.mock')

exports.FACTORY_AUTOMOVEL_RESPONSE = require('./factory/automovel/responseFactory.mock')

exports.SERVICE_LOGGER = require('./service/loggerService.mock')

exports.SERVICE_VALIDATION = require('./service/validationService.mock')

const HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE = {
	amount: 100,
	chargeId: '9cddfa67-30d3-4d53-b843-f12b2737d559',
	charges: [
		{
			amount: 100,
			creditCard: {
				id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
				preferred: true,
				saveCard: false,
			},
			paymentMethod: 'CREDIT_CARD',
		},
	],
	contactEmail: 'teste@teste.com.br',
	externalId: '201131479',
	installments: 1,
	integrationData: {
		orcamento: {
			formaPagamentoEscolhida: {
				codigoFormaPagamento: 62,
				quantidadeParcelas: 6,
			},
		},
	},
	orderNumber: '3000662188',
	orderPaymentId: '8c931e0a-06ee-49df-b248-1f9db6223239',
	productCode: '61',
	proposalId: '1131479',
	scope: 'auto',
	status: 'PAGA',
	transactionId: '30006958801',
}

const HANDLER_VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE = [
	JSON.stringify(HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE),
]

const HANDLER_VALID_INPUT_PAYLOAD_VALUE =
	factory.sqsMockedLambdaPayload.getPayload(
		HANDLER_VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE
	)

exports.HANDLER_VALID_INPUT_PAYLOAD = () => {
	return HANDLER_VALID_INPUT_PAYLOAD_VALUE
}

exports.HANDLER_SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.HANDLER_FIRST_RECORD_PROCESSING_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: HANDLER_VALID_INPUT_PAYLOAD_VALUE.Records[0].messageId,
			},
		],
	}
}

const HANDLER_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE =
	factory.sqsMockedLambdaPayload.getPayload(['{ invalid: "JSON" }'])

exports.HANDLER_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM = () => {
	return HANDLER_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE
}

exports.HANDLER_FIRST_RECORD_PROCESSING_JSON_FORMAT_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier:
					HANDLER_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE
						.Records[0].messageId,
			},
		],
	}
}

exports.SENSEDIA_CARBON_CLOUD = () => {
	return 'token'
}

exports.VALID_CONTROLLER_INPUT_REQUEST = (constructor = {}) => {
	return {
		amount: 100,
		chargeId: '9cddfa67-30d3-4d53-b843-f12b2737d559',
		charges: [
			{
				amount: 100,
				creditCard: {
					id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
					preferred: true,
					saveCard: false,
				},
				paymentMethod: 'CREDIT_CARD',
			},
		],
		contactEmail: 'teste@teste.com.br',
		externalId: '201131479',
		installments: 1,
		integrationData: {
			orcamento: {
				formaPagamentoEscolhida: {
					codigoFormaPagamento: 62,
					quantidadeParcelas: 6,
				},
			},
		},
		orderNumber: '3000662188',
		orderPaymentId: '8c931e0a-06ee-49df-b248-1f9db6223239',
		productCode: '61',
		proposalId: '1131479',
		scope: 'auto',
		status: 'PAGA',
		transactionId: '30006958801',
	}
}

exports.CONTROLLER_SUCCESS_RESPONSE = (constructor = {}) => {
	return {
		statusCode: 200,
		body: constructor.body,
	}
}
