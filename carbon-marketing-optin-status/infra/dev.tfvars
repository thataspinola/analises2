# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "791702935403"
vpc_subnet_ids                 = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id          = ["sg-0ad1f2aac66e82610"]
vpce                           = ["vpce-0b153819c7c85b104"]
cloudwatch_log_retention       = 7
lambda_timeout                 = 28

# Gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn   = "api.hub-de-vendas-carbon.dev.awsporto"

# Application parameters
NODE_ENV                                    = "development"
GATEWAY_URL                                 = "https://apis-hml.portoseguro.brasil"
CONSENTS_API_PATH                           = "privacidade/consentimentos/v1/customer"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""