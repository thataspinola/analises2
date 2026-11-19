# Revisão da pasta carbon-inspection-request-cellphone — 19/11/2026

Base: 3dbc20b823d0805f7ea90545113b454e4ef37de7. Revisão restrita a esta pasta; referências a serviços/layers externos não criam compartilhamento de código com outros miniprojetos.

## Mudanças separadas em commits
1. Logs seguros e contexto por mensagem; logger explícito: e4f9b9fa92709555ad3c2a781a2dd7767d99ab01
2. Timeout de falhas60s, filas180/360s: 5e1ef05bdbe98bf98ec6cb1f553708a1f3c52958
3. Retirar statements com ARN de fila de trabalho das políticas DLQ: 2aa071dcc085cae02ab89e95266beb6020de741e
4. Guardas Records em ambas aplicações; lote vazio continua permitido: e6e9d5f3d000c491def56eb170211a5c8d4ed894
5. Retirar wrapper Promise redundante e imports não usados: 174d1c14b005149aad451b3050d9a09663fe4c70
6. Documentação consolidada e README (commit que contém este documento).

### Logs e correlação
Handler/controller das duas aplicações passam contexto técnico opcional awsRequestId/messageId, local a cada registro. APIs existentes de controller continuam aceitando apenas o payload. Metadados selecionados não são anexados ao payload enviado a produto, pagamento, Analytics ou e-mail.
Removidos logs de evento/payload, identificadores de negócio e erro/stack brutos. Etapas de token, certificado, proposta, gravação, Analytics, notificação e fila final distinguem falhas sem copiar dados sensíveis. Logger explícito em app-request elimina dependência de global.logger.
Não há certificação global de privacidade: layers privadas, ferramentas corporativas e logs antigos exigem revisão externa. Não há tracing distribuído novo nem correlação automática produtor SNS → esta Lambda → sistemas externos. Alertas/filtros que usam texto antigo devem ser revisados.

### Filas e timeout
lambda-inspection-fail referenciava request_lambda_timeout, ignorando fail_lambda_timeout. Agora respeita o timeout específico. Nos quatro tfvars, solicitações30 s e falhas60 s; antes, ambas recebiam30 s no Terraform.
Filas passam a receber o timeout correspondente e calculam max(piso anterior,6×timeout): principal120→180 s e falhas60→360 s. Janela atual zero; adicionar sua duração ao cálculo caso uma janela de lote seja introduzida.
Mantidos batch10, concorrência5, ReportBatchItemFailures, redrive6/10, topologia, retenção e assinatura dos payloads. Retry/redrive poderá demorar mais; a margem não elimina duplicações.

### Políticas DLQ
Os dois documentos de política de DLQ incorporavam statement federado cujo Resource apontava à fila de trabalho. Essa incorporação foi retirada. Mantidas permissões específicas já existentes para produtor Lambda/SQS; nenhuma permissão nova ou wildcard foi criada.
Os statements federados das filas de trabalho permanecem intactos e exigem inventário de identidade/necessidade com a equipe corporativa. Confirmar plano e políticas efetivas/consumidores antes de aplicar; política de recurso não substitui inventário de IAM e de redrive.

### Retornos e higiene
Ambos os handlers rejeitam evento sem Records array. Array vazio permanece válido e retorna batchItemFailures vazio. No app-fail, antes um evento ausente podia resolver como lote bem-sucedido.
Promise wrapper redundante da app-request foi substituído por async/await por registro, mantendo Promise.allSettled, ordem e identificação das falhas. Imports sem uso removidos nos serviços SQS.
O erro da fila final continua propagado, preservando correção do PR #16. Analytics permanece opcional; falhas dessa etapa não reprovam proposta.

## Inventário de alarmes e recuperação — AC-253
| Recurso/sinal | Evidência versionada | Pendência do ambiente |
| --- | --- | --- |
| DLQ final da solicitação | Alarme ApproximateNumberOfMessagesVisible≥1, Average300 s,1 período; sem alarm_actions no recurso | Confirmar roteamento externo/responsável, latência e runbook |
| DLQ da consumidora de falhas | Fila declarada; alarme específico não encontrado nesta pasta | Confirmar stack/monitoramento externo e necessidade de alerta |
| Filas principal e falhas | Ambas declaradas | Avaliar idade da mensagem, backlog visível/em voo, prazo de recuperação e redrive |
| Lambdas request/fail | Logs/retention e layer de observabilidade declarados | Conferir Errors, Duration/timeout, Throttles e concorrência; limiares/canal a definir |
| Resultado por registro | Logs técnicos novos; retorno parcial existente | Conferir falhas parciais: invocação pode resolver e Lambda Errors sozinho não alertar |
| Analytics opcional | Erro fixo send_analytics com IDs | Avaliar falha sem reenvio de proposta e conciliação do evento |

Sem limiares/canal confirmados, nenhum alarme novo foi criado, alterado ou implantado. Inventário documental não encerra AC-253.

## Pendências que impedem encerrar a pasta
- AC-179: proposta pode existir quando a layer de pagamento falhar. Confirmar chave de idempotência/consulta do produto e recuperação somente da gravação pendente. Não reenviar proposta automaticamente em resultado incerto.
- AC-299: notificação precede gravação final; falha SQS após e-mail pode repetir notificação. Confirmar deduplicação/reconciliação do provedor e consumidor. Ordem preservada.
- Orçamento de HTTP: as duas integrações Axios não configuram timeout explícito. Confirmar latência/SLA e duração de token/certificados/pagamento, definir orçamento menor que o timeout da Lambda e tratamento do resultado incerto antes de impor limites em produção. Nenhum timeout arbitrário foi adicionado.
- Runtime: as duas Lambdas permanecem nodejs18.x, runtime descontinuado na documentação AWS. Selecionar runtime suportado com compatibilidade das layers/instrumentação/certificados, empacotamento e SDK; migrar em commit específico após evidência na VDI/HML. Não se presume compatibilidade pelo sucesso de node --check em outra versão.
- Pacote de produção: cliente SQS está em devDependencies. O runtime pode fornecê-lo, mas isso não garante a versão do lock. Conferir artefato/pipeline, política de npm omit/dev e SDK realmente resolvido antes de alterar manifests/lock ou omitir dependências. Auditoria de vulnerabilidades não executada; nenhuma certificação de dependências.
- Configuração regional: há defaults/ARNs ca-central-1 e endpoints concretos; confirmar região/conta e configuração implantada. Não generalizar destinos produtivos sem plano.
- AC-252/253: confirmar correlação nas layers, logs residuais, métricas por registro, limiares, canal e runbook. Não houve leitura de produção ou implantação.
- Configuração de acesso das filas: statements federados amplos existentes e produtor SNS da fila de falhas exigem inventário IAM/ownership. Não remover acessos de operação por suposição.
- Entrada: schemas existentes não expressam todos os contratos internos do produto/layers; conferir contrato de integração antes de ampliar obrigatoriedade. Guardas de evento não validam todo dado de negócio.

## Verificação realizada
- Todos os JS de produção: node --check aprovado.
- Scripts Jest existentes tentados nas duas aplicações: encerraram com código127 e jest: not found; nenhum cenário foi executado. Não instalar dependências privadas fora da VDI.
- Asserções preexistentes de logs/mensagem warn divergem do log seguro e da propagação de falha final do PR #16. Testes preservados; não alegar regressão aprovada.
- Revisão estática de handlers, APIs, validação, factories, SQS, Terraform das funções/filas/policies, tfvars e alarmes. Configuração do registry/lock não foi auditada por vulnerabilidades.
- Terraform/OpenTofu indisponíveis; fmt/validate/plan não executados.
- Nenhum teste/fixture/runner novo. Testes, Jest, manifests e locks serão comparados por SHA no diff final.
- Sem AWS, API de negócio, envio de notificação, apply/deploy ou alteração de dados.

## Sequência de validação VDI/HML
1. Conferir build real e dependências/layers/certificados/SDK; executar somente suítes existentes e registrar divergências.
2. Executar fmt/validate/plan. Esperar timeout de falhas30→60 s, visibilidades180/360 e retirada dos statements com ARN errado; nenhuma substituição de fila.
3. Validar lote válido, misto, JSON inválido, evento sem Records e array vazio. Conferir batchItemFailures pelo mesmo messageId.
4. Validar proposta, pagamento, ausência/falha Analytics; correlação técnica sem mudança de payload ou dados pessoais no log.
5. Validar notificação, falha de notificação e envio final/retry/redrive. Não tratar resposta genérica de erro como prova de ausência de efeito.
6. Confirmar IAM efetivo e alarme final existente, inventário dos demais alarmes/canais e recuperação de duplicações.
7. Registrar separadamente merge, implantação, homologação e cada dependência pendente. Permanecer nesta pasta; revisão estática não é conclusão operacional.

## Fontes oficiais consultadas
- https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html
- https://docs.aws.amazon.com/lambda/latest/dg/runtime-support-policy.html
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html
