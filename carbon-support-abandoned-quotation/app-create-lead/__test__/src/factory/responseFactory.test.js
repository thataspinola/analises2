const factory = require('../../../src/factory')

const MOCKED_DYNAMICS_RESPONSE = {
	codigoSusep: 'CO12345J',
	corretorNome: 'Clodoaldo Dias',
	corretorEmail: 'teste@teste.com.br',
	corretorTelefone: '552992290616',
	oportunidadeId: '1b6403d8',
	codigoAtendimentoVDO: '17066',
}

describe('Suite de testes de response.js', () => {
	test('Deve retornar susepCode como undefined', () => {
		const input = JSON.parse(JSON.stringify(MOCKED_DYNAMICS_RESPONSE))

		delete input.codigoSusep
		delete input.codigoAtendimentoVDO

		const response = factory.response.createLeadSuccess(input, '123456')

		expect(typeof response).toBe('object')
		expect(response).toHaveProperty('idLead')
		expect(response.idLead).toBe('1b6403d8')
		expect(response).toHaveProperty('susepCode')
		expect(response.susepCode).toBeUndefined()
		expect(response.vdoCode).toBeUndefined()
	})

	test('Should build all values in response', () => {
		const response = factory.response.createLeadSuccess(
			MOCKED_DYNAMICS_RESPONSE,
			'1111113333444'
		)

		expect(response).toEqual({
			brokerEmail: 'teste@teste.com.br',
			brokerName: 'Clodoaldo Dias',
			brokerPhone: '552992290616',
			idLead: '1b6403d8',
			pescod: 1111113333444,
			susepCode: 'CO12345J',
			vdoCode: '17066',
		})
	})
})
