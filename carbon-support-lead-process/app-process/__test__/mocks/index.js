exports.LEAD_CONTROLLER = require("./controller/leadController.mock")
exports.ACTIVITY_TOKEN_CLOUD = require("./controller/activity/getTokenCarbonCloudActivity.mock")
exports.ACTIVITY_TOKEN = require("./controller/activity/getTokenCarbonActivity.mock")
exports.ACTIVITY_DYNAMICS = require("./controller/activity/createLeadDynamicsActivity.mock")
exports.ACTIVITY_VALIDATION = require("./controller/activity/validationActivity.mock")

const factory = require('../utils/factory')

const PROCESSCONTACT_SUCCESS_RETURN_BODY_VALUE = {}

exports.PROCESSCONTACT_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: PROCESSCONTACT_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.VALID_INPUT_DATA = () => {
    return {
        "scope": "auto",
        "client": {
            "cpf": "58489669074",
            "name": "Maria Santos",
            "socialName": "José Santos",
            "cellPhone": "11222225555",
            "residentialPhone": "(11)2222-3333",
            "email": "email@dominio.com"
        },
        "address": {
            "zipCode": "13013161"
        },
        "idBranch": "27",
        "idProduct": "1",
        "idProductType": "2",
        "origin": "35",
        "reference": "hub",
        "vdoCode": "1747741319817",
        "pmcInfo": "string - pmc_observacoes",
        "marketingOptInFlag": true,
        "sessionId": "2023102119547179841726-6T4XUGKR",
        "ipAddress": "10.95.174.37",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "susepCode": null,
        "phoneOperationCode": "570"
    }
    
}

const VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE = JSON.stringify({
	formData: this.VALID_INPUT_DATA(),
})

const VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE = [
	VALID_INPUT_PAYLOAD_RECORD_BODY_VALUE
]

const VALID_INPUT_PAYLOAD_VALUE = factory.sqsMockedLambdaPayload.getPayload(
	VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE
)

exports.VALID_INPUT_PAYLOAD = () => {
	return VALID_INPUT_PAYLOAD_VALUE
}


const INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE =
	factory.sqsMockedLambdaPayload.getPayload(['{ invalid: "JSON"'])

exports.INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM = () => {
	return INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE
}

exports.FIRST_RECORD_PROCESSING_JSON_FORMAT_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier:
					INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE.Records[0]
						.messageId,
			},
		],
	}
}

exports.SERVICE_LOGGER_ERROR_MESSAGE_JSON_PARSE_ERROR = () => {
	return 'Processing JSON parse error: Unexpected token i in JSON at position 2'
}

exports.FIRST_RECORD_PROCESSING_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: VALID_INPUT_PAYLOAD_VALUE.Records[0].messageId,
			},
		],
	}
}