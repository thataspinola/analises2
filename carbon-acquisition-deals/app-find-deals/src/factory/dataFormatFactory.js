exports.buildResponse = (cpf, deals) => {
	const response = {
		cpf,
		createdAt: new Date(),
		eligibility: getDataFromScope('eligibility', deals),
		creditCards: getDataFromScope('porto-pay-cards', deals),
		goodCard: getDataFromScope('good-card', deals),
		cardProposals: getDataFromScope('card-proposals', deals),
		portoTag: getDataFromScope('porto-tag', deals),
	}
	return response
}

const getDataFromScope = (scope, deals) => {
	const item = deals.find((el) => el.scope === scope)

	if (item) {
		return {
			status: '200',
			message: 'success',
			data: getFormatedData(scope, item.data),
		}
	}

	return {
		status: '404',
		message: 'not found',
	}
}

const scopeToDataFormater = {
	'good-card': (data) => ({ cards: data }),
	'porto-pay-cards': (data) => ({ cards: data }),
}

const getFormatedData = (scope, data) => {
	const jsonData = JSON.parse(data)
	const formatFunction = scopeToDataFormater[scope]
	return formatFunction ? formatFunction(jsonData) : jsonData
}
