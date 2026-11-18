const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('Given a pessoa.getPayload call', () => {
	test('It should return a valid payload object that will be used to call pessoa endpoint from governancaDados/dadosPessoa API', async () => {
		const getPayloadReturnValue =
			factory.api.governancaDados.dadosPessoa.pessoa.getPayload(
				MOCKS.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA.GETPAYLOAD_VALID_CLIENTDATA_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA.GETPAYLOAD_VALID_RETURN()
		)
	})
	test('It should return a valid payload object for legal person that will be used to call pessoa endpoint from governancaDados/dadosPessoa API', async () => {
		const getPayloadReturnValue =
			factory.api.governancaDados.dadosPessoa.pessoa.getPayload(
				MOCKS.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA.PJ_GETPAYLOAD_VALID_CLIENTDATA_INPUT(),
				true
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOA.PJ_GETPAYLOAD_VALID_RETURN()
		)
	})
})
