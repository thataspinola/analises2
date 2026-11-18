const CONSTANT = require('../../property')
const service = require('../../service')
const errors = require('../../error')

exports.execute = (parsedInputData) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedInputData,
			CONSTANT.SERVICE_PROPOSAL_SCHEMA
		)

		validateProductsInputData(parsedInputData)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		if (error.name == 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}

		throw error
	}
}

const validateProductsInputData = (parsedInputData) => {
	const productType = parsedInputData.serviceProvision.products[0].type

	switch (productType) {
		case 'guincho':
			validateGuinchoInputData(parsedInputData)
			break
		default:
			validateInputData(parsedInputData)
			break
	}
}

const validateGuinchoInputData = (parsedInputData) => {
	const serviceOrder = parsedInputData.serviceProvision.serviceOrder

	const serviceAddressesOrigin = serviceOrder.serviceAddresses.find(
		(address) => address.type === 'origem'
	)
	const serviceAddressesDestination = serviceOrder.serviceAddresses.find(
		(address) => address.type === 'destino'
	)

	if (!serviceAddressesOrigin || !serviceAddressesDestination) {
		throw new errors.ValidationError(
			'serviceAddresses should contain both origin and destination addresses for this product type'
		)
	}
}

const validateInputData = (parsedInputData) => {
	const serviceOrder = parsedInputData.serviceProvision.serviceOrder

	const serviceAddressesOrigin = serviceOrder.serviceAddresses.find(
		(address) => address.type === 'origem'
	)

	if (!serviceAddressesOrigin) {
		throw new errors.ValidationError(
			'serviceAddresses should contain an origin address for this product type'
		)
	}

	const serviceAddressesDestination = serviceOrder.serviceAddresses.find(
		(address) => address.type === 'destino'
	)

	if (serviceAddressesDestination) {
		throw new errors.ValidationError(
			'serviceAddresses should not contain a destination address for this product type'
		)
	}

	const schedule = parsedInputData.serviceProvision.schedule

	if (schedule.scheduleType !== 'agendamento-programado') {
		throw new errors.ValidationError(
			'schedule.scheduleType should be "agendamento-programado" for this product type'
		)
	}
}
