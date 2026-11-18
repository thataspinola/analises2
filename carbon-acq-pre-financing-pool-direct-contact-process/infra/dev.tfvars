# ----------------------------------------------------------------
# DEV TFVARS
# ----------------------------------------------------------------

# Terraform parameters
account_id                             = "791702935403"
token_layer_name                       = "carbon_token_layer"
vpc_subnet_ids                         = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3"]
vpc_security_group_id                  = ["sg-02a06a09c4938a9b7", "sg-0f67180223d71da0e"]
vpce                                   = ["vpce-0b153819c7c85b104"]
lambda_timeout                         = 60
lambda_cloudwatch_log_retention        = 3
api_gateway_throttling_burst_limit     = 5000
api_gateway_throttling_rate_limit      = 10000
dlq_message_retention_days             = 3
queue_visibility_timeout_seconds       = 30
queue_redrive_policy_max_receive_count = 3

# Application parameters
NODE_ENV                                               = "development"
MULESOFT_URL                                           = "https://apis-hml.portoseguro.com.br"
SENSEDIA_URL                                           = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL_INTERNAL                            = "https://portoapicloud-hml.portoseguro.brasil"
PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK      = "producao-comercial/gdl/v1/leads/multicanal"
CREAT_LEAD_PATH                                        = "xml"
UPDATE_CONTACT_REQUEST_PATH                            = "atualizacaosolicitacaocontato"
GOVERNANCA_DADOS_PESSOA_API_PATH                       = "governancadados/dados-pessoa/v1/pessoa"
AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH   = "auditoria/rastreabilidade-cdc/v1/consentimentos"
ZENVIA_API_AUTHORIZATION_HEADER_VALUE                  = "faf60ac84019b3b14f0848f5083bc831"
CONSENTS_SNS_TOPIC_ARN                                 = "arn:aws:sns:ca-central-1:791702935403:hub-vendas-client-consents"
PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY                  = 1

dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""