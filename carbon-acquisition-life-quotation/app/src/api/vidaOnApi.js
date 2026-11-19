const logMetadata = require('../service/logMetadata')
const axios = require('axios')
const CONSTANT = require('../property')
const service = require('../service')

exports.ofertas = async (inputData, token) => {
	const requestOption = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.OFERTAS_PATH}`,
		headers: {
			Authorization: `Bearer ${token}`,
			partner: `${CONSTANT.PARTNER_HEADER_VALUE}`,
		},
		data: {
			susep: inputData.lifeinsurance.susep,
			meioComercializacao: inputData.lifeinsurance.salesMedium,
			informacoes: [
				{
					codigo: 'DICIO_DATANASCIMENTO',
					conteudo: inputData.lifeinsurance.date_of_birth,
				},
			],
		},
	}

	return axios(requestOption)
		.then((res) => {
			return res
		})
		.catch((err) => {
			service.logger.error({ error: logMetadata.errorSummary(err) }, 'Life quotation upstream request failed')

			return { status: err.response.status, data: err?.response?.data }
		})
}
