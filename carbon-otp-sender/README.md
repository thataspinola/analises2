# Carbon Data Logger

...
Descrição da busca de dados para a solicitacao de acesso:

- Buscar número de celular e email do usuário no gerenciador de acesso
- Buscar pescod, número de celular (CELULAR_INTEGRACAO precedendo outros numeros de celular) e mail do usuário na BCP
- Determinar qual número de celular utilizando a seguinte ordem de precedência: numero do gerenciador de acesso igual ao do formulario, numero da bcp igual ao do formulario, numero do gerenciador de acesso, numero da bcp, numero do formulário
- Determinal qual email utilizando a seguinte ordem de precedência: endereço de email do gerenciador de acesso igual ao do formulario, endereço de email da bcp igual ao do formulario, endereço de email do gerenciador de acesso, endereço de email da bcp, endereço de email do formulário
- Se usuario nao existir na BCP, procurar pescod na BCC

Descrição do mecanismo de disparo do código OTP para o cliente final:

- Se usuario nao existir na BCC, usar dados de número de celular e endereço de email determinados e as demais informações necessárias obtidas a partir dos dados do formulário e criar usuario BCC
- Verificar o status do usuário (seja existente ou criado) para identificar se ele está apto a logar (Indiretamente identificar se ele possui registro no LDAP/ActiveDirectory)
- Se o usuário não estiver apto, chamar ACT01 com createUserAccess=true
- Chamar gera-token-aa para gerar o token OTP
- Enviar o token OTP via SMS por meio da api corporativa de SMS
- Enviar o token OTP via mensagem de e-mail por meio do mecanismo de disparo de email da Carbon

Descrição do mecanismo de validação de acesso para o cliente final via código OTP:

- Chamar valida-token-aa para verificar se o codigo digitado pelo usuario é valido
