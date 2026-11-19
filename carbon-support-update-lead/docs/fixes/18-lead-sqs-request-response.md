# Integração API → SQS — atualização de lead (AC-195)

## Correção
O template application/json envia MessageBody com $util.urlEncode($input.body), protegendo caracteres reservados do formulário application/x-www-form-urlencoded. O SQS deve receber o JSON original, sem alteração dos campos de negócio.
Adicionados MethodResponse 500 e IntegrationResponse com selection_pattern ^5[0-9][0-9]$ para status HTTP do backend SQS. Mensagem de erro fixa, sem dados do backend. Retornos existentes 200 e 400 preservados; 200 significa aceitação/enfileiramento, não atualização concluída no Dynamics.
Deployment inclui respostas 4xx/5xx no hash de redeployment e depende das respostas antes de capturar o snapshot. A mudança só chega ao stage após implantação controlada.

## Escopo e limitações
Preservados API privada, rota/método, integração direta, IAM, URI da fila, aplicação consumidora, contratos de sucesso, testes/Jest e dependências. Não foi criada Lambda de entrada nem acoplamento com outros miniprojetos.
O mapeamento trata respostas HTTP 5xx do SQS; falhas de execução/timeouts do próprio Gateway podem seguir respostas nativas e não equivalem a esse mapeamento. O tratamento 4xx existente continua convertendo para 400.
Após timeout de resultado incerto ou retry do cliente, duplicações ainda são possíveis. Confirmar idempotência e conciliação; não há garantia de processamento exatamente uma vez.
Validação de JSON/contrato na entrada, content types alternativos e passthrough não foram ampliados. Data tracing e logs preexistentes permanecem para AC-282; nenhuma afirmação de sanitização global. Alarmes/recuperação em AC-283.

## Referências e verificação
- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
- https://docs.aws.amazon.com/apigateway/latest/api/API_IntegrationResponse.html

Revisão estática do template, respostas, dependências e trigger. Terraform/OpenTofu indisponíveis: fmt/validate/plan não executados. Suítes não executadas, testes/Jest preservados e nenhum teste novo.
Na VDI, executar fmt/validate/plan com backend/providers corporativos; revisar criação das respostas 500 e redeployment do stage, sem substituição da fila/API.
Na HML, conferir corpo recebido no SQS com &, +, %, =, acentos e quebras de linha, payload comum, retorno 200/400, resposta SQS 5xx → HTTP500 com mensagem fixa e respostas nativas de timeout. Usar ambiente e procedimento autorizados; validar consumidores/monitoramento e recuperação do lead sem duplicar efeitos.
Sem AWS, chamada de API de negócio, apply ou deploy executado. Merge, implantação e homologação separados.
