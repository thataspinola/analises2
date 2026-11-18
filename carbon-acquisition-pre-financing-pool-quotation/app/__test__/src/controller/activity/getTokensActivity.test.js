const MOCKS = require('../../../mocks/index.mock')
const controllerActivity = require('../../../../src/controller/activity')
const service = require('../../../../src/service')
const CONSTANT = require('../../../../src/property')
const carbonToken = require('@porto-seguro/hub-vendas.carbon-token')

jest.mock('@porto-seguro/hub-vendas.carbon-token')

jest.mock('../../../../src/service', () => ({
    logger: {
        error: jest.fn(),
        info: jest.fn()
    }
}))

describe('Suite de teste de getToken Activity', () => {
    
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando sucesso', () => {
        test('Deve obter o token chamando a lib com a chave correta', async () => {
            const mockToken = MOCKS.SENSEDIA_CORP_CARBON_TOKEN()
            
            // Ajustado para o método correto: getToken
            carbonToken.getToken.mockResolvedValue(mockToken)

            const result = await controllerActivity.getToken.execute()

            expect(result).toEqual(mockToken)
            
            expect(carbonToken.getToken).toHaveBeenCalledWith(
                CONSTANT.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY
            )
            
            expect(service.logger.info).toHaveBeenCalledWith("Obtendo Token")
        })
    })

    describe('Quando falha', () => {
        test('Deve logar erro detalhado quando a lib de token falhar', async () => {
            const thrownError = new Error('Timeout na Sensedia')
            carbonToken.getToken.mockRejectedValue(thrownError)

            await expect(controllerActivity.getToken.execute()).rejects.toThrow(thrownError)
            expect(service.logger.error).toHaveBeenCalledWith(
                { rawError: thrownError },
                expect.stringContaining("Erro identificado durante a atividade 'Obtenção do token do API Gateway Sensedia Corp Cloud'")
            )
        })
    })
})