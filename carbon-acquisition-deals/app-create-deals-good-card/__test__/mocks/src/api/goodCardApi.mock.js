exports.VALID_RESPONSE_SUCCESS = () => {
	return [
		{
			riskScore: 0,
			accountNumber: 10406,
			accountCreationDate: 20201007,
			aditionalCard: 'N',
			cardNumber: '412177XXXXXX2112',
			accountScore: 0,
			dueDate: 0,
			expirationDateCrypt: 'SkGJ2wo/88PaqsC6bY10bw==',
			expirationDate: 202310,
			cvvNumberCrypt: 'NH6ICXHYW7jmToibkHVrwQ==',
			cycleDate: 26,
			cardStatus: 'M',
			accountStatus1: '',
			product: 1,
			accountStatus2: '',
			behaviourScore: 0,
			goodCard: 'S',
			cardNumberCrypt: 'bI7jQXtI7yRTJzSVKm7L2+SbdNAik92b0VHiuGqLu5M=',
		},
	]
}

exports.VALID_PAYLOAD = () => {
	return {
		cpf: '05636844964',
	}
}

exports.SENSIDIA_TOKEN = () => {
	return '123456'
}
