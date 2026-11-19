# carbon-check-inspection-request-auto

- Repositório: `inspection-status-evaluate-auto/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-check-inspection-request/`
- Classificação: PROBLEMA
- Funções sistêmicas: 2 (fila SQS e stream do DynamoDB, atendidos pela mesma lambda)

## Resumo

A função verifica se a vistoria de um seguro auto já foi concluída. Se estiver pronta, registra o pagamento; se ainda estiver pendente, grava a solicitação numa tabela DynamoDB com expiração (TTL) para verificar de novo mais tarde. Ela é acionada por dois gatilhos diferentes: a fila SQS `carbon-check-inspection-request-auto` (primeira verificação) e o stream da tabela `inspection-request-auto-gather-schedule` (novas tentativas, quando o item expira). Por acumular duas responsabilidades de entrada, deve ser dividida. Além disso, o envio para a DLQ não é aguardado e a mensagem pode se perder.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-check-inspection-request-auto` | Lote de 1, falha parcial ativa | `infra/modules/check-inspection-request-lambda-event-source/main.tf:21` |
| DynamoDB Stream | Tabela `inspection-request-auto-gather-schedule` | Lote de 5, só remoções por TTL | `infra/modules/check-inspection-request-lambda-event-source/main.tf:5` |

Os dois mapeamentos apontam para a mesma função (`infra/main.tf:74`). A fila é alimentada pela função `carbon-inspection-request-auto`. O stream tem um filtro que deixa passar apenas os itens removidos pelo TTL da tabela.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Registro com `body` | `app-check-inspection-request/src/factory/inputBodyFactory.js:12-13` |
| Item expirado do DynamoDB | Registro com `dynamodb.OldImage` | `app-check-inspection-request/src/factory/inputBodyFactory.js:2-11` |

Ramificação por tipo de evento: Sim. O handler percorre `event.Records` sem distinguir a origem, e uma factory decide, registro a registro, se o dado veio da fila ou da tabela.

## Fluxos de retorno

O handler devolve `{ batchItemFailures }`, o formato correto para os dois gatilhos, e usa o identificador certo de cada origem (`messageId` para SQS e `SequenceNumber` para o stream).

O controller, porém, não relança erros. Todo erro de processamento é tratado dentro dele de uma destas formas: a solicitação é regravada no DynamoDB para nova tentativa ou, quando as tentativas se esgotam, enviada para a DLQ. Por isso o registro quase sempre é informado como sucesso.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Vistoria pronta, recusada ou emitida | Sucesso | Correto |
| Vistoria pendente ou erro na consulta | Sucesso, com nova tentativa agendada no DynamoDB | Correto |
| Falha ao gravar no DynamoDB | Registro marcado como falha | Correto |
| Tentativas esgotadas | Sucesso, com envio para a DLQ não aguardado | Problema 2 |
| Vistoria pronta | Sucesso, com exclusão no DynamoDB não aguardada | Problema 5 |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-check-inspection-request-auto-dead-letter` |
| Tentativas antes da DLQ | 1 |
| Retenção da DLQ | 14 dias em prd, 5 dias nos demais ambientes |
| Visibility timeout x timeout | 60 s x 60 s em hml e prd; 60 s x 29 s em dev e poc |
| Stream do DynamoDB | Sem destino de falha |

A mesma DLQ recebe mensagens de duas formas: pelo redrive da fila, após uma tentativa, e pelo próprio código, quando o reagendamento se esgota. Configuração em `infra/modules/check-inspection-request-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. Os dois gatilhos do Terraform correspondem aos dois formatos tratados no código. O problema é a mesma função atender os dois.

## Problemas encontrados

### 1. Duas funções sistêmicas na mesma lambda (Alta)

- O que acontece: a mesma função consome a fila SQS (primeira verificação) e o stream do DynamoDB (novas tentativas). São duas entradas com formatos, volumes e políticas de retentativa diferentes.
- Por que é um problema: uma mudança num fluxo afeta o outro, e cada gatilho exige configurações próprias de erro (DLQ para a fila, destino de falha para o stream), hoje misturadas no mesmo código.
- Como corrigir: dividir em duas lambdas (ver Recomendação).
- Onde: `infra/modules/check-inspection-request-lambda-event-source/main.tf:5` e `:21`

### 2. Envio para a DLQ sem `await` (Alta)

- O que acontece: quando as novas tentativas se esgotam, o controller manda a solicitação para a DLQ e segue sem esperar o envio terminar.

Trecho simplificado de `app-check-inspection-request/src/controller/checkInspectionRequestController.js:120-122`:

```js
if (ttl === null) {
  dlq.sendMessage(inputBody)
  logger.info(..., 'Dados enviados para a Dlq')
}
```

- Por que é um problema: o registro é confirmado como sucesso antes de o envio acabar. A AWS remove a mensagem da fila (ou avança o stream), e se o envio falhar ou não terminar antes de a Lambda congelar, a solicitação some sem nenhum registro. O mesmo acontece na segunda falha de registro de pagamento (linha 100).
- Como corrigir: usar `await dlq.sendMessage(inputBody)` e relançar o erro se o envio falhar.
- Onde: `app-check-inspection-request/src/controller/checkInspectionRequestController.js:100` e `:121`

### 3. Visibility timeout igual ao timeout da função em hml e prd (Alta)

- O que acontece: a mensagem fica invisível na fila por 60 s, o mesmo tempo máximo de execução da função.
- Por que é um problema: se a execução chegar perto do limite, a mensagem volta a ficar visível e pode ser processada duas vezes, registrando o pagamento em duplicidade. A AWS recomenda visibility de pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:16`

### 4. Stream do DynamoDB sem destino de falha (Média)

- O que acontece: depois de 3 tentativas com erro, os registros do stream são descartados.
- Por que é um problema: a solicitação de verificação da vistoria se perde sem aviso, e o pagamento nunca é registrado.
- Como corrigir: configurar `destination_config` no mapeamento do stream, apontando para uma fila de falha.
- Onde: `infra/modules/check-inspection-request-lambda-event-source/main.tf:5-19`

### 5. Exclusão no DynamoDB sem `await` e com chave errada (Média)

- O que acontece: após registrar o pagamento, a função tenta apagar o agendamento da tabela sem esperar o resultado. Além disso, a exclusão usa a chave `quotationNumber#...`, enquanto a gravação usa `orderNumber#...`.
- Por que é um problema: a exclusão nunca encontra o item gravado. Quando o item expira, o stream dispara uma nova verificação, e um erro na exclusão fica sem tratamento.
- Como corrigir: usar `await` e a mesma chave da gravação (`orderNumber#`).
- Onde: `app-check-inspection-request/src/controller/checkInspectionRequestController.js:64` e `app-check-inspection-request/src/service/dynamoDbService.js:48`

### 6. Mensagem inválida reagendada em vez de ir para a DLQ (Baixa)

- O que acontece: quando a mensagem falha na validação, o controller a regrava no DynamoDB como se fosse um erro temporário.
- Por que é um problema: a mensagem continua errada e volta a falhar a cada expiração, até o limite de tentativas.
- Como corrigir: enviar mensagens inválidas direto para a DLQ.
- Onde: `app-check-inspection-request/src/controller/checkInspectionRequestController.js:103-105`

## Recomendação

Hoje existe uma única lambda, `carbon-check-inspection-request-auto` (pasta `app-check-inspection-request/`), ligada aos dois gatilhos. A proposta é substituí-la por duas lambdas novas, que ainda não existem, cada uma com um único gatilho:

1. `carbon-check-inspection-request-auto-process` (pasta `app-process`)
   - Gatilho: fila `carbon-check-inspection-request-auto`.
   - Entrada: mensagem SQS com `contactEmail`, `idTransaction`, `inspectionRequestDate` e `quotationNumber`.
   - Saída: `{ batchItemFailures }` com o `messageId` das mensagens com falha.
2. `carbon-check-inspection-request-auto-stream` (pasta `app-stream`)
   - Gatilho: stream da tabela `inspection-request-auto-gather-schedule`, com destino de falha configurado.
   - Entrada: item expirado (`dynamodb.OldImage`).
   - Saída: `{ batchItemFailures }` com o `SequenceNumber` dos registros com falha.
   - Alternativa mais simples: esta função apenas republica o item expirado na fila, e todo o processamento fica na função `-process`.

A lógica de verificação (controller, APIs e serviços) pode ir para uma layer compartilhada, como já é feito em `lead/app-common`. Cada handler fica pequeno e só converte o próprio evento para o formato comum. No Terraform, cria-se o módulo da nova função, e o mapeamento do stream passa a apontar para ela.

Depois da divisão, corrigir o `await` da DLQ (problema 2) e o visibility timeout (problema 3).

## Observações

- Em poc, a URL da DLQ usada pelo código aponta para a conta AWS de dev (`infra/poc.tfvars:38`), e o envio para a DLQ nesse ambiente tende a falhar.
- A nova tentativa depende da expiração do TTL do DynamoDB, que não tem hora exata; o intervalo real entre verificações pode ser maior que o configurado.
