# ------------------------------------------------
# BACKEND
# ------------------------------------------------
terraform {
  backend "s3" {
  }
}
provider "aws" {
  default_tags {
    tags = {
      hub-de-vendas = "carbon"
    }
  }
}
# ------------------------------------------------
# MODULES
# ------------------------------------------------

module "gateway" {
  source                    = "./modules/api-gateway"
  api_gateway_name          = var.api_gateway_name
  vpce                      = var.vpce
  request_path_part         = var.request_api_gateway_path_part
  request_stage_name        = var.request_api_gateway_stage_name
  request_http_method       = var.request_api_gateway_http_method
  check_path_part           = var.check_api_gateway_path_part
  check_stage_name          = var.check_api_gateway_stage_name
  check_http_method         = var.check_api_gateway_http_method
  throttling_burst_limit    = var.api_gateway_throttling_burst_limit
  throttling_rate_limit     = var.api_gateway_throttling_rate_limit
  request_lambda_invoke_arn = module.request_lambda.lambda_invoke_arn
  check_lambda_invoke_arn   = module.check_lambda.lambda_invoke_arn
}

module "redis_cache" {
  source                 = "./modules/redis-cache"
  vpc_subnet_ids         = var.vpc_subnet_ids
  vpc_security_group_ids = var.vpc_security_group_id
}

module "s3_email_template_object" {
  source                           = "./modules/s3-email-template-object"
  email_templates_s3_bucket_name   = "${var.email_templates_s3_bucket_name_preffix}${var.NODE_ENV}"
  email_templates_source_file_path = "${path.root}/../app-otp-sender/src/template/email-otp-message.edge"
}

module "request_lambda" {
  source                                                        = "./modules/request-lambda"
  account_id                                                    = var.account_id
  vpc_subnet_ids                                                = var.vpc_subnet_ids
  vpc_security_group_id                                         = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                               = var.lambda_cloudwatch_log_retention
  lambda_timeout                                                = var.lambda_timeout
  token_layer_name                                              = var.token_layer_name
  api_gateway_path_part                                         = var.request_api_gateway_path_part
  api_gateway_stage_name                                        = var.request_api_gateway_stage_name
  api_gateway_http_method                                       = var.request_api_gateway_http_method
  api_gateway_execution_arn                                     = module.gateway.execution_arn
  NODE_ENV                                                      = var.NODE_ENV
  MULESOFT_URL                                                  = var.MULESOFT_URL
  SENSEDIA_URL                                                  = var.SENSEDIA_URL
  SENSEDIA_CLOUD_URL                                            = var.SENSEDIA_CLOUD_URL
  GOVERNANCA_DADOS_PESSOA_API_PATH                              = var.GOVERNANCA_DADOS_PESSOA_API_PATH
  PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH = var.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH           = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH
  CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH                       = var.CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH
  BCP_API_PATH                                                  = var.BCP_API_PATH
  AUTHORIZATION_CODE                                            = var.ANTIFRAUD_AUTHORIZATION_CODE
  ORGANIZATION_ID                                               = var.ORGANIZATION_ID
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME            = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME        = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME
  OTP_SENDER_QUEUE_URL                                          = module.sender_queue.queue_url
  OTP_REDIS_CACHE_CONN_STRING                                   = module.redis_cache.elasticache_cluster_url
  PORTAIS_MSUSUARIOS_USUARIO_API_PATH                           = var.PORTAIS_MSUSUARIOS_USUARIO_API_PATH
  dynatrace_oneAgent_layer                                      = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                             = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                           = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                       = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                              = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                            = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                        = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                = var.dynatrace_open_telemetry_enable_integration
  depends_on                                                    = [module.redis_cache]
}

module "check_lambda" {
  source                                                   = "./modules/check-lambda"
  account_id                                               = var.account_id
  vpc_subnet_ids                                           = var.vpc_subnet_ids
  vpc_security_group_id                                    = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                          = var.lambda_cloudwatch_log_retention
  lambda_timeout                                           = var.lambda_timeout
  token_layer_name                                         = var.token_layer_name
  api_gateway_path_part                                    = var.check_api_gateway_path_part
  api_gateway_stage_name                                   = var.check_api_gateway_stage_name
  api_gateway_http_method                                  = var.check_api_gateway_http_method
  api_gateway_execution_arn                                = module.gateway.execution_arn
  NODE_ENV                                                 = var.NODE_ENV
  SENSEDIA_CLOUD_URL                                       = var.SENSEDIA_CLOUD_URL
  SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH    = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH
  SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME     = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME
  SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME
  OTP_REDIS_CACHE_CONN_STRING                              = module.redis_cache.elasticache_cluster_url
  BCP_API_PATH                                             = var.BCP_API_PATH
  MULESOFT_URL                                             = var.MULESOFT_URL
  GOVERNANCA_DADOS_PESSOA_API_PATH                         = var.GOVERNANCA_DADOS_PESSOA_API_PATH
  dynatrace_oneAgent_layer                                 = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                        = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                      = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                  = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                         = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                       = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                   = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION           = var.dynatrace_open_telemetry_enable_integration
  depends_on                                               = [module.redis_cache]
}

module "sender_lambda" {
  source                                                        = "./modules/sender-lambda"
  account_id                                                    = var.account_id
  vpc_subnet_ids                                                = var.vpc_subnet_ids
  vpc_security_group_id                                         = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                               = var.lambda_cloudwatch_log_retention
  lambda_timeout                                                = var.lambda_timeout_sender
  token_layer_name                                              = var.token_layer_name
  NODE_ENV                                                      = var.NODE_ENV
  SENSEDIA_URL                                                  = var.SENSEDIA_URL
  SENSEDIA_CLOUD_URL                                            = var.SENSEDIA_CLOUD_URL
  ANTIFRAUD_AUTHORIZATION_CODE                                  = var.ANTIFRAUD_AUTHORIZATION_CODE
  PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH = var.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH
  PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH                      = var.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH           = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH
  CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH                       = var.CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME            = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME
  SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME          = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME
  SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME        = var.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME
  CORPORATIVO_SMSSERVICE_SENDSMS_SUFIXO_MENSAGEM                = var.CORPORATIVO_SMSSERVICE_SENDSMS_SUFIXO_MENSAGEM
  OTP_REDIS_CACHE_CONN_STRING                                   = module.redis_cache.elasticache_cluster_url
  MULESOFT_URL                                                  = var.MULESOFT_URL
  GOVERNANCA_DADOS_PESSOA_API_PATH                              = var.GOVERNANCA_DADOS_PESSOA_API_PATH
  CARBON_EMAIL_SENDER_QUEUE_URL                                 = "https://sqs.${var.AWS_REGION}.amazonaws.com/${var.account_id}/carbon-service-connector-email-sender"
  dynatrace_oneAgent_layer                                      = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                             = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                           = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                       = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                              = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                            = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                        = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                = var.dynatrace_open_telemetry_enable_integration
  depends_on                                                    = [module.redis_cache]
}

module "sender_queue" {
  source                     = "./modules/sender-queue"
  visibility_timeout_seconds = var.sender_queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
}

module "sender_queue_policies" {
  source                  = "./modules/sender-queue-policies"
  request_lambda_role_arn = module.request_lambda.lambda_role_arn
  sender_lambda_role_arn  = module.sender_lambda.lambda_role_arn
  otp_requests_queue_arn  = module.sender_queue.queue_arn
  otp_requests_queue_url  = module.sender_queue.queue_url
  depends_on = [
    module.request_lambda,
    module.sender_queue,
    module.sender_queue
  ]
}

module "sender_lambda_event_source" {
  source                      = "./modules/sender-lambda-event-source"
  otp_requests_queue_arn      = module.sender_queue.queue_arn
  sender_lambda_function_name = module.sender_lambda.lambda_function_name
  depends_on = [
    module.sender_queue_policies,
    module.sender_lambda
  ]
}
