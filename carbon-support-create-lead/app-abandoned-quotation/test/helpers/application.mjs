import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import mock from 'mock-require'
import { afterEach, vi } from 'vitest'

const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL('../../', import.meta.url))

afterEach(() => {
  mock.stopAll()
  vi.restoreAllMocks()
})

// Production remains CommonJS. Register dependency doubles before native require
// captures destructured exports, and evict only this application's source cache.
export function createApplication(stubs = {}) {
  mock.stopAll()
  for (const key of Object.keys(require.cache)) {
    if (key === path.join(root, 'index.js') || key.startsWith(path.join(root, 'src') + path.sep)) {
      delete require.cache[key]
    }
  }
  for (const [specifier, value] of Object.entries(stubs)) {
    mock(specifier.startsWith('.') ? path.resolve(root, specifier) : specifier, value)
  }
  return (relative) => require(path.resolve(root, relative))
}

export const installed = (name) => require(name)
