# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id               = "791702935403"
vpc_subnet_ids           = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id    = ["sg-0ad1f2aac66e82610"]
vpce                     = ["vpce-0b153819c7c85b104"]
token_layer_name         = "carbon_token_layer"
cloudwatch_log_retention = 3
lambda_timeout           = 35


# Application parameters
NODE_ENV                                      = "development"
COUPON_API_URL                                = "https://qo3cmbems1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com"
MULESOFT_URL                                  = "https://apis-hml.portoseguro.brasil"
CARBON_QUEUE_URL                              = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-ppweb-quotation-insert"
CHANNEL_CODE_COUPON_AUTO_APPLY                = "82"
WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = 4000
dynatrace_oneAgent_layer                      = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
dynatrace_dt_tenant                           = ""
dynatrace_dt_cluster_id                       = ""
dynatrace_dt_connection_base_url              = ""
dynatrace_open_telemetry_enable_integration   = ""
DENY_LEAD_QUEUE_URL                           = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-support-deny-lead-queue"
EMPLOYEE_SUSEP                                = "S5005J"