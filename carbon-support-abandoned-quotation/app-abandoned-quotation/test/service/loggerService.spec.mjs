import { test, expect } from 'vitest'
import { createApplication, installed } from '../helpers/application.mjs'

test('emits parseable operational logs with application metadata, severity and timestamp', () => {
  const lines = []
  const pino = installed('pino')
  const load = createApplication({ pino: (options) => pino(options, { write: (line) => lines.push(line) }) })
  const logger = load('src/service/index.js').logger
  logger.info({ operation: 'abandonedQuotation' }, 'Processing completed')
  logger.error({ operation: 'abandonedQuotation' }, 'Processing failed')
  const entries = lines.map(JSON.parse)
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
