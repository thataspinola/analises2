# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "791702935403"
vpc_subnet_ids                     = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id              = ["sg-0ad1f2aac66e82610"]
vpce                               = ["vpce-0b153819c7c85b104"]
token_layer_name                   = "carbon_token_layer"
lambda_cloudwatch_log_retention    = 3
lambda_timeout                     = 35
lambda_memory_size                 = 256
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000


# Application parameters
NODE_ENV                                      = "development"
COUPON_API_URL                                = "https://qo3cmbems1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis-hml.portoseguro.brasil"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 4000
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = ""
dynatrace_dt_cluster_id                       = ""
dynatrace_dt_connection_base_url              = ""
dynatrace_open_telemetry_enable_integration   = ""
carbon_api_custom_domain_fqn                  = "api.hub-de-vendas-carbon.dev.awsporto"

COVERAGE_PLAN_CODES = {
  THEFT                                                   = 6
  THEFT_AND_BREAKAGE                                      = 7
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT                     = 8
  THEFT_NOTEBOOK_AND_TABLET                               = 15
  THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET                  = 11
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET = 18
}