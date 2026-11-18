exports.VALID_DOCUMENT = () => {
	return '12345678900'
}

exports.VALID_DATA_DEALS = () => {
	return [
		{ scope: 'eligibility', data: '{"eligibility": true}' },
		{
			scope: 'porto-pay-cards',
			data: '{"creditCards": ["card1", "card2"]}',
		},
		{ scope: 'good-card', data: '{"goodCard": "card3"}' },
		{
			scope: 'card-proposals',
			data: '{"cardProposals": ["proposal1", "proposal2"]}',
		},
		{
			scope: 'porto-tag',
			data: '{"portoTag": ["tag1", "tag2"]}',
		},
	]
}

exports.VALID_RESPONSE = () => {
	return {
		cpf: this.VALID_DOCUMENT(),
		createdAt: expect.any(Date),
		eligibility: {
			status: '200',
			message: 'success',
			data: { eligibility: true },
		},
		creditCards: {
			status: '200',
			message: 'success',
			data: { cards: { creditCards: ['card1', 'card2'] } },
		},
		goodCard: {
			status: '200',
			message: 'success',
			data: { cards: { goodCard: 'card3' } },
		},
		cardProposals: {
			status: '200',
			message: 'success',
			data: { cardProposals: ['proposal1', 'proposal2'] },
		},
		portoTag: {
			status: '200',
			message: 'success',
			data: { portoTag: ['tag1', 'tag2'] },
		},
	}
}

exports.VALID_DATA_DEALS_WITHOUD_GOOD_CARD = () => {
	return [
		{ scope: 'eligibility', data: '{"eligibility": true}' },
		{ scope: 'porto-pay-cards', data: '{"creditCards": ["card1", "card2"]}' },
		{
			scope: 'card-proposals',
			data: '{"cardProposals": ["proposal1", "proposal2"]}',
		},
		{ scope: 'porto-tag', data: '{"portoTag": ["tag1", "tag2"]}' },
	]
}

exports.VALID_RESPONSE_WITH_404_NOT_FOUND = () => {
	return {
		cpf: this.VALID_DOCUMENT(),
		createdAt: expect.any(Date),
		eligibility: {
			status: '200',
			message: 'success',
			data: { eligibility: true },
		},
		creditCards: {
			status: '200',
			message: 'success',
			data: { cards: { creditCards: ['card1', 'card2'] } },
		},
		goodCard: {
			status: '404',
			message: 'not found',
		},
		cardProposals: {
			status: '200',
			message: 'success',
			data: { cardProposals: ['proposal1', 'proposal2'] },
		},
		portoTag: {
			status: '200',
			message: 'success',
			data: { portoTag: ['tag1', 'tag2'] },
		},
	}
}
