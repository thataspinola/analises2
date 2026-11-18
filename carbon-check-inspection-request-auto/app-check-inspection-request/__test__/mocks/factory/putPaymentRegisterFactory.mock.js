exports.GETPAYLOAD_PAYMENTREADY_VALID_RETURN = () => {
	return {
		scope: 'auto',
		idTransaction: '00123456',
		status: 'PROPOSTA PENDENTE - AGUARDANDO PAGAMENTO',
		proposalData: {
			proposalId: '1132468',
			externalId: '2001132468',
		},
	}
}

exports.GETPAYLOAD_PAYMENTREADYSTATUS_INPUT = () => {
	return 'PROPOSTA PENDENTE - AGUARDANDO PAGAMENTO'
}

exports.GETPAYLOAD_TRANSACTIONID_INPUT = () => {
	return '00123456'
}

exports.GETPAYLOAD_PROPOSALID_INPUT = () => {
	return '1132468'
}

exports.GETPAYLOAD_PROPOSALORIGIN_INPUT = () => {
	return '20'
}