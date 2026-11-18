const axios = require('axios')
const CONSTANT = require('../../property')

exports.postPessoa = async (pessoaPayload, token) => {
	const postPessoaRequestOptions = {
		method: 'POST',
		url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: pessoaPayload,
		responseEncoding: 'binary',
		partner: CONSTANT.PARTNER_HEADER_VALUE,
	}

	let postPessoaResponse = null

	try {
		postPessoaResponse = await axios(postPessoaRequestOptions)
	} catch (err) {
		if (err.response) {
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					err.response.data
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (!postPessoaResponse || postPessoaResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postPessoaResponse.data.pessoa
}

exports.getPessoa = async (cpf, token) => {
	const getPessoaRequestOptions = {
		method: 'GET',
		url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH}?numeroCpf=${cpf}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
	}

	let getPessoaResponse = null

	try {
		getPessoaResponse = await axios(getPessoaRequestOptions)
	} catch (err) {
		if (err.response) {
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					err.response.data
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (!getPessoaResponse || getPessoaResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	if (
		!Array.isArray(getPessoaResponse.data.pessoas) ||
		getPessoaResponse.data.pessoas.length < 1
	) {
		return null
	}

	return getPessoaResponse.data.pessoas[0]
}
