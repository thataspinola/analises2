const { vehicleApiErrorFactory } = require('../../../src/factory')

describe('Suite de Testes de vehicleApiErrorFactory.js', () => {
	test('Deve retornar um objeto com os campos `status` e `message`', async () => {
		const errorHandled = vehicleApiErrorFactory(new Error('Error'))
		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled).toHaveProperty('message')
	})

	test('Deve retornar um objeto com os campos `status` igual a 404 e o `message` igual a Not Found', async () => {
		const errorHandled = vehicleApiErrorFactory({
			response: { status: 404, data: 'Not Found' },
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(404)
		expect(errorHandled.message).toBe('Not Found')
	})

	test('Deve retornar um objeto com os campos `status` igual a 404 e o `message` {error: "Bad Request"}', async () => {
		const errorHandled = vehicleApiErrorFactory({
			response: { status: 400, data: { error: 'Bad Request' } },
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled.message).toBe(JSON.stringify({ error: 'Bad Request' }))
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `message` igual a ERROR - Error', async () => {
		const errorHandled = vehicleApiErrorFactory({
			request: {},
			message: 'Error',
			code: 'ERROR',
		})

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled.message).toBe('ERROR - Error')
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `message` igual a Error', async () => {
		const errorHandled = vehicleApiErrorFactory(new Error('Error'))

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe('Error')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600002', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					errors: [
						{
							errorMessage: 'Atributo em desacordo com a regra de negócio',
							field: 'nomeSocial',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600002')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600004', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					code: 400,
					errors: [
						{
							errorMessage: "Nenhuma pessoa encontrada para o cpfCnpj=***********.",
							field: "segurado.pessoa"
						},
						{
							errorMessage: "Nenhuma pessoa encontrada para o cpfCnpj=***********.",
							field: "condutores[0].pessoa"
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600004')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600003', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					errors: [
						{
							errorMessage: 'Cálculo de Renovação de Congênere para a mesma Empresa não permitido. Favor retirar a Empresa informada nesta Cotação e reenviar a solicitação de orçamento.',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600003')
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `erroCode` igual 0600005', async () => {
		const error = { 
			response: {
				status: 500,
				data: {
					errors: [
						{
							errorMessage: 'Não foi possível realizar o enquadramento da Cotação. O servidor retornou um erro inesperado.',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600005')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600006', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					errors: [
						{
							errorMessage: 'Segmento de veículo não comercializado neste produto.',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600006')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600007', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					code: 400,
					errors: [
						{
							errorMessage: "Nenhum logradouro encontrado para numeroCep=*****, complementoNumeroCep=***.",
							field: "cepPernoite"
						},
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600007')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600008', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					code: 400,
					errors: [
						{
							errorMessage: "Não foi possível consultar Domínio BFB Service. Por favor tente mais tarde.",
						},
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600008')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600009', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					code: 400,
					errors: [
						{
							errorMessage: "Tipo de veículo não comercializado neste canal, contate seu Corretor para realizar a cotação do seguro.",
						},
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600009')
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `erroCode` igual 0600010', async () => {
		const error = { 
			response: {
				status: 500,
				data: {
					errors: [
						{
							errorMessage: 'Ocorreu um erro não esperado durante a validação.',
							field: 'nomeSocial',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600010')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 e o `erroCode` igual 0600011', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					errors: [
						{
							errorMessage: 'Atributo com valor diferente do domínio aceito',
							field: 'apoliceBonus.congenere',
						}
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600011')
	})

	test('Deve retornar um objeto com os campos `status` igual a 500 e o `erroCode` igual 0600012', async () => {
		const error = { 
			response: {
				status: 500,
				data: {
					code: 500,
					errors: [
					  {
						errorMessage: "Ocorreu um erro não esperado durante a validação.",
						field: "segurado.pessoa.documento.tipo"
					  },
					  {
						errorMessage: "Ocorreu um erro não esperado durante a validação.",
						field: "condutores[0].pessoa.documento.tipo"
					  }
					]
				}
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(500)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600012')
	})

	test('Deve retornar um objeto com os campos `status` igual a 400 quando recebe um AnnotatedConnectException', async () => {
		const error = { 
			response: {
				status: 400,
				data: {
					code: 400,
					errors: [
					  {
						errorMessage: "finishConnect(..) failed: Connection refused: pessoa-back.prd-psg-auto-auto20.svc.cluster.local/172.30.16.108:80; nested exception is io.netty.channel.AbstractChannel$AnnotatedConnectException: finishConnect(..) failed: Connection refused: pessoa-back.prd-psg-auto-auto20.svc.cluster.local/172.30.16.108:80",
						field: "segurado.pessoa"
					  },
					  {
						errorMessage: "finishConnect(..) failed: Connection refused: pessoa-back.prd-psg-auto-auto20.svc.cluster.local/172.30.16.108:80; nested exception is io.netty.channel.AbstractChannel$AnnotatedConnectException: finishConnect(..) failed: Connection refused: pessoa-back.prd-psg-auto-auto20.svc.cluster.local/172.30.16.108:80",
						field: "condutores[0].pessoa"
					  }
					]
				  }
			}
		}

		const errorHandled = vehicleApiErrorFactory(error)

		expect(errorHandled).toHaveProperty('status')
		expect(errorHandled.status).toBe(400)
		expect(errorHandled).toHaveProperty('message')
		expect(errorHandled.message).toBe(error.response.data)
		expect(errorHandled).toHaveProperty('errorCode')
		expect(errorHandled.errorCode).toBe('0600001')
	})
})
