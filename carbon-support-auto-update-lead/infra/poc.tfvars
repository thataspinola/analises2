# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------
account_id                       = "385020771841"
vpc_subnet_ids                   = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id            = ["sg-0918bc7be0d05df35"]
vpce                             = ["vpce-0224986cf48912f3c"]
lambda_cloudwatch_log_retention  = 3
lambda_timeout                   = 60
dlq_message_retention_days       = 2
queue_visibility_timeout_seconds = 120

# Application parameters
NODE_ENV                                    = "development"
SENSEDIA_URL                                = "https://portoapi-hml.portoseguro.com.br"
CARBON_UPDATE_LEAD_API_GATEWAY_URL          = "https://aa5ipxhedk.execute-api.ca-central-1.amazonaws.com/v1/update-lead"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
