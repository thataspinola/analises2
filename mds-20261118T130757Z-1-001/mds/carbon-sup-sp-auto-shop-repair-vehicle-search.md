# carbon-sup-sp-auto-shop-repair-vehicle-search

> **Leitura rápida:** ❓ nome não existe no workspace.

**Caminho do código:** Não encontrado
**Nome da função na AWS (Terraform):** Não encontrado
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não há lambda com esse nome na pasta `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps` nem no restante do workspace. A única função dessa pasta é `carbon-acq-sp-auto-shop-repair-appointments-search-caps` (API Gateway `POST`).

## Gatilhos no Terraform

| Tipo           | Recurso / Detalhe                                      | Arquivo:linha |
| -------------- | ------------------------------------------------------ | ------------- |
| Não encontrado | Busca do nome em `**/*.{tf,js,json,md}`: nenhum match. | —             |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                  | Arquivo:linha |
| -------------- | ------------------------------------ | ------------- |
| Não encontrado | Sem entrypoint associado a este nome | —             |

**Ramificação por tipo de evento no handler?** Não encontrado.

## Divergências Terraform × Código

Não aplicável.

## Problemas encontrados

1. **Média** — Lambda da lista inexistente. Não há indício de busca de veículo nem de gatilho SQS sob este nome.

## Recomendação

Confirmar se a função está em outro repositório. Não reutilizar os gatilhos da lambda de search-caps.

## Débitos técnicos

Nome inexistente no workspace. Débito de inventário, não de código.

## Erros que acontecem ou podem acontecer

Não aplicável.

## Oportunidades

Localizar o repositório da busca de veículo antes de propor split de lambda.

## Melhorias identificadas

- Localizar o repositório da busca de veículo antes de propor código ou split de lambda.

## Observações

- `project_name` default da pasta: `carbon-acq-sp-auto-shop-repair-appointments-search-caps` (`infra/variables.tf:24-26`).
