# Item 2 — Visibilidade da fila de envio de OTP

## Correção

A fila `carbon-auth-otp-send-sms-requests`, consumida por `carbon-otp-sender`,
tinha uma visibilidade inferior ou igual ao timeout da Lambda. Em PRD eram
14 segundos de visibilidade para 90 segundos de timeout.

| Ambiente | Timeout da Lambda (inalterado) | Visibilidade anterior | Nova visibilidade |
| --- | ---: | ---: | ---: |
| DEV | 120 s | 60 s | 720 s |
| HML | 120 s | 60 s | 720 s |
| POC | 90 s | 90 s | 540 s |
| PRD | 90 s | 14 s | 540 s |

Os valores seguem a recomendação AWS de visibilidade mínima de seis vezes o
timeout da função. O mapping atual usa `batch_size = 1`, sem janela de
agrupamento. Se uma janela for adicionada, a política deverá incluir essa
margem adicional.

Não foram alterados o timeout da Lambda, o TTL/validade do OTP, as regras de
envio, batch size, concorrência, DLQ, retenção ou quantidade de tentativas.
Aumentar a visibilidade pode aumentar o tempo até uma nova tentativa; não
prolonga a validade do código de autenticação.

## Proteção contra regressão

O root passa `lambda_timeout_sender` ao módulo `sender-queue`. A fila utiliza
o valor retornado pelo submódulo `timeout-policy`, que:

- exige tempos numéricos inteiros e não nulos;
- limita o timeout Lambda a 1–900 segundos e a visibilidade SQS a 0–43200;
- bloqueia a avaliação com uma precondition se a visibilidade for menor que
  seis vezes o timeout da Lambda.

O submódulo não cria recursos nem acessa AWS. A saída validada alimenta
diretamente `aws_sqs_queue.queue.visibility_timeout_seconds`; não é apenas
uma verificação documental. Os endereços Terraform dos recursos AWS não mudam.

## Validação local — 18/11/2026

Terraform 1.9.8, obtido da distribuição oficial e conferido pelo SHA-256:

- `terraform validate` do módulo `timeout-policy`: passou.
- `terraform test` da política: **15 casos passaram, zero falhas**.
- Os quatro casos de ambiente leem os valores dos arquivos `dev.tfvars`,
  `hml.tfvars`, `poc.tfvars` e `prd.tfvars` reais.
- Rejeitadas as configurações antigas 120/60, 90/90 e 90/14; rejeitados também
  90/91 e 90/539 (Lambda/visibilidade).
- Aceitos o limite de seis vezes e valores maiores; rejeitados valores
  fracionários e acima dos limites.
- Formatação dos módulos alterados e testes, e `git diff --check`: passaram.

Para repetir, a partir da raiz do repositório, com Terraform >= 1.6 para os testes:

```bash
terraform -chdir=carbon-otp-sender/infra/modules/sender-queue/timeout-policy init -backend=false -input=false
terraform -chdir=carbon-otp-sender/infra/modules/sender-queue/timeout-policy validate
terraform -chdir=carbon-otp-sender/infra/modules/sender-queue/timeout-policy test
```

A política em produção requer Terraform >= 1.2. Os testes nativos precisam de
Terraform >= 1.6; a execução comprovada foi com 1.9.8.

## Limitações e validação corporativa

O módulo AWS completo de fila não concluiu `validate/test`: o provider AWS
6.73.0 foi instalado e verificado pelo Terraform, mas sua inicialização
falhou neste ambiente durante o handshake do plugin. A validação concluída
é da política real sem provider; não substitui o plano do stack.

Não foram acessados state remoto, conta AWS ou serviços corporativos, nem foi
executado apply. Na VDI/Jenkins:

1. Inicializar o root usando o backend e a identidade aprovados para o ambiente.
2. Revisar o plano, esperando a atualização da visibilidade e sem substituições
   de recursos por esta correção. Investigar quaisquer outras alterações.
3. Validar envio, falha, retry, ida à DLQ e expiração do OTP em HML.
4. Confirmar a configuração efetiva após a implantação e monitorar falhas,
   mensagens em processamento e atraso de entrega.

Esta correção não adiciona deduplicação e não garante envio exatamente uma vez.

Referência: [AWS — configuração SQS para Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html).
