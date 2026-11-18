# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "555961299972"
vpc_subnet_ids                     = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507"]
vpc_security_group_id              = ["sg-0521d959217b19f68", "sg-0e2b3c6be1f7c21bc"]
vpce                               = ["vpce-09de2cf02823516aa"]
lambda_timeout                     = 30
lambda_cloudwatch_log_retention    = 60
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000
lambda_max_memory_size             = "1024"

# Application parameters
NODE_ENV               = "production"
PETLOVE_URL            = "https://health-api.petlove.com.br"
COMMERCE_URL           = "https://ecom.portoseguro.com.br"
API_PATH_COTACAO       = "rest/V1/porto/quotation"
API_PATH_PROPOSAL      = "rest/V1/porto/proposal"
URL_CART_REDIRECT      = "https://portoseguro.com.br/loja/carrinho"
PETLOVE_COUPON         = ""
PETLOVE_PORTO_CARD_BIN = "484635"

# Dynatrace parameters
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.prd.awsporto"
