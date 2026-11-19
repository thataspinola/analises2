# P1 — Propagação das falhas de processamento e gravação de deals

## Problema e correção

Os cinco consumidores SQS já retornam batchItemFailures com o messageId dos registros cuja Promise foi rejeitada. Seus mapeamentos Terraform já habilitam ReportBatchItemFailures, com batch_size = 1.

Porém, os controllers convertiam exceções em objetos HTTP e resolviam a Promise. A gravação na layer comum também convertia falhas de validação/persistência em objetos de erro, ignorados pelos consumidores. Isso permitia confirmar uma mensagem sem concluir o processamento.

Foram ajustados os catches externos dos controllers de card-proposals, eligibility, good-card, porto-pay-cards e porto-tag para registrar uma mensagem fixa da operação e relançar o erro recebido. O mesmo foi feito no catch de saveDealsData da layer local. O erro deixa de ser convertido em sucesso e pode chegar ao mecanismo de falha parcial já existente.

A mensagem fixa evita acrescentar payload, stack ou mensagem livre de exceção nesses novos registros. Os demais logs ainda precisam da revisão específica de observabilidade e privacidade.

## Escopo e compatibilidade

- Alterados seis arquivos de produção e este documento, somente dentro de carbon-acquisition-deals.
- Mantidos os caminhos de sucesso, os payloads enviados, as regras de filtragem e as verificações que evitam gravar quando não há dados.
- As APIs continuam com o tratamento existente de 404 como ausência de dados. O defeito específico de filtro com null em Porto Pay permanece separado.
- getDealsData e os endpoints HTTP create-deals/find-deals permanecem com o contrato atual.
- A busca no código versionado encontrou as chamadas de gravação nos cinco consumidores deste miniprojeto. Consumidores externos à base não foram certificados.
- Não houve alteração de testes, Jest, manifests, lockfiles, handlers, Terraform ou nomes de recursos. Não foram criados testes, cenários, fixtures ou pacotes de validação.

A propagação de erro de saveDealsData é uma mudança intencional do contrato interno de falha da layer. Para funcionar em produção, os consumidores devem usar a versão corrigida da layer. Atualizar somente os controllers não corrige falhas que uma layer antiga ainda converte em objeto.

## Verificações realizadas — 19/11/2026

- Revisão dos seis controllers, handlers SQS, APIs de produto, contrato de gravação e mapeamentos de falha parcial.
- node --check aprovado para os seis arquivos alterados.
- Revisão do diff: alteração restrita aos catches de falha. Trecho de getDealsData preservado.
- Testes preexistentes e configurações Jest preservados por SHA. Nenhum novo arquivo de teste.
- A suíte Jest não foi executada. Há expectativas legadas que verificam objeto HTTP em falhas dos controllers e de saveDealsData; elas divergem intencionalmente do tratamento corrigido e precisam de revisão no processo corporativo, mantendo os cenários existentes.
- Não houve download de pacotes privados, chamadas a APIs/AWS, deploy ou apply.

## Implantação e validação na VDI/HML

1. Revisar as expectativas legadas e executar as suítes existentes no ambiente autorizado. Não declarar aprovação da suíte a partir desta revisão estática.
2. Publicar a layer corrigida pelo processo corporativo e confirmar qual versão cada consumidor resolve. O Terraform consulta a layer por nome: conferir a versão efetiva no plano e no recurso, sem presumir que a alteração do código local atualiza automaticamente todos os consumidores.
3. Conferir compatibilidade de runtime e empacotamento. A configuração versionada da layer lista nodejs18.x, enquanto o módulo de card-proposals declara nodejs22.x; confirmar o artefato e os metadados realmente utilizados antes da implantação.
4. Em ambiente autorizado, observar falhas de validação, integração e persistência: o messageId deve ser reportado para nova tentativa e eventual redrive conforme a política existente. Conferir sucesso e ausência de dados sem regressão.
5. Observar backlog, idade das mensagens e DLQ durante a mudança. Falhas antes silenciosas passarão a reaparecer para tratamento. Considerar duplicidade e idempotência na recuperação.

## Itens que seguem separados

- Resolver as Promises que ficam pendentes quando eligibility/creditCards está false.
- Tratar o resultado null em Porto Pay antes dos filtros.
- Revisar visibility timeout, idempotência, logs com payloads e rastreamento.
- Confirmar cobertura e roteamento de alarmes e o processo de recuperação de DLQ.

Esta entrega trata somente a propagação de falhas. Não certifica o fluxo completo nem corrige automaticamente os outros P1.
