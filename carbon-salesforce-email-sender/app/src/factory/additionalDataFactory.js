exports.mount = (clientData, brokerData, pescod, needInspection, idBranch) => {
	return {
		pescod: pescod,
		clientEmail: clientData?.email,
		clientName: clientData?.nomeSocial || clientData?.nomePessoa,
		brokerName: brokerData?.name || brokerData?.brokerName,
		brokerPhone: brokerData?.phone || brokerData?.brokerPhone,
		brokerEmail: brokerData?.email || brokerData?.brokerEmail,
		needInspection: needInspection,
		idBranch: idBranch,
	}
}
