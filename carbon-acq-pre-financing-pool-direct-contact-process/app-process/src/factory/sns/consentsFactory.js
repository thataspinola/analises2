const CONSTANT = require('../../property')
const {
	SAP_CDC_PFP_PRODUCTS,
	SAP_CDC_PFP_PRODUCT_NAMES,
} = require(CONSTANT.COMMON_LIBRARY_LOCATION)

exports.getSendConsentMessageAttributes = (pescod) => {
	const attributes = {
		eventId: !pescod ? '' : `${pescod}`,
		eventType: 'PFP_LEAD_RECEIVED',
	}
	return attributes
}

const getProductName = (productId) => {
	const sapCdcPfpProductNameKeys = Object.keys(SAP_CDC_PFP_PRODUCT_NAMES)
	const sapCdcPfpProductNameValues = Object.values(SAP_CDC_PFP_PRODUCT_NAMES)
	let productName = null
	const productNameKeyIndex = sapCdcPfpProductNameKeys.findIndex(
		(sapCdcPfpProductNameKey) => sapCdcPfpProductNameKey == productId
	)
	if (productNameKeyIndex >= 0) {
		productName = sapCdcPfpProductNameValues[productNameKeyIndex]
	}
	return productName
}

const getProductId = (product) => {
	const sapCdcPfpProductKeys = Object.keys(SAP_CDC_PFP_PRODUCTS)
	const sapCdcPfpProductValues = Object.values(SAP_CDC_PFP_PRODUCTS)
	let productId = null
	const productKeyIndex = sapCdcPfpProductKeys.findIndex(
		(sapCdcPfpProductKey) => sapCdcPfpProductKey == product
	)
	if (productKeyIndex >= 0) {
		productId = sapCdcPfpProductValues[productKeyIndex]
	}
	return productId
}

exports.getSendConsentMessagePayload = (
	clientData,
	marketingOptOutFlag,
	product,
	pescod,
	domain
) => {
	const productId = getProductId(product)
	const productIdString = `${productId}`
	const productName = getProductName(productId)
	const payload = {
		bcpId: pescod ? pescod : '',
		consents: [
			{
				marketingOptInFlag: marketingOptOutFlag ? false : true,
			},
			{
				privacyPolicy: true,
			},
		],
		doctoClient: clientData.cpfCnpj,
		name: clientData.fullName,
		product: productIdString,
		productName: productName,
		vertical: CONSTANT.CONSENT_VERTICAL,
		nameArea: CONSTANT.CONSENT_NAME_AREA,
		domain: domain ?? CONSTANT.CONSENT_DOMAIN,
	}
	return payload
}
