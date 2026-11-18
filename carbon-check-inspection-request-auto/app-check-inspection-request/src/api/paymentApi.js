const axios = require('axios')
const { axiosHandlerError } = require('../factory')
const { PaymentApiError } = require('../error')
const { PAYMENT_REGISTER_ENDPOINT_URL } = require('../property')

exports.putPaymentRegister = async (putPaymentRegisterPayload) => {
	const putPaymentRegisterOptions = {
		method: 'PUT',
		url: PAYMENT_REGISTER_ENDPOINT_URL,
		data: putPaymentRegisterPayload,
	}

	let putPaymentRegisterResponse = null

	try {
		putPaymentRegisterResponse = await axios(putPaymentRegisterOptions)
	} catch (err) {
		const errorHandled = axiosHandlerError(err)

		throw new PaymentApiError(
			errorHandled.message,
			errorHandled.status
		)
	}

	if (!putPaymentRegisterResponse || putPaymentRegisterResponse.data === undefined) {
		throw new PaymentApiError(
			'API unexpected error: Empty or invalid response',
			null
		)
	}

	if (!putPaymentRegisterResponse.data?.payment?.status) {
		throw new PaymentApiError(
			'Unexpected structure from payment register PUT response',
			putPaymentRegisterResponse.status
		)
	}

	return putPaymentRegisterResponse.data
}
