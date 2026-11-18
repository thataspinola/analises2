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
  account_id                                     = local.account_id
  vpc_subnet_ids                                 = local.vpc_subnet_ids
  vpc_security_groups_ids                        = local.vpc_security_groups_ids
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  twistlock_layer_arn                            = var.twistlock_layer_arn
  TWISTLOCK_DISABLED                             = var.TWISTLOCK_DISABLED
  is_poc                                         = var.is_poc
  TWISTLOCK_POLICY                               = var.TWISTLOCK_POLICY
  ENABLE_DEBUG                                   = var.ENABLE_APP_DEBUG
  project_name                                   = var.project_name
  max_memory_size                                = var.lambda_max_memory_size
  carbon_token_layer_arn                         = data.aws_lambda_layer_version.carbon_token_layer.arn
  NODE_ENV                                       = var.NODE_ENV
  APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH     = var.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH
  SENSEDIA_URL_CONSORCIO_INTERNO                 = var.SENSEDIA_URL_CONSORCIO_INTERNO
  SENSEDIA_URL_CONSORCIO_EXTERNO                 = var.SENSEDIA_URL_CONSORCIO_EXTERNO
  SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY             = var.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY
  SENSEDIA_API_TIMEOUT                           = var.SENSEDIA_API_TIMEOUT
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  SENSEDIACLOUD_URL                              = var.SENSEDIACLOUD_URL
  SENSEDIA_CORP_INTERNAL_URL                     = var.SENSEDIA_CORP_INTERNAL_URL
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration

}


module "api_gateway" {
  source                 = "./modules/api-gateway"
  account_id             = local.account_id
  vpce                   = local.vpce
  lambda_invoke_arn      = module.lambda.lambda_invoke_arn
  stage_name             = var.api_gateway_stage_name
  http_method            = var.api_gateway_http_method
  throttling_burst_limit = var.gateway_throttling_burst_limit
  throttling_rate_limit  = var.gateway_throttling_rate_limit
  project_name           = var.project_name
  depends_on = [
    module.lambda
  ]
}

module "api_gateway_policy" {
  source               = "./modules/api-gateway-policy"
  AWS_REGION           = local.aws_region
  api_gateway_id       = module.api_gateway.api_gateway_id
  stage_name           = var.api_gateway_stage_name
  endpoint_http_method = var.api_gateway_http_method
  account_id           = local.account_id
  depends_on = [
    module.api_gateway
  ]
}

module "api_gateway_deployment" {
  source                   = "./modules/api-gateway-deployment"
  cloudwatch_log_retention = var.cloudwatch_log_retention
  throttling_burst_limit   = var.gateway_throttling_burst_limit
  throttling_rate_limit    = var.gateway_throttling_rate_limit
  api_gateway_id           = module.api_gateway.api_gateway_id
  endpoint_http_method     = var.api_gateway_http_method
  endpoint_resource_id     = module.api_gateway.api_gateway_id
  stage_name               = var.api_gateway_stage_name
  lambda_invoke_arn        = module.lambda.lambda_invoke_arn
  rest_api_policy_json     = module.api_gateway_policy.rest_api_policy_json
  depends_on = [
    module.lambda,
    module.lambda_permission,
    module.api_gateway,
    module.api_gateway_policy,
  ]
}


module "lambda_permission" {
  source                       = "./modules/lambda-permission"
  stage_name                   = var.api_gateway_stage_name
  api_gateway_execution_arn    = module.api_gateway.execution_arn
  http_method                  = var.api_gateway_http_method
  process_lambda_function_name = module.lambda.lambda_function_name
  depends_on = [
    module.lambda,
    module.api_gateway,
    module.api_gateway_policy
  ]
}

module "api_mapping" {
  source                 = "./modules/api-mapping"
  api_custom_domain_fqn  = var.carbon_api_custom_domain_fqn
  api_gateway_id         = module.api_gateway.api_gateway_id
  stage_name             = var.api_gateway_stage_name
  api_custom_domain_path = var.carbon_api_custom_domain_path
  depends_on = [
    module.api_gateway,
    module.api_gateway_deployment,
    module.api_gateway_policy
  ]
}




