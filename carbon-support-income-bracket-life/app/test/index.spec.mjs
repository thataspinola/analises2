import { test, expect, vi } from 'vitest'
import { runtime, expectProxyResponse } from './helpers/application.mjs'
test.each([undefined, {}])(
  'handler passes its event to the controller and serializes once: %j',
  async (event) => {
    const data = [{ codigo: '2500', descricao: 'Synthetic bracket' }]
    const verify = vi.fn(async () => ({ statusCode: 200, body: data }))
    const rt = runtime({
      'src/controller/index.js': { incomeBracket: { verify } },
    })
    const response = await rt.load('index.js').handler(event)
    expect(verify).toHaveBeenCalledExactlyOnceWith(event)
    expect(expectProxyResponse(expect, response, 200)).toEqual(data)
  },
)
