const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')

describe('Suite de testes de responseFactory.js', () => {
	describe('Dada uma chamada ao método `success`', () => {
		test('Deve retornar uma resposta com o valor esperado com o corpo com o valor do parâmetro equivalente', async () => {
			const successReturnValue = factory.response.success(
				MOCKS.FACTORY_RESPONSE.SUCCESS_BODY_CONTENT()
			)
			expect(successReturnValue).toEqual(
				MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
			)
		})

		test('Deve retornar uma resposta com o valor esperado com o corpo vazio quando o valor do parâmetro não for fornecido', async () => {
			const successReturnValue = factory.response.success()
			expect(successReturnValue).toEqual(
				MOCKS.FACTORY_RESPONSE.SUCCESS_EMPTY_BODY_RETURN()
			)
		})
	})

	describe('Dada uma chamada ao método `error`', () => {
		test('Deve retornar uma resposta com o valor esperado sem body.message quando o parâmetro message for indefinido ou uma string vazia', async () => {
			const errorReturnValue = factory.response.error()
			expect(errorReturnValue).toEqual(
				MOCKS.FACTORY_RESPONSE.DEFAULT_ERROR_RETURN()
			)
		})

		test('Deve retornar uma resposta com o valor esperado com body.message quando o parâmetro message não for indefinido e não for uma string vazia', async () => {
			const errorReturnValue = factory.response.error(
				MOCKS.FACTORY_RESPONSE.ERROR_MESSAGE()
			)
			expect(errorReturnValue).toEqual(
				MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
			)
		})
	})
})
