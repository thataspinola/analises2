# Carbon Inspection Request Portable Device

## Sumário

1. <a name="DefinitionLink"></a>[Definição](#DefinitionLink)
2. <a name="DocumentationLink"></a>[Documentações no Confluence](#DocumentationLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Aplicação responsável pelo processamento da solicitação de inspeção.

É realizada a notificação para o produto gerar a proposta e enviado uma mensagem para a fila que envia dados de tagueamento para o google analytics

Após 3 tentativas com erro, o fluxo de email transacional é ser acionado.

## [Documentações](#DocumentationLink)

[Documentação](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/XPTO)

## [Estrutura](#StructureLink)

Este projeto foi construido com NodeJs e Terraform para provisionar a infraestrutura

A pasta app possui o código fonte em NodeJs e na pasta infra os scripts do terraform

## [Requisitos do projeto](#RequirementsLink)

1. node >= v18.0.0;
2. .aws credentials atualizado com a senha do dia (necessário para acesso ao secretManager);

## [Setup local do projeto](#SetupLink)

1. cd app
2. npm run install
3. npm run dev

Quando o projeto inicia ele ja executa a requisição usando o request do arquivo localRunner.js.
Para testar outros cenários mude os dados da constante mockedLocalData
