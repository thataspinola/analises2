# Logs de atualização de lead (AC-282 — parcial)

## Correção
No handler: eventos completos, corpo inválido e mensagem/stack de exceção foram retirados dos logs. Mensagens fixas e campos técnicos awsRequestId (contexto Lambda), source, operation e messageId (SQS) identificam início, falha de parsing e resultado por registro. O contexto é argumento local da invocação, sem armazenamento global entre execuções.
No controller: payload XML, serialização do payload, codigo_vdo e mensagens brutas de exceção foram retirados dos logs. A etapa atual distingue validação, montagem, token, certificados, atualização e exclusão; errorType usa categorias fixas validation/internal. Não há logging de token/certificado.
Na API: data_trace_enabled=false. Logging INFO, métricas, destinos/retenção e throttling preservados.

## Contratos e limites
Mantidos parsing, validação, chamadas de layers, transformação de payload, atualização Dynamics e exclusão DynamoDB, erros lançados, corpos/status HTTP e batchItemFailures. O controller continua recebendo só o payload; não foi alterada sua assinatura. Handler recebe context opcional, compatível com invocação sem segundo argumento (IDs podem ficar ausentes).
Não existe associação automática do requestId do Gateway ao messageId da integração direta SQS. A correlação por awsRequestId/messageId vale no handler consumidor; logs internos do controller têm etapa, sem contexto por registro. Em lotes concorrentes, confirmar diagnóstico e eventual necessidade de contexto explícito seguro em item separado.
Layers de token/Dynamics, SDKs e ferramentas corporativas podem emitir seus próprios logs; seu comportamento não foi alterado. Não se certifica sanitização global ou fim de dados pessoais em todo o fluxo. Respostas públicas existentes com mensagens de erro não foram alteradas nesta revisão de logs.
Logs antigos permanecem sob acesso/retenção existentes. Nenhuma limpeza retroativa, novo sink, tracing distribuído, alarme ou dependência introduzida. Menos detalhe bruto exige diagnóstico por etapa/IDs e consulta autorizada, sem reabilitar payload completo por padrão.

## Verificação
node --check aprovado no handler e controller. Revisão estática de todas as chamadas logger nesses dois arquivos, preservação do controller e batchItemFailures, ausência de estado de correlação global. Terraform/OpenTofu indisponíveis; fmt/validate/plan não executados. Suítes não executadas; testes/Jest/manifests/locks preservados, nenhum teste novo.
VDI/HML: conferir início/resultado por messageId e awsRequestId, parsing inválido HTTP/SQS, erro de validação, falhas de token/certificado/Dynamics/DynamoDB, sucesso e lote misto; comparar retornos/reprocessamento com contrato existente. Conferir novos logs sem payload XML, evento, corpo, codigo_vdo, mensagem/stack bruta, sem alterar métricas. Avaliar vazamentos nas layers e rastreamento entre API/fila/consumidor; conferir overrides do stage.
Nenhuma operação AWS, API de negócio, apply/deploy ou leitura de dados de produção. Merge, implantação e homologação separados. AC-282 continua parcial até diagnóstico/correlação/fontes externas confirmados.

## Referência
https://docs.aws.amazon.com/apigateway/latest/api/API_MethodSetting.html
