# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------
account_id  = "555961299972"
environment = "prd"
vpce        = ["vpce-09de2cf02823516aa"]

#Variaveis step-function
step_function_timeout = 29

#Variaveis api-gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.prd.awsporto"

#LOGS
cloudwatch_log_retention = 400
log_level             = "ALL"
