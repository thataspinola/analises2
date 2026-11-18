const CONSTANT = require('../../../../property')

exports.getPayload = (cpf) => {
	const payload = {
		userName: cpf,
		orgName: CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME,
		profileName:
			CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME,
	}

	return payload
}
