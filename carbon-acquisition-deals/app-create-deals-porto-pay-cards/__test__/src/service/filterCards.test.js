const MOCKS = require('../../mocks/src/service/filterCards.mock')

const {
	filter,
	uppercaseBandeira,
} = require('../../../src/service/filterCardsService')

describe('Teste das funções filter e uppercaseBandeira', () => {
	test('uppercaseBandeira deve retornar a lista com o campo bandeira convertido para maiúsculas', () => {
		const result = filter(MOCKS.VALID_INPUT_DATA())
		expect(result[0].bandeira).toEqual('VISA')
		expect(result[1].bandeira).toEqual('MASTERCARD')
	})

	test('filter deve retornar apenas os cartões com bandeira VISA, MASTERCARD ou ELO', () => {
		const result = filter(MOCKS.VALID_INPUT_DATA())
		expect(result).toEqual([
			{ ...MOCKS.VALID_INPUT_DATA()[0], bandeira: 'VISA' },
			{ ...MOCKS.VALID_INPUT_DATA()[1], bandeira: 'MASTERCARD' },
		])
	})

	test('filter deve retornar uma lista vazia quando não houver cartões com bandeira VISA, MASTERCARD ou ELO', () => {
		const result = filter([
			{ ...MOCKS.VALID_INPUT_DATA()[2], bandeira: 'amex' },
		])
		expect(result).toEqual([])
	})
})
