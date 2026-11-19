import { createRequire } from 'node:module'
export default createRequire(import.meta.url)('../fixtures/quotation.cjs')
