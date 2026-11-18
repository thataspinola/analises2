# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# Terraform parameters
vpc_id                       = "vpc-0be5bc2df9f6757ea"
vpce_apigtw_id               = "vpce-0224986cf48912f3c"
carbon_api_custom_domain_fqn = "api.hub-de-vendas-carbon.poc.awsporto"

cloudwatch_log_retention = 3

gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit  = 10000

is_poc = true

lambda_timeout = 29

# Application parameters
NODE_ENV     = "poc"
SENSEDIA_URL = "https://portoapi-hml.portoseguro.com.br"

dynatrace_oneAgent_layer_arn = "arn:aws:lambda:ca-central-1:585768157899:layer:Dynatrace_OneAgent_1_343_92_20260813-103442_nodejs_x86:1"
twistlock_layer_arn          = "arn:aws:lambda:ca-central-1:002923850173:layer:cwpp-nodejs:3"

dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""

TWISTLOCK_POLICY = "cnVsZV9uYW1lPURlZmF1bHQgLSBhbGVydCBvbiBzdXNwaWNpb3VzIHJ1bnRpbWUgYmVoYXZpb3IKYWR2YW5jZWRfcHJvdGVjdGlvbj10cnVlCnByb2Nlc3NfZWZmZWN0PWFsZXJ0CnByb2Nlc3NfYmxvY2tfYWxsPXRydWUKcHJvY2Vzc19kZXRlY3RfY3J5cHRvbWluZXJzPXRydWUKY29uc29sZV9ob3N0PWV1cm9wZS13ZXN0My5jbG91ZC50d2lzdGxvY2suY29tCmNvbnNvbGVfcG9ydD00NDMKY29uc29sZV90aW1lb3V0X3NlYz0zCmN1c3RvbWVyX2lkPWV1LTItMTQzNTQ1OTU1CmFwaV9rZXk9NkpORGVxTmFtRXh5enJBaGowREdacTkvUGpqOGJodmxnOWhCcWdVVjlYYVRRaVFMZ3F6M0Z0WVJhYkRpWFBXRVBUSlRQV21RYlo1Yjg1TnVuZ2tjR2c9PQpwb2xpY3lfdXBkYXRlX2ludGVydmFsX21zPTEyMDAwMAo="

#Variaveis sqs
dlq_message_retention_days       = 3
max_retry_lambda                 = 2
queue_visibility_timeout_seconds = 300
