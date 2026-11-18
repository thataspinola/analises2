# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                               = "555961299972"
token_layer_name                         = "carbon_token_layer"
vpc_subnet_ids                           = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507"]
vpc_security_group_id                    = ["sg-0521d959217b19f68", "sg-0e2b3c6be1f7c21bc"]
lambda_timeout                           = 30
lambda_cloudwatch_log_retention          = 400
queue_dead_letter_message_retention_days = 14
queue_visibility_timeout_seconds         = 30
lambda_max_memory_size                   = 1024

# Application parameters
NODE_ENV                                                             = "production"
SENSEDIA_CLOUD_URL                                                   = "https://portoapicloud.portoseguro.com.br"
HUB_VENDAS_CARBON_PRESTACAO_SERVICO_V1_AGENDAMENTO_API_ENDPOINT_PATH = "hub-vendas-carbon/prestacao-servico/v1/agendamento/baixa"
dynatrace_oneAgent_layer                                             = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                                                  = "nwr80289"
dynatrace_dt_cluster_id                                              = "1372360960"
dynatrace_dt_connection_base_url                                     = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration                          = "true"
