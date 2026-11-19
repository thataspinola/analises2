# Débitos técnicos e correções de analises2

## Diretriz de 19/11/2026

Nesta etapa, preservar testes e configurações Jest que já existiam. Remover os testes e a infraestrutura exclusiva de testes acrescentados nos PRs #1 a #11 e desfazer as migrações para Vitest. Não criar novos testes ou cenários.

A restauração não desfaz correções de produção: checkpoint de stream, tratamento HTTP, proteção dos logs e configurações de fila permanecem. Os ajustes de instalação do PR #8 continuam nos manifestos/lockfiles do abandono. Testes originais podem conter expectativas antigas; sua restauração não é certificação da execução.

## Ordem do trabalho

1. Conter perda de mensagens e falhas tratadas como sucesso: email-sender, consumers/layer de deals e cadeias de falha de vistoria.
2. Corrigir Promises pendentes em deals e referências inexistentes no tagueamento da vistoria de portáteis.
3. Corrigir respostas e integrações inválidas, incluindo a integração API–SQS de update-lead, preservando os consumidores atuais.
4. Revisar visibilidade de filas, retries, idempotência, limites de chamadas e políticas de recuperação.
5. Revisar logs estruturados, correlação/rastreamento quando viável e alarmes, com dados mínimos e sem credenciais ou payloads pessoais.

Os 26 novos relatórios são insumos da triagem. Confirmar achados no código e no stack implantado antes de classificar como bug em produção. Sugestões de divisão de Lambdas são decisões de arquitetura a avaliar, não correções automáticas.

## Estado e evidências

A planilha de acompanhamento distingue achado confirmado, hipótese, alteração em PR, código em main e validação HML. Resultados históricos dos testes retirados são mantidos como histórico, sem indicar cobertura atual. Deploy e homologação dependem do ambiente autorizado na VDI.
