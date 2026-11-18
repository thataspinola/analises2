exports.sort = (cards) => {
	return cards.sort((a, b) => {
		const getPriority = (card) => {
			if (card.cartaoPorto && card.bandeira === 'VISA') return 1
			if (card.cartaoPorto && card.bandeira === 'MASTERCARD') return 2
			if (!card.cartaoPorto && card.bandeira === 'VISA') return 3
			if (!card.cartaoPorto && card.bandeira === 'MASTERCARD') return 4
			return 5
		}

		const priorityA = getPriority(a)
		const priorityB = getPriority(b)

		if (priorityA < priorityB) {
			return -1
		} else if (priorityA > priorityB) {
			return 1
		} else {
			return 0
		}
	})
}
