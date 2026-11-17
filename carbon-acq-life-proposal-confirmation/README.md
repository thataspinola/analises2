# Life-Proposal

## Sumário

1. <a name="DefinitionLink"></a>[Definição do life-proposal](#DefinitionLink)
2. <a name="DocumentationLink"></a>[Documentações no Confluence](#DocumentationLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Lambda responsavel por chamar a api de produto para realizar a proposta do produto vida

## [Documentações](#DocumentationLink)

[Documentação Life Proposal](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/805437464/Proposal)

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

## [Teste local na AWS Console](#SetupLink)

Para testar a lambda no consele da AWS é necessário usar um event json conforme o modelo a seguir

```json
{
    "body": "{
    \"scope\":\"lifeinsurance\",
    \"lifeinsurance\":{
      \"codigoSusep\":\"CM91PJ\",
      \"oportunidadeId\":\"089bfb1e-ec3f-43e6-9778-fb266a25c50a\",
      \"client\":{
        \"fullName\":\"Jess\",
        \"gender\":\"feminino\",
        \"maritalStatus\":\"solteiro\",
        \"cpf\":\"25509830093\",
        \"cellPhone\":\"11991856587\",
        \"email\":\"jess@email.com\",
        \"dateOfBirth\":\"1964-12-28T00:00:00.000Z\"
        },
      \"address\":{
        \"zipCode\":\"05501000\",
        \"street\":\"Rua a\",
        \"number\":12,
        \"complement\":\"edificio a\",
        \"neighborhood\":\"Butantan\",
        \"city\":\"São Paulo\",
        \"state\":\"SP\"
      },
      \"personPep\":{
        \"name\":\"John\",
        \"cpf\":\"25509830093\",
        \"kinshipDegree\":\"Father\"
      },
      \"token\":\"eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJpYXQiOjE2ODUwMTg4ODksImV4cCI6MTY4NTEwNTI4OSwiaHViX3F1b3RhdGlvbnMiOiI2NSIsInNjb3BlIjoibGlmZWluc3VyYW5jZSJ9.v5lAYLmyIBOIs8CNW5QwMiY7OkOar63RLbNJ58srjzI\",
      \"income\":1,
      \"livingInBrazil\":true,
      \"notification\":false,
      \"pepRadioButton\":true,
      \"selected_plan_id\":\"50506\"
      }
    }"
}
```
