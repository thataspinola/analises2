const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ERROR_TYPES = new Set([
  'Error', 'TypeError', 'SyntaxError', 'RangeError', 'ValidationError',
  'ExternalApiError', 'AxiosError', 'AbortError',
])

exports.traceId = (value) =>
  typeof value === 'string' && UUID.test(value) ? value : undefined

exports.quotationId = (value) => {
  const identifier = typeof value === 'number' && Number.isSafeInteger(value)
    ? String(value)
    : value
  return typeof identifier === 'string' && (/^[0-9]{1,32}$/.test(identifier) || UUID.test(identifier))
    ? identifier
    : undefined
}

exports.httpStatus = (value) =>
  Number.isInteger(value) && value >= 100 && value <= 599 ? value : undefined

exports.errorCode = (value) =>
  typeof value === 'string' && /^(ERR_[A-Z_]{1,40}|E[A-Z]{2,30}|(?:GN|OR)[0-9]{2})$/.test(value)
    ? value
    : undefined

exports.errorSummary = (error) => {
  const type = error?.name || error?.type
  return {
    type: ERROR_TYPES.has(type) ? type : 'Error',
    code: exports.errorCode(error?.code),
    statusCode: exports.httpStatus(error?.response?.status) || exports.httpStatus(error?.code) || exports.httpStatus(error?.statusCode),
  }
}
