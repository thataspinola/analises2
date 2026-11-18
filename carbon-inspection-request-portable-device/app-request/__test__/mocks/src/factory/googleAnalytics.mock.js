const MOCKS = require('../../index.mock')

const PROPOSAL_ID_VALUE = 123456
const ORDER_NUMBER = '000003064'

exports.VALID_INPUT = () => {
	return MOCKS.CONTROLLER_INSPECTION_REQUEST.VALID_INPUT()
}

exports.PROPOSAL_ID = () => PROPOSAL_ID_VALUE

exports.VALID_RETURN = () => {
	return {
		client_id: '1429755955.1708958266',
		user_id: 'bc0bad48cd23d8c8e2ef81ca301d0025',
		user_properties: {
			client_bcp: {
				value: 83169128,
			},
			client_id: {
				value: 'bc0bad48cd23d8c8e2ef81ca301d0025',
			},
		},
		events: [
			{
				name: 'select_content',
				params: {
					ev_category: 'hub-vendas:holding:checkout:pagamento',
					ev_action: 'evento-vinculo:purchase:sucesso',
					session_id: '2024127141233629319138-6T4XUGKR',
					timestamp: 1709054096,
					channel: 'hub-vendas',
					brand: 'porto',
					product: 'seguro-equipamentos-portateis',
					subproduct: '',
					vertical: 'holding',
					service_protocol: ORDER_NUMBER,
					proposal_id: PROPOSAL_ID_VALUE,
				},
			},
		],
	}
}
