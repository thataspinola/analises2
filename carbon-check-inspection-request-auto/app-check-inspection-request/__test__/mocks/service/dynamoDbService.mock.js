const CONSTANT = require('../../../src/property')

const VALID_BODY = {
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

exports.DELETECOMMAND_VALID_RETURN = () => {
	return {
		ConsumedCapacity: {
			CapacityUnits: 1,
			TableName: CONSTANT.INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
		},
	}
}

exports.PUTCOMMAND_VALID_RETURN = () => {
	return {
		ConsumedCapacity: {
			CapacityUnits: 1,
			TableName: CONSTANT.INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME,
		},
	}
}

exports.GETCOMMAND_VALID_RETURN = () => {
	return {
		Item: {
			Message: VALID_BODY
		},
	}
}


exports.GETCOMMAND_INVALID_RETURN = () => {
	return { }
}

exports.VALID_BODY = () => VALID_BODY