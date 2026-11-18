# Carbon Acquisition Email Notification

## Sumário

1. <a name="DefinitionLink"></a>[Definição](#DefinitionLink)
2. <a name="DocumentationLink"></a>[Documentações](#DocumentationLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Serviço responsável por receber uma chamada e fazer o envio de email com o status da aquisição do produto

Payload esperado no serviço quando requisitado pelo `produto`

```javascript
{
  "transactionId": "123456790", // Obrigatório
  "status": "SUCCESS", // Obrigatório e os valores aceitos são "SUCCESS", "PENDING" e "ERROR"
  "scope": "phone" // Obrigatório e os valores aceitos são "phone" ou "auto"
}
```

Payload esperado no serviço quando requisitado pelo `inspection-request-cellphone-error`

```javascript
{
	"status": "ERROR", // Obrigatório e o valor esperado é sempre ERROR
    "scope": "phone", // Obrigatório e os valores aceitos são "phone" ou "auto"
	"paymentData": {
		"orderNumber": "123456", // Obrigatório
		"externalId": "0987654321", // Obrigatório
		"scope": "phone" // Obrigatório e os valores aceitos são "phone" ou "auto"
		// ...
	}
}
```

## [Documentações](#DocumentationLink)

[Confluence](https://...)

## [Estrutura](#StructureLink)

Este projeto foi construído com Node.js e Terraform para provisionar a infraestrutura

A pasta `app` possui o código fonte em Node.js e na pasta `infra` os scripts do terraform

## [Requisitos do projeto](#RequirementsLink)

1. node >= v18.0.0
2. npm >= v8
3. .aws credentials atualizado com a senha do dia (necessário para acesso ao secretManager)

## [Setup local do projeto](#SetupLink)

1. cd app
2. npm install
3. npm run dev

Quando o projeto inicia ele ja executa a requisição usando o request do arquivo `__test__/localRunner/index.js`.  
Para testar outros cenários mude os dados de mock no arquivo.
