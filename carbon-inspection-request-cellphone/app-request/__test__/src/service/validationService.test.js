const service = require('../../../src/service')
const CONSTANTS = require('../../../src/property')
const MOCKS = require('../../mocks/src/service/validationService.mock')

describe('Testa uma chamada inputData', () => {
	test('Não deve gerar erros após validar um objeto que segue o esquema esperado', () => {
		expect(() => {
			service.validation.inputData(
				MOCKS.VALID_INPUT_MESSAGE_REQUEST(),
				CONSTANTS.QUEUE_MESSAGE_SCHEMA
			)
		}).not.toThrow()
	})
})
