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
						N: '1700000000'
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



exports.FACTORY_SUCCESS_RESPONSE = {
	codigo_vdo: '123456',
	id_tipo_produto: 7,
	id_ramo: 27,
	fase: '1',
	status: '0',
	razao_status: '778210123'
}
