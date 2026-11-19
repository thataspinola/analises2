# Resumo da análise das lambdas

Foram analisadas 26 lambdas. Cada lambda é uma função na AWS, com o código numa pasta própria do repositório; em todas as 26, o Terraform declara uma única função para a pasta analisada. Para cada lambda, o relatório individual identifica as funções sistêmicas (as entradas distintas que ela atende: uma fila, um endpoint, um stream), indica quando deve ser dividida, verifica se todos os fluxos devolvem uma resposta correta e avalia a configuração de DLQ das filas.

Resultado: 14 PROBLEMA, 11 ATENÇÃO, 1 OK.

- PROBLEMA: lambda com mais de uma função sistêmica, perda de mensagens, resposta inválida ou defeito que precisa de correção no código.
- ATENÇÃO: lambda com uma única função sistêmica e ajustes de configuração ou riscos menores.
- OK: nada relevante a corrigir.

## Visão geral

| Lambda | Classificação | Funções sistêmicas | Gatilhos | Problema principal |
|--------|---------------|--------------------|----------|--------------------|
| carbon-support-update-lead | PROBLEMA | 2 | SQS; código também trata HTTP | Fila e endpoint na mesma lambda |
| carbon-check-inspection-request-auto | PROBLEMA | 2 | SQS; DynamoDB Stream | Fila e stream na mesma lambda |
| carbon-acquisition-pre-financing-pool-quotation | PROBLEMA | 2 | API `POST`; invocação direta | HTTP e chamada direta na mesma lambda |
| carbon-acq-shopping-cart-manage-cart | PROBLEMA | 3 | API `ANY` | Três endpoints na mesma lambda |
| carbon-service-connector-email-sender | PROBLEMA | 1 | SQS | E-mails com falha são apagados da fila |
| carbon-acquisition-deals-create-deals-card-proposals | PROBLEMA | 1 | SQS (via SNS) | Erro tratado como sucesso |
| carbon-acquisition-deals-create-deals-eligibility | PROBLEMA | 1 | SQS (via SNS) | Função que não termina; erro tratado como sucesso |
| carbon-acquisition-deals-create-deals-good-card | PROBLEMA | 1 | SQS (via SNS) | Função que não termina; erro tratado como sucesso |
| carbon-acquisition-deals-create-deals-porto-pay | PROBLEMA | 1 | SQS (via SNS) | Função que não termina; erro descartado sem log |
| carbon-acquisition-deals-create-deals-porto-tag | PROBLEMA | 1 | SQS (via SNS) | Erro tratado como sucesso |
| carbon-inspection-fail-cellphone | PROBLEMA | 1 | SQS (redrive) | Mensagem some se a gravação final falhar |
| carbon-inspection-fail-portable-device | PROBLEMA | 1 | SQS (redrive) | Mensagem some se a gravação final falhar |
| carbon-inspection-request-portable-device | PROBLEMA | 1 | SQS (via SNS) | Variáveis inexistentes reprocessam a proposta |
| carbon-acquisition-cellphone-quotation | PROBLEMA | 1 | Nenhum no repositório | Sem gatilho; resposta com corpo inválido |
| carbon-acq-pre-financing-pool-direct-contact-process | ATENÇÃO | 1 | SQS | Visibility igual ou menor que o timeout |
| carbon-support-lead-process | ATENÇÃO | 1 | SQS | Visibility igual ao timeout |
| carbon-inspection-request-auto | ATENÇÃO | 1 | SQS (via SNS) | Visibility curto; reprocessamento repete etapas |
| carbon-inspection-request-cellphone | ATENÇÃO | 1 | SQS (via SNS) | Falhas vão para outra fila de trabalho |
| carbon-payments-update-lead | ATENÇÃO | 1 | SQS (via SNS) | Visibility abaixo do recomendado fora de prd |
| carbon-support-auto-update-lead | ATENÇÃO | 1 | SQS | Visibility abaixo do recomendado |
| carbon-transmission-auto | ATENÇÃO | 1 | SQS (via SNS) | Visibility um pouco abaixo do recomendado |
| carbon-acquisition-auto-quotation | ATENÇÃO | 1 | API `POST` | Envio para fila sem `await` |
| carbon-support-create-lead | ATENÇÃO | 1 | API `POST` | Status HTTP vindo do erro sem validação |
| carbon-acquisition-portable-device-quotation | ATENÇÃO | 1 | API `POST` | Consulta repetida pode estourar o tempo |
| carbon-support-auto-vehicle-search | ATENÇÃO | 1 | API `GET` | Resposta 200 sem corpo |
| carbon-acq-caps-data | OK | 1 | API `GET` | Nenhum |

## Lambdas a dividir

Quatro lambdas atendem, cada uma, mais de uma função sistêmica. Em todos os casos existe hoje uma única lambda (uma função na AWS e uma pasta de código) ligada a mais de um gatilho ou com código para mais de um contrato de entrada. A proposta é substituir cada uma por lambdas novas, com um gatilho cada. Os nomes com sufixos como `-process`, `-stream` e `-request` abaixo são sugestões para essas lambdas novas, que ainda não existem.

A lógica de negócio pode ir para uma layer compartilhada, como já é feito em `lead/app-common` e `direct-contact-request/app-common`, deixando cada handler responsável só pelo próprio gatilho. Esse modelo já existe no projeto: `carbon-support-lead-request-async` (pasta `lead/app/`) recebe a requisição HTTP e publica na fila, e `carbon-support-lead-process` (pasta `lead/app-process/`) consome a fila; são duas lambdas separadas. O mesmo vale para o par de `direct-contact-request`.

`carbon-check-inspection-request-auto` (pasta `inspection-status-evaluate-auto/app-check-inspection-request/`)

- Hoje: uma lambda com dois gatilhos no Terraform, a fila `carbon-check-inspection-request-auto` (primeira verificação da vistoria) e o stream da tabela `inspection-request-auto-gather-schedule` (novas tentativas).
- Proposta: duas lambdas novas.
  - `carbon-check-inspection-request-auto-process`: só a fila.
  - `carbon-check-inspection-request-auto-stream`: só o stream, com destino de falha configurado.

`carbon-support-update-lead` (pasta `support-update-lead/app/`)

- Hoje: uma lambda com um gatilho no Terraform (a fila `carbon-support-update-lead`), mas com código também para requisições HTTP. O `PUT /update-lead` grava direto na fila, sem passar por nenhuma lambda.
- Proposta: duas lambdas novas.
  - `carbon-support-update-lead-process`: só a fila; atualiza o lead.
  - `carbon-support-update-lead-request`: só o `PUT`; valida e publica na fila, substituindo a integração direta API -> fila.
- Alternativa: manter uma lambda só com a fila, remover o código HTTP e corrigir a integração direta.

`carbon-acquisition-pre-financing-pool-quotation` (pasta `pre-financing-pool-quotation/app/`)

- Hoje: uma lambda com um gatilho no Terraform (o `POST` do API Gateway), mas com código também para chamadas diretas sem `body`, no formato de Step Functions, sem gatilho declarado.
- Proposta: duas lambdas novas.
  - `carbon-acquisition-pre-financing-pool-quotation-request`: só o `POST`.
  - `carbon-acquisition-pre-financing-pool-quotation-task`: só a chamada direta; lança exceção em caso de erro.
- Alternativa: manter uma lambda só com o `POST` e remover o ramo de chamada direta, se ninguém o usar.

`carbon-acq-shopping-cart-manage-cart` (pasta `manage-cart/app/`)

- Hoje: uma lambda ligada a um método `ANY` do API Gateway, que atende `POST`, `GET` e `DELETE` no mesmo endereço.
- Proposta: três lambdas novas, uma por método: `carbon-acq-shopping-cart-create-cart-request` (`POST`), `carbon-acq-shopping-cart-get-cart-request` (`GET`) e `carbon-acq-shopping-cart-remove-cart-item-request` (`DELETE`).

## Fluxos de retorno com erro

Os defeitos de retorno encontrados se repetem em alguns padrões.

Erro tratado como sucesso, com perda da mensagem:

- As cinco lambdas SQS de `deals` capturam o erro no controller e devolvem um objeto de resposta HTTP em vez de lançar. A layer de dados compartilhada (`deals/app-deals-data-layer`) faz o mesmo ao gravar no DynamoDB. A mensagem é apagada da fila sem nova tentativa e sem ir para a DLQ.
- `carbon-service-connector-email-sender`: o código informa quais mensagens falharam, mas o Terraform não ativa esse recurso, e a AWS apaga o lote inteiro como sucesso.
- `carbon-inspection-fail-cellphone` e `carbon-inspection-fail-portable-device`: se falhar a gravação da mensagem na fila final, o erro é ignorado e não sobra nenhuma cópia.
- `carbon-check-inspection-request-auto`: o envio para a DLQ não é aguardado; a mensagem é confirmada antes de o envio terminar.

Função que não termina:

- `carbon-acquisition-deals-create-deals-eligibility`, `-good-card` e `-porto-pay`: quando a consulta está desligada na mensagem, a Promise nunca é resolvida. A função termina por timeout, repete 10 vezes e manda para a DLQ uma mensagem que deveria ser ignorada.
- `carbon-acquisition-cellphone-quotation` e `carbon-acquisition-portable-device-quotation`: a consulta repetida ao resultado da cotação pode passar do limite do API Gateway (29 s) ou do timeout da função, e o cliente fica sem a resposta prevista.

Resposta inválida ou vazia:

- `carbon-acquisition-pre-financing-pool-quotation`: o erro de validação devolve o corpo como objeto e o cliente recebe 502 em vez de 400.
- `carbon-acquisition-cellphone-quotation`: todas as respostas têm corpo como objeto, inválido se o invocador for um API Gateway.
- `carbon-support-auto-vehicle-search`: responde 200 sem corpo quando a API do produto não devolve dados.
- `carbon-acquisition-auto-quotation`, `carbon-support-create-lead` e `carbon-support-update-lead`: usam como status HTTP um valor vindo do erro ou de uma layer externa, sem validar se é numérico.

Defeito no código:

- `carbon-inspection-request-portable-device`: a etapa do Google Analytics usa `factory` e `proposalId`, que não existem no arquivo. Mensagens com dados de tagueamento falham depois de enviar a proposta, são reprocessadas (reenviando a proposta) e geram e-mail de erro de vistoria.

## Filas SQS e Dead Letter Queue

Todas as filas consumidas pelas 18 lambdas SQS têm DLQ configurada.

Nas cadeias de vistoria de celular e de aparelhos portáteis, porém, as mensagens que falham não vão para uma DLQ, e sim para outra fila de trabalho (a fila de fail). A DLQ com o nome da fila de solicitação só recebe mensagens gravadas pelo código da lambda de fail, que ignora erros nessa gravação.

O stream do DynamoDB consumido por `carbon-check-inspection-request-auto` não tem destino de falha: após 3 tentativas, os registros são descartados.

Visibility timeout igual ou menor que o tempo de execução da função, com risco de processar a mesma mensagem duas vezes:

- `carbon-support-lead-process` e `carbon-inspection-fail-portable-device`, em todos os ambientes.
- `carbon-acq-pre-financing-pool-direct-contact-process`, em prd, hml e dev.
- `carbon-check-inspection-request-auto`, em prd e hml.
- `carbon-inspection-request-auto`, em dev.

Nas demais filas, o visibility timeout fica abaixo das 6 vezes recomendadas pela AWS em pelo menos um ambiente; só a fila de `carbon-support-update-lead` está adequada em todos. Em dev e poc, a retenção das DLQs costuma ser menor que a da fila de origem; em prd, todas retêm 14 dias.

## Prioridades sugeridas

1. Parar a perda de mensagens: relançar os erros nos controllers de `deals` e na layer de dados, ativar a falha parcial em `email-sender`, relançar o erro nas lambdas de fail e aguardar o envio para a DLQ em `check-inspection-request-auto`.
2. Corrigir as funções que não terminam em eligibility, good-card e porto-pay (uma chamada a `resolve()` em cada).
3. Corrigir as variáveis inexistentes em `inspection-request-portable-device`.
4. Dividir as quatro lambdas com mais de uma função sistêmica, começando por `carbon-support-update-lead` e `carbon-check-inspection-request-auto`.
5. Ajustar o visibility timeout das filas para pelo menos 6 vezes o timeout, começando pelas que estão iguais ou menores que o tempo de execução.
