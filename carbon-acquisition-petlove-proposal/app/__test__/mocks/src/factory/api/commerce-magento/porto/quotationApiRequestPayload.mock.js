exports.REQUEST_PAYLOAD_EXPECTED_OUTPUTVALID = () => {
	return {
		quotation: {
			scope: 'petlove',
			petlove: {
				pet_name: 'Rex',
				specie: 'dog',
				plan_name: 'Plano completo',
				plan_id: 347,
				monthly_fee: 100,
				monthly_fee_porto_card: 100,
				address: {
					zip_code: '01310100',
					street: 'Avenida Paulista',
					number: '982',
					complement: 'Apto 30',
					city: 'São Paulo',
					state: 'SP',
					neighborhood: 'Jardim Bela Vista',
				},
				coverages: [
					{
						title: 'Consultas em horário normal',
					},
					{
						title: 'Consultas em horário de plantão',
					},
					{
						title: 'Vacinas obrigatórias',
					},
				],
			},
		},
	}
}
