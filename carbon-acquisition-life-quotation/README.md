# Quotation

## Sumário

1. <a name="DefinitionLink"></a>[Definição do quotation](#DefinitionLink)
2. <a name="DefinitionLink"></a>[Documentações no Confluence](#DefinitionLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Lambda responsavel por chamar a api de produto para obter uma cotação do produto vida

## [Documentações](#DocumentationLink)

[Documentação register](https://INSERIR_LINK_DA_PAGINA_NO_CONFLUENCE)

## [Estrutura](#StructureLink)

Este projeto foi construido com NodeJs e Terraform para provisionar a infraestrutura

A pasta app possui o código fonte em NodeJs e na pasta infra os scripts do terraform

## [Requisitos do projeto](#RequirementsLink)

1. node >= v19.2.0;
2. npm >= 8.19.3;
3. .aws credentials atualizado com a senha do dia (necessário para acesso ao secretManager);

## [Setup local do projeto](#SetupLink)

1. cd app
2. npm run install
3. npm run dev

Quando o prjeto inicia ele ja executa a requisição usando o request do arquivo localRunner.js.
Para testar outros cenários mude os dados da constante mockedLocalData

## [Teste local na AWS Console](#SetupLink)

Para testar a lambda no consele da AWS é necessário usar um event json conforme o modelo a seguir

```javascript
scope: 'lifeinsurance',
	lifeinsurance: {
		date_of_birth: '1990-06-22',
	},
```
