const mockLines = []

jest.mock('pino', () => {
  const pino = jest.requireActual('pino')
  return (options) => pino(options, { write: (line) => mockLines.push(line) })
})

const logger = require('../../../src/service/loggerService')

test('emits parseable operational logs with application metadata, severity and timestamp', () => {
  mockLines.length = 0
  logger.info({ operation: 'abandonedQuotation' }, 'Processing completed')
  logger.error({ operation: 'abandonedQuotation' }, 'Processing failed')

  const entries = mockLines.map(JSON.parse)
  expect(entries).toHaveLength(2)
  for (const entry of entries) {
    expect(entry.application).toBe('hub-vendas.carbon-support-abandoned-quotation')
    expect(entry.environment).toEqual(expect.any(String))
    expect(entry.version).toEqual(expect.any(String))
    expect(entry.operation).toBe('abandonedQuotation')
    expect(Number.isNaN(Date.parse(entry.date))).toBe(false)
  }
  expect(entries.map((entry) => entry.log_level)).toEqual(['INFO', 'ERROR'])
  expect(entries.map((entry) => entry.log_message)).toEqual(['Processing completed', 'Processing failed'])
})
