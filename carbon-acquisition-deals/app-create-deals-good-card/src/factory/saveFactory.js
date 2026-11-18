exports.build = (document, response) => {
	return {
		scope: 'good-card',
		document: document,
		data: JSON.stringify(response),
	}
}
