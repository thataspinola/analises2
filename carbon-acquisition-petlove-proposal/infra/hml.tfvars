# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "372926067604"
vpc_subnet_ids                     = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c"]
vpc_security_group_id              = ["sg-051fcdf8b99032c5a"]
vpce                               = ["vpce-01439860599832be9"]
lambda_timeout                     = 60
lambda_cloudwatch_log_retention    = 5
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000
lambda_max_memory_size             = "640"

# Application parameters
NODE_ENV               = "stage"
PETLOVE_URL            = "https://health-api-staging.petlove.com.br"
COMMERCE_URL           = "https://ecom-stage.portoseguro.com.br"
API_PATH_COTACAO       = "rest/V1/porto/quotation"
API_PATH_PROPOSAL      = "rest/V1/porto/proposal"
URL_CART_REDIRECT      = "https://stage.portoseguro.com.br/loja/carrinho"
PETLOVE_COUPON         = ""
PETLOVE_PORTO_CARD_BIN = "444444"

# Dynatrace parameters
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.hml.awsporto"
