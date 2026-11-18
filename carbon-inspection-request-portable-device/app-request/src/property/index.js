function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

function getPaymentLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-postponed-payment-data/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'
exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())
exports.PAYMENT_DATA_LIBRARY_LOCATION = getPaymentLibraryLocation(
	this.NODE_ENV.trim()
)

exports.PROPOSAL_QUEUE_MESSAGE_SCHEMA = require('./proposalQueueMessageSchema')

exports.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL =
	process.env.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-service-connector-google-analytics-collect'
exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.brasil'

exports.API_PATH_PROPOSTA =
	process.env.API_PATH_PROPOSTA || 're/celular/v1/proposta'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE =
	'Houve um erro inesperado ao invocar a API.'

exports.CODIGO_OCUPACAO = 601
exports.DESCRICAO_OCUPACAO = 'OUTROS'
exports.PAYMENT_CODE_NORMAL = '62'
exports.PAYMENT_CODE_PORTOCARD = '97'

exports.TIPO_LOGRADOURO_MAP = {
	Alameda: 'AL',
	Avenida: 'AV',
	'Entrada Particular': 'EM PA',
	Conjunto: 'CJ',
	Favela: 'FAV',
	Ferrovia: 'FER',
	Fazenda: 'FAZ',
	Ladeira: 'LD',
	Praca: 'PC',
	Quadra: 'Q',
	Rua: 'R',
	Rodovia: 'ROD',
	Serra: 'SERRA',
	Travessa: 'TV',
	Viaduto: 'VD',
	Setor: 'ST',
	Bloco: 'BL',
	Beco: 'BC',
	'Comercio Local': 'CL',
	Passagem: 'PSG',
	Lote: 'LT',
	'Caixa Postal': 'CP',
	Condominio: 'COND',
	Boulevard: 'BVD',
	Via: 'V',
	Trecho: 'TR',
	Escada: 'ESC',
	Viela: 'VLA',
	Vila: 'VL',
	Passeio: 'PAS',
	Jardim: 'JD',
	Modulo: 'MOD',
	Acesso: 'AC',
	Estrada: 'EST',
	Area: 'A',
	Adro: 'AD',
	Arteria: 'ART',
	Alto: 'AT',
	Atalho: 'ATL',
	Balneario: 'BAL',
	Belvedere: 'BELV',
	Balao: 'BLO',
	Bosque: 'BSQ',
	Baixa: 'BX',
	Cais: 'C',
	Caminho: 'CAM',
	Chacara: 'CH',
	Chapadao: 'CHAP',
	Circular: 'CIRC',
	Corredor: 'COR',
	Campo: 'CPO',
	Corrego: 'CRG',
	Descida: 'DSC',
	Desvio: 'DSV',
	Distrito: 'DT',
	Esplanada: 'ESP',
	Estadio: 'ETD',
	Elevada: 'EVD',
	Fonte: 'FNT',
	Feira: 'FRA',
	Forte: 'FTE',
	Galeria: 'GAL',
	Habitacional: 'HAB',
	Jardinete: 'JDE',
	Lagoa: 'LGA',
	Loteamento: 'LOT',
	Marina: 'MNA',
	Monte: 'MTE',
	Paralela: 'PAR',
	Patio: 'PAT',
	Parada: 'PDA',
	Paradouro: 'PDO',
	Prolongamento: 'PRL',
	Parque: 'PRQ',
	Ponte: 'PTE',
	Porto: 'PTO',
	Quinta: 'QTA',
	Quintas: 'QTAS',
	Ramal: 'RAM',
	Recanto: 'REC',
	Retiro: 'RER',
	Reta: 'RET',
	Rotula: 'ROT',
	Retorno: 'RTN',
	Servidao: 'SRV',
	Subida: 'SUB',
	Trincheira: 'TCH',
	Colonia: 'COL',
	Terminal: 'TER',
	Trevo: 'TRV',
	Unidade: 'UNID',
	Vereda: 'VER',
	Vale: 'VLE',
	'Zigue-Zague': 'ZIG-Z',
	Granja: 'GJA',
	Mirante: 'MIR',
	Acampamento: 'ACAMP',
	'Acesso Local': 'A LOC',
	Aeroporto: 'AER',
	'Antiga Estrada': 'A EST',
	Buraco: 'BCO',
	Calcada: 'CALC',
	Canal: 'CAN',
	Ciclovia: 'CICL',
	'Complexo Viario': 'CMP V',
	Contorno: 'CONT',
	Escadaria: 'ESCAD',
	Estacionamento: 'ESTC',
	Estacao: 'ETC',
	Estancia: 'ETN',
	Faas: 'F',
	Ilha: 'IA',
	Largo: 'LRG',
	Morro: 'MRO',
	Nucleo: 'NUC',
	'Praca De Esportes': 'PC ES',
	Ponta: 'PNT',
	Praia: 'PR',
	'Passagem Subterranea': 'PS SU',
	Passarela: 'PSA',
	'Rua Integracao': 'R INT',
	'Rua De Ligacao': 'R LIG',
	'Rua Particular': 'R PAR',
	'Rua De Pedestre': 'R PED',
	'Rua Velha': 'R VEL',
	Recreio: 'RCR',
	Residencial: 'RES',
	Rampa: 'RMP',
	'Rodo Anel': 'RO AN',
	Rotatoria: 'RTT',
	Sitio: 'SIT',
	Tunel: 'TUN',
	'Via De Acesso': 'V AC',
	'Via Coletora': 'V COL',
	'Via Elevado': 'V EVD',
	'Via Expressa': 'V EXP',
	'Via Litoranea': 'V LIT',
	'Via Local': 'V LOC',
	'Via De Pedestre': 'V PED',
	Vala: 'VAL',
	Variante: 'VRTE',
}
