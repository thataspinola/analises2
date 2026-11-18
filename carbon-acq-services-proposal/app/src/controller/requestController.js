const activity = require('./activity')
const CONSTANT = require('../property')
const service = require('../service')
const factory = require('../factory')

exports.process = async (parsedInputData) => {
	service.logger.info({ parsedInputData }, 'Payload de entrada')

	const startExecution = new Date()

	try {
		const startInputValidation = new Date()

		activity.inputValidation.execute(parsedInputData)
		logExecutionTime(
			startInputValidation,
			new Date(),
			'inputValidation execution'
		)

		activity.exceptionSimulation.execute(parsedInputData)

		const startAllPromiseRequest = new Date()

		const orderbookPromise =
			activity.orderBooking.postOrderBook.execute(parsedInputData)

		const pricingBudgetPromise =
			activity.pricing.postPricingBudget.execute(parsedInputData)

		const createLeadPromise =
			activity.leadManagement.postCreateLead.execute(parsedInputData)

		const commerceCartPromise =
			activity.commerce.postCommerceCreateCart.execute(parsedInputData)

		const [
			orderbookResult,
			pricingBudgetResult,
			createLeadResult,
			commerceCartResult,
		] = await Promise.all([
			orderbookPromise,
			pricingBudgetPromise,
			createLeadPromise,
			commerceCartPromise,
		])

		logExecutionTime(
			startAllPromiseRequest,
			new Date(),
			'allPromiseRequest execution'
		)

		if (orderbookResult.newSchedule) {
			return factory.controllerResponse.newSchedule(orderbookResult)
		}

		const startCommerceQuotationResultRequest = new Date()

		const commerceQuotationResult =
			await activity.commerce.postCommerceQuotation.execute(
				pricingBudgetResult.pricingRequestResponseData,
				pricingBudgetResult.isRecommendationFlag
			)

		logExecutionTime(
			startCommerceQuotationResultRequest,
			new Date(),
			'commerceQuotationResult execution'
		)

		const startCommerceProposalResultRequest = new Date()

		const commerceProposalResult =
			await activity.commerce.postCommerceProposal.execute(
				parsedInputData,
				commerceQuotationResult,
				orderbookResult,
				commerceCartResult,
				createLeadResult,
				pricingBudgetResult.isRecommendationFlag
			)

		logExecutionTime(
			startCommerceProposalResultRequest,
			new Date(),
			'commerceProposalResult execution'
		)

		const startBuildSuccessResponse = new Date()

		const returnSuccessPayloadReturn =
			factory.controller.request.processedReturnPayload.getPayload(
				CONSTANT.URL_CART_REDIRECT,
				commerceCartResult,
				commerceQuotationResult,
				pricingBudgetResult.pricingRequestResponseData,
				createLeadResult,
				commerceProposalResult,
				orderbookResult
			)
			
		logExecutionTime(
			startBuildSuccessResponse,
			new Date(),
			'buildSuccessResponse execution'
		)

		const returnSuccess = factory.controllerResponse.success(
			returnSuccessPayloadReturn
		)

		logExecutionTime(startExecution, new Date(), 'Total process execution')

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
		}
		return factory.controllerResponse.error(error)
	}
}

function logExecutionTime(startTime, endTime, description) {
	const duration = endTime.getTime() - startTime.getTime()
	service.logger.info(
		{
			step: description.replace(/ /g, '_'),
			duration: duration,
		},
		`Tempo decorrido para ${description}: ${duration} milisegundos.`
	)
}
