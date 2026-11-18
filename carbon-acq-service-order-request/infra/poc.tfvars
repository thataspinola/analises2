# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                                     = "385020771841"
vpce                                           = ["vpce-0224986cf48912f3c"]
token_layer_name                               = "carbon_token_layer"
vpc_subnet_ids                                 = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id                          = ["sg-0918bc7be0d05df35"]
lambda_timeout                                 = 29
lambda_cloudwatch_log_retention                = 14
dead_letter_message_retention_days             = 2
queue_message_visibility_timeout_seconds       = 174
queue_message_redrive_policy_max_receive_count = 3
dynatrace_oneAgent_layer_arn                   = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"

# Application parameters
NODE_ENV                                    = "development"
API_PATH                                    = "hub-vendas-carbon/prestacao-servico/v1/ordem-servico/criar"
SENSEDIA_URL                                = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL                          = "https://portoapicloud-hml.portoseguro.com.br"
SENDGRID_API_URL                            = "https://api.sendgrid.com"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
FISCAL_COMPANY_CODE                         = 95
GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL    = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-service-connector-google-appointments-conversion"