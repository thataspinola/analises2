exports.getPayload = (parsedSQSMessage) => {
	const origem = parsedSQSMessage.externalId.substring(
		0,
		parsedSQSMessage.externalId.search(
			parsedSQSMessage.proposalId.padStart(8, '0')
		)
	) //TODO: Change this approach to a better one: changing the inspection status evaluate process, payment register to bring the Origem field until here
	return {
		origem: origem,
		proposta: parsedSQSMessage.proposalId,
		idTransacaoPagamento: parsedSQSMessage.transactionId,
		codigoFormaPagamento:
			parsedSQSMessage.integrationData.orcamento.formaPagamentoEscolhida
				.codigoFormaPagamento,
		quantidadeParcelas:
			parsedSQSMessage.integrationData.orcamento.formaPagamentoEscolhida
				.quantidadeParcelas,
		payment: {
			status: 'APPROVED',
			orderId: parsedSQSMessage.orderPaymentId,
			charges: [
				{
					id: parsedSQSMessage.chargeId,
				},
			],
		},
	}
}
