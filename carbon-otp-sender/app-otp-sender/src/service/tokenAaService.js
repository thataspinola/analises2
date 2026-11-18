const api = require('../api')
const service = require('../service')

exports.gerarTokenAaComRetry = async (
	geraTokenAaPayload,
	sensediaCloudToken,
	maxRetries = 2,
	sleepTime = 2000
) => {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			let geraTokenAaResponse =
				await api.seguranca.corporativa.portocom.postGeraTokenAa(
					geraTokenAaPayload,
					sensediaCloudToken
				)

			return geraTokenAaResponse
		} catch (error) {
			if (error.response && error.response.status === 404) {
				if (attempt === maxRetries) {
					service.logger.error(
						`Número máximo de tentativas de obter token AA: ${error.message}`
					)
					return error.response
				} else {
					service.logger.warn(
						`Tentativa ${attempt} falhou com status 404. Tentando novamente em ${
							sleepTime / 1000
						} segundos...`
					)
					await new Promise((resolve) => setTimeout(resolve, sleepTime))
				}
			} else {
				throw error
			}
		}
	}
}
