# Item 3 — Falha de envio ao SQS no workflow de viagem

> Atualização de escopo — 19/11/2026: os testes acrescentados durante estas correções foram removidos. As suítes preexistentes e suas configurações Jest foram restauradas. Os números de testes/cobertura abaixo são históricos e não certificam a suíte atual. As correções de produção descritas neste registro foram preservadas. A validação corporativa continua pendente.


## Problema

O estado `Fallback SQS Update Lead` era um `Pass` que encerrava o ramo com
o texto `Hello, Erro ao enviar`. Uma falha em `sqs:sendMessage` podia
terminar como sucesso e permitir a conclusão do workflow sem enfileirar a
atualização do lead.

Além disso, `StartSyncExecution` retorna HTTP 200 no transporte inclusive
quando a execução Express falha. Corrigir somente o estado da Step Function
não basta para garantir que o cliente HTTP receba o erro.

## Correção

- `Fallback SQS Update Lead` passa a ser um estado `Fail`, com erro
  `UpdateLeadEnqueueFailed` e causa estática sem dados internos.
- O ramo paralelo não captura essa falha como sucesso: ela encerra a execução
  como `FAILED`.
- O template de resposta HTTP verifica `status == SUCCEEDED` e a presença
  de um output não nulo antes de devolver sucesso.
- Execuções com falha, timeout ou sem resultado válido recebem HTTP 500 e:
  `{"statusCode":500,"message":"Unable to complete travel proposal."}`.
- O template não faz parsing de `cause` nem expõe o erro interno.
- O status HTTP é sobrescrito uma única vez, no fim do template.
- Saídas de execução bem-sucedida preservam o payload e o status de negócio
  explícito, quando presente; sem status explícito, permanece HTTP 200.
- O método da API declara resposta 500 e o hash do deployment inclui esse
  contrato, para que a alteração seja publicada no próximo deploy aprovado.

O ramo sem `updateLead`, o destino da fila e o payload enviado ao SQS foram
preservados. Timeouts, regras de proposta, logs, DLQ e políticas IAM permanecem
fora deste item.

## Testes — 18/11/2026

Validação local com Node 24.22.3, Vitest 5.1.1, asl-validator 4.0.0 e
velocityjs 2.1.7, versões registradas no lockfile:

- `npm ci --ignore-scripts`: passou.
- `npm test`: 22 testes passaram.
- Schema ASL e referências de caminhos: passaram após substituir somente
  os placeholders Terraform por dados sintéticos.
- O teste de regressão do ramo SQS falhou com a definição original
  (`Pass` em vez de `Fail`) e passou com a definição corrigida.
- Renderização VTL local cobriu FAILED/TIMED_OUT, ausência de output,
  causa não JSON, ausência de status, sucesso e status de negócio 200/400/422/500.
- Verificada uma única escrita do override de status por resposta.
- Sintaxe Node e `git diff --check`: passaram.

Comandos reproduzíveis na pasta `carbon-acquisition-travel-proposal`:

Execução da suíte adicional retirada do escopo atual. Use somente os testes preexistentes do miniprojeto.

O projeto de validação utiliza apenas dependências de desenvolvimento e é
marcado como privado. Os testes ficam em `test/*.spec.js`, fora de `src`.

## Limites e validação na VDI/HML

Os testes locais validam estrutura ASL e execução do template com uma engine
Velocity local. Não emulam a execução real de Step Functions, o cancelamento
dos ramos paralelos nem todos os detalhes de Velocity do API Gateway.
Não foram executados plano/apply do stack ou chamadas aos serviços corporativos.

Na VDI/HML, validar:

1. Plano Terraform e deployment da API sem substituições inesperadas.
2. Fluxo sem updateLead e fluxo com envio SQS bem-sucedido.
3. Falha controlada de enqueue: execução FAILED e resposta pública HTTP 500.
4. Falha da Lambda de proposta e preservação dos erros de negócio existentes.
5. Ausência de detalhes internos na resposta HTTP e diagnóstico na observabilidade.

A proposta é executada em paralelo ao enqueue. Ela pode já ter sido criada
quando o envio ao SQS falhar; um erro de resposta não implica rollback de
efeitos já realizados. Reenvios do workflow exigem idempotência ou reconciliação.
Não foram adicionadas retentativas automáticas que possam repetir a proposta.

## Referências

- [AWS — estado Fail](https://docs.aws.amazon.com/step-functions/latest/dg/state-fail.html)
- [AWS — StartSyncExecution](https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartSyncExecution.html)
- [AWS — override de respostas no API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-override-request-response-parameters.html)
