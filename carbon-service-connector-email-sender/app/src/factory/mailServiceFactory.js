exports.payloadSendEmail = (input) => {
	return {
		idAplicacaoUtilizadora: input.idAplicacaoUtilizadora,
		unidadeNegocio: input.unidadeNegocio,
		centroDeCustoPagador: input.centroDeCustoPagador,
		emailDoResponsavelEmEnviar: input.from,
		emailsRecebedores: getEmailRecebedor(input.to),
		emailsRecebedoresEmCopia: emailsRecebedoresEmCopia(input.cc),
		emailsRecebedoresDeCopiaOculta: emailsRecebedoresDeCopiaOculta(input.bcc),
		assuntoEmail: input.subject,
		tipoCorpoEmail: input.emailType,
		corpoEmail: input.body,
	}
}

function getEmailRecebedor(emails) {
	let emailsRecebedores

	if (emails) {
		emailsRecebedores = []

		for (let email of emails) {
			let emailRecebedor = {
				emailRecebedor: email,
			}
			emailsRecebedores.push(emailRecebedor)
		}
	}

	return emailsRecebedores
}

function emailsRecebedoresEmCopia(emails) {
	let emailsRecebedores

	if (emails) {
		emailsRecebedores = []

		for (let email of emails) {
			let emailRecebedor = {
				emailRecebedorEmCopia: email,
			}
			emailsRecebedores.push(emailRecebedor)
		}
	}

	return emailsRecebedores
}

function emailsRecebedoresDeCopiaOculta(emails) {
	let emailsRecebedores

	if (emails) {
		emailsRecebedores = []

		for (let email of emails) {
			let emailRecebedor = {
				emailRecebedorDeCopiaOculta: email,
			}
			emailsRecebedores.push(emailRecebedor)
		}
	}

	return emailsRecebedores
}
