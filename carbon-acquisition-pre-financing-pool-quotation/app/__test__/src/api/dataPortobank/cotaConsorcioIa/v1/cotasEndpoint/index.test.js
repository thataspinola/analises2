const axios = require('axios')
const https = require('https')
const api = require('../../../../../../../src/api')
const CONSTANT = require('../../../../../../../src/property')
const factory = require('../../../../../../../src/factory')
const service = require('../../../../../../../src/service')
const errors = require('../../../../../../../src/error')

jest.mock('axios')
jest.mock('../../../../../../../src/service', () => ({
    logger: {
        error: jest.fn(),
        info: jest.fn()
    }
}))

jest.mock('../../../../../../../src/factory/axiosResponseErrorDataFactory', () => ({
    getErrorData: jest.fn()
}))

jest.mock('../../../../../../../src/factory', () => ({
    axiosResponseErrorData: {
        getErrorData: jest.fn()
    }
}))

describe('API Consórcio - Suite de Testes Unitários', () => {
    const mockPayload = { 
        pre_financing_pool: { cpf: '123', valorCarta: 1000 } 
    }
    const mockToken = 'valid_token'
    const mockCertificates = ['cert1']

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando a chamada POST tem sucesso', () => {
        test('Deve realizar a chamada com o payload desestruturado e URL correta', async () => {
            const mockData = { status: 0, decisao: [] }
            axios.mockResolvedValueOnce({ data: mockData })

            const result = await api.portobank.consorcio.v1.cotas.post(mockPayload, mockToken, mockCertificates)

            expect(axios).toHaveBeenCalledWith(expect.objectContaining({
                method: 'POST',
                url: `${CONSTANT.SENSEDIA_URL_CONSORCIO_EXTERNO}/${CONSTANT.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH}`,
                headers: expect.objectContaining({
                    Authorization: `Bearer ${mockToken}`,
                    partner: CONSTANT.PARTNER_HEADER_VALUE
                }),
                data: { ...mockPayload.pre_financing_pool },
                //httpsAgent: expect.any(https.Agent) 
            }))
            
            expect(service.logger.info).toHaveBeenCalledWith(expect.stringContaining("Efetuando chamada para api de bank"))
            expect(result).toEqual(mockData)
        })
    })

    describe('Quando a chamada POST falha', () => {
        test('Deve lançar ExternalApiError e logar o erro corretamente', async () => {
            const axiosError = new Error('Network Error')
            axiosError.stack = 'stack_trace'
            axios.mockRejectedValueOnce(axiosError)
            
            factory.axiosResponseErrorData.getErrorData.mockReturnValue({
                message: 'Erro na API externa',
                status: 500
            })

            await expect(api.portobank.consorcio.v1.cotas.post(mockPayload, mockToken, mockCertificates))
                .rejects.toThrow(errors.ExternalApiError)
            expect(service.logger.error).toHaveBeenCalledWith(
                expect.stringContaining(`Erro ao executar chamada post para ${CONSTANT.SENSEDIA_URL_CONSORCIO_EXTERNO}`)
            )
        })
    })
    describe('Branches de Erro (Onde o coverage sobe)', () => {
        test('Deve lançar erro quando axiosResponse é nulo (Branch do IF)', async () => {
            axios.mockResolvedValueOnce(null)
            
            factory.axiosResponseErrorData.getErrorData.mockReturnValue({ message: 'Erro custom', status: 500 })

            await expect(api.portobank.consorcio.v1.cotas.post(mockPayload, mockToken, mockCertificates))
                .rejects.toThrow(errors.ExternalApiError)
        })

        test('Deve lançar erro quando axiosResponse.data é undefined (Branch do IF)', async () => {
            axios.mockResolvedValueOnce({ data: undefined })
            
            factory.axiosResponseErrorData.getErrorData.mockReturnValue({ message: 'Data undefined', status: 500 })

            await expect(api.portobank.consorcio.v1.cotas.post(mockPayload, mockToken, mockCertificates))
                .rejects.toThrow(errors.ExternalApiError)
            
            expect(service.logger.error).toHaveBeenCalled()
        })
    })
})