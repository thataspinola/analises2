const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')

exports.postCreateLead = async (createLeadData) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: createLeadData,
	}

	try {
		const postCreateLeadResponse = await axios(config)

		if (!postCreateLeadResponse || postCreateLeadResponse.data === undefined) {
			throw new Error(
				`Erro inesperado recebido da chamada da API create lead lambda: Resultado de chamada vazio ou inválido`
			)
		}
		return postCreateLeadResponse.data
	} catch (error) {
		const dataFromAxiosError =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		service.logger.error(
			{
				rawError: error,
			},
			`Erro ao executar chamada post para ${
				CONSTANT.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API
			}: ${JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})}`
		)

		throw externalApiError
	}
}
