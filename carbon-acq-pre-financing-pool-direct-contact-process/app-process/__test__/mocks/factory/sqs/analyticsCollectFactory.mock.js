const defaultMockedTimeStamp = `${new Date(2024, 4, 16, 0, 0, 0, 0).getTime()}`

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCPF_WHATSAPP_PARSEDINPUT_INPUT =
	() => {
		return {
			formData: {
				client: {
					fullName: 'Nomeir Sobrenomeson',
					cpfCnpj: '06963752060',
					cellPhone: '1198754422',
					email: 'cliente@clienteproduto.com.br',
				},
				address: {
					zipCode: '01254-985',
				},
				marketingOptOutFlag: false,
				channel: 'whatsapp',
				product: 'AUTOMOVEL',
				id_google: '515856718.1699888349',
				session_google: '1699982351',
			},
		}
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCNPJ_TELEFONE_PARSEDINPUT_INPUT =
	() => {
		return {
			formData: {
				client: {
					fullName: 'Seguros ABCD Ltda.',
					cpfCnpj: '29259881000141',
					cellPhone: '11983548754',
					email: 'contato@segurosabcd.com.br',
				},
				address: {
					zipCode: '06644-123',
				},
				marketingOptOutFlag: false,
				channel: 'telefone',
				product: 'PESADOS',
				id_google: '515856718.1699888349',
				session_google: '1699982351',
			},
		}
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_PESCOD_INPUT = () => {
	return '75315984'
}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_ISCNPJDOCUMENT_TRUE_INPUT =
	() => {
		return true
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_ISCNPJDOCUMENT_FALSE_INPUT =
	() => {
		return false
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_LEADID_INPUT = () => {
	return '179265dc-f013-4fe4-a010-a0aae2103877'
}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_LEADVINCULO_NULL_INPUT = () => {
	return null
}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_LEADVINCULO_SIM_INPUT = () => {
	return '1'
}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_LEADVINCULO_NAO_INPUT = () => {
	return '0'
}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCPF_WHATSAPP_VALID_RETURN =
	() => {
		return {
			client_id: '515856718.1699888349',
			events: [
				{
					name: 'lead_mp',
					params: {
						brand: 'porto',
						channel: 'hub-vendas',
						ev_action: 'lead:whatsapp:pf:enviar:sucesso',
						ev_category: 'hub-vendas:bank:produto:consorcio',
						ev_label: 'vinculo:sim',
						lead_id: '179265dc-f013-4fe4-a010-a0aae2103877',
						product: 'consorcio',
						session_id: '1699982351',
						subproduct: 'consorcio-de-automoveis',
						timestamp: defaultMockedTimeStamp,
						vertical: 'bank',
					},
				},
			],
			user_id: '9f85298a4ea7e1515db55925a72145cd',
			user_properties: {
				client_bcp: {
					value: '75315984',
				},
				client_id: {
					value: '9f85298a4ea7e1515db55925a72145cd',
				},
			},
		}
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCNPJ_TELEFONE_NULLPORTORELATION_VALID_RETURN =
	() => {
		return {
			client_id: '515856718.1699888349',
			events: [
				{
					name: 'lead_mp',
					params: {
						brand: 'porto',
						channel: 'hub-vendas',
						ev_action: 'lead:telefone:pj:enviar:sucesso',
						ev_category: 'hub-vendas:bank:produto:consorcio',
						ev_label: 'vinculo:nao-definido',
						lead_id: '179265dc-f013-4fe4-a010-a0aae2103877',
						product: 'consorcio',
						session_id: '1699982351',
						subproduct: 'consorcio-de-pesados',
						timestamp: defaultMockedTimeStamp,
						vertical: 'bank',
					},
				},
			],
			user_id: 'aaf46a069b76c4b9394c81b902803485',
			user_properties: {
				client_bcp: {
					value: '75315984',
				},
				client_id: {
					value: 'aaf46a069b76c4b9394c81b902803485',
				},
			},
		}
	}

exports.GETSENDANALYTICSCOLLECTMESSAGEPAYLOAD_WITHCNPJ_TELEFONE_NOPORTORELATION_VALID_RETURN =
	() => {
		return {
			client_id: '515856718.1699888349',
			events: [
				{
					name: 'lead_mp',
					params: {
						brand: 'porto',
						channel: 'hub-vendas',
						ev_action: 'lead:telefone:pj:enviar:sucesso',
						ev_category: 'hub-vendas:bank:produto:consorcio',
						ev_label: 'vinculo:nao',
						lead_id: '179265dc-f013-4fe4-a010-a0aae2103877',
						product: 'consorcio',
						session_id: '1699982351',
						subproduct: 'consorcio-de-pesados',
						timestamp: defaultMockedTimeStamp,
						vertical: 'bank',
					},
				},
			],
			user_id: 'aaf46a069b76c4b9394c81b902803485',
			user_properties: {
				client_bcp: {
					value: '75315984',
				},
				client_id: {
					value: 'aaf46a069b76c4b9394c81b902803485',
				},
			},
		}
	}
