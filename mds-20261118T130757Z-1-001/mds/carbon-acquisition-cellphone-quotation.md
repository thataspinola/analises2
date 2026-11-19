# carbon-acquisition-cellphone-quotation

- Repositório: `cellphone-quotation/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (invocação direta, sem gatilho neste repositório)

## Resumo

A função calcula a cotação de seguro para celular: registra a solicitação numa fila, valida os dados, aplica cupom, pede o cálculo à API do produto e consulta o resultado repetidas vezes até ele ficar pronto. O Terraform do repositório cria a função, mas não liga nenhum gatilho a ela. O código espera receber os dados da cotação diretamente no evento e responde num formato parecido com o de API Gateway, porém com o corpo não serializado. Sem saber quem chama a função, não é possível confirmar que o contrato funciona. Há ainda risco de a função terminar sem resposta por timeout e duas publicações em fila cujo erro é ignorado.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| Nenhum | Não encontrado neste repositório | Só a função é declarada | `infra/main.tf:19-45` |

O repositório não tem API Gateway, permissão de invocação, fila ou qualquer outro recurso que acione a função, e nenhum outro repositório analisado a referencia. Ela pode ser chamada por um sistema fora deste conjunto de repositórios (outra API, outra lambda ou uma Step Function), o que não é possível verificar aqui.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Invocação direta com os dados da cotação | Usa o próprio `event` como payload | `app/index.js:11-16` |

Ramificação por tipo de evento: Não. O handler não lê `event.body`, então não trata o formato de requisição do API Gateway.

## Fluxos de retorno

O handler sempre devolve `{ isBase64Encoded, headers, statusCode, body }`, com `body` como objeto, sem `JSON.stringify` (`app/index.js:29-36`). Se quem chama for outra função, esse objeto pode ser lido normalmente. Se for um API Gateway com integração proxy, todas as respostas são inválidas.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Cotação calculada | 201, corpo como objeto | Problema 2 |
| Dados inválidos, cupom inválido ou falha na API | 400, 422 ou status da API, corpo como objeto | Problema 2 |
| Cotação não fica pronta em 25 s | 504, corpo como objeto | Problema 2 |
| Etapas somadas passam de 35 s | Sem resposta (timeout da função) | Problema 3 |
| Falha ao publicar a negação do lead | Segue com 201, erro ignorado | Problema 4 |

## Dead Letter Queue

Não se aplica. A função não consome fila; apenas publica nas filas `carbon-ppweb-quotation-insert` e `carbon-support-deny-lead-queue`.

## Divergências Terraform x Código

O código implementa um contrato de entrada (dados na raiz do evento) e de saída (formato HTTP), mas o Terraform não declara nenhum gatilho que use esse contrato.

## Problemas encontrados

### 1. Função sem gatilho no repositório (Alta)

- O que acontece: a função é criada pelo Terraform, mas nada neste repositório a aciona.
- Por que é um problema: não é possível saber, a partir do código versionado, quem chama a função e com que formato. Mudanças no código podem quebrar um consumidor desconhecido, e mudanças no consumidor não aparecem aqui.
- Como corrigir: identificar o invocador. Se for um API Gateway, declarar a API e a permissão neste repositório; se for outra função, declarar a permissão de invocação e documentar o contrato; se não houver invocador, remover a função.
- Onde: `infra/main.tf:19-45`

### 2. Resposta em formato HTTP com corpo não serializado (Alta se o invocador for API Gateway)

- O que acontece: as factories de resposta devolvem `body` como objeto, e o handler repassa sem converter para texto.

Trecho de `app/src/factory/responseFactory.js:4-9`:

```js
exports.controllerSuccess = (response) => {
	return {
		statusCode: 201,
		body: response,
	}
}
```

- Por que é um problema: numa integração proxy do API Gateway, `body` precisa ser texto; com objeto, o cliente recebe 502 em todas as chamadas. Para uma chamada direta por outra função, o formato HTTP não faz sentido e só confunde o contrato.
- Como corrigir: se o invocador for API Gateway, ler `event.body` e aplicar `JSON.stringify` no corpo da resposta. Se for invocação direta, devolver o objeto da cotação sem o envelope HTTP.
- Onde: `app/src/factory/responseFactory.js:4-22` e `app/index.js:17-33`

### 3. Função pode terminar sem resposta por timeout (Média)

- O que acontece: a consulta ao resultado da cotação repete a chamada à API até 25 s, com pausa de 4 s entre tentativas (0,7 s em prd). Essa contagem só começa depois do registro na fila, do cupom, do token e do pedido de cálculo, e nenhuma chamada HTTP tem timeout definido. O timeout da função é 35 s.
- Por que é um problema: se as etapas anteriores demorarem mais de 10 s, ou a última consulta travar, a função é encerrada pela AWS antes de devolver o 504 previsto. O chamador recebe um erro de timeout, sem resposta.
- Como corrigir: limitar a repetição pelo tempo restante da execução (`context.getRemainingTimeInMillis()`) e definir `timeout` nas chamadas axios.
- Onde: `app/src/controller/quotationController.js:84-111`

### 4. Falha ao publicar a negação do lead é ignorada (Média)

- O que acontece: quando o risco não é aceito, a função publica uma mensagem para negar o lead. Se o envio falhar, o erro só é registrado em log e a cotação segue com 201.
- Por que é um problema: o lead continua aberto sem que ninguém saiba que a negação falhou.
- Como corrigir: relançar o erro ou registrar a pendência para nova tentativa.
- Onde: `app/src/controller/activity/publishMessageDenyLeadActivity.js:13-21`

### 5. Registro na fila `carbon-ppweb-quotation-insert` antes da validação (Baixa)

- O que acontece: a função publica os dados recebidos nessa fila antes de validá-los, e ignora o erro se o envio falhar.
- Por que é um problema: requisições inválidas são registradas como cotações, e falhas no envio não aparecem.
- Como corrigir: publicar depois da validação e tratar o erro do envio.
- Onde: `app/src/controller/quotationController.js:15` e `:123-130`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. A prioridade é identificar quem a invoca (problema 1) e, a partir disso, ajustar o formato de entrada e saída (problema 2). Em seguida, limitar a consulta repetida ao tempo disponível (problema 3).

## Observações

- Erros da obtenção de certificados (layer `carbon-token`) chegam ao handler sem tratamento e o `code` deles vira o status da resposta (`app/src/controller/quotationController.js:24`). O código dessa layer não está no repositório; o ideal é encapsular o erro com um status numérico.
- Em dev, a URL da fila de negação de lead aponta para a conta AWS de hml (`infra/dev.tfvars:27`).
