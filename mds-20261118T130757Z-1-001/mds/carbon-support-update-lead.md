# carbon-support-update-lead

- Repositório: `support-update-lead/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: PROBLEMA
- Funções sistêmicas: 2 (fila SQS `carbon-support-update-lead` e endpoint `PUT /update-lead`, tratados pela mesma lambda)

## Resumo

A função atualiza o lead no Dynamics e o remove da tabela de leads em andamento. O código trata dois tipos de entrada: mensagens da fila `carbon-support-update-lead` e requisições HTTP do API Gateway. No Terraform, porém, o endpoint `PUT /update-lead` não chama a função: ele grava a requisição direto na fila, e a função só é acionada pela fila. O ramo HTTP do código fica sem uso visível neste repositório. Por acumular dois contratos de entrada, a função deve ser dividida. A integração direta entre API e fila também tem dois defeitos que afetam todas as atualizações de lead que passam por ela.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-support-update-lead` | Lote de 1, falha parcial ativa | `infra/modules/lambda-event-source/main.tf:13-22` |

O API Gateway `carbon-support-update-lead-gateway` expõe `PUT /update-lead` (path público `support/lead/update`), mas a integração é do tipo `AWS`, que envia a requisição direto para a fila, sem passar por nenhuma lambda (`infra/modules/api-gateway/main.tf:75-99`). A fila também recebe mensagens de uma Step Function (`travel_proposal`) definida fora deste repositório.

Fluxo atual: cliente -> `PUT /update-lead` -> fila `carbon-support-update-lead` -> esta função.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Evento com `Records` | `app/index.js:6-9` |
| Requisição HTTP do API Gateway | Qualquer evento sem `Records`; lê `event.body` | `app/index.js:11-12` |

Ramificação por tipo de evento: Sim.

Trecho simplificado de `app/index.js:5-13`:

```js
module.exports.handler = async (event) => {
	if(event.hasOwnProperty("Records")){
		return await consumerSqs(event)
	}
	return await gatewayMessageProcessor(event)
}
```

## Fluxos de retorno

Os dois ramos chamam o mesmo controller, que relança todos os erros.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| SQS, lead atualizado | Lista de falhas vazia | Correto |
| SQS, qualquer erro | Mensagem marcada como falha | Correto |
| HTTP, lead atualizado | Status vindo da resposta da layer de Dynamics | Problema 3 |
| HTTP, erro | 400 (validação) ou 500 | Correto |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-support-update-lead-dead-letter` |
| Tentativas antes da DLQ | 2 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 300 s x 30 s (10 vezes) |

Configuração em `infra/modules/update-lead-queue/main.tf`.

## Divergências Terraform x Código

O código implementa o tratamento de requisições HTTP (`app/index.js:15-55`), mas nenhuma integração do Terraform entrega requisições HTTP à função: o `PUT /update-lead` vai direto para a fila.

## Problemas encontrados

### 1. Duas funções sistêmicas na mesma lambda (Alta)

- O que acontece: a mesma função foi escrita para tratar a fila SQS e o endpoint `PUT` do API Gateway, com formatos de entrada e de resposta diferentes.
- Por que é um problema: os dois contratos ficam acoplados no mesmo código. Hoje o ramo HTTP não é acionado por nada visível, mas continua sendo mantido e pode ser ligado por engano, e uma mudança num contrato afeta o outro.
- Como corrigir: dividir em duas lambdas (ver Recomendação).
- Onde: `app/index.js:6-12`

### 2. Integração direta API -> fila perde ou corrompe mensagens (Média)

- O que acontece: a integração do API Gateway com a fila tem dois defeitos. O corpo da requisição é enviado sem codificação (`MessageBody=$input.body`), num formato em que `&`, `+` e `%` têm significado especial. E apenas erros 4xx da fila são mapeados; um erro 5xx cai na resposta padrão, que devolve 200 com "Mensagem em processamento".
- Por que é um problema: uma atualização com esses caracteres chega truncada ou alterada à função. Se a fila estiver indisponível, o cliente recebe sucesso e a atualização nunca acontece. Isso afeta as funções que chamam essa API, como `carbon-support-auto-update-lead` e `carbon-payments-update-lead`.
- Como corrigir: substituir a integração direta por uma lambda de entrada (ver Recomendação) ou, mantendo a integração, usar `$util.urlEncode($input.body)` e mapear respostas 5xx.
- Onde: `infra/modules/api-gateway/main.tf:89-91` e `:101-118`

### 3. Status HTTP vindo da resposta de uma layer externa (Média)

- O que acontece: no ramo HTTP, o status devolvido é o `statusCode` retornado pela layer de Dynamics, sem validação.
- Por que é um problema: o código dessa layer não está neste repositório. Se ela devolver o campo ausente ou em texto, a resposta fica inválida e o cliente recebe 502.
- Como corrigir: definir o status na própria função (por exemplo, 200 no sucesso) e usar o retorno da layer só no corpo.
- Onde: `app/index.js:36`

## Recomendação

Hoje existe uma única lambda, `carbon-support-update-lead` (pasta `app/`), cujo código trata os dois contratos. A proposta é substituí-la por duas lambdas novas, que ainda não existem, cada uma com um único gatilho:

1. `carbon-support-update-lead-process` (pasta `app-process`)
   - Gatilho: fila `carbon-support-update-lead` (o mapeamento atual).
   - Entrada: mensagem SQS com os dados do lead.
   - Saída: `{ batchItemFailures }` com o `messageId` das mensagens com falha.
   - Responsabilidade: atualizar o lead no Dynamics e remover o lead em andamento.
2. `carbon-support-update-lead-request` (pasta `app-request`)
   - Gatilho: `PUT /update-lead`, com integração proxy (`AWS_PROXY`) e permissão de invocação para o API Gateway.
   - Entrada: requisição HTTP com os dados do lead no `body`.
   - Saída: `{ statusCode, body }`, com 202 quando a mensagem for aceita.
   - Responsabilidade: validar os dados e publicar na fila, como já faz `direct-contact-request/app-request`. Isso também resolve os defeitos da integração direta (problema 2), porque a função passa a controlar a codificação e os erros.

Alternativa: manter a integração direta API -> fila, corrigindo a codificação e o mapeamento de erros, e remover o ramo HTTP do handler, desde que se confirme que nenhum sistema externo chama a função com evento HTTP. Nesse caso resta uma única lambda, só com a fila.

A lógica de validação e atualização pode ir para uma layer compartilhada, como já é feito em `lead/app-common`. No Terraform, cria-se o módulo da função `-request`, troca-se a integração do `PUT` para `AWS_PROXY` apontando para ela, e a função atual fica apenas com o mapeamento da fila.

## Observações

- A função é executada por meio do wrapper de segurança Twistlock (`infra/modules/lambda/locals.tf:15-20`), que não está no repositório; considerou-se que ele repassa evento e resposta sem alteração.
