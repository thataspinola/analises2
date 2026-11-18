const service = require('../../../src/service')
const MOCKS = require('./../../mocks/src/service/dataMaskService.mock')

describe('dataMaskService', () => {
    test('Deve retornar um cpf mascarado ao chamar o método maskCpf(\'123.123.123-12\')', () => {
        const response = service.dataMask.maskCpf(MOCKS.CPF_ONE_NOT_FORMATTED())
        expect(response).toEqual(MOCKS.CPF_ONE_FORMATTED())
    })

    test('Deve retornar N/A ao chamar o método maskCpf()', () => {
        const response = service.dataMask.maskCpf()
        expect(response).toEqual(MOCKS.N_A())
    })

    test('Deve retornar N/A ao chamar o método maskCpf(12312312312)', () => {
        const response = service.dataMask.maskCpf(12312312312)
        expect(response).toEqual(MOCKS.N_A())
    })

    test('Deve retornar um cnpj mascarado ao chamar o método maskCnpj(\'56.412.312/3124-12\')', () => {
        const response = service.dataMask.maskCnpj(MOCKS.CNPJ_ONE_NOT_FORMATTED())
        expect(response).toEqual(MOCKS.CNPJ_ONE_FORMATTED())
    })
})