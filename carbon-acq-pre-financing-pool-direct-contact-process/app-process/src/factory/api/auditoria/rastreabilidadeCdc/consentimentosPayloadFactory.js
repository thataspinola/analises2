const CONSTANT = require('../../../../property')
const {
	SAP_CDC_PFP_PRODUCTS,
	SAP_CDC_PFP_PRODUCT_NAMES,
} = require(CONSTANT.COMMON_LIBRARY_LOCATION)

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

exports.getPayload = (
	clientData,
	marketingOptOutFlag,
	product,
	bcpId,
	domain
) => {
	const productId = getProductId(product)
	const productIdString = `${productId}`
	const productName = getProductName(productId)

	const payload = {
		bcpId: bcpId ? bcpId : '',
		channel: CONSTANT.CONSENT_CHANNEL,
		consents: [
			{
				consent: 'privacy.privacyPolicy',
				consentValue: 'true',
			},
			{
				consent: 'marketingOptInFlag',
				consentValue: marketingOptOutFlag ? 'false' : 'true',
			},
		],
		doctoClient: clientData.cpfCnpj,
		domain: domain ?? CONSTANT.CONSENT_DOMAIN,
		environmentType: CONSTANT.CONSENT_ENVIRONMENT_TYPE,
		managementArea: CONSTANT.CONSENT_MANAGEMENT_AREA,
		name: clientData.fullName,
		nameArea: CONSTANT.CONSENT_NAME_AREA,
		product: productIdString,
		productName: productName,
		vertical: CONSTANT.CONSENT_VERTICAL,
	}

	return payload
}
