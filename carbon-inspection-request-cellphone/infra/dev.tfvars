# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                      = "791702935403"
vpc_subnet_ids                  = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id           = ["sg-0ad1f2aac66e82610"]
request_lambda_timeout          = 30
fail_lambda_timeout             = 60
lambda_cloudwatch_log_retention = 5
dlq_message_retention_days      = 3

# Application parameters
NODE_ENV                                    = "development"
MULE_URL                                    = "https://apis-hml.portoseguro.brasil"
INTERNAL_GTW_EMAIL_NOTIFICATION_URL         = "https://6g8oyjpph1.execute-api.ca-central-1.amazonaws.com"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
