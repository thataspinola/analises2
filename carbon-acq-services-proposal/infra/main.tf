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

module "lambda" {
  source                                          = "./modules/lambda"
  account_id                                      = var.account_id
  project_name                                    = var.project_name
  vpc_subnet_ids                                  = var.vpc_subnet_ids
  vpc_security_group_id                           = var.vpc_security_group_id
  cloudwatch_log_retention                        = var.cloudwatch_log_retention
  lambda_timeout                                  = var.lambda_timeout
  max_memory_size                                 = var.lambda_max_memory_size
  NODE_ENV                                        = var.NODE_ENV
  SENSEDIA_URL_SERVICO                            = var.SENSEDIA_URL_SERVICO
  COMMERCE_URL                                    = var.COMMERCE_URL
  API_PATH_COTACAO                                = var.API_PATH_COTACAO
  API_PATH_PROPOSAL                               = var.API_PATH_PROPOSAL
  URL_CART_REDIRECT                               = var.URL_CART_REDIRECT
  EXPIRATION_URL_REDIRECT                         = var.EXPIRATION_URL_REDIRECT
  FISCAL_COMPANY_CODE                             = var.FISCAL_COMPANY_CODE
  SERVICE_APPOINTMENT_API                         = var.SERVICE_APPOINTMENT_API
  ORDER_BOOKING_STRATEGY_FLAG                     = var.ORDER_BOOKING_STRATEGY_FLAG
  HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API       = "https://${data.aws_api_gateway_rest_api.carbon_support_create_lead.id}.execute-api.${var.aws_region}.amazonaws.com/v1/create-lead"
  HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API = "https://${data.aws_api_gateway_rest_api.carbon_acquisition_shopping_cart_manage_cart.id}.execute-api.${var.aws_region}.amazonaws.com/v1"
  HUB_VENDAS_CARBON_SERVICES_ORDER_BOOKING_API    = "https://${data.aws_api_gateway_rest_api.carbon_acquisition_service_order_booking.id}.execute-api.${var.aws_region}.amazonaws.com/v1"
  HUB_VENDAS_CARBON_SERVICES_PRICING_API          = "https://${data.aws_api_gateway_rest_api.carbon_acquisition_service_order_pricing.id}.execute-api.${var.aws_region}.amazonaws.com/v1"

  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration

  token_layer_name = var.token_layer_name
}

module "lambda_event_source" {
  source                       = "./modules/lambda-event-source"
  stage_name                   = var.api_gateway_stage_name
  http_method                  = var.api_gateway_http_method
  api_gateway_execution_arn    = module.api_gateway.deployment_execution_arn
  process_lambda_function_name = module.lambda.lambda_function_name
  depends_on = [
    module.lambda
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
