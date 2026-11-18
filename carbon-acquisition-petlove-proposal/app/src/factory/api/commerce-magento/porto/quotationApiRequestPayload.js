const CONSTANTS = require('../../../../property')

exports.getRequestPayload = (inputData) => {
	return {
		quotation: {
			scope: CONSTANTS.SCOPE,
			petlove: {
				pet_name: inputData.pet.name,
				specie: inputData.pet.type,
				plan_name: inputData.plan.name,
				plan_id: inputData.plan.id,
				monthly_fee: inputData.plan.price,
				monthly_fee_porto_card: inputData.plan.price_porto_card,
				address: {
					zip_code: inputData.address.cep,
					street: inputData.address.street,
					number: inputData.address.number,
					complement: inputData.address.complement,
					city: inputData.address.city,
					state: inputData.address.stateCode,
					neighborhood: inputData.address.neighborhood,
				},
				...(inputData.coupon && { coupon: inputData.coupon }),
				coverages: inputData.plan.coverage,
			},
		},
	}
}
