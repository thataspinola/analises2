const quotationFactory = require('../../../src/factory/quotationFactory')

describe('Quotation Factory - Suite de Testes', () => {
    test('Deve extrair APENAS os números de prazoTotal e prazoRestante', () => {
    const mockRaw = {
        decisao: [{
            grupo: { prazoTotal: '90 meses (81 meses restantes)' }
        }]
    }

    const result = quotationFactory.formatQuotationResponse(mockRaw)

    expect(result.decisao[0].grupo.prazoTotal).toBe('90')
    expect(result.decisao[0].grupo.prazoRestante).toBe('81')
})
    test('Deve lidar com strings que não possuem parênteses', () => {
        const mockRaw = {
            decisao: [{
                grupo: { prazoTotal: '100 meses' }
            }]
        }

        const result = quotationFactory.formatQuotationResponse(mockRaw)

        expect(result.decisao[0].grupo.prazoTotal).toBe('100')
        expect(result.decisao[0].grupo.prazoRestante).toBeNull()
    })

    test('Deve retornar o objeto original sem quebrar se "decisao" for uma string', () => {
    const mockRaw = {
        status: 1,
        decisao: "Nenhum grupo encontrado."
    }

    const result = quotationFactory.formatQuotationResponse(mockRaw)

    expect(result).toEqual(mockRaw)
    expect(typeof result.decisao).toBe('string')
})
})