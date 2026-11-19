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

import {
  to = module.api_gateway.aws_cloudwatch_log_group.lambda_cloudwatch
  id = "API-Gateway-Execution-Logs_${var.api_gateway_id}/${var.api_gateway_stage_name}"
}

module "lambda" {
  source                                         = "./modules/lambda"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  project_name                                   = var.project_name
  NODE_ENV                                       = var.NODE_ENV
  common_layer_name                              = module.common_layer.layer_name
  LEAD_QUEUE_URL                                 = module.lead_queue.queue_url
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on = [
    module.common_layer
  ]
}

module "api_gateway" {
  source                   = "./modules/api-gateway"
  account_id               = var.account_id
  vpce                     = var.vpce
  lambda_invoke_arn        = module.lambda.lambda_invoke_arn
  stage_name               = var.api_gateway_stage_name
  http_method              = var.api_gateway_http_method
  throttling_burst_limit   = var.gateway_throttling_burst_limit
  throttling_rate_limit    = var.gateway_throttling_rate_limit
  cloudwatch_log_retention = var.cloudwatch_log_retention
  project_name             = var.project_name
   depends_on = [
    module.lambda
  ]
}

module "api_mapping" {
  source                 = "./modules/api-mapping"
  api_custom_domain_fqn  = var.carbon_api_custom_domain_fqn
  api_gateway_id         = module.api_gateway.api_gateway_id
  stage_name             = var.api_gateway_stage_name
  api_custom_domain_path = var.carbon_api_custom_domain_path
  depends_on = [
    module.api_gateway
  ]
}

module "lambda_event_source" {
  source                               = "./modules/lambda-event-source"
  stage_name                           = var.api_gateway_stage_name
  http_method                          = var.api_gateway_http_method
  api_gateway_execution_arn            = module.api_gateway.execution_arn
  process_lambda_function_name         = module.lambda.lambda_function_name
  depends_on = [
    module.lambda,
    module.api_gateway
  ]
}

module "lead_queue" {
  source                           = "./modules/lead-queue"
  project_name                     = var.project_name
  dlq_message_retention_days       = var.dlq_message_retention_days
  # Janela de lote atual: 0 s. Se ela mudar, somar seu valor à margem calculada.
  visibility_timeout_seconds       = max(tonumber(var.queue_visibility_timeout_seconds), 6 * var.lambda_timeout)
  redrive_policy_max_receive_count = var.queue_redrive_policy_max_receive_count
}

module "lead_queue_policies" {
  source                  = "./modules/lead-queue-policies"
  project_name            = var.project_name
  lead_queue_arn          = module.lead_queue.queue_arn
  lead_queue_url          = module.lead_queue.queue_url
  request_lambda_role_arn = module.lambda.lambda_role_arn
  process_lambda_role_arn = module.process_lambda.lambda_role_arn
  depends_on = [
    module.lead_queue,
    module.lambda,
    module.process_lambda
  ]
}

module "common_layer" {
  source       = "./modules/common-layer"
  account_id   = var.account_id
  project_name = var.project_name
}

module "process_lambda" {
  source                                         = "./modules/process-lambda"
  project_name                                   = var.project_name
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  token_layer_name                               = var.token_layer_name
  common_layer_name                              = module.common_layer.layer_name
  NODE_ENV                                       = var.NODE_ENV
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on = [
    module.common_layer
  ]
}

module "process_lambda_event_source" {
  source                       = "./modules/process-lambda-event-source"
  lead_queue_arn               = module.lead_queue.queue_arn
  process_lambda_function_name = module.process_lambda.lambda_function_name
  depends_on = [
    module.process_lambda,
    module.lead_queue
  ]
}