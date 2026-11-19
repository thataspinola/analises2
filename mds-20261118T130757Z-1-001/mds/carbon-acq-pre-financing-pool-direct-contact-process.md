# carbon-acq-pre-financing-pool-direct-contact-process

- Repositório: `direct-contact-request/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-process/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-acq-pre-financing-pool-direct-contact-requests`)

## Resumo

A função processa os pedidos de contato do pré-financiamento (pool de consórcio). Ela consome a fila `carbon-acq-pre-financing-pool-direct-contact-requests`, alimentada pela lambda HTTP vizinha `carbon-acq-pre-financing-pool-direct-contact-request`. Mensagens de criação registram pessoa, consentimento e lead e disparam o contato por WhatsApp; mensagens de atualização atualizam um lead já criado. Esse par de lambdas separadas (uma HTTP que publica, outra SQS que processa) é o modelo de separação que o repositório já segue. Os pontos de atenção são o visibility timeout, que é igual ou menor que o tempo de execução, e etapas cujo erro é ignorado.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-acq-pre-financing-pool-direct-contact-requests` | Lote de 1, falha parcial ativa | `infra/modules/process-lambda-event-source/main.tf:5-14` |

O API Gateway do repositório (`POST /direct-contact-request`) aciona a lambda vizinha `app-request`, que publica na fila. Não é gatilho desta função.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-process/index.js:7-31` |

Ramificação por tipo de evento: Não. O handler escolhe entre criação e atualização pelo campo `flag` da mensagem (`app-process/index.js:11-25`). É uma regra de negócio dentro da mesma fila, não uma segunda função sistêmica.

## Fluxos de retorno

O handler processa a mensagem e devolve `{ batchItemFailures }`. Os erros das etapas principais (validação, token, cadastro da pessoa, lead) são relançados. Algumas etapas complementares, porém, só registram o erro e deixam o fluxo seguir.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Criação ou atualização concluída | Lista de falhas vazia | Correto |
| `flag` ausente ou desconhecida | Mensagem marcada como falha | Correto |
| Falha nas etapas principais | Mensagem marcada como falha | Correto |
| Falha no consentimento via API | Usa o tópico SNS como alternativa | Correto |
| Lead duplicado ou bloqueado | Sucesso, sem lead | Regra de negócio |
| Falha ao gravar o cache do lead | Sucesso, erro ignorado | Problema 2 |
| Falha no disparo do WhatsApp | Sucesso, erro ignorado | Problema 3 |
| Falha no envio ao Google Analytics | Sucesso, erro ignorado | Aceitável: etapa secundária |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-acq-pre-financing-pool-direct-contact-requests-dead-letter` |
| Tentativas antes da DLQ | 3 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 2 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 60 s x 60 s em prd; 30 s x 60 s em dev e hml; 30 s x 25 s em poc |

Configuração em `infra/modules/contact-requests-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout igual ou menor que o timeout da função (Alta)

- O que acontece: em prd, a mensagem fica invisível por 60 s, o mesmo tempo máximo de execução. Em dev e hml fica invisível por 30 s, metade do tempo de execução.
- Por que é um problema: uma execução mais longa deixa a mensagem visível de novo enquanto ainda está sendo processada. Outra execução pega a mesma mensagem e pode criar o lead ou disparar o WhatsApp duas vezes.
- Como corrigir: aumentar o visibility timeout para pelo menos 6 vezes o timeout (360 s para 60 s).
- Onde: `infra/prd.tfvars:17`

### 2. Falha ao gravar o cache do lead é ignorada (Média)

- O que acontece: depois de criar o lead, a função grava o identificador dele numa tabela DynamoDB. Se a gravação falhar, o erro só vai para o log.
- Por que é um problema: o fluxo de atualização depende dessa tabela para encontrar o lead. Sem o cache, todas as atualizações daquele lead falham até a DLQ.
- Como corrigir: relançar o erro, ou registrar a pendência para nova tentativa.
- Onde: `app-process/src/controller/directContactController.js:400-415`

### 3. Falha no disparo do WhatsApp é ignorada (Média)

- O que acontece: no canal WhatsApp, o disparo do bot é a ação de contato com o cliente. Se a chamada falhar, o erro só vai para o log e a mensagem é confirmada.
- Por que é um problema: o cliente pediu contato e não é contatado, sem nenhuma indicação da falha. O lead existe no Dynamics, mas o contato automático se perde.
- Como corrigir: decidir se o disparo é obrigatório. Se for, relançar o erro e garantir que as etapas anteriores não sejam repetidas na nova tentativa.
- Onde: `app-process/src/controller/directContactController.js:291-295`

### 4. Simulação de falha ativa em produção (Baixa)

- O que acontece: se o nome do cliente for `Except`, a função lança um erro de teste. Não há verificação de ambiente.
- Por que é um problema: um pedido real com esse nome falha 3 vezes e vai para a DLQ.
- Como corrigir: desativar a simulação em produção, como já é feito em outras funções do projeto.
- Onde: `app-process/src/controller/directContactController.js:42-54`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Corrigir o visibility timeout (problema 1) e o tratamento das etapas de cache e WhatsApp (problemas 2 e 3).

## Observações

- Na atualização, quando o lead não existe no cache, o código tenta ler uma propriedade de `null` e gera um erro genérico, em vez do erro de "lead não encontrado" previsto (`app-process/src/controller/directContactUpdateController.js:51`). O efeito é o mesmo (a mensagem falha), mas o log fica confuso.
