# Reduzir payloads nos logs do workflow de viagem (AC-244)

## Correção pontual
Step Functions: include_execution_data = false. API Gateway: data_trace_enabled = false.
Preservados destinos/grupos de log, retenção, var.log_level, logging_level INFO, métricas e throttling. ASL, templates, contratos HTTP, IAM, payloads enviados a Lambda/SQS, testes e Jest intactos. Não foi habilitado tracing novo ou dependência de fornecedor adicional.
A configuração limita captura automática de dados de execução e tracing completo de requisição/resposta. Não equivale a sanitização global, exclusão de logs anteriores ou garantia de ausência de dados pessoais em erros/causas, parâmetros, logs de Lambda/consumidor ou ferramentas corporativas. Essas fontes ainda exigem revisão.

## Correlação e diagnóstico
Usar identificadores técnicos já disponíveis no ambiente: requestId/extendedRequestId do Gateway e execution ARN/metadados de estado da Express. Confirmar presença e nível efetivo na VDI/HML; var.log_level pode limitar eventos. requestId pode ser sobrescrito pelo cliente, portanto extendedRequestId é preferível para identificar a requisição gerada pelo Gateway.
Esta correção NÃO implementa associação automática request → execution → Lambda → SQS/consumidor. Não inserir dados pessoais ou alterar mensagens para criar correlação sem contrato. Identificar o mecanismo corporativo existente antes de especializar instrumentação.
Com execution data excluído, histórico não exibirá o mesmo conteúdo de entrada/saída. Express depende de logs com entrega best effort; manter a consulta autoritativa e a reconciliação AC-011. Ausência de payload/log não prova ausência de efeito de negócio.
A função de proposta é externa a esta pasta: revisar seus logs com o responsável. Não reabilitar captura ampla de payload para compensar lacuna de diagnóstico. Avaliar uma seleção explícita de campos técnicos e erros seguros em tarefa separada.

## Verificação e validação
Revisão estática das duas flags e confirmação de que níveis/métricas/retenção/destinos permanecem iguais. Terraform/OpenTofu indisponíveis: fmt/validate/plan não executados. Suítes não executadas; nenhum teste novo.
VDI: fmt/validate/plan com backend/providers corporativos, conferindo apenas as duas flags sem substituição dos recursos. Confirmar drift, permissões de logging e override de métodos/estágio.
HML: conferir novos logs sem entradas/saídas completas, requestId/extendedRequestId e metadados de execução disponíveis, sinais de falha SQS/Lambda/timeout, resposta500 genérica e métricas preservadas. Revisar causas/mensagens/identificadores para vazamento residual. Validar diagnóstico e reconciliação sem depender de payload em logs.
Logs antigos permanecem sob retenção/acesso existentes; qualquer saneamento histórico exige procedimento separado. Não foi alterada retenção ou removido dado.
Sem deploy, apply, AWS/API de negócio ou leitura de logs de produção. Merge, implantação e homologação separados. AC-244 segue parcial até confirmação de correlação e fontes externas; não declarar concluído pelo merge.

## Referências
- https://docs.aws.amazon.com/step-functions/latest/apireference/API_LoggingConfiguration.html
- https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
- https://docs.aws.amazon.com/apigateway/latest/api/API_MethodSetting.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-variables-for-access-logging.html
