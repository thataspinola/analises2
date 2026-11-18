# Carbon acquisition auto quotation

## Sumário

1. <a name="DefinitionLink"></a>[Definição do Cotação do Auto](#DefinitionLink)
2. <a name="DefinitionLink"></a>[Documentações no Confluence](#DefinitionLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Aplicação responsável por gerar uma cotação no fluxo de auto

## [Documentações](#DocumentationLink)

[Documentação Cotação do Auto](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/961872101/Cota+o+-+Auto)

## [Estrutura](#StructureLink)

Este projeto foi construído com node e terraform.

O Código deste projeto esta na pasta: app

## [Requisitos do projeto](#RequirementsLink)

1. node >= v18;
2. npm >= v8;
3. .aws credentials atualizado com a senha do dia (necessário para acesso ao secretManager);

## [Setup local do projeto](#SetupLink)

1. cd app
2. npm run install
3. npm run dev
