exports.createLeadSuccess = (dynamicsResponse, pescod) => {
	return {
		susepCode: dynamicsResponse.codigoSusep,
		idLead: dynamicsResponse.oportunidadeId,
		vdoCode: dynamicsResponse.codigoAtendimentoVDO,
		brokerName: dynamicsResponse.corretorNome,
		brokerEmail: dynamicsResponse.corretorEmail,
		brokerPhone: dynamicsResponse.corretorTelefone,
		pescod: Number.parseInt(`${pescod}`), // Added to guarantee the numeric value will be considered, to respect actual contract (converting to string broke the contract)
		brokerId: dynamicsResponse.idCorretor,
		activeSusepOriginLP: dynamicsResponse.susepOrigemLpAtiva
	}
}
