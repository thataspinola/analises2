const CONSTANT = require('../../../../property')

exports.getPayload = (cpf, otp) => {
	const payload = {
		userName: cpf,
		orgName: CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME,
		profileName:
			CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME,
		otp: otp,
	}

	return payload
}
