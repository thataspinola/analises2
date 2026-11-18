exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}

const PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE = {
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


const PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE_DROM_DB = {
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
	receivedFromDb: true,
}

const PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE_WITH_PAYMENT_ERROR = {
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
	receivedFromDb: true,
	attemptAfterPaymentError: true
}

exports.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT = () => PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE

exports.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB = () => PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE_DROM_DB

exports.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_FROM_DB_AFTER_PAYMENT_ERROR = () => PROCESS_VALID_PARSEDMESSAGEBODY_INPUT_VALUE_WITH_PAYMENT_ERROR

exports.PROCESS_INVALID_PARSEDMESSAGEBODY_INPUT = () => {
	return {
		orderNumber: '3000617082',
		externalId: '00001',
		productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
		scope: 'auto',
		amount: 100,
		contactEmail: 'teste@teste.com.br',
		installments: 1,
		idTransaction: '00123456',
		inspectionStatusProcessCount: 0,
		quotationNumber: '30000572475',
	}
}