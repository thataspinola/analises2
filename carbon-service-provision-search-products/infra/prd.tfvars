# -----------------------------------------------------------------
# PRD TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                     = "555961299972"
vpce                           = ["vpce-09de2cf02823516aa"]
vpc_subnet_ids                 = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id          = ["sg-09efed82f39890ac0"]
lambda_timeout                 = 29
cloudwatch_log_retention       = 365
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
lambda_max_memory_size         = "1024"

# Application parameters
NODE_ENV                                    = "production"
GATEWAY_URL                                 = "https://ecom.portoseguro.com.br"
API_PATH                                    = "graphql"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.prd.awsporto"