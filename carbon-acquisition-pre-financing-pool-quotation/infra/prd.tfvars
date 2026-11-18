# ----------------------------------------------------------------
# PRD TFVARS
# ----------------------------------------------------------------

# Terraform parameters
vpc_id                         = "vpc-09b562769cd7f7f75"
carbon_token_layer_arn         = "carbon_token_layer"
vpce_apigtw_id                 = "vpce-09de2cf02823516aa"
cloudwatch_log_retention       = 60
lambda_timeout                 = 30
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000
lambda_max_memory_size         = 1024

# Application parameters
NODE_ENV                                    = "production"
SENSEDIA_API_TIMEOUT                        = 20000
SENSEDIA_URL_CONSORCIO_INTERNO              = "https://api-gw.portobank-crossdomain.prd.awsporto"
SENSEDIA_URL_CONSORCIO_EXTERNO              = "https://api-gw.portobank-crossdomain.prd.portoseguro.com.br"
SENSEDIA_URL                                = "https://portoapi.portoseguro.com.br"
SENSEDIACLOUD_URL                           = "https://portoapicloud.portoseguro.com.br"
SENSEDIA_CORP_INTERNAL_URL                  = "https://portoapicloud.portoseguro.brasil"
dynatrace_oneAgent_layer                    = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                         = "nwr80289"
dynatrace_dt_cluster_id                     = "1372360960"
dynatrace_dt_connection_base_url            = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration = "true"
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.prd.awsporto"
twistlock_layer_arn                         = "arn:aws:lambda:ca-central-1:002923850173:layer:cwpp-nodejs:3"
TWISTLOCK_POLICY                            = "cnVsZV9uYW1lPURlZmF1bHQgLSBhbGVydCBvbiBzdXNwaWNpb3VzIHJ1bnRpbWUgYmVoYXZpb3IKYWR2YW5jZWRfcHJvdGVjdGlvbj10cnVlCnByb2Nlc3NfZWZmZWN0PWFsZXJ0CnByb2Nlc3NfYmxvY2tfYWxsPXRydWUKcHJvY2Vzc19kZXRlY3RfY3J5cHRvbWluZXJzPXRydWUKY29uc29sZV9ob3N0PWV1cm9wZS13ZXN0My5jbG91ZC50d2lzdGxvY2suY29tCmNvbnNvbGVfcG9ydD00NDMKY29uc29sZV90aW1lb3V0X3NlYz0zCmN1c3RvbWVyX2lkPWV1LTItMTQzNTQ1OTU1CmFwaV9rZXk9NkpORGVxTmFtRXh5enJBaGowREdacTkvUGpqOGJodmxnOWhCcWdVVjlYYVRRaVFMZ3F6M0Z0WVJhYkRpWFBXRVBUSlRQV21RYlo1Yjg1TnVuZ2tjR2c9PQpwb2xpY3lfdXBkYXRlX2ludGVydmFsX21zPTEyMDAwMAo="
