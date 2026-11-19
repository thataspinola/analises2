# Aguardar atualização de lead — cotação auto (AC-136)

## Correção
O ramo sem statusCotacao descartava a Promise de sendMessageToUpdateLead. Agora aguarda o envio antes de chamar quotationError, alinhado aos demais ramos. O helper retorna a Promise do serviço, que já aguarda o SDK SQS. A factory quotationError lança BusinessError; o handler mantém seu envelope e status conforme error.code.

## Propagação e limites
Se o envio resolver, segue o erro de negócio existente, sem novo envio no catch para BusinessError.
Se o primeiro envio rejeitar com erro não BusinessError, o catch existente tenta enviar a atualização novamente, aguardando essa tentativa. Se ela resolver, o erro original continua sendo lançado; se rejeitar, a rejeição dessa tentativa propaga. Não foi alterada essa política nem criado retry adicional.
A atualização na fila não garante que o lead já foi alterado pelo consumidor. Se o backend aceitar a primeira mensagem e ocorrer timeout, a tentativa no catch ou retry do cliente pode duplicar a mensagem. Confirmar idempotência/conciliação e duração na VDI/HML; a correção não oferece processamento exatamente uma vez.

## Escopo
Apenas um await no controller. Preservados payloads, fila, geração de cotação/carrinho, ramos de status, erros/envelope HTTP, infraestrutura, dependências, testes e Jest. Não há recursos compartilhados com outro miniprojeto. Logs preexistentes permanecem para revisão de privacidade/correlação; nenhum novo payload ou log foi incluído.

## Verificação
node --check no controller aprovado. Revisão estática do ramo sem status, helper, serviço SDK, factory de erro e handler. Suítes não executadas; testes/Jest preservados e nenhum teste novo.
Na VDI/HML: confirmar ramo sem status, envio concluído antes do erro de negócio, falha no primeiro envio com segunda tentativa no catch, segunda tentativa com sucesso/falha, duração/timeout, demais ramos e observação da mensagem no destino. Confirmar recuperação de duplicações e lead pendente.
Sem AWS/API de negócio, deploy ou apply executado. Merge, implantação e homologação separados.
