# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                            = "372926067604"
vpc_subnet_ids                        = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id                 = ["sg-092a9370a4841a36c"]
vpce                                  = ["vpce-01439860599832be9"]
token_layer_name                      = "carbon_token_layer"
dynamics_layer_name                   = "dynamics_lambda_layer"
cloudwatch_log_retention              = 5
lambda_timeout                        = 60
gateway_throttling_burst_limit        = 5000
gateway_throttling_rate_limit         = 10000
trace_config_enable                   = "PassThrough"
process_lambda_maximum_retry_attempts = 3
lambda_max_memory_size                = 640

# Application parameters
NODE_ENV                                    = "stage"
MULESOFT_URL                                = "https://apis-hml.portoseguro.brasil"
REGISTER_COMPLETE_GATEWAY_URL               = "https://d1y8jnylh5.execute-api.ca-central-1.amazonaws.com"
CREATE_LEAD_WITHOUT_BCC                     = "https://6v9jtm1bih.execute-api.ca-central-1.amazonaws.com/v1/lead"
UPDATE_LEAD                                 = "https://aa5ipxhedk.execute-api.ca-central-1.amazonaws.com/v1/update-lead"
LEAD_IN_PROGRESS_TTL_IN_MINUTES             = 10
DEFAULT_SUSEP                               = "CMERRJ" // Usado no dynamics
OPORTUNIDADE_ID                             = ""       // Usado no dynamics
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
