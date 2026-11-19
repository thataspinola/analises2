# Invocadores e contrato da cotação de celular (AC-140)

## Resultado da revisão
Base revisada: 9c802b0015da2eb43818a9f56cc2376bbfaa93c5.
A pasta versiona uma Lambda index.handler com nome definido por project_name (default carbon-acquisition-cellphone-quotation). infra/main.tf instancia somente o módulo lambda. O módulo exporta invoke ARN, role ARN e function name; não há módulo de API, event source mapping ou aws_lambda_permission nesta pasta.
Buscas no repositório pelo nome exato e pelo trecho acquisition-cellphone retornaram apenas manifest/lock, variável de nome e relatórios de análise; não identificaram um chamador. Busca indexada não elimina referências dinâmicas, outros repositórios ou stacks fora deste conjunto.
Conclusão: invocador de produção NÃO confirmado. Não significa função sem uso ou sem permissão efetiva.

## Contrato observado, sem alteração
app/index.js recebe o objeto de negócio diretamente em event, aplica sanitização e passa ao controller. Não lê nem interpreta event.body.
O retorno é envelope isBase64Encoded/headers/statusCode/body, com body objeto no sucesso e erro. O nome local awsRestAPIGatewayResponse sugere intenção, mas não comprova um Gateway proxy.
Se houver AWS_PROXY, o tratamento de entrada e serialização de saída precisam ser avaliados (AC-141). Se houver invocação direta ou integração não proxy com transformação, serializar ou trocar o envelope sem examinar o consumidor pode quebrar produção.

## Conferência somente leitura na VDI
Confirmar conta, região e nome efetivo por ambiente, alias/versão e equipe responsável. Com perfil corporativo autorizado, consultar a configuração, policy de recurso e event source mappings:
- aws lambda get-function-configuration --function-name NOME --region REGIAO
- aws lambda get-policy --function-name NOME --region REGIAO
- aws lambda list-event-source-mappings --function-name NOME --region REGIAO
Examinar também alias/versão quando usados. Falta de policy ou mappings não exclui invocação direta autorizada por IAM na mesma conta. Não adicionar permissão ampla para compensar ausência de evidência.
Investigar nas stacks/repositórios donos do fluxo: integrações de API Gateway REST/HTTP, Function URL, máquinas de estado, regras/agendamentos, produtores Lambda/SDK e políticas IAM. Verificar referências a ARN/alias e transformações de payload/resultado. Usar telemetria/auditoria já disponível; ausência de eventos não prova inatividade se a coleta não estava habilitada. Não habilitar coleta nova ou invocar a função nesta conferência.
Registrar evidência mínima sem segredos ou dados pessoais: tipo de invocador, identificador/stack responsável, destino função/alias, tipo de integração, transformação de entrada/saída e quem pode confirmar o contrato. Exemplos devem ser sanitizados.

## Decisão após evidência
- Proxy HTTP: conferir envelope event.body e string JSON na resposta; ajustar contrato em AC-141 e infraestrutura na stack responsável, sem duplicar recurso existente.
- Invocação direta/workflow: preservar formato consumido e registrar transformação/identidade IAM; avaliar permissão de recurso só quando necessária ao modelo de invocação.
- Integração não proxy: examinar templates antes de adaptar o handler.
- Nenhum invocador identificado: manter como pendência de inventário; retirada da função exige confirmação operacional de uso, ownership e plano específico. Não remover automaticamente.

## Status e escopo
AC-140: A confirmar; revisão de repositório registrada, falta evidência do ambiente. AC-141 depende dessa confirmação e não foi implementado.
Somente documentação neste item. Aplicação, testes, Jest, infraestrutura e permissões preservados; nenhum teste novo, suíte executada, deploy, operação AWS ou API de negócio.
Merge deste documento não conclui a identificação do invocador nem a homologação.
