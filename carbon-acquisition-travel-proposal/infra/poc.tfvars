# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# Terraform parameters
vpce        = ["vpce-0224986cf48912f3c"]
account_id  = "385020771841"
environment = "poc"

#Cariaveis step-function
step_function_timeout = 29

#Variaveis api-gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000

#LOGS
cloudwatch_log_retention = 5
log_level             = "ALL"
