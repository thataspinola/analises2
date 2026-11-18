# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                       = "791702935403"
vpc_subnet_ids                   = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id            = ["sg-0ad1f2aac66e82610"]
cloudwatch_log_retention         = 14
lambda_timeout                   = 25
dlq_message_retention_days       = 3
queue_visibility_timeout_seconds = 120
max_retry_lambda                 = 2



# Application parameters
NODE_ENV                                    = "development"
CARBON_INTERNAL_GATEWAY_URL                 = "https://xvu9c2u0s0.execute-api.ca-central-1.amazonaws.com"
approved_payments_sns_name                  = "carbon-approved-payments"
rejected_payments_sns_name                  = "carbon-rejected-payments"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
