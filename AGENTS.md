# Escopo atual de analises2

- Cada pasta de miniprojeto é independente. Não criar imports, helpers, testes ou dependências que acessem outros miniprojetos.
- Preservar os contratos usados em produção e fazer correções pequenas, justificadas por evidência. Tratar um item por vez.
- Não criar novos testes, cenários, fixtures, pacotes de validação ou metas de cobertura nesta etapa. Não migrar runners. Preservar os testes e configurações Jest preexistentes. É permitido executar os testes já existentes e registrar resultados reais.
- Priorizar débitos técnicos, erros de retorno, falhas ocultadas, perda de mensagens, reprocessamento e idempotência.
- Revisar observabilidade, correlação e rastreamento quando viável, sem registrar dados pessoais, tokens, credenciais ou payloads completos.
- Mapear alarmes de erros, timeouts, throttling, idade de mensagens, backlog, DLQ e falhas de workflow, conforme os recursos efetivamente existentes. Confirmar thresholds, ambiente e destinatários antes de implantar.
- Não presumir que múltiplos métodos HTTP exigem dividir uma Lambda. Confirmar invocadores e avaliar compatibilidade antes de alterar a arquitetura.
- Não executar deploy, apply ou acesso corporativo fora da VDI. Registrar separadamente código revisado, merge, implantação e homologação.
- Manter o acompanhamento com descrição das ações, impacto, evidência, prioridade e status. Não declarar concluído por existir código em main.
- Usar Conventional Commits. Não introduzir arquivos Python.
