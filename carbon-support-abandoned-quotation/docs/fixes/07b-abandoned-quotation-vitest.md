# Abandono de cotação — revisão do escopo de testes

Em 19/11/2026, a criação de novos testes e a migração de runners saíram do escopo atual. Foram restaurados os arquivos de testes preexistentes, a configuração Jest e os scripts anteriores à migração. Os testes, helpers e configuração Vitest acrescentados foram removidos.

Os resultados publicados anteriormente nos PRs de migração são evidências históricas de suítes que já não integram o projeto. Não representam cobertura ou aprovação das suítes restauradas.

Os testes existentes foram preservados, sem novos cenários. Alguns podem descrever contratos anteriores às correções de produção, como envelope HTTP no consumidor de stream. Essas divergências devem ser revisadas sem reverter correções funcionais nem acrescentar novos testes nesta etapa. Não foi declarada aprovação da suíte restaurada.

O foco atual é corrigir débitos técnicos, erros de retorno, propagação de falhas, observabilidade, rastreamento quando viável e alarmes. Cada miniprojeto permanece independente. Execução com dependências privadas e validação operacional continuam na VDI.
