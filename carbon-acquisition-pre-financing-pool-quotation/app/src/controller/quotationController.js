const CONST = require('../property')
const activity = require('../controller/activity')
const api = require('../api')
const factory = require('../factory')
const service = require('../service')

exports.process = async (payload) => {
	try {
		const pool = payload?.pre_financing_pool;
        if (!pool) {
            return factory.response.badRequestError('O objeto pre_financing_pool é obrigatório.');
        }
		service.validationService.inputData(pool)
		//const certificate = await activity.getCertificate.execute() - Código comentado pois estamos usando api externa e não precisa de certificado, mantendo o código caso futuramente precise 
		const token = await activity.getToken.execute()
		const simulationResult = await api.portobank.consorcio.v1.cotas.post(payload,token)
		service.logger.info(`Resposta da api de bank - ${JSON.stringify(simulationResult)}`)
		const formattedResult = factory.responseApiFactory.formatQuotationResponse(simulationResult)
		service.logger.info(`Resposta formatada - ${JSON.stringify(formattedResult)}`)
		return factory.response.success(formattedResult)
	} catch (error) {
		const processRegisterError = new Error(
			`Erro no processamento: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				{ rawError: error },
				'Erro no processamento: Estrutura ou dado inválido.'
			)
			return factory.response.badRequestError(processRegisterError.message)
		}
		service.logger.error(
			{ rawError: error },
			'Erro no processamento: Erro interno.'
		)
		return factory.response.error(error.message)
	}
}
