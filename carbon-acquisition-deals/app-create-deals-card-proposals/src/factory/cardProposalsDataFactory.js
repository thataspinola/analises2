exports.getSaveDealsData = (cardProposals) => {
	return cardProposals?.map(function (cardProposal) {
		return { codigoProposta: cardProposal.codigoProposta }
	})
}
