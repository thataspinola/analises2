# -----------------------------------------------------------------
# PRD TFVARS
# -----------------------------------------------------------------
account_id                       = "555961299972"
vpc_subnet_ids                   = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id            = ["sg-09efed82f39890ac0"]
vpce                             = ["vpce-09de2cf02823516aa"]
lambda_cloudwatch_log_retention  = 400
lambda_timeout                   = 60
dlq_message_retention_days       = 14
queue_visibility_timeout_seconds = 120

# Application parameters
NODE_ENV                                    = "production"
SENSEDIA_URL                                = "https://portoapi.portoseguro.com.br"
SENSEDIACLOUD_URL                           = "https://portoapicloud.portoseguro.com.br"
VEHICLE_API_URL                             = "https://keuq1nh3vd.execute-api.ca-central-1.amazonaws.com"
UPDATE_LEAD_API_URL                         = "https://1lcf19oy7i.execute-api.ca-central-1.amazonaws.com"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
