const handler = require('../index')
const { quotationController } = require('../src/controller')
const factory = require('../src/factory')
const { logger } = require('../src/service')

jest.mock('../src/controller')
jest.mock('../src/service', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn()
    }
}))
jest.mock('../src/factory')

describe('Handler Raiz - Suite de Testes (Padrão API Gateway)', () => {
    
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Deve processar o evento com sucesso realizando o parse do body', async () => {
        const payloadObj = { scope: 'pre-financing-pool' }
        const mockEvent = { body: JSON.stringify(payloadObj) }
        
        const mockResponse = { 
            statusCode: 200, 
            body: JSON.stringify({ Status: 'SUCCEEDED' }) 
        }
        
        quotationController.process.mockResolvedValue(mockResponse)

        const result = await handler.handler(mockEvent)
        expect(quotationController.process).toHaveBeenCalledWith(payloadObj)
        expect(result).toEqual(mockResponse)
        expect(logger.info).toHaveBeenCalledWith("FIM DO PROCESSO")
    })

    test('Deve retornar erro 400 se o body não for uma string', async () => {
        const mockEvent = { body: { objeto: "invalido" } }
        const errorMsg = 'Corpo do evento tem que ser uma string'
        
        factory.response.error.mockReturnValue({ statusCode: 400, body: errorMsg })

        const result = await handler.handler(mockEvent)

        expect(factory.response.error).toHaveBeenCalledWith(errorMsg, 400)
        expect(result.statusCode).toBe(400)
    })

    test('Deve retornar erro 400 se o JSON.parse falhar (Body mal formatado)', async () => {
        const mockEvent = { body: "isso não é um json" }
        
        factory.response.error.mockReturnValue({ statusCode: 400, body: expect.any(String) })

        const result = await handler.handler(mockEvent)

        expect(factory.response.error).toHaveBeenCalledWith(expect.stringContaining('Unexpected token'), 400)
        expect(result.statusCode).toBe(400)
    })

    test('Deve capturar erro e formatar via factory quando o controller falhar', async () => {
        const mockEvent = { body: JSON.stringify({ data: 'ok' }) }
        const mockError = new Error('Falha crítica')
        quotationController.process.mockRejectedValue(mockError)
        
        factory.response.error.mockReturnValue({ statusCode: 400, body: 'Falha crítica' })

        const result = await handler.handler(mockEvent)

        expect(result.statusCode).toBe(400)
        expect(factory.response.error).toHaveBeenCalledWith('Falha crítica', 400)
    })
})