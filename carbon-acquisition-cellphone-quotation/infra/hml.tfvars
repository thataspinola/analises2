# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id               = "372926067604"
vpc_subnet_ids           = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id    = ["sg-092a9370a4841a36c"]
vpce                     = ["vpce-01439860599832be9"]
token_layer_name         = "carbon_token_layer"
cloudwatch_log_retention = 5
lambda_timeout           = 35

# Application parameters
NODE_ENV                                      = "stage"
COUPON_API_URL                                = "https://6mlooq9a48-vpce-01439860599832be9.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis-hml.portoseguro.brasil"
CARBON_QUEUE_URL                              = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-ppweb-quotation-insert"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 4000
CHANNEL_CODE_COUPON_AUTO_APPLY                = ""
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = "tpz78812"
dynatrace_dt_cluster_id                       = "2006102186"
dynatrace_dt_connection_base_url              = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration   = "true"
DENY_LEAD_QUEUE_URL                           = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-support-deny-lead-queue"
EMPLOYEE_SUSEP                                = "S5005J"