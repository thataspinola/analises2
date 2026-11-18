const MOCKS = require('../../mocks/index.mock')
const { mailService } = require('../../../src/factory')

describe('Given mailServiceFactory call', () => {
	test('should return converted object', () => {
		let input = {
			...MOCKS.PAYLOAD_VALID,
		}
		let result = mailService.payloadSendEmail(input)

		expect(result.idAplicacaoUtilizadora).toBe(input.idAplicacaoUtilizadora)
		expect(result.unidadeNegocio).toBe(input.unidadeNegocio)
		expect(result.centroDeCustoPagador).toBe(input.centroDeCustoPagador)
		expect(result.emailDoResponsavelEmEnviar).toBe(input.from)
		expect(result.emailsRecebedores[0].emailRecebedor).toBe(input.to[0])
		expect(result.emailsRecebedoresEmCopia[0].emailRecebedorEmCopia).toBe(
			input.cc[0]
		)
		expect(
			result.emailsRecebedoresDeCopiaOculta[0].emailRecebedorDeCopiaOculta
		).toBe(input.bcc[0])
		expect(result.assuntoEmail).toBe(input.subject)
		expect(result.tipoCorpoEmail).toBe(input.emailType)
		expect(result.corpoEmail).toBe(input.body)
	})

	test('should return converted object without optional fields', () => {
		let input = {
			...MOCKS.PAYLOAD_VALID,
			to: undefined,
			cc: undefined,
			bcc: undefined,
		}
		let result = mailService.payloadSendEmail(input)

		expect(result.idAplicacaoUtilizadora).toBe(input.idAplicacaoUtilizadora)
		expect(result.unidadeNegocio).toBe(input.unidadeNegocio)
		expect(result.centroDeCustoPagador).toBe(input.centroDeCustoPagador)
		expect(result.emailDoResponsavelEmEnviar).toBe(input.from)
		expect(result.emailsRecebedores).toBe(undefined)
		expect(result.emailsRecebedoresEmCopia).toBe(undefined)
		expect(result.emailsRecebedoresDeCopiaOculta).toBe(undefined)
		expect(result.assuntoEmail).toBe(input.subject)
		expect(result.tipoCorpoEmail).toBe(input.emailType)
		expect(result.corpoEmail).toBe(input.body)
	})
})
