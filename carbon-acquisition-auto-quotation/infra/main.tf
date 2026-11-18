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
  source                                          = "./modules/lambda"
  account_id                                      = var.account_id
  vpc_subnet_ids                                  = var.vpc_subnet_ids
  vpc_security_group_id                           = var.vpc_security_group_id
  cloudwatch_log_retention                        = var.cloudwatch_log_retention
  lambda_timeout                                  = var.lambda_timeout
  function_name                                   = var.project_name
  token_layer_name                                = var.token_layer_name
  NODE_ENV                                        = var.NODE_ENV
  SENSEDIA_URL                                    = var.SENSEDIA_URL
  SENSEDIACLOUD_URL                               = var.SENSEDIACLOUD_URL
  lambda_memory_size                              = var.lambda_memory_size
  UPDATE_LEAD_AUTO_QUEUE_URL                      = "https://sqs.${var.AWS_REGION}.amazonaws.com/${var.account_id}/${var.UPDATE_LEAD_AUTO_QUEUE_NAME}"
  DENY_LEAD_AUTO_QUEUE_URL                        = "https://sqs.${var.AWS_REGION}.amazonaws.com/${var.account_id}/${var.DENY_LEAD_AUTO_QUEUE_NAME}"
  dynatrace_oneAgent_layer                        = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER               = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                             = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                         = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN              = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN          = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION  = var.dynatrace_open_telemetry_enable_integration
  HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API = "https://${data.aws_api_gateway_rest_api.carbon_acquisition_shopping_cart_upsert_cart.id}.execute-api.${var.AWS_REGION}.amazonaws.com/v1"
  EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES       = var.EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES
  EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES  = var.EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES
  NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES       = var.NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES
}

module "api_gateway" {
  source                   = "./modules/api-gateway"
  account_id               = var.account_id
  vpce                     = var.vpce
  lambda_invoke_arn        = module.lambda.lambda_invoke_arn
  throttling_burst_limit   = var.api_gateway_throttling_burst_limit
  throttling_rate_limit    = var.api_gateway_throttling_rate_limit
  cloudwatch_log_retention = var.api_gateway_cloudwatch_log_retention
  depends_on = [
    module.lambda
  ]
}

module "api_mapping" {
  source                = "./modules/api-mapping"
  api_gateway_id        = module.api_gateway.api_gateway_id
  stage_name            = module.api_gateway.stage_name
  api_custom_domain_fqn = var.carbon_api_custom_domain_fqn
  depends_on = [
    module.api_gateway
  ]
}

module "lambda_permission" {
  source                    = "./modules/lambda-permission"
  api_gateway_execution_arn = module.api_gateway.api_gateway_execution_arn
  api_gateway_http_method   = module.api_gateway.http_method
  api_gateway_stage_name    = module.api_gateway.stage_name
  lambda_function_name      = module.lambda.lambda_function_name
  depends_on = [
    module.api_gateway,
    module.lambda
  ]
}
