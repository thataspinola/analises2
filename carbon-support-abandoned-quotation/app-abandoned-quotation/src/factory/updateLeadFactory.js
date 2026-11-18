exports.makeUpdateLeadPayload = (data) => {
	return {
		codigo_vdo: data.vdoCode?.S,
		id_tipo_produto: data.idProductType?.S && Number(data.idProductType.S),
		id_ramo: data.idBranch?.S && Number(data.idBranch.S),
		fase: '1',
		status: '0',
		razao_status: '778210123'
	}
}