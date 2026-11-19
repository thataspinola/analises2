# carbon-acquisition-pre-financing-pool-quotation

- Repositório: `pre-financing-pool-quotation/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: PROBLEMA
- Funções sistêmicas: 2 (endpoint `POST pre-financing-pool-quotation` e invocação direta, atendidos pela mesma lambda)

## Resumo

A função simula cotas de consórcio (pool de pré-financiamento) na API do Portobank. Ela atende dois contratos diferentes no mesmo código: requisições HTTP do API Gateway e chamadas diretas sem `body`, cuja resposta tem os campos `Status` e `Output`, formato típico de Step Functions. Só o API Gateway está declarado no Terraform; o segundo contrato não tem gatilho neste repositório. Por acumular duas responsabilidades de entrada, a função deve ser dividida. Além disso, as respostas de erro de validação saem com o corpo em formato inválido e o cliente recebe 502 em vez de 400.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-acquisition-pre-financing-pool-quotation-gateway` | `POST` no recurso raiz, integração proxy | `infra/modules/api-gateway/main.tf:13-36` |

A API é privada e publicada no domínio interno com o path `pre-financing-pool-quotation` (`infra/variables.tf:15`). Não há Step Function, permissão para outro invocador ou outro gatilho no Terraform do repositório, e nenhum outro repositório analisado referencia a função.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Evento com `body` | `app/index.js:11-20` |
| Invocação direta | Evento sem `body`; o próprio evento é o payload | `app/index.js:9-10` |

Ramificação por tipo de evento: Sim.

Trecho simplificado de `app/index.js:9-17`:

```js
if(!event.hasOwnProperty('body')){
	responseFinal = await quotationController.process(event)
}else{
	if (typeof event.body !== 'string') { throw ... }
	const parsedInput = JSON.parse(event.body)
	responseFinal = await quotationController.process(parsedInput)
```

## Fluxos de retorno

O handler nunca lança exceção: o controller e o handler transformam todo erro em objeto de resposta. Todos os fluxos têm `return`.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| HTTP, cotação calculada | 200 com corpo em texto | Correto |
| HTTP, falha na API ou no token | 500 com corpo em texto | Correto |
| HTTP, `pre_financing_pool` ausente ou inválido | 400 com corpo como objeto | Problema 2 |
| Invocação direta, sucesso | `Status: SUCCEEDED` com `Output` | Correto |
| Invocação direta, erro | `Status: FAILED`, sem exceção | Problema 3 |

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

O código implementa o contrato de invocação direta sem `body`, mas o Terraform não declara nenhum gatilho ou permissão para esse tipo de chamada.

## Problemas encontrados

### 1. Duas funções sistêmicas na mesma lambda (Alta)

- O que acontece: a mesma função atende requisições HTTP e chamadas diretas, com formatos de entrada e de saída diferentes. O handler decide o contrato pela presença do campo `body`.
- Por que é um problema: as duas origens se misturam no mesmo código e nas mesmas respostas (o objeto de resposta carrega ao mesmo tempo `statusCode`/`body` e `Status`/`Output`). Uma mudança para um consumidor pode quebrar o outro, e o chamador direto nem aparece no Terraform.
- Como corrigir: dividir em duas lambdas (ver Recomendação).
- Onde: `app/index.js:9-21`

### 2. Erro de validação devolve corpo em formato inválido (Alta)

- O que acontece: a resposta de erro de validação monta `body` como objeto, e o handler a devolve sem converter para texto.

Trecho simplificado de `app/src/factory/responseFactory.js:24-33`:

```js
exports.badRequestError = (message) => {
	return {
		Status : "FAILED",
		statusCode: 400,
		headers: { 'Content-Type': 'application/json' },
		body: { status: 'error', message: ... },
	}
}
```

- Por que é um problema: numa integração proxy do API Gateway, `body` precisa ser texto. Com objeto, o cliente recebe 502 em vez de 400 e não vê a mensagem de erro.
- Como corrigir: aplicar `JSON.stringify` no `body` de `badRequestError`.
- Onde: `app/src/factory/responseFactory.js:24-33`, usado em `app/src/controller/quotationController.js:11` e `:30`

### 3. Na invocação direta, erro sai como sucesso (Média)

- O que acontece: quando chamada diretamente, a função devolve `Status: FAILED` em vez de lançar exceção.
- Por que é um problema: para a AWS, a execução terminou com sucesso. Se o invocador for uma Step Function, as regras de nova tentativa e captura de erro (`Retry`/`Catch`) não são acionadas; o fluxo precisa checar o campo `Status` manualmente.
- Como corrigir: na função dedicada à invocação direta, lançar a exceção em caso de erro.
- Onde: `app/src/factory/responseFactory.js:11-22`

## Recomendação

Hoje existe uma única lambda, `carbon-acquisition-pre-financing-pool-quotation` (pasta `app/`), que atende os dois contratos. A proposta é substituí-la por duas lambdas novas, que ainda não existem, cada uma com um único gatilho:

1. `carbon-acquisition-pre-financing-pool-quotation-request` (pasta `app-request`)
   - Gatilho: `POST` da API atual, com a mesma permissão de invocação.
   - Entrada: requisição HTTP com `body` contendo `pre_financing_pool`.
   - Saída: `{ statusCode, headers, body }`, com `body` sempre em texto e sem `Status`/`Output`.
2. `carbon-acquisition-pre-financing-pool-quotation-task` (pasta `app-task`)
   - Gatilho: invocação direta pelo sistema que hoje chama a função sem `body` (provavelmente uma Step Function, pelo formato da resposta). A permissão desse invocador deve ser declarada no Terraform quando ele for identificado.
   - Entrada: objeto com `pre_financing_pool`.
   - Saída: resultado da cotação; em caso de erro, exceção.
   - Alternativa: se for confirmado que ninguém chama a função sem `body`, remover esse ramo e manter apenas a função HTTP.

A lógica de simulação (controller, API e factories) pode ir para uma layer compartilhada, como já é feito em `lead/app-common`, e cada handler monta a própria resposta.

Independentemente da divisão, corrigir o corpo da resposta de validação (problema 2).

## Observações

- O timeout da função é 30 s em hml e prd, acima do limite de 29 s da integração do API Gateway (`infra/prd.tfvars:10`). Chamadas mais longas recebem 504 do API Gateway.
