const activity = require('./activity')
const service = require('../service')
const factory = require('../factory')
const CONSTANTS = require('../property')
const tokenLayer = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {
		activity.inputValidation.execute(inputData)

		activity.exceptionSimulation.execute(inputData)

		const beforeCreateLead = new Date()
		const createLeadResult =
			await activity.leadManagement.postCreateLead.execute(inputData)
		logExecutionTime(beforeCreateLead, new Date(), 'createLead')

		const commerceCartResult = await activity.cart.commerceCart.execute(
			inputData
		)

		const petloveToken = await tokenLayer.getPetloveAuthToken()

		if (CONSTANTS.PETLOVE_COUPON) {
			const couponDetails =
				await activity.businessPartner.getCouponDetails.execute(
					CONSTANTS.PETLOVE_COUPON,
					inputData.plan.id,
					petloveToken
				)
			service.logger.info(`couponDetails: ${JSON.stringify(couponDetails)}`)
			inputData.coupon = couponDetails
		}
		const checkoutSimulation =
			await activity.businessPartner.getCheckoutSimulation.execute(
				CONSTANTS.PETLOVE_COUPON,
				CONSTANTS.PETLOVE_PORTO_CARD_BIN,
				inputData,
				petloveToken
			)
		service.logger.info(
			`checkoutSimulation: ${JSON.stringify(checkoutSimulation)}`
		)
		inputData.plan.price_porto_card =
			inputData.plan.price - checkoutSimulation.discountBinAmount

		const commerceQuotationResult =
			await activity.commerce.postCommerceQuotation.execute(inputData)

		const commerceProposalResult =
			await activity.commerce.postCommerceProposal.execute(
				inputData,
				commerceQuotationResult,
				commerceCartResult,
				createLeadResult
			)

		const returnSuccess = factory.controllerResponse.success(
			CONSTANTS.URL_CART_REDIRECT,
			commerceCartResult,
			commerceQuotationResult,
			createLeadResult,
			commerceProposalResult
		)

		return returnSuccess
	} catch (error) {
		const proposalServicesError = new Error(
			`Erro no processamento: ${error.message}`
		)
		if (error.name === 'ValidationError') {
			service.logger.error(
				'Erro no processamento: Mensagem com estrutura ou dado inválido.'
			)
			return factory.controllerResponse.badRequestError(
				proposalServicesError.message
			)
		}else{
			service.logger.error(
				proposalServicesError.message
			)
		}
		
		return factory.controllerResponse.error(error.message)
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
