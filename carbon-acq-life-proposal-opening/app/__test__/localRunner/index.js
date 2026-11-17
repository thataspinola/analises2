const { handler } = require('../../')

const mockedLocalData = {
	susep: 'CM574J',
	lifeinsurance: {
		client: {
			name: 'LOIUTRB WWWEDRFCX WOLF ASXCVOPLMN WISKZTO PLAWERIOC',
			socialName: '',
			gender: 'masculino',
			maritalStatus: 'casado',
			cpf: '19962257077',
			cellPhone: '19997430822',
			email: 'willian.salvador@portoseguro.com.br',
			profession: '01',
			dateOfBirth: '1995-03-02',
		},
		address: {
			zipCode: '13013161',
			street: 'Avenida Andrade Neves',
			number: '1000',
			complement: '',
			neighborhood: 'Centro',
			city: 'Campinas',
			state: 'SP',
		},
		personPep: {
			name: 'John',
			cpf: '25509830093',
			kinshipDegree: 'Pai',
		},
		coverage: [
			{
				amount: 1500,
				code: 'BAS',
				limitMin: 5000,
				limitMax: 5000,
			},
			{
				amount: 5000,
				code: 'AFI',
				limitMin: 5000,
				limitMax: 5000,
			},
		],
		income: '1000',
		livingInBrazil: true,
		notification: false,
		pepRadioButton: false,
		selected_plan_id: '00608210',
		porto_quotation_id: '00583246',
	}
}

handler({body: JSON.stringify(mockedLocalData)})
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
