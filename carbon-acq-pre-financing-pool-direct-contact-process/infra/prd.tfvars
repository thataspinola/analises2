# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                             = "555961299972"
token_layer_name                       = "carbon_token_layer"
vpc_subnet_ids                         = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507"]
vpc_security_group_id                  = ["sg-0521d959217b19f68", "sg-0e2b3c6be1f7c21bc"]
vpce                                   = ["vpce-09de2cf02823516aa"]
lambda_timeout                         = 60
lambda_cloudwatch_log_retention        = 400
lambda_memory_size                     = "1024"
api_gateway_throttling_burst_limit     = 5000
api_gateway_throttling_rate_limit      = 10000
dlq_message_retention_days             = 14
queue_visibility_timeout_seconds       = 60
queue_redrive_policy_max_receive_count = 3

# Application parameters
NODE_ENV                                               = "production"
MULESOFT_URL                                           = "https://apis.portoseguro.com.br"
SENSEDIA_URL                                           = "https://portoapi.portoseguro.com.br"
SENSEDIA_CLOUD_URL_INTERNAL                            = "https://portoapicloud.portoseguro.brasil"
PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK      = "producao-comercial/gdl/v1/leads/multicanal"
CREAT_LEAD_PATH                                        = "xml"
UPDATE_CONTACT_REQUEST_PATH                            = "atualizacaosolicitacaocontato"
GOVERNANCA_DADOS_PESSOA_API_PATH                       = "governancadados/dados-pessoa/v1/pessoa"
AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH   = "auditoria/rastreabilidade-cdc/v1/consentimentos"
ZENVIA_API_AUTHORIZATION_HEADER_VALUE                  = "faf60ac84019b3b14f0848f5083bc831"
CONSENTS_SNS_TOPIC_ARN                                 = "arn:aws:sns:ca-central-1:555961299972:hub-vendas-client-consents"
PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY                  = 1

dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
