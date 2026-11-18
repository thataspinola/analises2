# carbon-acq-sp-auto-shop-repair-search-caps-id

> **Leitura rápida:** ❓ nome não existe no workspace. Não usar os gatilhos da lambda search-caps.

**Caminho do código:** Não encontrado
**Nome da função na AWS (Terraform):** Não encontrado
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não há lambda com esse nome. A pasta indicada define só `carbon-acq-sp-auto-shop-repair-appointments-search-caps` (`POST` no API Gateway, `event.body`).

## Gatilhos no Terraform

| Tipo           | Recurso / Detalhe                                      | Arquivo:linha |
| -------------- | ------------------------------------------------------ | ------------- |
| Não encontrado | Busca do nome em `**/*.{tf,js,json,md}`: nenhum match. | —             |

## Eventos tratados no handler

| Tipo de evento | Evidência no código    | Arquivo:linha |
| -------------- | ---------------------- | ------------- |
| Não encontrado | Não há handler próprio | —             |

**Ramificação por tipo de evento no handler?** Não encontrado.

## Divergências Terraform × Código

Não aplicável.

## Problemas encontrados

1. **Média** — Função da lista ausente no repositório. A pasta não tem segundo pacote nem segundo `aws_lambda_function`.

## Recomendação

Confirmar o nome. Não atribuir a esta entrada os gatilhos da vizinha `carbon-acq-sp-auto-shop-repair-appointments-search-caps`.

## Débitos técnicos

Nome inexistente. Não há débito de implementação porque não há função.

## Erros que acontecem ou podem acontecer

Não aplicável.

## Oportunidades

Não copiar o POST da lambda `carbon-acq-sp-auto-shop-repair-appointments-search-caps` para este nome.

## Melhorias identificadas

- Confirmar o nome real. Não reutilizar o POST de `appointments-search-caps`.

## Observações

- Procurei em `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/infra/variables.tf` (`project_name` único) e no workspace inteiro.
