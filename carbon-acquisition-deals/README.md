# Carbon Acquisition Deals

## Sumário

1. <a name="DefinitionLink"></a>[Definição](#DefinitionLink)
2. <a name="DefinitionLink"></a>[Documentações](#DefinitionLink)
3. <a name="StructureLink"></a>[Estrutura do projeto](#StructureLink)
4. <a name="RequirementsLink"></a>[Requisitos do projeto](#RequirementsLink)
5. <a name="SetupLink"></a>[Setup local do projeto](#SetupLink)
5. <a name="Apis"></a>[APIs disponíveis](#Apis)

## [Definição](#DefinitionLink)

Serviço responsável por verificar e ofertar produtos e oportunidades ao cliente

## [Documentações](#DocumentationLink)

[Confluence](https://...)

## [Estrutura](#StructureLink)

Este projeto foi construido com NodeJs e Terraform para provisionar a infraestrutura

As pastas app-create-deals, app-create-deals-eligibility, app-create-deals-good-card, app-create-deals-porto-pay-cards, app-deals-data-layer e app-find-deals possui o código fonte em NodeJs e na pasta infra os scripts do terraform

## [Requisitos do projeto](#RequirementsLink)

Certifique-se de ter os seguintes requisitos instalados antes de começar

- Node.js >= 18.17.1
- npm >= 9.6.7
- Terraform
- AWS CLI configurada com credenciais válidas

## [Setup local do projeto](#SetupLink)

1- Navegue para o diretório /app do projeto em questão

Exemplo:
```bash
cd app-create-deals
```


2- Instale as dependências do Node.js

```bash
npm install
```

3- Inicie a aplicação

```bash
npm run dev
```

## [APIs](#Apis)

### Criar Oportunidades

`GET /aquisicao/v1/oportunidades`

Insere no banco as informações buscadas por cada produto:
```bash
curl --location --request POST 'https://portoapicloud-hml.portoseguro.com.br/hub-vendas-carbon/aquisicao/v1/oportunidades' \
--header 'Authorization: Bearer {token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "codigoCanal": "83",
    "tipoDocumento": "CPF",
    "documento": "00000017400",
    "codigoCampanha": 86
}
'
```

Response 200

```json
{   
    "status":"200",
    "message": "success"
}
```

### Busca de Oportunidades

`POST /aquisicao/v1/oportunidades/00000017400/cpf`

```bash
curl --location --request GET 'https://portoapicloud-hml.portoseguro.com.br/hub-vendas-carbon/aquisicao/v1/oportunidades/33207922880/cpf' \
--header 'Authorization: Bearer {token}' \
--header 'Content-Type: application/json' \
```

Response 200

```json
{
    "cpf": "33207922880",
    "createdAt": "2024-03-15T12:29:41.379Z",
    "eligibility": {
        "status": "200",
        "mesage": "success",
        "data": {
            "codigoOferta": "2973d34a-95f3-41c8-8798-4891202ee160",
            "codigoCanal": 83,
            "tipoDocumento": "CPF",
            "documento": "54000346083",
            "situacao": "Incluída",
            "dataHoraInclusao": "2024-03-15T12:29:41.379Z",
            "dataHoraValidadeOferta": "2024-03-15T13:29:41.379Z",
            "elegibilidade": {
                "codigoElegibilidade": "b5d47652-e1a1-475d-9e6c-e9edc9cdc109",
                "produtos": [
                    {
                        "codigoProduto": 1,
                        "nomeProduto": "Cartao",
                        "propensao": 0,
                        "valor": null,
                        "valorDesconto": 0
                    },
                    {
                        "codigoProduto": 8,
                        "nomeProduto": "Tag ConnectCar",
                        "propensao": 0,
                        "valor": null,
                        "valorDesconto": 0
                    }
                ]
            },
            "valorTransacao": 0,
            "codigoCampanha": "86"
        }
    },
    "creditCards": {
        "status": "200",
        "mesage": "success",
        "data": {
            "cards": [
                {
                    "idCartao": "53e5de5f-b234-368f-ac77-fb4aa65acac2",
                    "numeroCartao": "415275XXXXXX4111",
                    "bandeira": "VISA",
                    "cartaoPorto": true,
                    "cartaoOculto": false
                },
                {
                    "idCartao": "686f7694-abeb-336d-a814-d324a1154bcf",
                    "numeroCartao": "536380XXXXXX1114",
                    "bandeira": "MASTERCARD",
                    "cartaoPorto": true,
                    "cartaoOculto": false
                }
            ]
        }
    },
    "goodcard": {
        "status": "200",
        "mesage": "success",
        "data": {
            "cards": [
                {
                    "riskScore": 0,
                    "accountNumber": 10406,
                    "accountCreationDate": 20201007,
                    "aditionalCard": "N",
                    "cardNumber": "412177XXXXXX2112",
                    "accountScore": 0,
                    "dueDate": 0,
                    "expirationDateCrypt": "SkGJ2wo/88PaqsC6bY10bw==",
                    "expirationDate": 202310,
                    "cvvNumberCrypt": "NH6ICXHYW7jmToibkHVrwQ==",
                    "cycleDate": 26,
                    "cardStatus": "M",
                    "accountStatus1": "",
                    "product": 1,
                    "accountStatus2": "",
                    "behaviourScore": 0,
                    "goodCard": "S",
                    "cardNumberCrypt": "bI7jQXtI7yRTJzSVKm7L2+SbdNAik92b0VHiuGqLu5M="
                }
            ]
        }
    }
}{
    "cpf": "33207922880",
    "createdAt": "2024-03-15T12:29:41.379Z",
    "eligibility": {
        "status": "200",
        "mesage": "success",
        "data": {
            "codigoOferta": "2973d34a-95f3-41c8-8798-4891202ee160",
            "codigoCanal": 83,
            "tipoDocumento": "CPF",
            "documento": "54000346083",
            "situacao": "Incluída",
            "dataHoraInclusao": "2024-03-15T12:29:41.379Z",
            "dataHoraValidadeOferta": "2024-03-15T13:29:41.379Z",
            "elegibilidade": {
                "codigoElegibilidade": "b5d47652-e1a1-475d-9e6c-e9edc9cdc109",
                "produtos": [
                    {
                        "codigoProduto": 1,
                        "nomeProduto": "Cartao",
                        "propensao": 0,
                        "valor": null,
                        "valorDesconto": 0
                    },
                    {
                        "codigoProduto": 8,
                        "nomeProduto": "Tag ConnectCar",
                        "propensao": 0,
                        "valor": null,
                        "valorDesconto": 0
                    }
                ]
            },
            "valorTransacao": 0,
            "codigoCampanha": "86"
        }
    },
    "creditCards": {
        "status": "200",
        "mesage": "success",
        "data": {
            "cards": [
                {
                    "idCartao": "53e5de5f-b234-368f-ac77-fb4aa65acac2",
                    "numeroCartao": "415275XXXXXX4111",
                    "bandeira": "VISA",
                    "cartaoPorto": true,
                    "cartaoOculto": false
                },
                {
                    "idCartao": "686f7694-abeb-336d-a814-d324a1154bcf",
                    "numeroCartao": "536380XXXXXX1114",
                    "bandeira": "MASTERCARD",
                    "cartaoPorto": true,
                    "cartaoOculto": false
                }
            ]
        }
    },
  "tagPortoBank": {
        "status": "200",
        "mesage": "success",
        "data": {
            "vehicle": [
                {
                    "plate": "PXA-1A73",
                    "status": "ACTIVATED"
                },
                {
                    "plate": "BNN-6565",
                    "status": "REQUESTED"
                },
                {
                    "plate": "YYU-3456",
                    "status": "NOT_ACTIVATED"
                }
            ]
        }
    },
    "goodcard": {
        "status": "200",
        "mesage": "success",
        "data": {
            "cards": [
                {
                    "riskScore": 0,
                    "accountNumber": 10406,
                    "accountCreationDate": 20201007,
                    "aditionalCard": "N",
                    "cardNumber": "412177XXXXXX2112",
                    "accountScore": 0,
                    "dueDate": 0,
                    "expirationDateCrypt": "SkGJ2wo/88PaqsC6bY10bw==",
                    "expirationDate": 202310,
                    "cvvNumberCrypt": "NH6ICXHYW7jmToibkHVrwQ==",
                    "cycleDate": 26,
                    "cardStatus": "M",
                    "accountStatus1": "",
                    "product": 1,
                    "accountStatus2": "",
                    "behaviourScore": 0,
                    "goodCard": "S",
                    "cardNumberCrypt": "bI7jQXtI7yRTJzSVKm7L2+SbdNAik92b0VHiuGqLu5M="
                }
            ]
        }
    }
}
```