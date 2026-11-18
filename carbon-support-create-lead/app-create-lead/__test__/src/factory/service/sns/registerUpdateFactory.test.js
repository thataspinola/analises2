const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('Suite de teste de factory sns/registerUpdateFactory.js', () => {
	describe('Dada uma chamada para o metodo getPayload', () => {
		test('Deve retornar um valor de retorno com o formato esperado quando inputRequest for objeto válido com as propriedades esperadas', () => {
			expect(
				factory.service.sns.registerUpdate.getPayload(
					MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_INPUTREQUEST_INPUT()
				)
			).toEqual(MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN())
		})
		test('Deve retornar um valor de retorno com o formato esperado quando inputRequest for objeto válido com as propriedades obrigatórias', () => {
			expect(
				factory.service.sns.registerUpdate.getPayload(
					MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_INPUTREQUEST_WITHOUTOPTIONALS_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN_WITHOUTOPTIONALS()
			)
		})
		test('Deve retornar um valor de retorno com o formato esperado quando inputRequest for objeto válido com numero de celular inválido', () => {
			expect(
				factory.service.sns.registerUpdate.getPayload(
					MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDPHONE_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN_WITHINVALIDPHONE()
			)
		})
		test('Deve retornar um valor de retorno com o formato esperado quando inputRequest for objeto válido com numero de celular inválido (contendo somente mascaras do numero)', () => {
			expect(
				factory.service.sns.registerUpdate.getPayload(
					MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDPHONE_JUSTMASKS_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN_WITHINVALIDPHONE()
			)
		})
		test('Deve retornar um valor de retorno com o formato esperado quando inputRequest for objeto válido com cep inválido (contendo somente mascaras do numero)', () => {
			expect(
				factory.service.sns.registerUpdate.getPayload(
					MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_INPUTREQUEST_WITHINVALIDZIPCODE_JUSTMASKS_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_SNS_REGISTERUPDATE.GETPAYLOAD_VALID_RETURN_WITHINVALIDZIPCODE()
			)
		})
	})
})
