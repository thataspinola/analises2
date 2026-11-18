# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                         = "791702935403"
vpc_subnet_ids                     = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3"]
vpc_security_group_id              = ["sg-02a06a09c4938a9b7", "sg-0f67180223d71da0e"]
vpce                               = ["vpce-0b153819c7c85b104"]
lambda_timeout                     = 60
lambda_cloudwatch_log_retention    = 3
api_gateway_throttling_burst_limit = 5000
api_gateway_throttling_rate_limit  = 10000

# Application parameters
NODE_ENV               = "development"
PETLOVE_URL            = "https://health-api-staging.petlove.com.br"
COMMERCE_URL           = "https://ecom-stage.portoseguro.com.br"
API_PATH_COTACAO       = "rest/V1/porto/quotation"
API_PATH_PROPOSAL      = "rest/V1/porto/proposal"
URL_CART_REDIRECT      = "https://stage.portoseguro.com.br/loja/carrinho"
PETLOVE_COUPON         = ""
PETLOVE_PORTO_CARD_BIN = "444444"

# Dynatrace parameters
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.dev.awsporto"
