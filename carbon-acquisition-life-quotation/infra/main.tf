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

module "quotation" {
  source                                         = "./modules/lambda"
  project_name                                   = var.project_name
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.cloudwatch_log_retention
  token_lambda_layer_name                        = var.token_lambda_layer_name
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  OFERTAS_PATH                                   = var.OFERTAS_PATH
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "lambda_event_source" {
  source                               = "./modules/lambda-event-source"
  stage_name                           = var.api_gateway_stage_name
  http_method                          = var.api_gateway_http_method
  api_gateway_deployment_execution_arn = module.api_gateway.deployment_execution_arn
  process_lambda_function_name         = module.quotation.lambda_function_name
  depends_on = [
    module.quotation,
    module.api_gateway
  ]
}

module "api_gateway" {
  source                   = "./modules/api-gateway"
  account_id               = var.account_id
  vpce                     = var.vpce
  lambda_invoke_arn        = module.quotation.lambda_invoke_arn
  stage_name               = var.api_gateway_stage_name
  http_method              = var.api_gateway_http_method
  throttling_burst_limit   = var.gateway_throttling_burst_limit
  throttling_rate_limit    = var.gateway_throttling_rate_limit
  cloudwatch_log_retention = var.cloudwatch_log_retention
  project_name             = var.project_name
   depends_on = [
    module.quotation
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
