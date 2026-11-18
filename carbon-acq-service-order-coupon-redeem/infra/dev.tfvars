# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                               = "791702935403"
token_layer_name                         = "carbon_token_layer"
vpc_subnet_ids                           = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id                    = ["sg-0ad1f2aac66e82610"]
lambda_timeout                           = 25
lambda_cloudwatch_log_retention          = 3
queue_dead_letter_message_retention_days = 3
queue_visibility_timeout_seconds         = 150

# Application parameters
NODE_ENV                                             = "development"
SENSEDIA_CLOUD_URL                                   = "https://portoapicloud-hml.portoseguro.com.br"
PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH = "porto-assistencia/b2c/v1/cupom/consumo"
dynatrace_oneAgent_layer                             = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                                  = ""
dynatrace_dt_cluster_id                              = ""
dynatrace_dt_connection_base_url                     = ""
dynatrace_open_telemetry_enable_integration          = ""

