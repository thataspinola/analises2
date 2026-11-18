const factory = require('../utils/factory')

exports.CONTROLLER = require('./controller/checkInspectionRequest.mock')
exports.LOGGER = require('./service/loggerService.mock')
exports.DYNAMODB = require('./service/dynamoDbService.mock')
exports.VALIDATION = require('./service/validationService.mock')
exports.DLQ = require('./service/dlqService.mock')
exports.API_AUTO_QUOTATIONS = require('./api/autoQuotationsApi.mock')
exports.API_PAYMENT_REGISTER = require('./api/paymentRegisterApi.mock')
exports.STATUS_FACTORY = require('./factory/statusFactory.mock');
exports.PUT_PAYMENT_REGISTER_FACTORY = require('./factory/putPaymentRegisterFactory.mock')
exports.TTL_FACTORY = require('./factory/ttlFactory.mock')
exports.INPUT_BODY_FACTORY = require('./factory/inputBodyFactory.mock')


const HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE = {
	orderNumber: '3000617082',
	externalId: '00001',
	productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
	scope: 'auto',
	amount: 100,
	contactEmail: 'teste@teste.com.br',
	installments: 1,
	idTransaction: '00123456',
	inspectionStatusProcessCount: 0,
	inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
	quotationNumber: '30000572475',
}

const HANDLER_VALID_INPUT_PAYLOAD_RECORDS_SQS_BODY_VALUE = [
	JSON.stringify(HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE),
]

const HANDLER_VALID_INPUT_SQS_PAYLOAD_VALUE =
	factory.sqsMockedLambdaPayload.getPayload(
		HANDLER_VALID_INPUT_PAYLOAD_RECORDS_SQS_BODY_VALUE
	)

const HANDLER_VALID_INPUT_DB_PAYLOAD_VALUE =
	factory.dbMockedLambdaPayload.getPayload(
		[HANDLER_VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE]
	)

exports.HANDLER_VALID_INPUT_SQS_PAYLOAD = () => {
	return HANDLER_VALID_INPUT_SQS_PAYLOAD_VALUE
}

exports.HANDLER_VALID_INPUT_DB_PAYLOAD = () => {
	return HANDLER_VALID_INPUT_DB_PAYLOAD_VALUE
}

exports.HANDLER_SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.HANDLER_FIRST_RECORD_PROCESSING_SQS_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: HANDLER_VALID_INPUT_SQS_PAYLOAD_VALUE.Records[0].messageId,
			},
		],
	}
}

exports.HANDLER_FIRST_RECORD_PROCESSING_DB_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier:
					HANDLER_VALID_INPUT_DB_PAYLOAD_VALUE.Records[0].dynamodb.SequenceNumber,
			},
		],
	}
}
