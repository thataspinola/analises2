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

module "gateway" {
  source                 = "./modules/api-gateway"
  api_gateway_name       = var.project_name
  vpce                   = var.vpce
  path_part              = var.gateway_path_part
  stage_name             = var.gateway_stage_name
  http_method            = var.gateway_http_method
  throttling_burst_limit = var.gateway_throttling_burst_limit
  throttling_rate_limit  = var.gateway_throttling_rate_limit
  lambda_invoke_arn      = module.lambda.lambda_invoke_arn
  depends_on             = [module.lambda]
}

module "lambda" {
  source                          = "./modules/lambda"
  project_name                    = var.project_name
  account_id                      = var.account_id
  vpc_subnet_ids                  = var.vpc_subnet_ids
  vpc_security_groups_ids           = var.vpc_security_group_id
  lambda_cloudwatch_log_retention = var.lambda_cloudwatch_log_retention
  lambda_timeout                  = var.lambda_timeout
  token_layer_name                = var.token_layer_name
  postponed_payment_data_name     = var.postponed_payment_data_name
  NODE_ENV                        = var.NODE_ENV
  dynamodb_table_arn              = "arn:aws:dynamodb:${var.aws_region}:${var.account_id}:table/${var.dynamo_table_name}"
  COMMERCE_URL                    = var.COMMERCE_URL
  MULESOFT_URL                    = var.MULESOFT_URL
  SALESFORCE_EMAIL_SENDER_QUEUE   = "https://sqs.${var.aws_region}.amazonaws.com/${var.account_id}/${var.salesforce_email_sender_queue_name}"
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
  source                    = "./modules/lambda-event-source"
  api_gateway_stage_name    = var.gateway_stage_name
  api_gateway_path_part     = var.gateway_path_part
  api_gateway_http_method   = var.gateway_http_method
  api_gateway_execution_arn = module.gateway.api_gateway_execution_arn
  lambda_name               = var.project_name
  depends_on = [
    module.gateway
  ]
}
