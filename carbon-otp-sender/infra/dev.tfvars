# -----------------------------------------------------------------
# DEV TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id                              = "791702935403"
vpce                                    = ["vpce-0b153819c7c85b104"]
api_gateway_throttling_burst_limit      = 5000
api_gateway_throttling_rate_limit       = 10000
token_layer_name                        = "carbon_token_layer"
vpc_subnet_ids                          = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id                   = ["sg-0ad1f2aac66e82610"]
lambda_timeout                          = 29
lambda_timeout_sender                   = 120
lambda_cloudwatch_log_retention         = 3
sender_queue_visibility_timeout_seconds = 720
dlq_message_retention_days              = 5

# Application parameters
NODE_ENV                                             = "development"
MULESOFT_URL                                         = "https://apis-hml.portoseguro.com.br"
SENSEDIA_URL                                         = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL                                   = "https://portoapicloud-hml.portoseguro.com.br"
SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME   = "CLIENTES_HML"
SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME = "CLIENTES_HML"
dynatrace_oneAgent_layer                             = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                                  = ""
dynatrace_dt_cluster_id                              = ""
dynatrace_dt_connection_base_url                     = ""
dynatrace_open_telemetry_enable_integration          = ""
