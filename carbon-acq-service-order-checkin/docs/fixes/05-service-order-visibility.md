# Item 5 — Visibilidade das filas de service-order

> Atualização de escopo — 19/11/2026: os testes acrescentados durante estas correções foram removidos. As suítes preexistentes e suas configurações Jest foram restauradas. Os números de testes/cobertura abaixo são históricos e não certificam a suíte atual. As correções de produção descritas neste registro foram preservadas. A validação corporativa continua pendente.


## Escopo

Este documento pertence exclusivamente a `carbon-acq-service-order-checkin`. Código Terraform, testes e documentação necessários para esta correção ficam dentro desta pasta.

Coberta a fila consumida pela Lambda deste projeto. A DLQ já reutiliza a mesma variável de visibilidade e também recebe os valores novos; não foi introduzida uma consumidora para ela.

## Configuração

| Ambiente | Timeout Lambda (preservado) | Visibilidade anterior | Nova visibilidade |
| --- | ---: | ---: | ---: |
| DEV | 25 s | 30 s | 150 s |
| HML | 30 s | 30 s | 180 s |
| POC | 25 s | 30 s | 150 s |
| PRD | 30 s | 30 s | 180 s |

A visibilidade segue a recomendação AWS de pelo menos seis vezes o timeout da Lambda. Os mappings atuais não configuram janela de agrupamento. Se uma janela for adicionada, a política e os testes deverão ser atualizados para incluir seu tempo adicional.

O parâmetro `queue_visibility_timeout_seconds` passa de string para number. O root chama o módulo local `infra/modules/queue-timeout-policy` e usa sua saída validada nos dois módulos de fila. O output tem uma precondition que rejeita visibilidade menor que seis vezes o timeout; a avaliação é usada na configuração real das filas. As variáveis da política rejeitam nulos, frações e valores fora dos limites de Lambda/SQS.

Os endereços Terraform dos recursos existentes não mudam. Não há mudança em regras de negócio, timeout Lambda, tamanho dos lotes, concorrência, retenção, maxReceiveCount, destinos de DLQ, respostas parciais ou IAM. O novo módulo não cria recursos nem requer provider.

## Validação — 18/11/2026

Terraform 1.9.8, distribuição oficial conferida por SHA-256:

- Init sem backend e validate do módulo de política: passaram.
- Testes nativos: **18 casos passaram**, sem falhas.
- Quatro casos leem os tfvars reais de DEV/HML/POC/PRD.
- A suíte também passou com somente este miniprojeto copiado para uma pasta temporária, sem projetos vizinhos.
- Regressão comprovada nessa cópia: ao restaurar a visibilidade DEV para 30 segundos, o caso de ambiente falhou pela precondition de seis vezes.
- Rejeitados os valores antigos 25/30, 29/30 e 30/30, margem insuficiente, tempos fracionários e limites inválidos.
- Aceitos o limite de seis vezes, valores maiores e os limites máximos.
- Teste de estrutura confere o uso da saída validada nas filas, a origem do timeout Lambda e a ausência de janela de agrupamento nos mappings locais. É uma verificação textual de regressão, não um plano AWS.
- Formatação do módulo de política e `git diff --check`: passaram.

A política requer Terraform >=1.2. Os testes nativos requerem >=1.6; a execução comprovada foi com 1.9.8. A partir desta pasta de miniprojeto:

```bash
terraform -chdir=infra/modules/queue-timeout-policy init -backend=false -input=false
terraform -chdir=infra/modules/queue-timeout-policy validate
terraform -chdir=infra/modules/queue-timeout-policy test
```

Os testes leem somente arquivos deste miniprojeto e não chamam AWS nem serviços corporativos. Não certificam o stack completo, o comportamento dos handlers ou a configuração já implantada.

## Implantação e riscos operacionais

Não foram executados plano completo, apply, acesso ao state remoto, deploy ou chamadas corporativas. Na VDI/Jenkins, inicializar o backend aprovado e revisar o plano de cada ambiente: esperar atualização de visibilidade das duas filas, sem substituição de recursos por esta alteração. Investigar qualquer outra diferença.

A visibilidade maior aumenta o intervalo possível até uma nova tentativa e pode atrasar o redrive após falhas. Validar em HML sucesso, falha controlada, retry, respostas parciais, DLQ e alarmes, conferindo os tempos efetivos depois da implantação. A entrega continua sendo pelo menos uma vez; esta mudança não adiciona idempotência nem garante processamento único.

Referência: [AWS — configuração de filas SQS para Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html).
