const CONSTANT = require('../../property')

exports.getMessage = (idLead) => {
    return {
        motivo: CONSTANT.DENY_LEAD_MESSAGE_REASON,
        oportunidadeId: idLead,
    }
}
