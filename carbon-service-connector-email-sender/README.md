# Email-Sender

## Sumário

1. <a name="DefinitionLink"></a>[Definição para email-sender](#DefinitionLink)
2. <a name="DocumentationLink"></a>[Documentações no Confluence](#DocumentationLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)

## [Definição](#DefinitionLink)

Projeto responsável por receber uma mensagem na fila de envio de e-mail, notificar a lambda de envio de e-mail, obter o template no S3 e solicitar o envio do e-mail através da API /corporativo/mailservice.

Para fazer usodo do serviço de envio de e-mail é necessário cadastrar o template no bucket do S3 com o nome `hub-vendas-carbon`. Após o cadastro no S3 basta inserir uma mensagem na fila SQS de nome 'carbon-service-connector-email-sender'.
Payload de exemplo a ser enviado para a fila:

```JSON
{
  "from": "porto@portoseguro.com.br",
  "to": ["willian.salvador@portoseguro.com.br"],
  "cc": ["willian.salvador@portoseguro.com.br"],
  "bcc": ["willian.salvador@portoseguro.com.br"],
  "subject": "Sua apolice está quase pronta",
  "emailType": "HTML",
  "template": "templates/email/pagamento/notify-product-team.edge",
  "metadata": { "CUSTOMER_NAME": "joao da silva" },
}
```

**descrição dos campos:**

**from**: Email do remetente <br />
**to**: Lista de e-mails dos destinatários<br />
**cc**: (Opcional) Lista de e-mails que estarão uma cópia<br />
**bcc**: (Opcional) Lista de e-mails que estarão em cópia oculta<br />
**subject**: Assunto/titulo do e-mail<br />
**emalType**: O tipo do template que está sendo utilizado (utilizar apenas HTML, para outros tipos será necessário realizar testes para analisar compatibilidade)<br />
**template**: Nome do template que foi adicionado no bucket S3 hub-vendas-carbon<br />
**metadata**: Campos que serão feito o replace no template. Ex: no exemplo de payload foi usado CUSTOMER_NAME = 'joao da silva', então um exemplo de template seria `<html> {{CUSTOMER_NAME}} </html>` que será feito o replace para `<html> joao da silva </html>`

## [Documentações](#DocumentationLink)

[Documentação email-sender](https://portoseguro.atlassian.net/wiki/spaces/HDV/pages/877068289/email-sender)

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

Para testar a lambda é necessário colocar uma mensagem na fila `carbon-service-connector-email-sender` como o exemplo a seguir:

```json
{
  "from": "porto@portoseguro.com.br",
  "to": ["willian.salvador@portoseguro.com.br"],
  "cc": ["willian.salvador@portoseguro.com.br"],
  "bcc": ["willian.salvador@portoseguro.com.br"],
  "subject": "Sua apolice está quase pronta",
  "emailType": "HTML",
  "template": "templates-email/pagamentos/notify-customer.edge",
  "metadata": { "CUSTOMER_NAME": "joao da silva" }
}
````
