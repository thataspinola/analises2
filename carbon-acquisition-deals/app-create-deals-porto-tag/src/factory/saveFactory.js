exports.build = (document, response) => {
	return {
		scope: 'porto-tag',
		document,
		data: JSON.stringify(response),
	}
}
