const MOCKS = require('../../../../index.mock')

const VALID_PARSEDSQSMESSAGE_INPUT_VALUE =
	MOCKS.CONTROLLER_PROCESSSSQSMESSAGE.VALID_PARSEDJSONQUEUEMESSAGE_INPUT()

exports.VALID_PARSEDSQSMESSAGE_INPUT = () => {
	return VALID_PARSEDSQSMESSAGE_INPUT_VALUE
}

const VALID_POSTCREATESERVICEORDERRESPONSE_INPUT_VALUE = {
	serviceOrderNumber: '12345-24',
}

exports.VALID_POSTCREATESERVICEORDERRESPONSE_INPUT = () => {
	return VALID_POSTCREATESERVICEORDERRESPONSE_INPUT_VALUE
}

exports.VALID_RETURN = () => {
	return {
		...VALID_PARSEDSQSMESSAGE_INPUT_VALUE,
		integrationData: {
			...VALID_PARSEDSQSMESSAGE_INPUT_VALUE.integrationData,
			serviceOrderNumber:
				VALID_POSTCREATESERVICEORDERRESPONSE_INPUT_VALUE.serviceOrderNumber,
		},
	}
}

exports.GETSENDMESSAGEATTRIBUTES_VALID_RETURN = () => {
	return {
		eventId:
			VALID_POSTCREATESERVICEORDERRESPONSE_INPUT_VALUE.serviceOrderNumber,
		eventType: 'SERVICE_ORDER_RECEIVED',
	}
}

exports.VALID_PARSEDSQSMESSAGE_WITH_COMBO_INPUT = () => {
	const basePayload = exports.VALID_PARSEDSQSMESSAGE_INPUT()
	return {
		...basePayload,
		integrationData: {
			...basePayload.integrationData,
			serviceOrder: {
				...basePayload.integrationData.serviceOrder,
				combo: {
					id: 'COMBO-001',
					items: [
						{
							productId: 'PROD-A',
							quantity: 1,
						},
						{
							productId: 'PROD-B',
							quantity: 2,
						},
					],
				},
			},
		},
	}
}

exports.VALID_RETURN_WITH_COMBO = () => {
	const baseReturn = exports.VALID_RETURN()
	return {
		...baseReturn,
		integrationData: {
			...baseReturn.integrationData,
			serviceOrder: {
				...baseReturn.integrationData.serviceOrder,
				combo: {
					id: 'COMBO-001',
					items: [
						{
							productId: 'PROD-A',
							quantity: 1,
						},
						{
							productId: 'PROD-B',
							quantity: 2,
						},
					],
				},
			},
		},
	}
}

exports.GETSENDMESSAGEATTRIBUTES_VALID_INPUT = '98765-24'

exports.GETSENDMESSAGEATTRIBUTES_VALID_RETURN = () => {
	return {
		eventId: exports.GETSENDMESSAGEATTRIBUTES_VALID_INPUT,
		eventType: 'SERVICE_ORDER_RECEIVED',
	}
}

exports.GETSENDMESSAGEATTRIBUTES_EMPTY_INPUT_RETURN = () => {
	return {
		eventId: '',
		eventType: 'SERVICE_ORDER_RECEIVED',
	}
}
