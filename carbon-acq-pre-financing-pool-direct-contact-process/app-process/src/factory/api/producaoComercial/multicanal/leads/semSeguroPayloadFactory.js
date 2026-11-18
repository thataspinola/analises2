const { json2xml } = require('xml-js')
const CONSTANT = require('../../../../../property')
const {
	WHATSAPP_CONTACT_REQUEST_CHANNEL_WHATSAPP,
	SAP_CDC_PFP_PRODUCTS,
} = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.getPayload = (data, pescod, fromCNPJ) => {
	const productId = SAP_CDC_PFP_PRODUCTS[data.product]
	const cellphone = data.client.cellPhone.replace(
		CONSTANT.PHONENUMBER_CLEANUP_REGEX,
		''
	)

	const nomeSocial = data.client.socialName ?? ''

	const payloadData = {
		lead: {
			nome: data.client.fullName,
			email: data.client.email,
			nome_social: nomeSocial,
			ddd_celular: cellphone.substring(0, 2),
			tel_celular: cellphone.substring(2),
			cep: data.address.zipCode,
			origem:
				data.channel === WHATSAPP_CONTACT_REQUEST_CHANNEL_WHATSAPP
					? CONSTANT.LEAD_ORIGEM_WHATSAPP
					: CONSTANT.LEAD_ORIGEM_HUB_LIGUEME,
			id_produto: CONSTANT.LEAD_ID_PRODUTO,
			id_ramo: productId,
			pmc_programa: CONSTANT.LEAD_PMC_PROGRAMA,
			lgpd: {
				compartilhamento: 'sim',
				consentimento: 'sim',
				marketing: data.marketingOptOutFlag ? 'nao' : 'sim',
				aceite: 'sim',
				pescod: pescod,
			},
			referencia: data.reference ?? CONSTANT.LEAD_REFERENCIA,
		},
	}

	if(data.lead?.vdoCode){
		payloadData.lead.codigo_vdo = data.lead?.vdoCode
	}

	if(data.budget){
		const budget = {
			iof: data.budget.iof,
			validade_cotacao: data.budget.quotationValidity,
			parcelas: data.budget.installments,
			valor_parcelas: data.budget.installmentValue,
			valor_a_vista: data.budget.fullPaymentValue,
			preco_a_vista_outros: data.budget.fullPaymentPriceOthers,
			preco_parcela_outros: data.budget.installmentPriceOthers
		}

		payloadData.lead.dados_pagamento = budget
	}

	if (data.id_google) {
		payloadData.lead.id_google = data.id_google
	}

	const dataUtmKeys = Object.keys(data).filter((dataKey) =>
		dataKey.toLowerCase().startsWith('utm_')
	)

	dataUtmKeys.forEach((dataUtmKey) => {
		payloadData.lead[`${dataUtmKey}`] = data[`${dataUtmKey}`]
	})

	if (fromCNPJ) {
		payloadData.lead = {
			...payloadData.lead,
			cnpj: data.client.cpfCnpj,
		}
	} else {
		payloadData.lead = {
			...payloadData.lead,
			cpf: data.client.cpfCnpj,
		}
	}

	const payloadDataJsonString = JSON.stringify(payloadData)

	const payloadDataXmlString = json2xml(payloadDataJsonString, {
		compact: true,
		spaces: 0,
	})

	return {
		LeadXml: payloadDataXmlString.replace('\n', ''),
	}
}
