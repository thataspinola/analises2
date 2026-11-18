# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "555961299972"
vpc_subnet_ids                     = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id              = ["sg-09efed82f39890ac0"]
vpce                               = ["vpce-09de2cf02823516aa"]
token_layer_name                   = "carbon_token_layer"
lambda_cloudwatch_log_retention    = 400
lambda_timeout                     = 35
lambda_memory_size                 = 256
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000

# Application parameters
NODE_ENV                                      = "production"
COUPON_API_URL                                = "https://3q26w8dhga-vpce-09de2cf02823516aa.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis.portoseguro.brasil"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 700
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = "nwr80289"
dynatrace_dt_cluster_id                       = "1372360960"
dynatrace_dt_connection_base_url              = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration   = "true"
carbon_api_custom_domain_fqn                  = "api.hub-de-vendas-carbon.prd.awsporto"

COVERAGE_PLAN_CODES = {
  THEFT                                                   = 6
  THEFT_AND_BREAKAGE                                      = 7
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT                     = 8
  THEFT_NOTEBOOK_AND_TABLET                               = 6
  THEFT_AND_BREAKAGE_NOTEBOOK_AND_TABLET                  = 7
  THEFT_AND_BREAKAGE_AND_LOSS_OF_RENT_NOTEBOOK_AND_TABLET = 13
}
