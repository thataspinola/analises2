exports.CLIENT_DATA = {
	email: 'client@example.com',
	nomePessoa: 'Client Name',
}

exports.CLIENT_DATA_WITH_SOCIAL_NAME = {
	email: 'client@example.com',
	nomePessoa: 'Client Name',
	nomeSocial: 'Client Social Name',
}

exports.BROKER_DATA = {
	name: 'Broker Name',
	phone: '123-456-7890',
	email: 'broker@example.com',
}

exports.PESCOD = '12345'

exports.EXPECT_OUTPUT = {
	pescod: '12345',
	clientEmail: 'client@example.com',
	clientName: 'Client Name',
	brokerName: 'Broker Name',
	brokerPhone: '123-456-7890',
	brokerEmail: 'broker@example.com',
}

exports.EXPECT_OUTPUT_WITH_SOCIAL_NAME = {
	pescod: '12345',
	clientEmail: 'client@example.com',
	clientName: 'Client Social Name',
	brokerName: 'Broker Name',
	brokerPhone: '123-456-7890',
	brokerEmail: 'broker@example.com',
}

exports.EXPECT_OUTPUT_UNDEFINED = {
	pescod: undefined,
	clientEmail: undefined,
	clientName: undefined,
	brokerName: undefined,
	brokerPhone: undefined,
	brokerEmail: undefined,
}
