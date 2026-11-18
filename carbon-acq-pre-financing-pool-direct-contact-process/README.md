# Hub de Vendas Carbon - Pré venda - Consórcio: Contato direto Whatsapp/Telefone

## Sumário

1. <a name="DefinitionLink"></a>[Definição para contato direto - WhatsApp/Telefone](#DefinitionLink)
2. <a name="DocumentationLink"></a>[Documentações no Confluence](#DocumentationLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="MuleSoftLink"></a>[Projeto AnypointStudio - Mulesoft](#MuleSoftLink)
5. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)

## [Definição](#DefinitionLink)

Projeto responsável por receber uma requisição de contato direto com um representante da porto, onde esta requisição é composta por uma chamada a um endpoint qual receberá um JSON que incluirá os dados do cliente (nome, email, telefone, cpf e cep), se o cliente escolheu não receber marketing da Porto e qual o canal de contato direto que ele deseja (whatsapp ou telefone). O processamento desta requisição ocorrerá de maneira ASSÍNCRONA e não será executado no momento da requisição em si.<br />

O endpoint que recebe a requisição será definido no Gateway de API Sensedia da Porto, com a identificação "Hub Vendas Carbon - Pre-venda", respondendo a solicitações de requisição POST sob a URL "https://DOMINIO_AMBIENTE_SENSEDIA_GATEWAY_PORTO/hub-vendas-carbon/pre-vendas/VERSAO_ATUAL_DA_API/consorcio/contato-direto" e do lado da AWS consistirá em um API Gateway chamado carbon-acq-pre-financing-pool-direct-contact-request-gateway.<br />

A chamada deste endpoint dispará uma função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-request que adicionará uma mensagem em uma instância de serviço simples de fila AWS chamada carbon-acq-pre-financing-pool-direct-contact-requests e em seguida retornará sucesso (caso o registro na fila seja bem sucedido) ou falha (caso o registro na fila seja mal sucedido).<br />

A função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-process ficará respondendo aos eventos cuja origem é a instância de serviço simples de fila AWS chamada carbon-acq-pre-financing-pool-direct-contact-requests, processando assim todas as mensagens que a fila receber e sempre que houver êxito removerá tal mensagem da fila. Existirá também um mecanismo de retentativa e caso ultrapasse um limiar definido de falhas, tal mensagem será removida da fila e direcionada a uma fila morta chamada carbon-acq-pre-financing-pool-direct-contact-requests-dead-letter<br />

Todo código comum entre as funções lambda AWS carbon-acq-pre-financing-pool-direct-contact-request e carbon-acq-pre-financing-pool-direct-contact-process ficará em uma camada de função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-common-layer<br />

A função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-process processará cada mensagem da fila de origem seguindo o fluxo:

1. Verifica a existência de um registro do cliente na base de clientes cadastrados. Caso não seja identificado nenhum cadastro, procederá para o cadastro nesta base com os dados disponíveis.
2. Registrará na base SAP CDC os consentimentos do cliente incluindo se escolheu não receber marketing da Porto
3. Utilizando o identificador do registro do cliente na base de cliente cadastrados, registrará um Lead onde será identificado se a origem do lead será considerada WhatsApp ou Telefone, dependendo do tipo de contato direto escolhido pelo cliente
4. Caso o contato direto seja WhatsApp, será feita uma solicitação de disparo do Bot WhatsApp Porto utilizando o template de atendimento para orçamento de consórcio Auto, que enviará uma mensagem para o telefone que o cliente informou. Caso o contato direto seja Telefone, este passo é ignorado.<br /><br />

Exemplo de corpo de chamada POST aceito pelo endpoint de requisição:

```JSON
{
	"client": {
		"fullName": "Nomeir Sobrenomeson",
		"cpf": "01234567890",
		"cellPhone": "11987654321",
		"email": "cliente@clienteproduto.com.br",
	},
	"address": {
		"zipCode": "01234-567",
	},
	"marketingOptOutFlag": false,
	"channel": "whatsapp",
	"product": "AUTOMOVEL"
}
```

**descrição dos campos:**

**fullName**: Nome completo do cliente <br />
**cpf**: Número do cadastro de pessoa física do cliente (sem pontos ou traços)<br />
**cellPhone**: Número de telefone celular do cliente (apenas com DDD seguido do número, sem parenteses, pontos ou traços)<br />
**email**: Endereço de correio eletrônico do cliente<br />
**zipCode**: Número do cadastro de endereço postal do cliente<br />
**marketingOptOutFlag**: Indicação lógica se o cliente escolheu NÃO consentir com o recebimento de comunicação de marketing da porto<br />
**channel**: Canal de contato direto escolhido pelo cliente, sendo "whatsapp" para contato via WhatsApp ou "telephone" para contato telefonico<br />
**product**: Produto de consórcio em questão, aceitando um dos possíveis valores: AUTOMOVEL, IMOVEL, EQUIPAMENTO, ELETRODOMES, PESADOS, SUSTENTAVEL, BIKE<br /><br />

Exemplo do corpo de resposta da chamada POST devolvido pelo endpoint de requisição em caso de sucesso:

```JSON
{
	"directContactRequestQueueMessageId": "d5f6aa22-a863-4df9-9763-37ab760a3866",
}
```

**descrição dos campos:**

**directContactRequestQueueMessageId**: Identificador da mensagem relacionada à requisição que foi colocada na fila de processamento

## [Documentações](#DocumentationLink)

- [Documentação Lead via WhatsApp](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/878805097/Lead+via+WhatsApp)
- [Documentação Geração de Lead via WhatsApp - RASCUNHO](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/879099905/RASCUNHO+-+Gera+o+de+Lead+via+WhatsApp)

## [Estrutura do projeto](#StructureLink)

Este projeto foi construido com NodeJs e Terraform para provisionar a infraestrutura<br /><br />

A pasta app-common possui o código fonte da camada de função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-common-layer<br />
A pasta app-request possui o código fonte da função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-request<br />
A pasta app-process possui o código fonte da função lambda AWS chamada carbon-acq-pre-financing-pool-direct-contact-process<br />
A pasta infra possui todos os scripts do terraform relativos a este projeto

## [Requisitos do projeto](#RequirementsLink)

1. node >= v18.0.0;
2. .aws credentials atualizado com a senha do dia (necessário para acesso ao secretManager);
