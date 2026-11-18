exports.filter = (proposals) => {
	return proposals?.filter((proposal) => {
		const pendencias = proposal.pendencias

		const dadosAdicionais = pendencias.find(
			(p) => p.nomePendencia === 'Dados Adicionais'
		)
		const biometria = pendencias.find((p) => p.nomePendencia === 'Biometria')
		const transacao = pendencias.find((p) => p.nomePendencia === 'Transacao')

		return (
			dadosAdicionais &&
			dadosAdicionais.situacaoPendencia === 'Concluída' &&
			biometria &&
			biometria.situacaoPendencia === 'Concluída' &&
			transacao &&
			transacao.situacaoPendencia === 'Pendente'
		)
	})
}
