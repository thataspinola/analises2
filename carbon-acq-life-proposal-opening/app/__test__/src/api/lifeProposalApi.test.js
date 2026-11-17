const api = require('../../../src/api')
const axios = require('axios')
const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property')

jest.mock('axios')

global.logger = {
	error: jest.fn(),
	info: jest.fn(),
}

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de Testes lifeProposalApi.js', () => {
	test('Deve chamar o metodo submitProposal sem erro', async () => {
		axios.mockReturnValue({ data:''})

		await api.vida.vidaOn.proposal.aberturaApi.submitProposal(
			MOCKS.PAYLOAD_LIFE_PROPOSAL_API_REQUEST,
			'123',
			MOCKS.LAMBDA_TOKEN
		)

		const config = {
			method: 'POST',
			url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${MOCKS.LAMBDA_TOKEN}`,
				partner: CONSTANT.PARTNER_HEADER_VALUE,
				'carbon-trace-id': `undefined`
			},
			data: { ...MOCKS.PAYLOAD_LIFE_PROPOSAL_API_REQUEST },
		}
		
		expect(axios).toHaveBeenCalledWith(config)
	})

	test('Deve retornar uma exceção do tipo ExternalApiError quando a Api de Proposta do Vida retornar sucesso, mas a proposta não for valida', async () => {
		axios.mockImplementationOnce(
			() => MOCKS.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_ERROR_WITH_REFUSAL
		)

		try {
			await api.vida.vidaOn.proposal.aberturaApi.submitProposal(
				MOCKS.PAYLOAD_LIFE_PROPOSAL_API_REQUEST,
				MOCKS.LAMBDA_TOKEN,
			)
		} catch (error) {
			expect(error.name).toBe('ExternalApiError')
			expect(error.statusCode).toBe(400)
		}
	})

	test('Deve retornar uma exceção do tipo ExternalApiError quando a Api de Proposta do Vida retornar um erro com justificativa', async () => {
		axios.mockImplementationOnce(() => {
			throw MOCKS.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_ERROR_WITH_REFUSAL
		})

		try {
			await api.vida.vidaOn.proposal.aberturaApi.submitProposal(
				MOCKS.PAYLOAD_LIFE_PROPOSAL_API_REQUEST,
				MOCKS.LAMBDA_TOKEN
			)
		} catch (error) {
			const response =
				MOCKS.PAYLOAD_LIFE_PROPOSAL_API_RESPONSE_ERROR_WITH_REFUSAL

			expect(error.name).toBe('ExternalApiError')
			expect(error.statusCode).toBe(response.status)
		}
	})
})
