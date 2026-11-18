# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "372926067604"
vpc_subnet_ids                 = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id          = ["sg-092a9370a4841a36c"]
vpce                           = ["vpce-01439860599832be9"]
cloudwatch_log_retention       = 5
lambda_timeout                 = 25

# Gateway parameters
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
carbon_api_custom_domain_fqn   = "api.hub-de-vendas-carbon.hml.awsporto"
# Application parameters
NODE_ENV    = "stage"
GATEWAY_URL = "https://portoapicloud-hml.portoseguro.com.br"
API_PATH    = "vida/vida-on/v1/dominios/tipos-faixa-renda"

dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"