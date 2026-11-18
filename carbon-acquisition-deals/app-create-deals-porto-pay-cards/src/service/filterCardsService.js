exports.filter = (data) => {
	const updatedCardList = uppercaseBandeira(data)

	return updatedCardList.filter(
		(cartao) =>
			cartao.bandeira === 'VISA' ||
			cartao.bandeira === 'MASTERCARD' ||
			cartao.bandeira === 'ELO'
	)
}

function uppercaseBandeira(cardList) {
	return cardList.map((card) => {
		return {
			...card,
			bandeira: card.bandeira.toUpperCase(),
		}
	})
}
