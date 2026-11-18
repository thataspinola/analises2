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
  lambda_cloudwatch_log_retention                 = var.lambda_cloudwatch_log_retention
  lambda_timeout                                  = var.lambda_timeout
  project_name                                    = var.project_name
  token_layer_name                                = var.token_layer_name
  api_gateway_stage_name                          = var.api_gateway_stage_name
  api_gateway_http_method                         = var.api_gateway_http_method
  api_gateway_execution_arn                       = module.api_gateway.api_gateway_execution_arn
  NODE_ENV                                        = var.NODE_ENV
  COMMERCE_URL                                    = var.COMMERCE_URL
  API_PATH_COTACAO                                = var.API_PATH_COTACAO
  API_PATH_PROPOSAL                               = var.API_PATH_PROPOSAL
  URL_CART_REDIRECT                               = var.URL_CART_REDIRECT
  max_memory_size                                 = var.lambda_max_memory_size
  dynatrace_oneAgent_layer                        = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER               = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                             = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                         = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN              = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN          = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION  = var.dynatrace_open_telemetry_enable_integration
  HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API       = "https://${data.aws_api_gateway_rest_api.carbon_support_create_lead.id}.execute-api.${var.aws_region}.amazonaws.com/v1/create-lead"
  HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API = "https://${data.aws_api_gateway_rest_api.carbon_acquisition_cart.id}.execute-api.${var.aws_region}.amazonaws.com/v1"
  PETLOVE_URL                                     = var.PETLOVE_URL
  PETLOVE_COUPON                                  = var.PETLOVE_COUPON
  PETLOVE_PORTO_CARD_BIN                          = var.PETLOVE_PORTO_CARD_BIN
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
