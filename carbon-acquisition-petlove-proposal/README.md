# API de Propostas e Cotação Petlove

Este projeto fornece uma API para criação de carrinho, propostas e cotações para Petlove.

## Endpoints

### Verificar Cobertura

- **URL**: /hub-vendas-carbon/aquisicao/v1/petlove/propostas
- **Método**: GET
- **Descrição**: Recebe as informações necessárias para criação do carrinho, propostas e cotações da Petlove e repassa para lambda de cart.

#### Exemplo de Request

```bash
curl --location --request POST 'https://portoapicloud-hml.portoseguro.com.br/hub-vendas-carbon/aquisicao/v1/petlove/propostas' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pet": {
    "name": "gato",
    "type": "cat"
  },
  "address": {
    "cep": "01310100",
    "street": "Avenida Paulista",
    "number": "982",
    "complement": "Apto 30",
    "city": "São Paulo",
    "state": "SP",
    "stateCode": "",
    "address": ""
  },
  "plan": {
    "id": 123,
    "price": 100,
    "name": "Plano completo"
  },
  "user": {
    "fullName": "Fulano de Tal",
    "cpf": "33207922880",
    "phone": "19981458065",
    "email": "teste@example.com",
    "acceptTerms": true,
    "mktCommunication": true
  },
  "sessionId": "202493010587755556506-6T4XUGKR",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
  "ipAddress": "192.168.1.1",
  "susepCode": "TST03J",
  "affiliateId": "9c60e40a-85d3-44fc-b71a-730c844a9f1f",
  "linkOrigin": "OTHERS",
```

#### Responses

- **200 OK**
```json
  {
    "urlCartRedirect": "url_cart_redirect",
    "cartCommerceId": 123,
    "quotationCommerceId": 321,
    "createLeadInfo":{},
    "proposalData": {},
  }
```

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados antes de começar

- Node.js >= 18.17.1
- npm >= 9.6.7
- Terraform
- AWS CLI configurada com credenciais válidas

## Instalação

1. Clone o repositório:
   git clone https://gitportoprd.portoseguro.brasil/portocom/hub-vendas/carbon/acquisition/petlove/proposal.git

2. Navegue até o diretório do projeto:
```bash
cd app
```

3. Instale as dependências:
```bash
npm install
```


4. Inicie o servidor:
```bash
npm run dev
```
