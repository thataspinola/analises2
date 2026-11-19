import { describe, expect, test } from 'vitest'
import { runtime } from '../helpers/application.mjs'

function offer(id, amount) {
  return {
    orcamento: {
      numeroOrcamento: id,
      coberturas: [{ sigla: 'BAS', valor: amount }],
    },
    calculos: [],
    parcelamentos: [
      {
        codigo: 1,
        nomeFormaPagamento: 'synthetic',
        qtdParcelas: 1,
        descontoAgravo: 0,
        valorPrimeiraParcela: 100,
      },
      {
        codigo: 1,
        nomeFormaPagamento: 'synthetic',
        qtdParcelas: 2,
        descontoAgravo: 0,
        valorPrimeiraParcela: 50,
      },
    ],
  }
}

describe('quotation output contracts', () => {
  test('accepts an empty offer list', () => {
    const factory = runtime({}, { realSuccess: true }).load('src/factory')
    expect(factory.responseSuccess.quotationSuccess([], '1988-03-27')).toEqual({
      statusCode: 200,
      body: { quotations: [] },
    })
  })

  test('sorts by coverage and recommends only the largest plan without leaking the temporary sort field', () => {
    const factory = runtime({}, { realSuccess: true }).load('src/factory')
    const result = factory.responseSuccess.quotationSuccess(
      [offer('low', 500), offer('high', 30000)],
      '1988-03-27',
    )
    expect(result.body.quotations.map((q) => q.porto_quotation_id)).toEqual([
      'high',
      'low',
    ])
    const [high, low] = result.body.quotations.map((q) =>
      JSON.parse(q.product_attributes),
    )
    expect(high.recommendation).toBe(true)
    expect(low.recommendation).toBe(false)
    expect(high.offer_info).toBe('Cobertura R$ 30 mil')
    expect(low.offer_info).toBe('Cobertura R$ 500')
    expect(JSON.parse(high.payments)).toEqual([
      {
        code: 1,
        name: 'synthetic',
        quantity: [
          { quantity: 1, first_installment: 100, discount: 0 },
          { quantity: 2, first_installment: 50, discount: 0 },
        ],
      },
    ])
    expect(JSON.parse(high.coverages)).toEqual([{ BAS: { amount: 30000 } }])
    expect(
      result.body.quotations.every((q) => !Object.hasOwn(q, 'planAmount')),
    ).toBe(true)
  })

  test.each([undefined, 'synthetic message'])(
    'keeps optional error messages in the existing factory contract: %s',
    (message) => {
      const factory = runtime().load('src/factory')
      expect(factory.responseError.error(message)).toEqual({
        statusCode: 500,
        body: {
          status: 'error',
          custom: false,
          ...(message ? { message } : {}),
        },
      })
    },
  )
})
