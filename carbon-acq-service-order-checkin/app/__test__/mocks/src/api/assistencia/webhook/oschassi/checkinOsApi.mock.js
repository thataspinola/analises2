exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_WITHOUTOPTIONALATTRIBUTES_VALID_INPUT =
	() => {
		return {
			carbonTraceId: '12345',
			externalId: '2410987',
			amount: 98.72,
			integrationData: {
				serviceOrderNumber: '1087606-24',
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-26T08:00:00.000',
					},
					serviceId: '100',
					sku: 'ED001',
					specialtyCode: '44',
					subject: 'UI1',
				},
				customer: {
					name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
					email: 'fulano.silva@gmail.com',
					cellphone: '11222225555',
					documentNumber: '58489669074',
				},
				serviceAddress: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					streetNumber: '982',
				},
			},
		}
	}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT = () => {
	return {
		carbonTraceId: '12345',
		externalId: '2410987',
		amount: 98.72,
		integrationData: {
			serviceOrderNumber: '1087606-24',
			serviceOrder: {
				schedule: {
					startDateTime: '2024-09-26T08:00:00.000',
				},
				serviceId: '000001',
				sku: 'ED001',
				specialtyCode: '44',
				subject: 'UI1',
			},
			customer: {
				name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
				socialName: '',
				email: 'fulano.silva@gmail.com',
				cellphone: '11222225555',
				documentNumber: '58489669074',
			},
			serviceAddress: {
				city: 'Sao Paulo',
				state: 'SP',
				zipCode: '01310100',
				neighborhood: 'Bela Vista',
				street: 'Avenida Paulista',
				streetNumber: '982',
				additionalInfo: '',
			},
		},
	}
}

exports.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_EMPTYSTREETNUMBER_VALID_INPUT =
	() => {
		return {
			carbonTraceId: '12345',
			externalId: '2410987',
			amount: 98.72,
			integrationData: {
				serviceOrderNumber: '1087606-24',
				serviceOrder: {
					schedule: {
						startDateTime: '2024-09-26T08:00:00.000',
					},
					serviceId: '000001',
					sku: 'ED001',
					specialtyCode: '44',
					subject: 'UI1',
				},
				customer: {
					name: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
					socialName: '',
					email: 'fulano.silva@gmail.com',
					cellphone: '11222225555',
					documentNumber: '58489669074',
				},
				serviceAddress: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					streetNumber: '',
					additionalInfo: '',
				},
			},
		}
	}

exports.GETDATAREPORT_VALID_RETURN = () => {
	return {
		carbonTraceId: '1234567890abcdef',
		eCommercePlatform: {
			orderNumber: 'ORD123456',
			loggedCPF: '12345678901',
		},
		externalId: 'EXT123456',
		itemId: 'ITEM123456',
		contactEmail: 'customer@example.com',
		installments: 3,
		amount: 150.75,
		leadIdentifier: 'LEAD123456',
		paymentData: {
			externo: true,
			empresa: 'Empresa XYZ',
			filial: 'Filial 1',
			hash: 'hash123456',
			proposta: 'Proposta 123456',
			tipoTransacao: 'CREDITO',
		},
		integrationData: {
			serviceOrderNumber: 'SO123456',
			serviceOrder: {
				schedule: {
					startDateTime: '2023-10-01T10:00:00Z',
					endDateTime: '2023-10-01T12:00:00Z',
					openOsDateTime: '2023-09-30T09:00:00Z',
					key: 'KEY123456',
				},
				siebelIntegrationId: 'SIEBEL123456',
				serviceId: 'SERVICE123456',
				sku: 'SKU123456',
				specialtyCode: 'SPECIALTY123',
				originCode: 'ORIGIN123',
				companyCode: 'COMPANY123',
				sourceSystemCode: 'SOURCE123',
				coupon: 'TESTE1',
				problem: 'Problema de teste',
				subject: 'Assunto de teste',
				combo: {
					id: 1,
					items: [
						{
							productId: 101,
							quantity: 2,
						},
						{
							productId: 102,
							quantity: 1,
						},
					],
				},
			},
			customer: {
				name: 'Cliente Teste',
				socialName: 'Cliente Social',
				email: 'cliente.teste@example.com',
				cellPhone: '11987654321',
				documentNumber: '12345678901',
			},
			serviceAddress: {
				city: 'São Paulo',
				state: 'SP',
				zipCode: '01234-567',
				neighborhood: 'Bairro Teste',
				street: 'Rua Teste',
				streetType: 'Rua',
				streetNumber: '123',
				latitude: -23.5505,
				longitude: -46.6333,
				reference: 'Perto do parque',
				additionalInfo: 'Informação adicional',
			},
		},
	}
}

exports.GETDATAREPORT_WITHOUTOPTIONALATTRIBUTES_VALID_RETURN = () => {
	return {
		carbonTraceId: '1234567890abcdef',
		eCommercePlatform: {
			orderNumber: 'ORD123456',
			loggedCPF: '12345678901',
		},
		externalId: 'EXT123456',
		itemId: 'ITEM123456',
		contactEmail: 'customer@example.com',
		installments: 3,
		amount: 150.75,
		leadIdentifier: 'LEAD123456',
		paymentData: {
			externo: true,
			empresa: 'Empresa XYZ',
			filial: 'Filial 1',
			hash: 'hash123456',
			proposta: 'Proposta 123456',
			tipoTransacao: 'CREDITO',
		},
		integrationData: {
			serviceOrderNumber: 'SO123456',
			serviceOrder: {
				schedule: {
					startDateTime: '2023-10-01T10:00:00Z',
					endDateTime: '2023-10-01T12:00:00Z',
					openOsDateTime: '2023-09-30T09:00:00Z',
					key: 'KEY123456',
				},
				siebelIntegrationId: 'SIEBEL123456',
				serviceId: 'SERVICE123456',
				sku: 'SKU123456',
				specialtyCode: 'SPECIALTY123',
				originCode: 'ORIGIN123',
				companyCode: 'COMPANY123',
				sourceSystemCode: 'SOURCE123',
				coupon: 'TESTE1',
				problem: 'Problema de teste',
				subject: 'Assunto de teste',
				combo: {
					id: 1,
					items: [
						{
							productId: 101,
							quantity: 2,
						},
						{
							productId: 102,
							quantity: 1,
						},
					],
				},
			},
			customer: {
				name: 'Cliente Teste',
				socialName: 'Cliente Social',
				email: 'cliente.teste@example.com',
				cellPhone: '11987654321',
				documentNumber: '12345678901',
			},
			serviceAddress: {
				city: 'São Paulo',
				state: 'SP',
				zipCode: '01234-567',
				neighborhood: 'Bairro Teste',
				street: 'Rua Teste',
				streetType: 'Rua',
				streetNumber: '123',
				latitude: -23.5505,
				longitude: -46.6333,
				reference: 'Perto do parque',
				additionalInfo: 'Informação adicional',
			},
		},
	}
}

exports.GETDATAREPORT_EXPECTEDOUPUT = () => {
	return {
		Apontamentos: [
			{
				codigoprodutoapontamento: 'ED001',
				codigoservico: '000001',
				precolista: 98.72,
				quantidade: 1,
				valortotal: 98.72,
				valorunitario: 98.72,
			},
		],
		bairro: 'Bela Vista',
		cep: '01310100',
		cidade: 'Sao Paulo',
		codassunto: 'UI1',
		codigoDocumento: '58489669074',
		codsistorigem: '36',
		complementoLogradouro: '',
		dataDeAniversario: '19900101',
		ddd: '11',
		dtagendamento: '20240926',
		email: 'fulano.silva@gmail.com',
		estadoCivil: '7',
		formapagamento: 'CC',
		genero: 'M',
		hragendamento: '08:00:00',
		idexterno: '2410987',
		itensdaordem: [
			{
				codigoEspecialidade: '44',
			},
		],
		logradouro: 'Avenida Paulista',
		nome: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
		nomeSocial: '',
		numero: '982',
		ocupacao: '9',
		osportosocorro: '1087606-24',
		osportosocorropai: '',
		telefone: '222225555',
		tokenpgto: '',
		uf: 'SP',
		codigosusep: 'TST03J',
	}
}

exports.GETDATAREPORT_EMPTY_STREETNUMBER_EXPECTEDOUPUT = () => {
	return {
		Apontamentos: [
			{
				codigoprodutoapontamento: 'ED001',
				codigoservico: '000001',
				precolista: 98.72,
				quantidade: 1,
				valortotal: 98.72,
				valorunitario: 98.72,
			},
		],
		bairro: 'Bela Vista',
		cep: '01310100',
		cidade: 'Sao Paulo',
		codassunto: 'UI1',
		codigoDocumento: '58489669074',
		codsistorigem: '36',
		complementoLogradouro: '',
		dataDeAniversario: '19900101',
		ddd: '11',
		dtagendamento: '20240926',
		email: 'fulano.silva@gmail.com',
		estadoCivil: '7',
		formapagamento: 'CC',
		genero: 'M',
		hragendamento: '08:00:00',
		idexterno: '2410987',
		itensdaordem: [
			{
				codigoEspecialidade: '44',
			},
		],
		logradouro: 'Avenida Paulista',
		nome: 'WECNVBTUO WISKZTO WTOPCNGHJKKK DBA WOLF',
		nomeSocial: '',
		numero: '0',
		ocupacao: '9',
		osportosocorro: '1087606-24',
		osportosocorropai: '',
		telefone: '222225555',
		tokenpgto: '',
		uf: 'SP',
		codigosusep: 'TST03J',
	}
}
