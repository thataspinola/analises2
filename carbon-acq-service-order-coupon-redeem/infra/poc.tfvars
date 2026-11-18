# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                               = "385020771841"
token_layer_name                         = "carbon_token_layer"
vpc_subnet_ids                           = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id                    = ["sg-0918bc7be0d05df35"]
lambda_timeout                           = 25
lambda_cloudwatch_log_retention          = 3
queue_dead_letter_message_retention_days = 14
queue_visibility_timeout_seconds         = 30

# Application parameters
NODE_ENV                                             = "development"
SENSEDIA_CLOUD_URL                                   = "https://portoapicloud-hml.portoseguro.com.br"
PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH = "porto-assistencia/b2c/v1/cupom/consumo"
dynatrace_oneAgent_layer                             = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                                  = ""
dynatrace_dt_cluster_id                              = ""
dynatrace_dt_connection_base_url                     = ""
dynatrace_open_telemetry_enable_integration          = ""