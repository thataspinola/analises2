const testsUtilFactory = require('../utils/factory')

const VALID_EVENT_SQSMESSAGES_VALUE = [
	{
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
	},
]

const VALID_EVENT_INPUT_VALUE =
	testsUtilFactory.sqsMockedLambdaPayload.getPayload(
		VALID_EVENT_SQSMESSAGES_VALUE,
		'791702935403',
		'ca-central-1',
		'791702935403',
		'carbon-acq-service-order-checkin'
	)

exports.VALID_EVENT_INPUT_RECORD_BODY = () => {
	return VALID_EVENT_INPUT_VALUE.Records[0].body
}

exports.VALID_EVENT_INPUT_RECORD_MESSAGEID = () => {
	return VALID_EVENT_INPUT_VALUE.Records[0].messageId
}

exports.VALID_EVENT_INPUT = () => {
	return VALID_EVENT_INPUT_VALUE
}

exports.SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.FIRST_RECORD_PROCESSING_FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: VALID_EVENT_INPUT_VALUE.Records[0].messageId,
			},
		],
	}
}
