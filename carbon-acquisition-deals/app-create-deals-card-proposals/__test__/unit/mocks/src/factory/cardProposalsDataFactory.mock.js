exports.VALID_RESPONSE = () => {
	return [
		{ codigoProposta: '085b9e10-85e8-4327-9027-0d2266fe386e' },
		{ codigoProposta: '1500ecd6-08ab-4656-a397-6a0cdf9d409a' },
		{ codigoProposta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6' },
	]
}

exports.VALID_API_RESPONSE = () => {
	return [
		{
			codigoProposta: '085b9e10-85e8-4327-9027-0d2266fe386e',
			codigoOferta: '4e1052dd-dc3a-4e24-b823-401e81cb99da',
			dataHoraInclusao: '2024-05-28T12:34:19.465Z',
			situacao: 'Aprovada',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Concluída',
				},
			],
		},
		{
			codigoProposta: '1500ecd6-08ab-4656-a397-6a0cdf9d409a',
			codigoOferta: 'abc23b13-2f36-45a0-9923-a0bba29df1aa',
			dataHoraInclusao: '2024-05-22T12:47:03.199Z',
			situacao: 'Aprovada',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Concluída',
				},
			],
		},
		{
			codigoProposta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
			codigoOferta: '4e1052dd-dc3a-4e24-b823-401e81cb99da',
			dataHoraInclusao: '2024-05-28T12:34:19.465Z',
			situacao: 'Aprovada',
			pendencias: [
				{
					nomePendencia: 'Dados Adicionais',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Biometria',
					situacaoPendencia: 'Concluída',
				},
				{
					nomePendencia: 'Transacao',
					situacaoPendencia: 'Concluída',
				},
			],
		},
	]
}
