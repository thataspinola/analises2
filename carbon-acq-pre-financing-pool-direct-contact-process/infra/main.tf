# -----------------------------------------------------------------
# BACKEND
# -----------------------------------------------------------------
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
# -----------------------------------------------------------------
# MODULES
# -----------------------------------------------------------------
module "contact_requests_queue" {
  source                                           = "./modules/contact-requests-queue"
  dlq_message_retention_days                       = var.dlq_message_retention_days
  visibility_timeout_seconds                       = var.queue_visibility_timeout_seconds
  redrive_policy_max_receive_count                 = var.queue_redrive_policy_max_receive_count
  cloudwatch_metric_alarm_evaluation_periods_count = var.dlq_cloudwatch_metric_alarm_evaluation_periods_count
}

module "contact_requests_queue_policies" {
  source                     = "./modules/contact-requests-queue-policies"
  contact_requests_queue_arn = module.contact_requests_queue.queue_arn
  contact_requests_queue_url = module.contact_requests_queue.queue_url
  request_lambda_role_arn    = module.request_lambda.lambda_role_arn
  process_lambda_role_arn    = module.process_lambda.lambda_role_arn
  depends_on = [
    module.contact_requests_queue,
    module.request_lambda,
    module.process_lambda
  ]
}

module "common_layer" {
  source     = "./modules/common-layer"
  account_id = var.account_id
}

module "request_lambda" {
  source                                         = "./modules/request-lambda"
  prefix_project_name                            = var.prefix_project_name
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  api_gateway_path_part                          = var.api_gateway_path_part
  api_gateway_stage_name                         = var.api_gateway_stage_name
  api_gateway_http_method                        = var.api_gateway_http_method
  api_gateway_execution_arn                      = module.api_gateway.api_gateway_execution_arn
  contact_requests_queue_url                     = module.contact_requests_queue.queue_url
  common_layer_name                              = module.common_layer.layer_name
  NODE_ENV                                       = var.NODE_ENV
  lambda_memory_size                             = var.lambda_memory_size
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on = [
    module.common_layer,
    module.contact_requests_queue
  ]
}

module "process_lambda" {
  source                                                 = "./modules/process-lambda"
  prefix_project_name                                    = var.prefix_project_name
  account_id                                             = var.account_id
  vpc_subnet_ids                                         = var.vpc_subnet_ids
  vpc_security_group_id                                  = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                        = var.lambda_cloudwatch_log_retention
  lambda_timeout                                         = var.lambda_timeout
  token_layer_name                                       = var.token_layer_name
  common_layer_name                                      = module.common_layer.layer_name
  NODE_ENV                                               = var.NODE_ENV
  MULESOFT_URL                                           = var.MULESOFT_URL
  SENSEDIA_URL                                           = var.SENSEDIA_URL
  SENSEDIA_CLOUD_URL_INTERNAL                            = var.SENSEDIA_CLOUD_URL_INTERNAL
  PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME               = var.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME
  PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY                  = var.PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY
  GOOGLE_ANALYTICS_COLLECT_QUEUE_URL                     = "https://sqs.${var.aws_region}.amazonaws.com/${var.account_id}/${var.google_analytics_queue_name}"
  PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK      = var.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK
  CREAT_LEAD_PATH                                        = var.CREAT_LEAD_PATH
  UPDATE_CONTACT_REQUEST_PATH                            = var.UPDATE_CONTACT_REQUEST_PATH
  GOVERNANCA_DADOS_PESSOA_API_PATH                       = var.GOVERNANCA_DADOS_PESSOA_API_PATH
  AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH   = var.AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH
  ZENVIA_API_AUTHORIZATION_HEADER_VALUE                  = var.ZENVIA_API_AUTHORIZATION_HEADER_VALUE
  SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE                = var.SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE
  CONSENTS_SNS_TOPIC_ARN                                 = var.CONSENTS_SNS_TOPIC_ARN
  dynatrace_oneAgent_layer                               = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                      = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                    = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                       = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                     = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                 = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION         = var.dynatrace_open_telemetry_enable_integration
  depends_on = [
    module.common_layer
  ]
}

module "process_lambda_event_source" {
  source                       = "./modules/process-lambda-event-source"
  contact_requests_queue_arn   = module.contact_requests_queue.queue_arn
  process_lambda_function_name = module.process_lambda.lambda_function_name
  depends_on = [
    module.process_lambda,
    module.contact_requests_queue
  ]
}

module "api_gateway" {
  source                    = "./modules/api-gateway"
  account_id                = var.account_id
  vpce                      = var.vpce
  request_lambda_invoke_arn = module.request_lambda.lambda_invoke_arn
  path_part                 = var.api_gateway_path_part
  stage_name                = var.api_gateway_stage_name
  http_method               = var.api_gateway_http_method
  throttling_burst_limit    = var.api_gateway_throttling_burst_limit
  throttling_rate_limit     = var.api_gateway_throttling_rate_limit
}

module "pre_financing_lead_data_cache" {
  source                                    = "./modules/pre-financing-lead-data-cache"
  prefix_project_name                       = var.prefix_project_name
  PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME  = var.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME
}

module "pre_financing_lead_data_table_policies" {
  source              = "./modules/pre-financing-lead-data-table-policies"
  account_id          = var.account_id
  table_arn           = module.pre_financing_lead_data_cache.table_arn
  region              = var.aws_region
  prefix_project_name = var.prefix_project_name
  depends_on = [
    module.pre_financing_lead_data_cache
  ]
}