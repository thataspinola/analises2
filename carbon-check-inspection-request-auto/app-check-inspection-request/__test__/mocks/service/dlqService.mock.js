const SENDMESSAGECOMMAND_VALID_RESPONSE_MESSAGEID_VALUE =
	'd5f6aa22-a863-4df9-9763-37ab760a3866'

const SENDMESSAGECOMMAND_VALID_RESPONSE_VALUE = {
	MessageId: SENDMESSAGECOMMAND_VALID_RESPONSE_MESSAGEID_VALUE,
}

exports.SENDMESSAGECOMMAND_VALID_RESPONSE = () => {
	return SENDMESSAGECOMMAND_VALID_RESPONSE_VALUE
}

exports.SENDMESSAGE_VALID_RETURN = () => {
	return SENDMESSAGECOMMAND_VALID_RESPONSE_MESSAGEID_VALUE
}

const GETMESSAGE_VALID_RETURN = {
    orderNumber: '3000617082',
    externalId: '00001',
    productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
    scope: 'auto',
    amount: 100,
    contactEmail: 'teste@teste.com.br',
    installments: 1,
    idTransaction: '00123456',
    proposalId: '0012345689',
    proposalOrigin: '20',
    inspectionStatusProcessCount: 0,
    inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
    inspectionStatus: 'PENDING',
    quotationNumber: '30000572475',
}

exports.SENDMESSAGE_MESSAGE_INPUT = () => {
	return GETMESSAGE_VALID_RETURN
}
