# Corpo de erro de validação — pré-financiamento (AC-163)

## Correção
badRequestError passa a serializar o objeto body com JSON.stringify. Preservados statusCode = 400, Status = FAILED, Content-Type application/json, status = error, mensagem recebida e fallback.
A infraestrutura versionada utiliza AWS_PROXY; o corpo da resposta deve ser string. O controller usa esta factory quando pre_financing_pool está ausente e quando ocorre ValidationError. O handler não serializa novamente esse retorno.

## Contratos e limites
Sucesso e factory error não alterados. Invocação direta permanece suportada pelo handler; seu envelope continua com Status, mas body agora é string JSON também nesse caminho. Confirmar consumidores diretos que eventualmente acessavam body.message, pois passarão a precisar interpretar o JSON. Nenhuma modificação em integração externa, workflow, infraestrutura ou dependências.
A revisão não certifica todos os contratos de erro: factory error ainda recebe message diretamente e o catch do handler usa400 para erros de execução. Esses caminhos dependem de avaliação separada, sem ampliação desta correção. Logs existentes continuam sujeitos à revisão de privacidade/correlação.

## Verificação
node --check na factory aprovado. Revisão estática de chamada do controller, retorno do handler e integração AWS_PROXY. Suítes não executadas; testes e Jest preservados, sem novos cenários/fixtures.
VDI/HML: confirmar ausência de pre_financing_pool, ValidationError, mensagem/fallback e corpo JSON válido sob HTTP400 em vez de falha de integração. Conferir sucesso, demais erros e compatibilidade de consumidores por invocação direta. Registrar separadamente merge, implantação e homologação.
Nenhuma chamada de negócio/AWS, deploy ou apply executado.
