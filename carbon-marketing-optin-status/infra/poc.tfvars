# ----------------------------------------------------------------
# POC TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "385020771841"
token_layer_name               = "carbon_token_layer"
vpc_subnet_ids                 = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id          = ["sg-0918bc7be0d05df35"]
vpce                           = ["vpce-0224986cf48912f3c"]
cloudwatch_log_retention       = 7
lambda_timeout                 = 28

# Gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn   = "api.hub-de-vendas-carbon.poc.awsporto"

# Application parameters
NODE_ENV                                    = "development"
GATEWAY_URL                                 = "https://apis-hml.portoseguro.brasil"
CONSENTS_API_PATH                           = "privacidade/consentimentos/v1/customer"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""