# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------
account_id  = "372926067604"
environment = "stage"
vpce        = ["vpce-01439860599832be9"]

#variaveis step-function
step_function_timeout = 29

#Variaveis api-gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.hml.awsporto"

#LOGS
cloudwatch_log_retention = 30
log_level             = "ALL"
