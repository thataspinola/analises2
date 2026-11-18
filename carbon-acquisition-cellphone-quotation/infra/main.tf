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
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  project_name                                   = var.project_name
  token_layer_name                               = var.token_layer_name
  NODE_ENV                                       = var.NODE_ENV
  EMPLOYEE_SUSEP                                 = var.EMPLOYEE_SUSEP
  COUPON_API_URL                                 = var.COUPON_API_URL
  MULESOFT_URL                                   = var.MULESOFT_URL
  CARBON_QUEUE_URL                               = var.CARBON_QUEUE_URL
  CHANNEL_CODE_COUPON_AUTO_APPLY                 = var.CHANNEL_CODE_COUPON_AUTO_APPLY
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
  DENY_LEAD_QUEUE_URL                            = var.DENY_LEAD_QUEUE_URL
}


