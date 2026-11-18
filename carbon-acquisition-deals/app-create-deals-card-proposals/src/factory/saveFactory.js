exports.build = (document, response) => {
	return {
		scope: 'card-proposals',
		document,
		data: JSON.stringify(response),
	}
}
