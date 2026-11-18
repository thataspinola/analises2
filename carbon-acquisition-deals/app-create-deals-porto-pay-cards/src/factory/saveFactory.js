exports.build = (document, response) => {
	return {
		scope: 'porto-pay-cards',
		document: document,
		data: JSON.stringify(response),
	}
}
