exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())
exports.DYNAMICS_LIBRARY_LOCATION = getDynamicsLibraryLocation(
	this.NODE_ENV.trim()
)
exports.REGISTER_COMPLETE_PATH = 'v1/register-complete'
exports.REGISTER_COMPLETE_GATEWAY_URL =
	process.env.REGISTER_COMPLETE_GATEWAY_URL ||
	'https://1hu79aaoqa-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com'
exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'
exports.CREATE_LEAD_WITHOUT_BCC =
	process.env.CREATE_LEAD_WITHOUT_BCC ||
	'https://4spmhxnf09-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/lead/'

exports.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME =
	process.env.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME || 'carbon-lead-in-progress'

exports.LEAD_IN_PROGRESS_TTL_IN_MINUTES =
	process.env.LEAD_IN_PROGRESS_TTL_IN_MINUTES || 30

exports.LEAD_ORIGEM_HUB_SIMULADOR =
	process.env.LEAD_ORIGEM_HUB_SIMULADOR || '35'

exports.CLIENT_REGISTER_UPDATE_SNS_TOPIC_ARN =
	process.env.CLIENT_REGISTER_UPDATE_SNS_TOPIC_ARN ||
	'arn:aws:sns:ca-central-1:791702935403:register-update'
exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'
exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.brasil'
exports.GOVERNANCA_DADOS_PESSOA_API_PATH =
	process.env.GOVERNANCA_DADOS_PESSOA_API_PATH ||
	'governancadados/dados-pessoa/v1/pessoa'

exports.CA_CERT_ARRAY = [
	`-----BEGIN CERTIFICATE-----
MIIErTCCA5WgAwIBAgIJAPxzf0hVDPLxMA0GCSqGSIb3DQEBCwUAMIHcMQswCQYD
VQQGEwJCUjESMBAGA1UECAwJU2FvIFBhdWxvMRIwEAYDVQQHDAlTYW8gUGF1bG8x
MTAvBgNVBAoMKFBvcnRvIFNlZ3VybyBDb21wYW5oaWEgZGUgU2VndXJvcyBHZXJh
aXMxGjAYBgNVBAsMEUluc3VyYW5jZSBDb21wYW55MR4wHAYDVQQDDBVQb3J0byBT
ZWd1cm8gLSBTSEEyNTYxNjA0BgkqhkiG9w0BCQEWJ3NlZ3VyYW5jYS5pbmZvcm1h
Y2FvQHBvcnRvc2VndXJvLmNvbS5icjAeFw0xNjAxMTkxMjI3NTZaFw0yNjAxMTYx
MjI3NTZaMIHcMQswCQYDVQQGEwJCUjESMBAGA1UECAwJU2FvIFBhdWxvMRIwEAYD
VQQHDAlTYW8gUGF1bG8xMTAvBgNVBAoMKFBvcnRvIFNlZ3VybyBDb21wYW5oaWEg
ZGUgU2VndXJvcyBHZXJhaXMxGjAYBgNVBAsMEUluc3VyYW5jZSBDb21wYW55MR4w
HAYDVQQDDBVQb3J0byBTZWd1cm8gLSBTSEEyNTYxNjA0BgkqhkiG9w0BCQEWJ3Nl
Z3VyYW5jYS5pbmZvcm1hY2FvQHBvcnRvc2VndXJvLmNvbS5icjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBALvEe72AKmetEPnmi2Wq+wx8Jn5PF2ePuzFm
GdhXN41y+ccrgwl8TzqM9dBVdHsNe84I37BvSb/FqM5Dnhgscuz+WqIxeIFY7tlu
+/2RRoBjLLSNiYMAB44/+mWVf2UScVgaZ9fO9cpIreMtSBJGTKAjjopH44Io6vmZ
9DQgfnT5r7tQnhcBfdaOFBI4Lk+ctXM6SOcO0g7Drh8gsNnLchAgnlGhOa8//8l0
VN73HmGdQYJAfyrVc5okZb7HfpvzgaVbhkGf7z9nP72HIsBjzgL1YOFHb1OCUosP
gHaB9j2w53vBUvP8riuAiZ9B7ei26xyvzlrYg3Lf0SfR4GC3VYkCAwEAAaNwMG4w
HQYDVR0OBBYEFJvkDe1iZg8rSgcZzK/jCdUFAas7MB8GA1UdIwQYMBaAFJvkDe1i
Zg8rSgcZzK/jCdUFAas7MAwGA1UdEwQFMAMBAf8wCwYDVR0PBAQDAgEGMBEGCWCG
SAGG+EIBAQQEAwIBBjANBgkqhkiG9w0BAQsFAAOCAQEAkmpHnc4AghZHBbdp387i
WhEpamuDbTeRp/rDU7Y6qXV+whYBTfY5LvbzhAzEJo7uYAyIREbPgTFlb1R+KneD
Fu29gNNISYFu5kICP0h3eX5g+0H88mqWgNSXIKyYKLGtDA9Vb6K7aYoYgYkZJvuc
6ru2nNXagsfUr0dAjGmy01Oz44iRxK0h0Mpc/LXiaIV7O+o4pQFwuQbjrr797GRJ
ckfd6qlYo3IzHqzi61tutj5pcaL0LcGS90/sC2LCcFJMRteJVV1FoUxfMtUKarcF
Weo+PG1HkgbTWydHzA+MGup2Hiu08rN8CJcY0uPqUdnwEUCwt+GlB+9gYXwoYAAQ
0Q==
-----END CERTIFICATE-----`,
	`-----BEGIN CERTIFICATE-----
MIIFVzCCBD+gAwIBAgIUdwvTUy97vznjJE3v3v4rgMNZRAIwDQYJKoZIhvcNAQEL
BQAwgegxCzAJBgNVBAYTAkJSMRMwEQYDVQQIDApTw6NvIFBhdWxvMRMwEQYDVQQH
DApTw6NvIFBhdWxvMTEwLwYDVQQKDChQb3J0byBTZWd1cm8gQ29tcGFuaGlhIGRl
IFNlZ3Vyb3MgR2VyYWlzMRowGAYDVQQLDBFJbnN1cmFuY2UgQ29tcGFueTEoMCYG
A1UEAwwfUG9ydG8gU2VndXJvQ0EgQ2VydGlmaWNhZG8gUm9vdDE2MDQGCSqGSIb3
DQEJARYnc2VndXJhbmNhLmluZm9ybWFjYW9AcG9ydG9zZWd1cm8uY29tLmJyMB4X
DTI0MDYxMTEwMDAyNVoXDTM0MDYwOTEwMDAyNVowgegxCzAJBgNVBAYTAkJSMRMw
EQYDVQQIDApTw6NvIFBhdWxvMRMwEQYDVQQHDApTw6NvIFBhdWxvMTEwLwYDVQQK
DChQb3J0byBTZWd1cm8gQ29tcGFuaGlhIGRlIFNlZ3Vyb3MgR2VyYWlzMRowGAYD
VQQLDBFJbnN1cmFuY2UgQ29tcGFueTEoMCYGA1UEAwwfUG9ydG8gU2VndXJvQ0Eg
Q2VydGlmaWNhZG8gUm9vdDE2MDQGCSqGSIb3DQEJARYnc2VndXJhbmNhLmluZm9y
bWFjYW9AcG9ydG9zZWd1cm8uY29tLmJyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEA4E9ohjz8C74zvpemmQaVi/XJfQKuJKbEv9vfGzEFnBGVlVb0qqhO
avZrifxsz61NuWiaILR7rQ/RP1IDFinfC5XvD8c7aXGhpvdB7wCXrKcsbALEOaPs
1GSxWbfEWdCVTWO/kZZbjhkIKxYcTUxXl/NhQ34FJciTeFrsZMuOuJqyeK71NnoH
qfZC9ZKQU0ojGvzY6s1jueV/XOG437M2oLeT/dK/J50s23VYqNQFgd8Bzu1+jHY3
/IcT3SZ7bGM6qrgRC7uykCMJ1/JVHD5wn9d4Q8CPgVvKdcKY6fy/joKclHiEL0gW
l6i/F8TG4UnrDI7mmSflFuNnhSVj97tD9QIDAQABo4H2MIHzMB0GA1UdDgQWBBQk
DNkmWsRY3ffnok/HAVLcJJWrZzAfBgNVHSMEGDAWgBQkDNkmWsRY3ffnok/HAVLc
JJWrZzAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIB9jCBlQYDVR0lBIGNMIGKBggr
BgEFBQcDAgYIKwYBBQUHAwQGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMG
CCsGAQUFBwMEBggrBgEFBQcDCAYIKwYBBQUHAwkGCCsGAQUFBwMRBgorBgEEAYI3
AgEVBgorBgEEAYI3AgEWBgorBgEEAYI3CgMBBgorBgEEAYI3CgMEMA0GCSqGSIb3
DQEBCwUAA4IBAQDatGrB/JIz2x9bTiFxGxyYQerxXSS2TufKDGc6JtE7JG+GTAIH
VfkRM2R7BtzuS7OwPAX0lo8yX02H1IoLkqyjjVqh1VKfxDpo4z5cx8JU/rgGaGbg
1NrvAK29NauGh2UMY+cUJrY7r7FEyNYiygM6kPTDrqhZrgENmZXexjzxqHhPcg3y
759HRuLdyme/FgnDisBzl/5zw6iJ1z0E5/rJep0gSpfuKY/upqroEE0SC+axAdgI
lKfm12WdfCByQBSIxgumGAQduP/MxKxztGhMm2vXtRV+Six/mZwq0bvyCUZO9r9I
KrKHnsK/fCPWnEyma5XuIJ+895uJkRuQeMOQ
-----END CERTIFICATE-----`,
]
/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

/**
 * Função que retorna o endereço de importação da biblioteca do dynamics
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca do dynamics
 */
function getDynamicsLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-service-connector-dynamics'
	const LAYER_LOCATION = '/opt/nodejs/carbon-service-connector-dynamics/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	/* istanbul ignore else */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.CREATE_LEAD_SCHEMA = require('./createLeadSchema')

exports.PRODUCT_CODE = '10'
exports.PRODUCT_STEP = '00'
exports.ERROR_CODE = {
	DEFAULT: '000',
	BLOCKLIST: '001'
}
