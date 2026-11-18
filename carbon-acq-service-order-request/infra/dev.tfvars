# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                                     = "791702935403"
vpce                                           = ["vpce-0b153819c7c85b104"]
token_layer_name                               = "carbon_token_layer"
vpc_subnet_ids                                 = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id                          = ["sg-0ad1f2aac66e82610"]
lambda_timeout                                 = 29
lambda_cloudwatch_log_retention                = 14
dead_letter_message_retention_days             = 3
queue_message_visibility_timeout_seconds       = 30
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
GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL    = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-service-connector-google-appointments-conversion"
