const CONSTANT = require('../../../../property')
const { SAP_CDC_PFP_PRODUCTS } = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.getHeaders = () => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: CONSTANT.ZENVIA_API_AUTHORIZATION_HEADER_VALUE,
	}

	return headers
}

exports.getPayload = (data, idLead) => {
	const productId = SAP_CDC_PFP_PRODUCTS[data.product]
	const cellphone = data.client.cellPhone.replace(
		CONSTANT.PHONENUMBER_CLEANUP_REGEX,
		''
	)
	
	const nomeSocial = data.client.nomeSocial && data.client.nomeSocial.trim() ? data.client.nomeSocial.trim() : null;
	const nome = nomeSocial || data.client.fullName;

	const payload = {
		destination: cellphone,
		outboundNumber: CONSTANT.WHATSAPPBOT_OUTBOUND_NUMBER,
		templateId: CONSTANT.WHATSAPPBOT_TEMPLATE_ID,
		fields: {
			campanha: CONSTANT.WHATSAPPBOT_FIELD_CAMPANHA,
			button_1: CONSTANT.WHATSAPPBOT_FIELD_BUTTON_1,
			nome: nome,
		},
		context: {
			envPorto: CONSTANT.WHATSAPPBOT_CONTEXT_ENVPORTO,
			nome: nome,
			nomeSocial: data.client.nomeSocial,
			nomeCivil: data.client.fullName,
			cpf_cnpj: data.client.cpfCnpj,
			email: data.client.email,
			cep: data.address.zipCode,
			origem: CONSTANT.WHATSAPPBOT_CONTEXT_ORIGEM,
			campanha: CONSTANT.WHATSAPPBOT_CONTEXT_CAMPANHA,
			programa: CONSTANT.WHATSAPPBOT_CONTEXT_PROGRAMA,
			id_produto: CONSTANT.WHATSAPPBOT_CONTEXT_ID_PRODUTO,
			id_ramo: `${productId}`,
			templateId: CONSTANT.WHATSAPPBOT_CONTEXT_TEMPLATEID,
			template_name: CONSTANT.WHATSAPPBOT_CONTEXT_TEMPLATE_NAME,
			id_tipo_produto: CONSTANT.WHATSAPPBOT_CONTEXT_ID_TIPO_PRODUTO,
			idLead: idLead,
			nome_produto: CONSTANT.WHATSAPPBOT_CONTEXT_NOME_PRODUTO,
		},
		restartContact: CONSTANT.WHATSAPPBOT_RESTARTCONTACT,
	}

	return payload
}
