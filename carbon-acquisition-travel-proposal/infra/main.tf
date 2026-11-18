# ----------------------------------------------------------------
# BACKEND
# ----------------------------------------------------------------
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

# ----------------------------------------------------------------
# MODULES
# ----------------------------------------------------------------

module "iam-role" {
  source       = "./modules/iam-role"
  account_id   = var.account_id
  project_name = var.project_name
}

module "step_function" {
  source                  = "./modules/step-function"
  account_id              = var.account_id
  environment             = var.environment
  project_name            = var.project_name
  log_retention_in_days   = var.cloudwatch_log_retention
  log_level               = var.log_level
  step_function_timeout   = var.step_function_timeout
  step_functions_iam_role = module.iam-role.step_functions_iam_role
  aws_region              = var.aws_region
  queue_name = var.queue_name
  depends_on = [
    module.iam-role
  ] 
}

module "api_gateway" {
  source                   = "./modules/api-gateway"
  step_functions_iam_role  = module.iam-role.step_functions_iam_role
  account_id               = var.account_id
  vpce                     = var.vpce
  step_function_invoke_arn = module.step_function.step_function_invoke_arn
  stage_name               = var.api_gateway_stage_name
  http_method              = var.api_gateway_http_method
  throttling_burst_limit   = var.gateway_throttling_burst_limit
  throttling_rate_limit    = var.gateway_throttling_rate_limit
  cloudwatch_log_retention = var.cloudwatch_log_retention
  project_name             = var.project_name
  aws_region               = var.aws_region
  depends_on = [
    module.step_function,
    module.iam-role
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
