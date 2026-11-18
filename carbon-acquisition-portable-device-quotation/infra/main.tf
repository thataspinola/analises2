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

module "lambda" {
  source                                         = "./modules/lambda"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  cloudwatch_log_retention                       = var.lambda_cloudwatch_log_retention
  timeout                                        = var.lambda_timeout
  project_name                                   = var.project_name
  token_layer_name                               = var.token_layer_name
  memory_size                                    = var.lambda_memory_size
  NODE_ENV                                       = var.NODE_ENV
  MULESOFT_URL                                   = var.MULESOFT_URL
  api_gateway_stage_name                         = var.api_gateway_stage_name
  api_gateway_http_method                        = var.api_gateway_http_method
  api_gateway_execution_arn                      = module.api_gateway.execution_arn
  HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API      = "https://${data.aws_api_gateway_rest_api.carbon_support_create_lead.id}.execute-api.${var.aws_region}.amazonaws.com/v1/create-lead"
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DYNAMODB_SEQUENCES_TABLE_NAME}"
  COUPON_API_URL                                 = var.COUPON_API_URL
  MAX_TIME_PROCESS_QUOTATION                     = var.MAX_TIME_PROCESS_QUOTATION
  WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS  = var.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  COVERAGE_PLAN_CODES                            = jsonencode(var.COVERAGE_PLAN_CODES)
}

module "api_gateway" {
  source                 = "./modules/api-gateway"
  project_name           = var.project_name
  account_id             = var.account_id
  vpce                   = var.vpce
  lambda_invoke_arn      = module.lambda.lambda_invoke_arn
  stage_name             = var.api_gateway_stage_name
  http_method            = var.api_gateway_http_method
  throttling_burst_limit = var.api_gateway_throttling_burst_limit
  throttling_rate_limit  = var.api_gateway_throttling_rate_limit
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

module "dynamodb" {
  source                        = "./modules/dynamoDB"
  DYNAMODB_SEQUENCES_TABLE_NAME = var.DYNAMODB_SEQUENCES_TABLE_NAME
}