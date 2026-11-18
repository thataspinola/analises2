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

module "processor" {
  source = "./modules/lambda"
  account_id = var.account_id
  vpc_subnet_ids = var.vpc_subnet_ids
  vpc_security_group_id = var.vpc_security_group_id
  carbon_acquisition_transmission_gateway_rest_api_deployment_execution_arn = module.api_gateway.carbon_acquisition_transmission_gateway_rest_api_deployment_execution_arn
  lambda_cloudwatch_log_retention = var.lambda_cloudwatch_log_retention
  lambda_timeout = var.lambda_timeout
  gateway_path_part = var.gateway_path_part
  gateway_stage_name = var.gateway_stage_name
  gateway_http_method = var.gateway_http_method
  NODE_ENV = var.NODE_ENV
  TRAVEL_QUEUE = var.TRAVEL_QUEUE
  RESIDENTIAL_QUEUE = var.RESIDENTIAL_QUEUE
}

module "api_gateway" {
  source = "./modules/api-gateway"
  account_id = var.account_id
  vpce = var.vpce
  carbon_acquisition_transmission_lambda_invoke_arn = module.processor.carbon_acquisition_transmission_lambda_invoke_arn
  path_part = var.gateway_path_part
  stage_name = var.gateway_stage_name
  http_method = var.gateway_http_method
  throttling_burst_limit = var.gateway_throttling_burst_limit
  throttling_rate_limit= var.gateway_throttling_rate_limit
}
