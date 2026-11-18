# -----------------------------------------------------------------
# HML TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id                              = "372926067604"
vpce                                    = ["vpce-01439860599832be9"]
api_gateway_throttling_burst_limit      = 5000
api_gateway_throttling_rate_limit       = 10000
token_layer_name                        = "carbon_token_layer"
vpc_subnet_ids                          = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id                   = ["sg-092a9370a4841a36c"]
lambda_timeout                          = 29
lambda_timeout_sender                   = 120
lambda_cloudwatch_log_retention         = 5
sender_queue_visibility_timeout_seconds = 60
dlq_message_retention_days              = 5

# Application parameters
NODE_ENV                                             = "stage"
MULESOFT_URL                                         = "https://apis-hml.portoseguro.com.br"
SENSEDIA_URL                                         = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL                                   = "https://portoapicloud-hml.portoseguro.com.br"
SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME   = "CLIENTES_HML"
SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME = "CLIENTES_HML"
dynatrace_oneAgent_layer                             = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                                  = "tpz78812"
dynatrace_dt_cluster_id                              = "2006102186"
dynatrace_dt_connection_base_url                     = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration          = "true"
