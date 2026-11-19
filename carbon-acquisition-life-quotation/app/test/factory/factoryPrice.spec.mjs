import { describe, test, expect } from 'vitest'
import { runtime } from '../helpers/application.mjs'
import MOCKS from '../helpers/fixtures.mjs'
const mock = MOCKS

describe('test for response factory', () => {
  const factory = () => runtime({}, { realSuccess: true }).load('src/factory')
  test('deve retornar o preço calculado se getPriceByCalculations retornar um valor', () => {
    const data = mock.PRICE_100()

    const result = factory().price.getPrice(data)
    expect(result).toBe(100)
  })

  test('deve retornar o preço do parcelamento se getPriceByCalculations retornar null', () => {
    const data = mock.PRICE_NULL()

    const result = factory().price.getPrice(data)
    expect(result).toBe(200)
  })

  test('deve retornar 0.1 se getPriceByCalculations e getPriceByInstallment retornarem null', () => {
    const data = mock.PRICE_0_1()

    const result = factory().price.getPrice(data)
    expect(result).toBe(0.1)
  })

  test('deve retornar o 154.28 quando existe um desconto FPG com percentual 0', () => {
    const data = mock.CALCULATIONS_154_48()

    const response = factory().price.getPriceByCalculations(data)

    expect(response).toBe(154.48)
  })

  test('deve retornar null quando não existe desconto FPG com percentual 0', () => {
    const data = mock.CALCULATIONS_FPG_1()

    const response = factory().price.getPriceByCalculations(data)

    expect(response).toBeNull()
  })

  test('deve retornar null quando descontoAgravo não existe', () => {
    const data = mock.CALCULATIONS_NOT_DESCONTOAGRAVO()

    expect(factory().price.getPriceByCalculations(data)).toBeNull()
  })

  test('deve retornar null quando precificacao não existe', () => {
    const data = [{}]
    expect(factory().price.getPriceByCalculations(data)).toBeNull()
  })

  test('deve retornar null quando nenhum desconto correspondente é encontrado', () => {
    const data = mock.CALCULATIONS_NO_DISCOUNT()
    expect(factory().price.getPriceByCalculations(data)).toBeNull()
  })

  test('deve retornar o total de um desconto com desconto FPG no segundo índice', () => {
    const data = mock.CALCULATIONS_DISCOUNT_FPG()
    expect(factory().price.getPriceByCalculations(data)).toBe(200)
  })

  test('deve retornar o valor da primeira parcela quando encontrado um parcelamento com descontoAgravo 0 e qtdParcelas 1', () => {
    const data = mock.INTALLMENT_FIRST_VALUE()

    const result = factory().price.getPriceByInstallment(data)
    expect(result).toBe(100)
  })

  test('deve retornar null quando não há parcelamento com descontoAgravo 0 e qtdParcelas 1', () => {
    const data = mock.INTALLMENT_NOT_DISCONTO_AGRAVO()

    const result = factory().price.getPriceByInstallment(data)
    expect(result).toBeNull()
  })

  test('deve retornar null quando a lista estiver vazia', () => {
    const data = []
    const result = factory().price.getPriceByInstallment(data)
    expect(result).toBeNull()
  })

  test('deve ignorar parcelamentos com descontoAgravo diferente de 0', () => {
    const data =
      mock.INTALLMENT_WITH_DISCONTO_AGRAVO_QTDPARCELA_GREATER_THAN_0()

    const result = factory().price.getPriceByInstallment(data)
    expect(result).toBeNull()
  })
})
