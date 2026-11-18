exports.VALID_INPUT_MESSAGE = () => {
	return { teste: 123 }
}

exports.VALID_MESSAGE = () => {
	return JSON.stringify(this.VALID_INPUT_MESSAGE())
}

exports.VALID_RESPONSE = () => {
	return { MessageId: '12345678-1111-2222-3333-111122223333' }
}
