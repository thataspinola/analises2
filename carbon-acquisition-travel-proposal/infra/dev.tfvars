# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------


# Terraform parameters
account_id  = "791702935403"
environment = "dev"
vpce        = ["vpce-0b153819c7c85b104"]

#Variaveis step-function
step_function_timeout = 29

#Variaveis api-gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.dev.awsporto"

#LOGS
cloudwatch_log_retention = 14
log_level             = "ALL"
