# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "385020771841"
token_layer_name               = "carbon_token_layer"
vpc_subnet_ids                 = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id          = ["sg-0918bc7be0d05df35"]
vpce                           = ["vpce-0224986cf48912f3c"]
lambda_timeout                 = 25
cloudwatch_log_retention       = 3
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
lambda_max_memory_size         = 1024

# Application parameters
NODE_ENV                                    = "development"
GATEWAY_URL                                 = "https://apis-hml.portoseguro.com.br"
API_PATH                                    = "assistencia/capsenderecos/v1/infocaps"
dynatrace_oneAgent_layer                    = ""
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.poc.awsporto"