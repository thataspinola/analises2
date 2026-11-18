# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id                            = "385020771841"
vpc_subnet_ids                        = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id                 = ["sg-0918bc7be0d05df35"]
vpce                                  = ["vpce-0224986cf48912f3c"]
token_layer_name                      = "carbon_token_layer"
dynamics_layer_name                   = "dynamics_lambda_layer"
cloudwatch_log_retention              = 3
lambda_timeout                        = 60
gateway_throttling_burst_limit        = 5000
gateway_throttling_rate_limit         = 10000
trace_config_enable                   = "PassThrough"
process_lambda_maximum_retry_attempts = 3

# Application parameters
NODE_ENV = "poc"

# Application parameters
MULESOFT_URL                                = "https://apis-hml.portoseguro.brasil"
REGISTER_COMPLETE_GATEWAY_URL               = "https://1hu79aaoqa.execute-api.ca-central-1.amazonaws.com"
CREATE_LEAD_WITHOUT_BCC                     = "https://4spmhxnf09.execute-api.ca-central-1.amazonaws.com/v1/lead"
UPDATE_LEAD                                 = "https://xvu9c2u0s0.execute-api.ca-central-1.amazonaws.com/v1/update-lead"
LEAD_IN_PROGRESS_TTL_IN_MINUTES             = 3
DEFAULT_SUSEP                               = "CMERRJ" // Usado no dynamics
OPORTUNIDADE_ID                             = ""       // Usado no dynamics
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
