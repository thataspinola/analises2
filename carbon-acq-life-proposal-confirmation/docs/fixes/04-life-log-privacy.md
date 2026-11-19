# Item 4 — Privacidade dos logs nos fluxos de Vida

> Atualização de escopo — 19/11/2026: os testes acrescentados durante estas correções foram removidos. As suítes preexistentes e suas configurações Jest foram restauradas. Os números de testes/cobertura abaixo são históricos e não certificam a suíte atual. As correções de produção descritas neste registro foram preservadas. A validação corporativa continua pendente.


## Escopo deste miniprojeto

`carbon-acq-life-proposal-confirmation`, incluindo sua aplicação e API Gateway. Esta pasta é independente dos demais projetos.

## Alterações

1. Removido o registro do body/evento, respostas completas, data de nascimento
   e payload convertido de proposta. O mascaramento parcial para log foi
   substituído pela emissão apenas de metadados operacionais.
2. Removidos `rawError`, stack e mensagens de exceção interpoladas dos logs
   nos handlers, controllers e integrações destes fluxos.
3. Novo `logMetadata` limita resumos de erro a tipo conhecido, código técnico
   e status HTTP válido. Corpos HTTP, headers, configurações Axios,
   certificados e mensagens livres não fazem parte do resumo.
4. Identificadores técnicos são campos estruturados: trace/request ID em
   formato UUID; cotação numérica ou UUID. Texto livre e valores numéricos
   sem precisão segura são omitidos. Os headers e payloads de negócio não são
   alterados pelo filtro de log. IDs não equivalem a anonimização dos dados.
5. Hooks/serializers do logger protegem tanto Error direto quanto os formatos
   `{ err }`, `{ error }` e `{ rawError }`. O hook impede que Pino derive
   automaticamente a mensagem pública do log a partir da mensagem da exceção.
6. Redação defensiva remove campos conhecidos como body/payload/event,
   request/response/config/headers e credenciais, quando enviados como objeto.
7. `data_trace_enabled = false` nos três módulos de API Gateway, mantendo
   nível de logs, métricas, retenção e demais configurações existentes.

Preservados aplicação/ambiente/versão, nível de log, etapa, identificadores
válidos e status técnico. Os novos logs de erro usam a mensagem fixa
`Operation failed`; o detalhe operacional fica nos metadados estruturados.

Cada ZIP Lambda carrega sua própria cópia do helper, evitando imports fora do
artefato. Cada miniprojeto possui sua própria suíte em `validation/logging`, com dependências e lockfile locais.
Nenhuma dependência de produção foi adicionada ou atualizada.

## Cuidados de implementação

A redação por chave não protege texto já interpolado em uma string. Por isso
os call sites também foram corrigidos; uma chamada futura com payload
serializado em mensagem de texto deve ser rejeitada em revisão.

No Pino 6, um Error direto podia ser expandido em campos de topo e introduzir
stack/mensagem antes de serializers por chave. O teste encontrou esse caso;
o hook agora normaliza o erro antes dessa expansão, nas três versões.

As funções locais que clonavam payloads exclusivamente para registrar versões
parcialmente mascaradas foram removidas. Os utilitários públicos de máscara
existentes permanecem disponíveis por compatibilidade.

## Resultado histórico da validação original — 18/11/2026

Os resultados abaixo pertencem à execução conjunta anterior à separação. Não representam uma nova execução da suíte local deste projeto.

- Node 24.22.3, Vitest 5.1.1.
- Saída real capturada de Pino 6.4.1, 8.15.1 e 10.3.1.
- `npm ci --ignore-scripts`: passou, com lockfile de validação versionado.
- `npm test`: **54 testes passaram**.
- Regressão demonstrada: o handler original da cotação falha no teste que
  proíbe dados sensíveis fictícios nos logs; a versão corrigida passa.
- Testados erros de JSON, falhas de token/certificado via erro rico,
  falhas de validação, falhas HTTP, sucesso e payload convertido.
- Verificada a preservação das respostas e dos dados de negócio nos
  cenários isolados, sem registrar dados pessoais.
- Sintaxe dos 98 arquivos JavaScript materializados e `git diff --check`:
  passaram.

A suíte captura logs em memória e não utiliza dados pessoais reais. Ela bloqueia
dependências externas não simuladas. Validação de schema de entrada e a
transformação do payload de abertura são colaboradores simulados, portanto os
resultados não certificam todos os cenários de negócio das aplicações.

As suítes Jest legadas completas e sua cobertura global não foram executadas
neste lote. A medição global de cobertura e a padronização dos testes continuam
no item próprio; não foi reduzido nenhum threshold.

## Pendências de ambiente

Não foram executados deploy, plano Terraform do stack, acesso a logs históricos
ou chamadas AWS/corporativas. Na VDI/HML, conferir as configurações efetivas
dos stages e observar sucesso/falha com correlação técnica, sem dados pessoais.

A implantação afeta novas emissões. O acesso e a retenção dos logs históricos
exigem revisão no processo corporativo; este PR não os altera.

As layers externas e os serviços upstream podem emitir seus próprios logs.
Não há certificação de sanitização desses componentes neste teste. Corpos de
resposta e contratos HTTP seguem o tratamento existente, a revisar no item 6.

## Referências

- [AWS — execution logging e data tracing](https://docs.aws.amazon.com/apigateway/latest/developerguide/rest-api-execution-logging.html)
- [Pino — redação de campos](https://github.com/pinojs/pino/blob/main/docs/redaction.md)

## Execução independente

A partir desta pasta de miniprojeto:

Execução da suíte adicional retirada do escopo atual. Use somente os testes preexistentes do miniprojeto.

Os caminhos dos fontes e da infraestrutura são resolvidos a partir desta pasta, sem ler projetos vizinhos. O teste específico do fluxo foi mantido junto aos casos comuns de privacidade. Nesta reorganização, a execução ficou pendente por indisponibilidade do executor; não houve nova certificação de testes.
