const MOCKS = require('../../../../../index.mock')

exports.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT = () => ({
	parsedInputData: MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
	commerceQuotationId:
		MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.POSTCOMMERCEQUOTATION_VALID_RETURN(),
	leadData: MOCKS.API_SUPPORTCREATELEAD.POSTCREATELEAD_VALID_RETURN_TEMP(),
})

exports.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_WITH_COMBO_INPUT =
	() => ({
		parsedInputData:
			MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_WITH_COMBO_INPUT(),
		commerceQuotationId:
			MOCKS.API_COMMERCEMAGENTO_PORTO_QUOTATION.POSTCOMMERCEQUOTATION_VALID_RETURN(),
		leadData: MOCKS.API_SUPPORTCREATELEAD.POSTCREATELEAD_VALID_RETURN(),
	})

exports.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_RESPONSE = () => {
	return {
		proposal: {
			scope: 'petlove',
			petlove: {
				quotation_token: 'tokenCommerceQuotationGeneration',
				lead_identifier: '1739915904443',
				broker: {
					link_id: '1b2bc46f-5428-4073-aa43-709624594e48',
					name: 'Corretor da Silva',
					email: 'diamante@aguiacorretagem.com.br',
					phone: '11923932393',
					susep_code: 'CM056J',
				},
				client: {
					name: 'João Silva',
					email: 'joao.silva@example.com',
					cpf: '33207922880',
					phone: '19981458065',
				},
			},
		},
	}
}

exports.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_WITH_LEAD_BROKERDATA_RESPONSE =
	() => {
		return this.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_RESPONSE()
	}

exports.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_WITHOUT_BROKERDATA_RESPONSE =
	() => {
		let response =
			this.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_RESPONSE()
		delete response.broker
		return response
	}
