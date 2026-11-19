import { test, expect } from 'vitest'
import { runtime } from './helpers/application.mjs'

test('real Pino output contains the runtime environment, application, severity and timestamp', () => {
  const rt = runtime(),
    logger = rt.load('config/logger.js')
  logger.info({ operation: 'incomeBracket' }, 'Processing completed')
  logger.error({ operation: 'incomeBracket' }, 'Processing failed')
  const entries = rt.lines.map(JSON.parse)
  expect(entries).toHaveLength(2)
  for (const entry of entries) {
    expect(entry.application).toBe(
      'hub-vendas.carbon-acquisition-support-income-bracket-life',
    )
    expect(entry.environment).toBe('test')
    expect(entry.version).toBe('1.0.0')
    expect(entry.operation).toBe('incomeBracket')
    expect(Number.isNaN(Date.parse(entry.date))).toBe(false)
  }
  expect(entries.map((e) => e.log_level)).toEqual(['INFO', 'ERROR'])
  expect(entries.map((e) => e.log_message)).toEqual([
    'Processing completed',
    'Processing failed',
  ])
})
