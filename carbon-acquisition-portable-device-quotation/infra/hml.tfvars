# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "372926067604"
vpc_subnet_ids                     = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id              = ["sg-092a9370a4841a36c"]
vpce                               = ["vpce-01439860599832be9"]
token_layer_name                   = "carbon_token_layer"
lambda_cloudwatch_log_retention    = 5
lambda_timeout                     = 35
lambda_memory_size                 = 256
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000

# Application parameters
NODE_ENV                                      = "stage"
COUPON_API_URL                                = "https://6mlooq9a48-vpce-01439860599832be9.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis-hml.portoseguro.brasil"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 4000
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = "tpz78812"
dynatrace_dt_cluster_id                       = "2006102186"
dynatrace_dt_connection_base_url              = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration   = "true"
carbon_api_custom_domain_fqn                  = "api.hub-de-vendas-carbon.hml.awsporto"

COVERAGE_PLAN_CODES = {
  THEFT                                                   = 6
  THEFT_AND_BREAKAGE                                      = 7
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT                     = 8
  THEFT_NOTEBOOK_AND_TABLET                               = 15
  THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET                  = 11
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET = 18
}
