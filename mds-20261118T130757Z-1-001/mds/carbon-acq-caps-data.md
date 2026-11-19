# carbon-acq-caps-data

- Repositório: `data/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: OK
- Funções sistêmicas: 1 (endpoint `GET acquisition/caps/data`)

## Resumo

A função consulta a API de CAPS (centros de atendimento) a partir de latitude e longitude e devolve a lista de empresas, com filtros opcionais (atendimento noturno, sábado, carregador elétrico). Tem uma única responsabilidade e é acionada apenas pelo API Gateway. Todos os fluxos devolvem uma resposta HTTP válida, com status numérico e corpo serializado. Não foram encontrados problemas relevantes.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-acq-caps-data-gateway` | `GET` no recurso raiz, integração proxy | `infra/modules/api-gateway/main.tf:22-45` |

A API é privada e publicada no domínio interno com o path `acquisition/caps/data` (`infra/variables.tf:15`). Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Lê `queryStringParameters` | `app/index.js:7-15` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O controller captura todos os erros e os converte em resposta HTTP (400 para validação, 500 para os demais). O handler serializa o corpo e monta a resposta final. Para uma função HTTP, esse é o comportamento esperado.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Consulta concluída | 200 com a lista | Correto |
| Sem parâmetros ou parâmetros inválidos | 400 | Correto |
| Falha no token ou na API de CAPS | 500 | Correto |

Não foram encontrados fluxos sem retorno ou com retorno vazio.

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

Nenhuma. O Terraform declara só o `GET` do API Gateway, e o código trata só requisições HTTP.

## Problemas encontrados

Nenhum problema relevante. Os pontos menores estão em Observações.

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Nenhuma correção é necessária para os fluxos de retorno.

## Observações

- Na resposta 400 de validação gerada pelo controller, o campo `message` sai como um objeto com o nome e o código do erro, e não com o texto da validação. O controller passa `{ rawError: error }` para uma factory que espera apenas a mensagem (`app/src/controller/requestController.js:56-59`).
- O handler usa `responseBody` e `responseStatusCode` sem declarar (`app/index.js:17-18`), o que cria variáveis globais. Não mistura respostas entre chamadas, mas convém declarar com `let`.
