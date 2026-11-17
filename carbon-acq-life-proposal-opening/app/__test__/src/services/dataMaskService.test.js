const service = require('../../../src/service')

describe('dataMaskService', () => {
	test('Deve retornar um cfp mascarado ao chamar o método maskCpf(\'123.123.123-12\')',  () => {
		const response = service.dataMask.maskCpf('123.123.123-12')
        expect(response).toEqual('123.***.***-**')
	})

	test('Deve retornar N/A ao chamar o método maskCpf()',  () => {
		const response = service.dataMask.maskCpf()
        expect(response).toEqual('N/A')
	})
	
	test('Deve retornar N/A ao chamar o método maskCpf(12312312312)',  () => {
		const response = service.dataMask.maskCpf(12312312312)
        expect(response).toEqual('N/A')
	})

	test('Deve retornar um cfp mascarado ao chamar o método maskCnpj(\'56.412.312/3124-12\')',  () => {
		const response = service.dataMask.maskCnpj('56.412.312/3124-12')
        expect(response).toEqual('56.4**.***/****-**')
	})

	test('Deve retornar um email mascarado ao chamar o método maskEmail(\'nomeir.s@gmail.com\')',  () => {
		const response = service.dataMask.maskEmail('nomeir.s@gmail.com')
        expect(response).toEqual('n******s@g*ail.com')
	})

	test('Deve retornar um número de celular mascarado ao chamar o método maskPhoneBrazil(\'(19) 12345-1234\')',  () => {
		const response = service.dataMask.maskPhoneBrazil('(19) 12345-1234')
        expect(response).toEqual('(19) *****-1234')
	})

	test('Deve retornar um número de celular mascarado ao chamar o método maskPhoneBrazil(\'12345-1234\')',  () => {
		const response = service.dataMask.maskPhoneBrazil('12345-1234')
        expect(response).toEqual('*****-1234')
	})

	test('Deve retornar um número de celular mascarado ao chamar o método maskPhoneBrazil()',  () => {
		const response = service.dataMask.maskPhoneBrazil()
        expect(response).toEqual('N/A')
	})

    test('deve retornar "N/A" para entrada nula', () => {
        expect(service.dataMask.maskName(null)).toBe('N/A')
    })

    test('deve retornar "N/A" para entrada vazia', () => {
        expect(service.dataMask.maskName('')).toBe('N/A')
    })

    test('deve retornar "N/A" para entrada não string', () => {
        expect(service.dataMask.maskName(123)).toBe('N/A')
    })

    test('deve mascarar corretamente um nome simples', () => {
        expect(service.dataMask.maskName('João')).toBe('João')
    })

    test('deve mascarar corretamente um nome composto', () => {
        expect(service.dataMask.maskName('João Felipe Neto')).toBe('João ****** Neto')
    })

    test('deve mascarar corretamente um nome com sobrenome', () => {
        expect(service.dataMask.maskName('João da Silva')).toBe('João ** *****')
    })

    test('deve remover espaços externos antes de mascarar', () => {
        expect(service.dataMask.maskName('   João Felipe Neto   ')).toBe('João ****** Neto')
    })

    test('deve mascarar corretamente um nome com múltiplos espaços', () => {
        expect(service.dataMask.maskName('João    Felipe    Neto')).toBe('João ****** Neto')
    })

    test('deve mascarar corretamente um nome com múltiplos espaços', () => {
        expect(service.dataMask.maskName('João    Silva  da Felipe    Neto  ')).toBe('João ***** ** ****** Neto')
    })

    test('deve funcionar com apenas um sobrenome', () => {
        expect(service.dataMask.maskName('   João   Silva   ')).toBe('João *****')
    })
})
