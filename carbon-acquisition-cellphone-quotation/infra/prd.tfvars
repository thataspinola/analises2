# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id               = "555961299972"
vpc_subnet_ids           = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id    = ["sg-09efed82f39890ac0"]
vpce                     = ["vpce-09de2cf02823516aa"]
token_layer_name         = "carbon_token_layer"
cloudwatch_log_retention = 400
lambda_timeout           = 35

# Application parameters
NODE_ENV                                      = "production"
COUPON_API_URL                                = "https://3q26w8dhga-vpce-09de2cf02823516aa.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis.portoseguro.brasil"
CARBON_QUEUE_URL                              = "https://sqs.ca-central-1.amazonaws.com/555961299972/carbon-ppweb-quotation-insert"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 700
CHANNEL_CODE_COUPON_AUTO_APPLY                = ""
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = "nwr80289"
dynatrace_dt_cluster_id                       = "1372360960"
dynatrace_dt_connection_base_url              = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration   = "true"
DENY_LEAD_QUEUE_URL                           = "https://sqs.ca-central-1.amazonaws.com/555961299972/carbon-support-deny-lead-queue"
EMPLOYEE_SUSEP                                = "S5005J"