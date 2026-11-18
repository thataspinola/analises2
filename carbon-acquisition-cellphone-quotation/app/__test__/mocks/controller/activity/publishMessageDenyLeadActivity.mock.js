const CONSTANT = require('../../../../src/property')

exports.ID_LEAD = 'lead123'

exports.MESSAGE_DENY_LEAD = { body: 'deny lead message' }

exports.EXPECTED_LOG_ERROR = JSON.stringify({
    layer: 'QuotationController',
    currentActivity: `Erro identificado durante a atividade '${CONSTANT.PUBLISH_MESSAGE_DENY_LEAD}'`,
    error: 'Error sending message'
})