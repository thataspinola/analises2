# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "372926067604"
vpc_subnet_ids                 = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id          = ["sg-092a9370a4841a36c"]
vpce                           = ["vpce-01439860599832be9"]
cloudwatch_log_retention       = 14
lambda_timeout                 = 28

# Gateway
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn   = "api.hub-de-vendas-carbon.hml.awsporto"

# Application parameters
NODE_ENV                                    = "stage"
GATEWAY_URL                                 = "https://portoapi-hml.portoseguro.brasil"
OFERTAS_API_PATH                            = "vida/viagem-on/v1/ofertas"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
COUPON_API_URL                              = "https://6mlooq9a48-vpce-01439860599832be9.execute-api.ca-central-1.amazonaws.com"
# Timeouts (ms) - only the quotation call is time-boxed
OFERTA_API_TIMEOUT_MS                       = "27000"
LAMBDA_RESPONSE_RESERVE_MS                  = "2000"
