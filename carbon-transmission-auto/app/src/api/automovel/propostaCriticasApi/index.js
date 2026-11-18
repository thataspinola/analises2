const CONSTANT = require('../../../property')
const axios = require('axios')

exports.postPagamentoCheckout = async (payload, sensediaCloudToken) => {
	try {
		const postPagamentoCheckoutOptions = {
			method: 'POST',
			url: `${CONSTANT.SENSEDIACLOUD_URL}/${CONSTANT.AUTOMOVEL_PROPOSTA_CRITICAS_PAGAMENTO_CHECKOUT_API_PATH}`,
			headers: {
				Authorization: `Bearer ${sensediaCloudToken}`,
				'Content-Type': 'application/json',
			},
			data: payload,
		}

		const postPagamentoCheckoutResponse = await axios(
			postPagamentoCheckoutOptions
		)
		if (
			!postPagamentoCheckoutResponse ||
			postPagamentoCheckoutResponse.data === undefined
		) {
			throw new Error('Empty or invalid response')
		}

		return postPagamentoCheckoutResponse.data
	} catch (err) {
		if (err.response) {
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					err.response.data
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}
}
