const CONSTANT = require('../../property')
const {
	SAP_CDC_PFP_PRODUCTS,
	WHATSAPP_CONTACT_REQUEST_CHANNEL_WHATSAPP,
} = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const CryptoJS = require('crypto-js')
var aesjs = require('aes-js')

const getEncryptedKeyBuffer = (key) => {
	var key256 = CryptoJS.SHA256(key)
	var str = key256.toString(CryptoJS.enc.HEX)
	var bufferArray = []

	for (var i = 0; i < str.length; i++) {
		if (i % 2 != 0 && i != 0)
			bufferArray.push(parseInt(str[i - 1] + str[i], 16))
	}

	return bufferArray.slice(0, 16)
}

const encryptTextWithKey = (text, key) => {
	if (!text || !key) return false

	var textAsBytes = aesjs.utils.utf8.toBytes(text)
	var aes = new aesjs.AES(getEncryptedKeyBuffer(key))
	var encryptedBytes = aes.encrypt(aesjs.padding.pkcs7.pad(textAsBytes))

	return aesjs.utils.hex.fromBytes(encryptedBytes)
}

const taxvatEncrypt = (taxvat) => {
	const returnValue = encryptTextWithKey(taxvat, 'chave')
	return returnValue
}

const getProductId = (product) => {
	const sapCdcPfpProductKeys = Object.keys(SAP_CDC_PFP_PRODUCTS)
	const sapCdcPfpProductValues = Object.values(SAP_CDC_PFP_PRODUCTS)
	let productId = null
	const productKeyIndex = sapCdcPfpProductKeys.findIndex(
		(sapCdcPfpProductKey) => sapCdcPfpProductKey === product
	)
	if (productKeyIndex >= 0) {
		productId = sapCdcPfpProductValues[productKeyIndex]
	}
	return productId
}

const getSubproduct = (productId) => {
	const gaSubproductKeys = Object.keys(CONSTANT.GA_SUBPRODUCTS)
	const gaSubproductValues = Object.values(CONSTANT.GA_SUBPRODUCTS)
	let subproduct = null
	const subproductKeyIndex = gaSubproductKeys.findIndex(
		(gaSubproductKey) => gaSubproductKey == productId
	)
	if (subproductKeyIndex >= 0) {
		subproduct = gaSubproductValues[subproductKeyIndex]
	}
	return subproduct
}

exports.getSendAnalyticsCollectMessagePayload = (
	parsedInput,
	pescod,
	isCnpjDocument,
	leadId,
	leadVinculo
) => {
	const product = `${parsedInput.formData.product}`
	const clientId = `${parsedInput.formData.id_google}`

	const userId = taxvatEncrypt(parsedInput.formData.client.cpfCnpj)
	const vertical = 'bank'
	const produto = 'consorcio'
	const contactType =
		parsedInput.formData.channel === WHATSAPP_CONTACT_REQUEST_CHANNEL_WHATSAPP
			? 'whatsapp'
			: 'telefone'
	const leadType = isCnpjDocument ? 'pj' : 'pf'

	const leadMpParams_evCategory = `hub-vendas:${vertical}:produto:${produto}`
	const leadMpParams_evAction = `lead:${contactType}:${leadType}:enviar:sucesso`
	let valorVinculo = 'nao-definido'
	if (leadVinculo !== null) {
		valorVinculo = leadVinculo === '1' ? 'sim' : 'nao'
	}
	const leadMpParams_evLabel = `vinculo:${valorVinculo}`
	const leadMpParams_sessionId = `${parsedInput.formData.session_google}`
	const leadMpParams_timestamp = `${new Date().getTime()}`
	const leadMpParams_channel = 'hub-vendas'
	const leadMpParams_brand = 'porto'
	const leadMpParams_product = 'consorcio'
	const productId = getProductId(product)
	const leadMpParams_subProduct = getSubproduct(productId)
	const leadMpParams_leadId = `${leadId}`

	const payload = {
		client_id: clientId,
		user_id: userId,
		user_properties: {
			client_bcp: {
				value: `${pescod}`,
			},
			client_id: {
				value: userId,
			},
		},
		events: [
			{
				name: 'lead_mp',
				params: {
					ev_category: leadMpParams_evCategory,
					ev_action: leadMpParams_evAction,
					ev_label: leadMpParams_evLabel,
					session_id: leadMpParams_sessionId,
					timestamp: leadMpParams_timestamp,
					channel: leadMpParams_channel,
					brand: leadMpParams_brand,
					product: leadMpParams_product,
					subproduct: leadMpParams_subProduct,
					vertical: vertical,
					lead_id: leadMpParams_leadId,
				},
			},
		],
	}
	return payload
}
