const { parseLifeProposal } = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Suite de Testes parseLifeProposalFactory.js', () => {
	afterEach(() => {
		jest.restoreAllMocks()
	})

	describe('Testes da função toInputData', () => {
		test('Deve retornar um objeto no formato esperado', () => {
			jest.spyOn(parseLifeProposal, 'calculateAge').mockReturnValueOnce(28)

			const response = parseLifeProposal.toInputData(
				MOCKS.INVOKER_PAYLOAD_OBJECT
			)

			expect(response).toEqual(MOCKS.PARSE_TO_INPUT_OBJECT_RESPONSE_WITH_PEP)
		})

		test('Deve retornar um objeto no formato esperado para pessoa exposta politicamente EUMESMO', () => {
			const inputData = MOCKS.INVOKER_PAYLOAD_OBJECT_PEP_EUMESMO

			jest.spyOn(parseLifeProposal, 'calculateAge').mockReturnValueOnce(28)

			const response = parseLifeProposal.toInputData(inputData)

			response.proposta.contratante.grupo.segurado.pessoa.pessoaExpostaPoliticamente =
				'Sim'

			expect(response).toEqual(MOCKS.PARSE_TO_INPUT_OBJECT_RESPONSE_PEP_EUMESMO)
		})

		test('Deve retornar um objeto no formato esperado para pessoa exposta politicamente igual a nulo', () => {
			const inputData = MOCKS.INVOKER_PAYLOAD_OBJECT_WITHOUT_PEP

			jest.spyOn(parseLifeProposal, 'calculateAge').mockReturnValueOnce(28)

			const response = parseLifeProposal.toInputData(inputData)

			expect(response).toEqual(MOCKS.PARSE_TO_INPUT_OBJECT_RESPONSE_WITHOUT_PEP)
		})
	})

	describe('Testes da função calculateAge', () => {
		test('Deve retornar a idade correta', () => {
			const today = new Date()

			let beforeDate = new Date()
			beforeDate.setFullYear(2000)

			expect(parseLifeProposal.calculateAge(beforeDate.toISOString())).toEqual(
				today.getFullYear() - beforeDate.getFullYear()
			)

			beforeDate.setMonth(today.getMonth())
			beforeDate.setDate(today.getDate() + 1)

			expect(parseLifeProposal.calculateAge(beforeDate.toISOString())).toEqual(
				today.getFullYear() - beforeDate.getFullYear() - 1
			)
		})
	})
})
