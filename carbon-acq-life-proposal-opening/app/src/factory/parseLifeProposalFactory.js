const CONSTANT = require('../property')

exports.calculateAge = function (dateOfBirth) {
	const birthDate = new Date(dateOfBirth)
	const today = new Date()

	let age = today.getFullYear() - birthDate.getFullYear()

	if (
		today.getMonth() < birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() &&
			today.getDate() < birthDate.getDate())
	) {
		age--
	}

	return age
}

function avaliatePEP(lifeinsurance) {
	if (!lifeinsurance.pepRadioButton) {
		return 'Nao'
	}

	if (lifeinsurance.personPep.kinshipDegree.toUpperCase() === 'EUMESMO') {
		return 'Sim'
	}

	return 'RelacionamentoProximo'
}

function parsePEP(lifeinsurance) {
	if (!lifeinsurance.personPep) return null

	return {
		nome: lifeinsurance.personPep.name,
		cpf: lifeinsurance.personPep.cpf,
		grauParentesco: lifeinsurance.personPep.kinshipDegree,
	}
}

function parseCoverages(coverages) {
	return coverages.map((coverage) => ({
		valor: String(coverage.amount),
		sigla: coverage.code,
		limiteMinimo: String(coverage.limitMin),
		limiteMaximo: String(coverage.limitMax),
	}))
}

/**
 *
 * @param {object} data Payload enviado pelo Invoker
 * @returns Objeto no formato aceito pela API de Proposta do Vida
 */
exports.toInputData = function (data) {
	const { lifeinsurance } = data

	return {
		proposta: {
			codigoEmpresa: CONSTANT.COD_EMPRESA_PADRAO,
			numeroOrcamento: lifeinsurance.selected_plan_id,
			dataProtocolo: new Date().toISOString().split('T')[0],
			contratante: {
				grupo: {
					segurado: {
						pessoa: {
							tipo: CONSTANT.TIPO_PESSOA_PADRAO,
							enderecos: [
								{
									tipoEndereco: CONSTANT.TIPO_ENDERECO_PADRAO,
									logradouro: lifeinsurance.address.street,
									numeroLogradouro: lifeinsurance.address.number,
									bairro: lifeinsurance.address.neighborhood,
									cidade: lifeinsurance.address.city,
									uf: lifeinsurance.address.state,
									cep: lifeinsurance.address.zipCode.slice(
										0,
										lifeinsurance.address.zipCode.length - 3
									),
									complemento: lifeinsurance.address.complement,
									complementoCep: lifeinsurance.address.zipCode.slice(-3),
								},
							],
							nome: lifeinsurance.client.name,
							nomeSocial: lifeinsurance.client.socialName,
							dadosPessoaFisica: {
								// profissao: lifeinsurance.client.profession,
								dataNascimento: lifeinsurance.client.dateOfBirth,
								sexo: lifeinsurance.client.gender.toUpperCase(),
								numeroCpf: lifeinsurance.client.cpf.slice(0, 9),
								digitoCpf: lifeinsurance.client.cpf.slice(-2),
								estadoCivil: lifeinsurance.client.maritalStatus.toUpperCase(),
								nacionalidade: CONSTANT.NACIONALIDADE_PADRAO,
								idade: String(
									this.calculateAge(lifeinsurance.client.dateOfBirth)
								),
								paisResidente: CONSTANT.PAIS_RESIDENTE_PADRAO,
								resideBrasil: lifeinsurance.livingInBrazil,
							},
							email: lifeinsurance.client.email,
							rendaMensal: parseInt(lifeinsurance.income, 10),
							telefones: [
								{
									tipoTelefone: CONSTANT.TIPO_TELEFONE_PADRAO,
									numeroTelefone: lifeinsurance.client.cellPhone.slice(2),
									dddTelefone: lifeinsurance.client.cellPhone.slice(0, 2),
								},
							],
							pessoaExpostaPoliticamente: avaliatePEP(lifeinsurance),
							pessoaPEP: parsePEP(lifeinsurance),
						},
						coberturas: parseCoverages(lifeinsurance.coverage),
					},
				},
				dadosPagamento: null,
			},
			remuneracoes: [
				{
					percentual: 10,
					tipoRemuneracao: CONSTANT.TIPO_REMUNERACAO_PADRAO,
					favorecidos: [
						{
							papel: CONSTANT.TIPO_REMUNERACAO_PADRAO,
							participacao: 100,
							corretorLider: true,
							susep: data.susep,
							antecipaComissao: false,
						},
					],
				},
			],
		},
	}
}
