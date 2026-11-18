# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                     = "555961299972"
vpc_subnet_ids                 = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id          = ["sg-09efed82f39890ac0"]
vpce                           = ["vpce-09de2cf02823516aa"]
token_layer_name               = "carbon_token_layer"
cloudwatch_log_retention       = 400
lambda_timeout                 = 15
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000

# Application parameters
NODE_ENV                                    = "production"
SENSEDIA_API_TIMEOUT                        = 20000
SENSEDIA_URL                                = "https://portoapi.portoseguro.com.br"
SENSEDIACLOUD_URL                           = "https://portoapicloud.portoseguro.com.br"
API_PATH                                    = "automovel/parceiro-marketplace/v1/veiculos"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
PREMIUM_VEHICLE_VALUE                       = 250000.0