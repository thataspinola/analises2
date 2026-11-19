# Analytics após a proposta — equipamentos portáteis

## Erro e impacto
A atividade usava factory sem import e proposalId inexistente. Com analytics informado, lançava ReferenceError após envio da proposta e gravação do pagamento. O erro chegava ao handler e podia provocar reprocessamento dos efeitos de negócio.

## Correção
Importar a factory do próprio miniprojeto e passar idTransaction recebido ao construtor de mensagem, que preenche proposal_id. Preservar a atribuição existente de inputData.idTransaction, o payload construído pela factory e a fila configurada.

Tratar Analytics como etapa opcional após os efeitos de negócio, conforme a ação AC-180. Erros de montagem ou envio são registrados sem relançar. O fluxo da proposta e a gravação do pagamento continuam propagando suas próprias falhas; não foram alterados. Esta alteração não oferece idempotência global nem elimina reentregas por timeout ou outros erros.

Os logs de sucesso e falha desta atividade usam mensagens fixas, sem payload, exceção bruta ou stack. Outros módulos ainda dependem de revisão de privacidade e correlação.

## Limites e recuperação
Uma falha de Analytics deixa a proposta bem-sucedida e pode deixar o evento sem entrega. Não foi criada fila de recuperação, replay automático ou alarme. Na VDI/HML, confirmar observabilidade da mensagem fixa, responsável e procedimento de reconciliação somente do evento, sem reenviar proposta ou pagamento. Limiares e destino de alarmes devem ser confirmados antes de implantar.

## Verificação
node --check no arquivo alterado aprovado; revisão estática da sequência proposta → pagamento → Analytics, da factory local e do serviço SQS. Suítes não executadas; testes, Jest, manifests, locks e infraestrutura preservados. Nenhum teste novo.
Validação operacional na VDI/HML pendente: evento com proposal_id correto, ausência de analytics, falha de montagem/envio sem reprovar a proposta e preservação das falhas de proposta/pagamento. Nenhuma API de negócio ou AWS acessada. Merge, deploy e homologação separados.
