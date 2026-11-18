exports.RESPONSE_CONSENTS_API = () => {
	return {
		opt: true
	}
}

exports.INPUT_SUBMIT_CONSENTS = () => {
    return {
        inputData: {}, 
        sensediaToken: 'token', 
        traceId: 'traidId'
    }
}