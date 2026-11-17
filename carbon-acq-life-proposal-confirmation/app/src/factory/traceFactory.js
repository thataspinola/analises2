const nodeCrypto = require('node:crypto')

/**
 * Cria um Trace ID com base no evento recebido.
 * Se um 'carbon-trace-id' estiver presente nos headers, ele será usado.
 * Caso contrário, um novo UUID será gerado.
 *
 * @param {Object} event - O evento que contém os headers.
 * @returns {string} - O Trace ID gerado.
 */

const createdTraceId = (event) => {
    const { headers } = event
    const traceId = headers?.['carbon-trace-id'] && typeof headers['carbon-trace-id'] === 'string'
        ? headers['carbon-trace-id']
        : nodeCrypto.randomUUID()

    return traceId
}

module.exports.createdTraceId = createdTraceId