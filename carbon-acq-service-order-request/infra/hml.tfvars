# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                                     = "372926067604"
vpce                                           = ["vpce-01439860599832be9"]
token_layer_name                               = "carbon_token_layer"
vpc_subnet_ids                                 = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id                          = ["sg-092a9370a4841a36c"]
lambda_timeout                                 = 30
lambda_cloudwatch_log_retention                = 60
dead_letter_message_retention_days             = 5
queue_message_visibility_timeout_seconds       = 180
queue_message_redrive_policy_max_receive_count = 3
lambda_max_memory_size                         = 640

# Application parameters
NODE_ENV                                    = "stage"
API_PATH                                    = "hub-vendas-carbon/prestacao-servico/v1/ordem-servico/criar"
SENSEDIA_URL                                = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL                          = "https://portoapicloud-hml.portoseguro.com.br"
SENDGRID_API_URL                            = "https://api.sendgrid.com"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
dynatrace_oneAgent_layer_arn                = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
FISCAL_COMPANY_CODE                         = 95
GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL    = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-service-connector-google-appointments-conversion"