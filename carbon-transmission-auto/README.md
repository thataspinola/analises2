# Carbon - Auto Insurance transmission

Função responsável por consumir a fila de transmissão de apólice e disparar as ações relacionadas com a api do seguro automotivo

## ATENÇÃO

Caso haja modificação ou recriação da AWS Role "carbon-acquisition-transmission-lambda-role" será necessário OBRIGATORIAMENTE executar novamente a esteira de publicação do projeto. Caso tal esteira não seja executada nesta condição, a chamada da função que popula a fila (https://gitportoprd.portoseguro.brasil/portocom/hub-vendas/carbon/acquisition/transmission) apresentará erro de falta de privilégios para escrever na fila.
