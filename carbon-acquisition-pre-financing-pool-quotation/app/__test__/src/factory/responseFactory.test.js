const factory = require('../../../src/factory')

describe('Factory Test - Padrão API Gateway Proxy', () => {
    
    test('Deve formatar o retorno de sucesso para o padrão API Gateway (StatusCode 200)', () => {
        const mockData = { valorParcela: 25000 }
        const result = factory.response.success(mockData)

        expect(result.statusCode).toBe(200)
        expect(result.isBase64Encoded).toBe(false)
        expect(result.headers).toEqual({})
        expect(result.body).toBe(JSON.stringify(mockData))
    })

    test('Deve formatar o retorno de erro genérico com status code padrão 500', () => {
        const errorMessage = 'Erro interno'
        const result = factory.response.error(errorMessage)
        expect(result.statusCode).toBe(500)
        expect(result.body).toBe(errorMessage)
        expect(result.isBase64Encoded).toBe(false)
    })

    test('Deve formatar o retorno de erro com status code customizado (ex: 404)', () => {
        const errorMessage = 'Não encontrado'
        const customCode = 404
        const result = factory.response.error(errorMessage, customCode)

        expect(result.statusCode).toBe(404)
        expect(result.body).toBe(errorMessage)
    })

    test('Deve formatar badRequestError para o padrão Gateway com statusCode 400', () => {
        const result = factory.response.badRequestError()
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            status: 'error',
            message: 'O corpo da requisição fornecido é inválido',
        })
    })

    test('Deve formatar badRequestError com mensagem personalizada', () => {
        const customMessage = 'CPF inválido'
        const result = factory.response.badRequestError(customMessage)
        
        expect(result.body.message).toBe(customMessage)
    })
})