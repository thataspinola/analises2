const factory = require('../../../src/factory')

afterEach(() => {
    jest.clearAllMocks()
})

describe('proposalPayloadFactory', () => {
    const baseIntegrationData = {
        correlationId: 'abc-123',
        pacote: 4,
        proponente: {
            cpf: '95395590064',
            dataNascimento: '11/02/1985',
            nomePessoa: 'Willian Salvador',
            faixaRenda: '2',
        },
    }

    test('deve remover acentos do nomePessoa', () => {
        const input = {
            ...baseIntegrationData,
            proponente: { ...baseIntegrationData.proponente, nomePessoa: 'João Gonçalves' },
        }

        const result = factory.proposalPayload.build(input)

        expect(result.proponente.nomePessoa).toBe('Joao Goncalves')
    })

    test('deve manter os demais campos do proponente inalterados', () => {
        const result = factory.proposalPayload.build(baseIntegrationData)

        expect(result.proponente.cpf).toBe(baseIntegrationData.proponente.cpf)
        expect(result.proponente.dataNascimento).toBe(baseIntegrationData.proponente.dataNascimento)
        expect(result.proponente.faixaRenda).toBe(baseIntegrationData.proponente.faixaRenda)
    })

    test('deve manter os demais campos do integrationData inalterados', () => {
        const result = factory.proposalPayload.build(baseIntegrationData)

        expect(result.correlationId).toBe(baseIntegrationData.correlationId)
        expect(result.pacote).toBe(baseIntegrationData.pacote)
    })

    test('deve remover caracteres especiais do nomePessoa', () => {
        const input = {
            ...baseIntegrationData,
            proponente: { ...baseIntegrationData.proponente, nomePessoa: 'Maria D\'Ávila' },
        }

        const result = factory.proposalPayload.build(input)

        expect(result.proponente.nomePessoa).toBe('Maria DAvila')
    })
})
