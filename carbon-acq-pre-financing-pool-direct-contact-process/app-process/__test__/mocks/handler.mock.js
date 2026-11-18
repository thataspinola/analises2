const factory = require('../utils/factory')
const CONSTANT = require('../../src/property')
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

const VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE = {
	fullName: 'Nomeir Sobrenomeson',
	socialName: 'NS test',
	cpfCnpj: '06963752060',
	cellPhone: '1198754422',
	email: 'cliente@clienteproduto.com.br',
}

const VALID_INPUT_PAYLOAD_PJ_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE = {
	fullName: 'Nomeir Sobrenomeson',
	cpfCnpj: '02860136000105',
	cellPhone: '1198754422',
	email: 'cliente@clienteproduto.com.br',
	socialName: '',
}

const VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG_RECORD_BODY = {
	lead: { vdoCode: "1776254740509", branchId: "24"},
}

const VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE = {
	client: VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE,
	address: {
		zipCode: '01254-985',
	},
	marketingOptOutFlag: false,
	lead: { vdoCode: "1776254740509"},
	channel: 'whatsapp',
	product: 'AUTOMOVEL',
}

const VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE = {
	client: VALID_INPUT_PAYLOAD_PJ_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE,
	address: {
		zipCode: '01254-985',
	},
	marketingOptOutFlag: false,
	lead: { vdoCode: "1776254740509"},
	channel: 'whatsapp',
	product: 'AUTOMOVEL',
}

const VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_VALUE = JSON.stringify({
	flag: commonLibrary.CREATE_PRE_FINANCING_FLAG,
	formData: VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE,
})

const VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_VALUE = JSON.stringify({
	flag: commonLibrary.CREATE_PRE_FINANCING_FLAG,
	formData: VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE,
})

const VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA_VALUE = {
	client: {
		fullName: 'Nomeneide Sobrenomelin',
		cpfCnpj: '06963752060',
		cellPhone: '1198754422',
		email: 'nomeneidesm@emaildomain.com',
		socialName: 'NS test',
	},
	address: {
		zipCode: '01245-875',
	},
	marketingOptOutFlag: true,
	lead: { vdoCode: "1776254740509"},
	channel: 'telephone',
	product: 'AUTOMOVEL',
}

const VALID_INPUT_PAYLOAD_TELEPHONE_CNPJ_RECORD_BODY_FORMDATA_VALUE = {
	client: {
		fullName: 'Nomeneide Sobrenomelin',
		cpfCnpj: '02860136000105',
		cellPhone: '1198754422',
		email: 'nomeneidesm@emaildomain.com',
		socialName: '',
	},
	address: {
		zipCode: '01245-875',
	},
	marketingOptOutFlag: true,
	lead: { vdoCode: "1776254740509"},
	channel: 'telephone',
	product: 'AUTOMOVEL',
}

const VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_VALUE = JSON.stringify({
	flag: commonLibrary.CREATE_PRE_FINANCING_FLAG,
	formData: VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA_VALUE,
})

const VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE = [
	VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_VALUE,
	VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_VALUE,
]

const VALID_INPUT_PAYLOAD_VALUE = factory.sqsMockedLambdaPayload.getPayload(
	VALID_INPUT_PAYLOAD_RECORDS_BODY_VALUE
)

exports.FIRST_RECORD_PROCESSING_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: VALID_INPUT_PAYLOAD_VALUE.Records[0].messageId,
			},
		],
	}
}

const INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE =
	factory.sqsMockedLambdaPayload.getPayload(['{ invalid: "JSON"'])
exports.INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM = () => {
	return INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT_FIRST_ITEM_VALUE
}

const INPUT_PAYLOAD_WITHOUT_FLAG = 
	factory.sqsMockedLambdaPayload.getPayload([JSON.stringify(
		VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA_VALUE
	)])
exports.INPUT_PAYLOAD_WITHOUT_FLAG = () => {
	return INPUT_PAYLOAD_WITHOUT_FLAG
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

exports.FIRST_RECORD_PROCESSING_JSON_WITHOUT_FLAG_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier:
					INPUT_PAYLOAD_WITHOUT_FLAG.Records[0]
					.messageId,
			},
		],
	}
}

exports.VALID_INPUT_PAYLOAD = () => {
	return VALID_INPUT_PAYLOAD_VALUE
}


const VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG = [
	JSON.stringify({
		flag: commonLibrary.UPDATE_PRE_FINANCING_FLAG,
		formData: VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG_RECORD_BODY
	})
]

exports.VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG = () => {
	return factory.sqsMockedLambdaPayload.getPayload(VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG)
}

exports.SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT = () => {
	return VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE
}

exports.VALID_INPUT_PAYLOAD_PJ_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT = () => {
	return VALID_INPUT_PAYLOAD_PJ_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT_VALUE
}

exports.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY = () => {
	return VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_VALUE
}

exports.VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY = () => {
	return VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_VALUE
}

exports.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA = () => {
	return VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE
}

exports.VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY = () => {
	return VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_VALUE
}

exports.VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA = () => {
	return VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA_VALUE
}

exports.VALID_INPUT_PAYLOAD_TELEPHONE_CNPJ_RECORD_BODY_FORMDATA = () => {
	return VALID_INPUT_PAYLOAD_TELEPHONE_CNPJ_RECORD_BODY_FORMDATA_VALUE
}

exports.VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA = () => {
	return VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_VALUE
}

exports.VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG_RECORD_BODY = () => {
	return VALID_INPUT_PAYLOAD_WITH_UPDATE_FLAG
}

exports.VALID_SECOUND_INPUT_PAYLOAD_WITH_UPDATE_FLAG_RECORD_BODY = (vdoCode) => {
	return [
		JSON.stringify({
			flag: commonLibrary.UPDATE_PRE_FINANCING_FLAG,
			formData: {lead: { vdoCode: vdoCode, branchId: "24"}}
		})
	] 
}