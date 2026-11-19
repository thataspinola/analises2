# Item 1 — Falhas no consumidor de abandono de cotação

> Atualização de escopo — 19/11/2026: os testes acrescentados durante estas correções foram removidos. As suítes preexistentes e suas configurações Jest foram restauradas. Os números de testes/cobertura abaixo são históricos e não certificam a suíte atual. As correções de produção descritas neste registro foram preservadas. A validação corporativa continua pendente.


## Comportamento corrigido

O consumidor de DynamoDB Stream devolvia uma resposta HTTP mesmo quando a
atualização do lead falhava. Como o event source mapping já habilita
`ReportBatchItemFailures`, esse retorno podia confirmar um lote com erro.

O handler local `app-abandoned-quotation/index.js` foi corrigido de forma independente.

No sucesso, retornam `{ batchItemFailures: [] }`. Na primeira falha, retornam
`{ batchItemFailures: [{ itemIdentifier: sequenceNumber }] }`, usando
`record.dynamodb.SequenceNumber` como string, sem conversão numérica.
O identificador não é o `eventID` nem um `messageId` de SQS.

Os registros são processados sequencialmente. Após uma falha, os registros
posteriores não são executados nesta tentativa: o DynamoDB retoma o lote a
partir do checkpoint indicado, respeitando a configuração de retry/bisect
existente. Não há alteração de infraestrutura neste item.

## Validação de eventos

- `Records` deve ser um array. Um lote vazio retorna sucesso.
- Todos os registros devem ter um `SequenceNumber` não vazio antes de qualquer
  chamada de negócio. Sem um checkpoint válido, a invocação lança
  `ValidationError` para não confirmar o lote indevidamente.
- `OldImage` ausente ou inválido é reportado como falha daquele checkpoint.
- Erros síncronos e rejeições assíncronas do controller são reportados ao stream.
- O novo log de falha usa somente identificadores e nome do erro, sem payload.
  A revisão dos logs já existentes nos demais componentes continua no item 4.

O payload de atualização de lead, a regra de abandono e os endpoints não foram
alterados. O controller recebe um evento com um único registro por chamada,
preservando seu contrato existente.

## Validação local — 18/11/2026

Na validação original, foram executadas as oito suítes de cada aplicação, incluindo as regressões
do handler e a integração com controller/factory reais e API simulada:

- 38 testes passaram nesta aplicação (resultado histórico).
- Handler `index.js`: 100% de linhas, statements, funções e branches.
- Cobertos sucesso, falha intermediária, interrupção do restante do lote,
  retomada do lote, sequência acima da precisão numérica de JavaScript,
  eventos inválidos, ausência de `OldImage` e preservação do payload.
- `git diff --check` e sintaxe Node passaram.

O runner legado Jest já usado nestas aplicações foi preservado neste item.
A migração de testes permanece no lote próprio de padronização.

### Como repetir na VDI

Na pasta `app-abandoned-quotation` deste miniprojeto:

Execução da suíte adicional retirada do escopo atual. Use somente os testes preexistentes do miniprojeto.

O último comando mede somente o handler alterado; não certifica a cobertura
global da aplicação. A coleta global local identificou 75% de funções devido
a callbacks do logger fora do escopo deste item, abaixo do gate existente de 93%.

### Limitação da instalação

O `npm ci --ignore-scripts` com o registry público falhou: o lockfile existente
não está sincronizado (faltam entradas transitivas de `brace-expansion` e
`balanced-match`). Para executar os testes sem alterar manifests/locks neste
item, foi usado um ambiente de validação separado com Jest 30.2.0,
Axios 1.20.0 e Pino 9.6.0. As dependências não foram adicionadas ao repositório.
A instalação padrão deve ser regularizada no item de dependências/testes.

Nenhuma chamada a AWS ou aos serviços corporativos foi executada. O retry real,
o esgotamento das tentativas e o tempo de processamento do lote ainda precisam
ser verificados na VDI/HML. Com o processamento sequencial, verificar que o
tempo total de até cinco registros cabe no timeout configurado.

## Limites do contrato

A entrega de streams continua sendo pelo menos uma vez. A correção evita a
confirmação silenciosa de erros e deixa de executar a cauda do lote depois de
uma falha; não implementa deduplicação nem garante exatamente uma atualização
de lead. Um timeout ou uma confirmação perdida ainda pode causar repetição.
A idempotência deve ser verificada com o serviço de atualização de lead.

Antes de implantar, confirmar o pipeline e o stack próprios deste miniprojeto.

Referência: [AWS — respostas parciais em DynamoDB Stream](https://docs.aws.amazon.com/lambda/latest/dg/services-ddb-batchfailurereporting.html).
