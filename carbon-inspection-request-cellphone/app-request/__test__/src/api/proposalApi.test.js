const axios = require('axios')
const CONSTANT = require('../../../src/property')
const api = require('../../../src/api')
const MOCKS = require('../../mocks/src/api/proposalTransmission.mock')

jest.mock('axios')
afterEach(function () {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

describe('Chamada de transmissão de proposta', () => {
	test('Retornar o valor esperado e não receber uma exceção', () => {
		axios.mockImplementation(async (params) => {
			return {
				status: 200,
				data: MOCKS.API_PROPOSAL_TRANSMISSION_SUCCESS_RESPONSE_BODY(),
			}
		})

		expect(async () => {
			const proposalReturn = await api.proposal.integration(
				MOCKS.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
				MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
			)

			expect(proposalReturn).toEqual(
				MOCKS.API_PROPOSAL_TRANSMISSION_VALID_RESPONSE().data
			)
		}).not.toThrow()
	})
})

test('Deve obter uma exceção ao receber um erro inesperado', async () => {
	axios.mockRejectedValueOnce(new Error('Unexpected error'))

	await expect(
		api.proposal.integration(
			MOCKS.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
			MOCKS.LAMBDA_TOKEN_HANDLER_RESPONSE().SENSEDIA_CADASTRO
		)
	).rejects.toThrow('API unexpected error: Unexpected error')
})
