const MOCKS_FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_PROCESSEDDATAREPORT = require('../factory/controller/setServiceOrderCheckinData/index.mock')

const PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_PAYLOAD_INPUT_VALUE = {
	carbonTraceId: '12345',
	externalId: '2410987',
	amount: 98.72,
	integrationData: {
		serviceOrderNumber: '1087606-24',
		serviceOrder: {
			schedule: {
				startDateTime: '2024-09-26T08:00:00.000',
			},
			serviceId: '100',
			sku: 'ED001',
			specialtyCode: '44',
			subject: 'UI1',
		},
		customer: {
			name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
			socialName: '',
			email: 'fulano.silva@gmail.com',
			cellphone: '11222225555',
			documentNumber: '58489669074',
		},
		serviceAddress: {
			city: 'Sao Paulo',
			state: 'SP',
			zipCode: '01310100',
			neighborhood: 'Bela Vista',
			street: 'Avenida Paulista',
			streetNumber: '982',
			additionalInfo: '',
		},
	},
}

exports.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSONQUEUEMESSAGE_INPUT = () => {
	return {
		payload: {
			reservationKey: '02092024193000161456',
			serviceOrderNumber: '1085516',
			serviceOrderYear: '24',
		},
	}
}

exports.PROCESS_PAYLOAD_SERVICE_ORDER_HANDLE_ERRORS = () => ({
	payload: {
		reservationKey: '02092024193000161456',
		serviceOrderNumber: '1085516',
		serviceOrderYear: '24',
		integrationData: {
			serviceOrder: {},
		},
	},
})

exports.PROCESS_EXCEPTION_SIMULATE_MESSAGE = () => {
	return 'Erro no processamento de mensagem da fila: Erro recebido da chamada da API: código \'500\' dados: \'{ "message": "Simulação de falha" }\''
}

exports.PROCESS_VALID_MESSAGEID_INPUT = () => {
	return 'd7c1792c-5e09-4e91-9bbe-f70642df481f'
}

exports.PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_PAYLOAD_INPUT = () => {
	return PROCESS_VALID_PARSEDJSONQUEUEMESSAGE_PAYLOAD_INPUT_VALUE
}

exports.PROCESS_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Validation error'
}

exports.PROCESS_INPUT_VALIDATION_CPFCNPJ_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento de mensagem da fila: Número de CPF/CNPJ inválido'
}

exports.PROCESS_UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Unexpected validation error'
}

exports.PROCESS_VALID_RETURN = () => {
	return MOCKS_FACTORY_CONTROLLER_PROCESSSNSSQSMESSAGE_PROCESSEDDATAREPORT.GETDATAREPORT_COUPONREDEEMRESPONSE_VALID_INPUT()
}

exports.PROCESS_GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return 'General error'
}
