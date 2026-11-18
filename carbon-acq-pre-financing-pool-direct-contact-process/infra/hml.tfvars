# ----------------------------------------------------------------
# HML TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                             = "372926067604"
token_layer_name                       = "carbon_token_layer"
vpc_subnet_ids                         = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c"]
vpc_security_group_id                  = ["sg-051fcdf8b99032c5a"]
vpce                                   = ["vpce-01439860599832be9"]
lambda_timeout                         = 60
lambda_cloudwatch_log_retention        = 5
lambda_memory_size                     = "1024"
api_gateway_throttling_burst_limit     = 5000
api_gateway_throttling_rate_limit      = 10000
dlq_message_retention_days             = 5
queue_visibility_timeout_seconds       = 30
queue_redrive_policy_max_receive_count = 3

# Application parameters
NODE_ENV                                               = "stage"
MULESOFT_URL                                           = "https://apis-hml.portoseguro.com.br"
SENSEDIA_URL                                           = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL_INTERNAL                            = "https://portoapicloud-hml.portoseguro.brasil"
PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK      = "producao-comercial/gdl/v1/leads/multicanal"
CREAT_LEAD_PATH                                        = "xml"
UPDATE_CONTACT_REQUEST_PATH                            = "atualizacaosolicitacaocontato"
GOVERNANCA_DADOS_PESSOA_API_PATH                       = "governancadados/dados-pessoa/v1/pessoa"
AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH   = "auditoria/rastreabilidade-cdc/v1/consentimentos"
ZENVIA_API_AUTHORIZATION_HEADER_VALUE                  = "faf60ac84019b3b14f0848f5083bc831"
CONSENTS_SNS_TOPIC_ARN                                 = "arn:aws:sns:ca-central-1:372926067604:hub-vendas-client-consents"
PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY                  = 1

dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "tpz78812"
dynatrace_dt_cluster_id                     = "2006102186"
dynatrace_dt_connection_base_url            = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"