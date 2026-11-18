# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "555961299972"
vpc_subnet_ids                 = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id          = ["sg-09efed82f39890ac0"]
vpce                           = ["vpce-09de2cf02823516aa"]
cloudwatch_log_retention       = 400
lambda_timeout                 = 28

# Gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn   = "api.hub-de-vendas-carbon.prd.awsporto"

# Application parameters
NODE_ENV                                    = "production"
GATEWAY_URL                                 = "https://portoapi.portoseguro.brasil"
OFERTAS_API_PATH                            = "vida/viagem-on/v1/ofertas"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
COUPON_API_URL                              = "https://3q26w8dhga-vpce-09de2cf02823516aa.execute-api.ca-central-1.amazonaws.com"
# Timeouts (ms) - only the quotation call is time-boxed
OFERTA_API_TIMEOUT_MS                       = "27000"
LAMBDA_RESPONSE_RESERVE_MS                  = "2000"
