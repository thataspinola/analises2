exports.getTableKeyObject = (vdoCode, branchId) => {
	const tableKeyObject = {
		VDO_CODE: vdoCode,
		BRANCH_ID: branchId,
	}
	return tableKeyObject
}

exports.getTableDataObject = (leadId) => {
	const dataTableObject = {
		LEAD_ID: leadId
	}
	return dataTableObject
}