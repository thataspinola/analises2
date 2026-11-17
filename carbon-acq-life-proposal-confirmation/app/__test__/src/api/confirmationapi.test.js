const axios = require('axios');
const CONSTANT = require('./../../../src/property')
const error = require('./../../../src/error')
const factory = require('./../../../src/factory')
const api = require('./../../../src/api')
const mocks = require('./../../mocks')

jest.mock('axios');
jest.mock('./../../../src/factory');
jest.mock('./../../../src/service');

describe('Post function', () => {
    const lifeProposalInputData = mocks.PROPOSAL_API_REQUEST
    const token = 'token'
    const traceId = 'trace-id'
    const quotationId = 'quotation-id'

    beforeEach(() => {
        jest.clearAllMocks()
        factory.api.httpsAgent.createHttpsAgent.mockImplementation(() => {
            return mocks.FACTORY_API_HTTPS_AGENT.GET_HTTPS_AGENT()
        })
    })

    test('deve retornar dados da API quando a requisição for bem-sucedida', async () => {
        const responseData = mocks.PROPOSAL_API_RESPONSE
        axios.mockResolvedValue({ data: responseData })

        const result = await api.vida.vidaon.v1.proposta.confirmation
            .Post(
                lifeProposalInputData,
                token,
                mocks.FACTORY_API_HTTPS_AGENT.CERTIFICATE(),
                traceId,
                quotationId
            )

        expect(axios).toHaveBeenCalledWith(expect.objectContaining({
            method: 'POST',
            url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_PATH}`,
            headers: expect.objectContaining({
                Authorization: `Bearer ${token}`,
                'carbon-trace-id': traceId,
            }),
            data: lifeProposalInputData,
            httpsAgent: mocks.FACTORY_API_HTTPS_AGENT.GET_HTTPS_AGENT()
        }))
        
        expect(result).toEqual(responseData)
    })

    test('deve lançar um erro quando a requisição falhar', async () => {
        const errorMessage = 'Erro de API'
        const errorStatus = 500
        const axiosError = new Error(errorMessage)
        axiosError.response = { status: errorStatus }
        axios.mockRejectedValue(axiosError)
        
        factory.axiosHandlerError.mockReturnValue({
            message: errorMessage,
            status: errorStatus,
        })

        await expect(api.vida.vidaon.v1.proposta.confirmation
            .Post(lifeProposalInputData, token, traceId, quotationId)
        ).rejects.toThrow(error.ExternalApiError)
    })
})