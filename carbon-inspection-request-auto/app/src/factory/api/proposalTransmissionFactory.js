const CONSTANTS = require('../../property')

exports.getPayload = (itemInput) => {
	let payload = itemInput.integrationData

	payload.codigoParceiro = CONSTANTS.PARTNER_CODE

	removeUnnecessaryFields(payload)

	mockCardData(payload)

	limitNumberCharacters(payload)

	return payload
}

/**
 * Após a implementação do good card o commerce parou de enviar os dados cartão de crédito,
 * por isso estamos mockando os dados de cartão de credito de forma paliativa
 */
function mockCardData(payload) {
	if (payload?.orcamento?.formaPagamentoEscolhida?.meioPagamento?.dadosCartao) {
		const dadosCartao =
			payload?.orcamento?.formaPagamentoEscolhida?.meioPagamento?.dadosCartao

		//add 1 mês da data corrente para ser um mês valido para a integração para o auto
		let nextMonth = new Date()
		nextMonth.setMonth(new Date().getMonth() + 1)

		if (dadosCartao.mesValidade === 0) {
			dadosCartao.mesValidade = nextMonth.getMonth() + 1
		}

		if (dadosCartao.anoValidade === 0) {
			dadosCartao.anoValidade = nextMonth.getFullYear()
		}

		if (!dadosCartao.nomeCartao) {
			dadosCartao.nomeCartao =
				payload.orcamento.itens[0].veiculo.nomeBeneficiario
		}
	}
}

function limitNumberCharacters(payload){
	if(payload.segurado.pessoa.enderecos[0].descricaoComplementoEndereco){
		payload.segurado.pessoa.enderecos[0].descricaoComplementoEndereco = 
			payload.segurado.pessoa.enderecos[0].descricaoComplementoEndereco.slice(0,20);

	}
}

function removeUnnecessaryFields(payload) {
	//quando é informado objeto documentos é obrigatorio que seja um documento com foto (cnh, rg, rne),
	//porém não tem essa informação no front, por isso estamos removendo aqui até a remoção dessa informação no commerce
	delete payload.segurado.pessoa.documentos

	//Remove o campo placa caso esteja vazio. Se enviar o campo com string vazia é retornado erro pelo produto
	if (!payload.orcamento.itens[0].veiculo.placa) {
		delete payload.orcamento.itens[0].veiculo.placa
	}
}
