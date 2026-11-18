const CONSTANT = require('../property')

exports.makePayload = (data) => {
	verifySocialNameConductor(data)

	const payload = {
		codigoParceiro: CONSTANT.PARTNER_CODE,
		tipoSeguro: data.auto.bonusPolicy?.congenere
			? CONSTANT.CONGENER_RENOVATION
			: CONSTANT.NEW_INSURANCE,
		segurado: {
			pessoa: {
				nomeSocialPessoa: data.auto.person.client.socialName || null,
				tipo: 1,
				documento: {
					tipo: 1,
					numero: data.auto.person.client.cpf,
				},
				telefone: {
					tipoFinalidade: 1,
					ddd: data.auto.person.client.cellPhone.substring(0, 2),
					numero: data.auto.person.client.cellPhone.substring(2),
				},
				email: data.auto.person.client.email,
			},
		},
		condutores: data.auto.conductors.person.map((item) => ({
			pessoa: {
				nomeSocialPessoa: item.socialName || null,
				tipo: 1,
				documento: {
					tipo: 1,
					numero: item.cpf,
				},
			},
		})),
		cepPernoite: data.auto.zipCodeOvernightStay,
		susep: data.auto.susepCode,
		veiculo: {
			codigoVersao: data.auto.productDetails.vehicleCode,
			anoModelo: data.auto.productDetails.yearModel,
			anoFabricacao: data.auto.productDetails.yearManufacture,
			placa: data.auto.productDetails.plate,
			flagZeroKm: data.auto.productDetails.brandNewCar.substring(0, 1),
			tipoUso: data.auto.typeUse
		},
		apoliceBonus: mountBonusPolicy(data),
		condicoesComerciais: [
			{
				empresa: {
					codigo: CONSTANT.PORTO_COMPANY_CODE,
				},
				marca: {
					codigo: CONSTANT.BRAND_CODES.PORTO
				},
				percentualComissaoAplicado: data.auto.portoSalesCommission,
				agravo: '0',
			},
			{
				empresa: {
					codigo: CONSTANT.PORTO_COMPANY_CODE,
				},
				marca: {
					codigo: CONSTANT.BRAND_CODES.AZUL
				},
				percentualComissaoAplicado: data.auto.azulSalesCommission,
				agravo: '0',
			},
		],
	}

	return payload
}

function verifySocialNameConductor(input) {
	//Se o condutor também for o segurado, verifica se o segurado tem nome social e replica para o condutor
	if (input.auto.person.client.socialName) {
		const cpf = input.auto.person.client.cpf

		input.auto.conductors.person.map((conductor) => {
			if (conductor.cpf == cpf) {
				conductor.socialName = input.auto.person.client.socialName
			}
		})
	}
}

function mountBonusPolicy(data) {
	if (data.auto.bonusPolicy?.congenere)
		return {
			congenere: data.auto.bonusPolicy.congenere,
			bonus: {
				valor: data.auto.bonusPolicy.bonus.value,
			},
		}

	if (data.auto.bonusPolicy)
		return {
			bonus: {
				valor: data.auto.bonusPolicy.bonus.value,
				origem: data.auto.bonusPolicy.bonus.origin,
			},
		}
}
