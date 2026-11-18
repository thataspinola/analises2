# -----------------------------------------------------------------
# HML TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                     = "372926067604"
vpce                           = ["vpce-01439860599832be9"]
vpc_subnet_ids                 = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id          = ["sg-092a9370a4841a36c"]
lambda_timeout                 = 29
cloudwatch_log_retention       = 60
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
lambda_max_memory_size         = "640"

# Application parameters
NODE_ENV                                    = "stage"
GATEWAY_URL                                 = "https://ecom-stage.portoseguro.com.br"
API_PATH                                    = "graphql"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.hml.awsporto"