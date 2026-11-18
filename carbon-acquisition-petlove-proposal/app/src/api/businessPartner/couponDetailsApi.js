const CONSTANTS = require('../../property')
const errors = require('../../error')
const factory = require('../../factory')
const service = require('../../service')
const axios = require('axios')
const { Agent } = require('https')

exports.get = async (coupon, planIds, petloveToken) => {
	try {
		const httpsAgent = await getHttpsAgent()
		const config = {
			method: 'GET',
			url: `${CONSTANTS.PETLOVE_URL}/${CONSTANTS.BUSINESS_PARTNER_COUPON_PATH}/${coupon}?plan_ids=${planIds}`,
			headers: {
				Authorization: `Bearer ${petloveToken}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
				'Content-Type': 'application/json',
			},
			httpsAgent,
		}

		const { data } = await axios(config)

		return data
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
			`Erro ao executar chamada get para ${CONSTANTS.PETLOVE_URL}/${
				CONSTANTS.BUSINESS_PARTNER_COUPON_PATH
			}/${coupon}: ${JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})}`
		)

		throw externalApiError
	}
}

const getHttpsAgent = async () => {
	return new Agent({
		rejectUnauthorized: false,
	})
}
