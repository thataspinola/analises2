# Cotação de seguro de Vida

Aplicação de suporte à jornada do produto Vida, com fontes em app e infraestrutura em infra. Este miniprojeto é independente das demais pastas.

## Testes existentes

As suítes originais em app/__test__ e a configuração Jest foram restauradas. A criação de novos testes e a migração para Vitest foram retiradas do escopo atual. Os thresholds voltaram aos valores da configuração Jest anterior.

A instalação usa as configurações corporativas e a dependência privada @porto-seguro/hub-vendas.carbon-token@2.9.2. Na VDI, execute a instalação conforme o manifesto/lockfile existente e utilize os scripts originais de teste. A suíte restaurada não foi certificada nesta revisão e pode conter expectativas anteriores às correções de produção.

## Execução manual

O script dev utiliza localRunner.js, no caminho original dentro de app. Esse modo pode acessar serviços reais e depende da conectividade e das credenciais do ambiente autorizado.

As correções de tratamento HTTP e proteção de logs permanecem. Consulte os registros em docs/fixes para comportamento, evidências históricas e validações pendentes.
