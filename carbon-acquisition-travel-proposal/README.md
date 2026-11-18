# Travel proposal workflow

Workflow Express de proposta de viagem, exposto por API Gateway e integrado à
Lambda de proposta e à fila de atualização de lead.

## Falha no envio da atualização do lead

Quando há `updateLead` e o envio ao SQS falha, a execução termina em
`FAILED`, com erro `UpdateLeadEnqueueFailed`. A integração HTTP reconhece
a falha da execução e devolve status 500 com mensagem pública genérica.
Sem `updateLead`, o ramo de atualização continua sendo opcional.

A chamada `StartSyncExecution` pode retornar HTTP 200 no transporte mesmo
quando a execução falha. O mapping usa o campo `status` da execução.

## Testes locais

Requisitos: Node.js >=24 e npm.

```bash
cd carbon-acquisition-travel-proposal
npm ci
npm test
```

Os testes usam Vitest, validação de schema/caminhos ASL e renderização local de
Velocity. Não chamam AWS. A instalação inicial baixa dependências públicas
registradas no lockfile. Este pacote é privado e serve somente à validação
do workflow; não acrescenta dependências à Lambda de proposta.

Validar o plano Terraform e o comportamento efetivo de Step Functions/API
Gateway na VDI/HML antes de implantar. Ver
[correção do item 3](../docs/fixes/03-travel-proposal-sqs-failure.md).
