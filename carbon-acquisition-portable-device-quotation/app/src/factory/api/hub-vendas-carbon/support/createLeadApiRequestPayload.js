const CONSTANTS = require('../../../../property')

exports.getRequestPayload = (inputData) => {
	const { portableDevice } = inputData
	const { client } = portableDevice
	const { affiliate } = portableDevice

	const responsePayload = {
		...CONSTANTS.CREATE_LEAD_DATA,
		idBranch: getProductBranchId(
			inputData.portableDevice.productDetails.deviceTypeCode
		),
		scope: CONSTANTS.SCOPE,
		client: {
			cpf: client.cpf,
			name: client.name,
			cellPhone: client.phone,
			email: client.email,
		},
		address: {
			zipCode: client.zipCode,
		},
		marketingOptInFlag: portableDevice.marketingOptInFlag,
		sessionId: portableDevice.sessionId,
		ipAddress: portableDevice.ipAddress,
		userAgent: portableDevice.userAgent,
		susepCode: affiliate.susepCode,
		idLink: affiliate.affiliateId,
		linkOrigin: affiliate.linkOrigin,
	}

	return responsePayload
}

function getProductBranchId(deviceTypeCode) {
	for (const productId in CONSTANTS.ID_BRANCH_MAPPING) {
		if (CONSTANTS.ID_BRANCH_MAPPING[productId].includes(deviceTypeCode)) {
			return productId
		}
	}
	return null
}
