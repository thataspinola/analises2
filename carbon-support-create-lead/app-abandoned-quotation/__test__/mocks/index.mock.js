const CONSTANT = require('../../../app-create-lead/src/property/index')

exports.VALID_INPUT_DATA = {
	Records: [
		{
			dynamodb: {
				OldImage: {
					vdoCode: {
						S: '123456'
					},
					idProductType: {
						S: '7'
					},
					idBranch: {
						S: '27'
					},
					expireAt: {
						N: Math.floor((new Date().getTime() - CONSTANT.LEAD_IN_PROGRESS_TTL_IN_MINUTES * 60 * 1000) / 1000)
					}
				}
			}
		},
	]
}

exports.API_SUCCESS_RESPONSE = {
	statusCode: 200,
	statusMessage: 'SUCESSO',
}


exports.CONTROLLER_SUCCESS_RESPONSE = [
	{
		statusCode: 200,
		statusMessage: 'SUCESSO',
	}
]

exports.FACTORY_SUCCESS_RESPONSE = {
	codigo_vdo: '123456',
	id_tipo_produto: 7,
	id_ramo: 27,
	fase: '1',
	status: '0',
	razao_status: '778210123'
}



exports.PUTCOMMAND_VALID_RETURN = {
	ConsumedCapacity: {
		CapacityUnits: 1,
		TableName: CONSTANT.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME
	},
}

exports.VALID_PUT_ITEM = {
	vdoCode: '123456',
	idProductType: '7',
	idBranch: '27'
}