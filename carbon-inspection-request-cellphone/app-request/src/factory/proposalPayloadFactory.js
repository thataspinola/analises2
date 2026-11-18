const service = require('../service')

exports.build = (integrationData) => {
    integrationData.proponente.nomePessoa = service.string.removeAccents(integrationData.proponente.nomePessoa)
    return integrationData
}
