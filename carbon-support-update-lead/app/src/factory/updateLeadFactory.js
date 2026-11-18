const { json2xml } = require('xml-js')

exports.getPayload = (data) => {
	validateNomeSocial(data)

	const payloadDataJsonString = JSON.stringify({ lead: data })

	const payloadDataXmlString = json2xml(payloadDataJsonString, {
		compact: true,
		spaces: 0,
	})

	return {
		LeadXml: payloadDataXmlString.replace('\n', ''),
	}
}

function validateNomeSocial(data) {
	data.nomeSocial ??= ''
}
