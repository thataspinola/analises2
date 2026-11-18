const factory = require('../factory')
const service = require('../service')
const activity = require('./activity')
const CONSTANTS = require('../property')
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputRequest) => {
	try {
		service.validation.inputData(inputRequest)

		const promises = [
			getToken(),
			tokenLayer.getPortoCertificates(),
			activity.leadManagement.createLead.execute(inputRequest),
		]

		const { coupon } = inputRequest.portableDevice
		if (coupon) {
			promises.push(activity.carbon.getCoupon.execute(coupon,inputRequest))
		}

		const [mulesoftToken, portoCertificates, leadInformation, couponResult] =
			await Promise.all(promises)

		let couponData = null
		if (coupon) {
			if (couponResult === 'invalid coupon') {
				return factory.response.invalidCoupon()
			}
			couponData = couponResult
		}

		const payload = await factory.quotation.makePayload(
			inputRequest,
			leadInformation,
			couponData
		)

		service.logger.info(
			payload,
			'Payload enviado ao produto para solicitar o hash da cotação'
		)
		const beforePostQuotation = new Date()
		const quotationHash =
			await activity.portableDevice.quotationRequest.execute(
				payload,
				mulesoftToken,
				portoCertificates
			)

		logExecutionTime(beforePostQuotation, new Date(), 'POST calculo')

		if (!quotationHash?.hash) {
			throw new Error(
				'Não foi retornado o resultado esperado na api de calculo'
			)
		}

		const beforeGetQuotation = new Date()
		const quotation = await activity.portableDevice.getQuotation.execute(
			quotationHash.hash,
			payload.codigoCanal,
			mulesoftToken,
			portoCertificates
		)

		service.logger.info(quotation, 'Cotação retornada pelo produto.')

		logExecutionTime(beforeGetQuotation, new Date(), 'GET calculo')
		logExecutionTime(
			beforePostQuotation,
			new Date(),
			'execucao total do calculo'
		)

		return factory.response.quotationSuccess(
			inputRequest,
			quotation,
			leadInformation,
			couponData
		)
	} catch (error) {
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Erro no processamento: Mensagem com estrutura ou dado inválido.'
			)
			return factory.response.badRequestError(error.message)
		}
		return factory.response.error(error.message)
	}
}

async function getToken() {
	try {
		const mulesoftToken = await tokenLayer.getMulesoftTokenHubInternal()

		return mulesoftToken
	} catch (error) {
		service.logger.error(error.message)
		throw Error(CONSTANTS.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
	}
}

function logExecutionTime(startExecution, endExecution, description) {
	const duration = endExecution.getTime() - startExecution.getTime()
	service.logger.info(
		{
			step: description.replaceAll(' ', '_'),
			duration: duration,
		},
		`Tempo decorrido para ${description}: ${duration} milisegundos.`
	)
}
