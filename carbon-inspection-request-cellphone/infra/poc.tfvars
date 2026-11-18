# ----------------------------------------------------------------
# POC TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                      = "385020771841"
vpc_subnet_ids                  = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id           = ["sg-0918bc7be0d05df35"]
request_lambda_timeout          = 30
fail_lambda_timeout             = 60
lambda_cloudwatch_log_retention = 3
dlq_message_retention_days      = 2

# Application parameters
NODE_ENV                                    = "development"
MULE_URL                                    = "https://portoapi-hml.portoseguro.com.br"
INTERNAL_GTW_EMAIL_NOTIFICATION_URL         = ""
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
