exports.VALID_DATA = () => {
	return {
		scope: 'scope',
		document: 'document',
	}
}

exports.VALID_DATA_GET = () => {
	return {
		document: 'document',
	}
}

exports.VALID_DYNAMO_RESPONSE_GET = () => {
	return {
		Items: [
			{
				scope: 'scope',
				document: 'document',
			},
		],
	}
}

exports.VALID_REPOSITORY_RESPONSE_GET = () => {
	return [
		{
			scope: 'scope',
			document: 'document',
		},
	]
}
