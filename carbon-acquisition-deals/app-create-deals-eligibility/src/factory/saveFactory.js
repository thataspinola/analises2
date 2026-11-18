exports.build = (document, response) => {
	return {
		scope: 'eligibility',
		document,
		data: JSON.stringify(response),
	}
}
