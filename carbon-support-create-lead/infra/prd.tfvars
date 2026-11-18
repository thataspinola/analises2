# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                            = "555961299972"
vpc_subnet_ids                        = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id                 = ["sg-09efed82f39890ac0"]
vpce                                  = ["vpce-09de2cf02823516aa"]
token_layer_name                      = "carbon_token_layer"
dynamics_layer_name                   = "dynamics_lambda_layer"
cloudwatch_log_retention              = 400
lambda_timeout                        = 60
gateway_throttling_burst_limit        = 5000
gateway_throttling_rate_limit         = 10000
trace_config_enable                   = "PassThrough"
process_lambda_maximum_retry_attempts = 3
lambda_max_memory_size                = 1024

# Application parameters
NODE_ENV                                    = "production"
MULESOFT_URL                                = "https://apis.portoseguro.brasil"
REGISTER_COMPLETE_GATEWAY_URL               = "https://bvy5wwbdc8.execute-api.ca-central-1.amazonaws.com"
CREATE_LEAD_WITHOUT_BCC                     = "https://fyftik127a.execute-api.ca-central-1.amazonaws.com/v1/lead"
UPDATE_LEAD                                 = "https://1lcf19oy7i.execute-api.ca-central-1.amazonaws.com/v1/update-lead"
LEAD_IN_PROGRESS_TTL_IN_MINUTES             = 30
DEFAULT_SUSEP                               = "CMERRJ" // Usado no dynamics
OPORTUNIDADE_ID                             = ""       // Usado no dynamics
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
