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

module "lambda" {
  source                                         = "./modules/lambda"
  project_name                                   = var.project_name
  account_id                                     = var.account_id
  token_lambda_layer_name                        = var.token_lambda_layer_name
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  sqs_arn                                        = module.sqs.sqs_arn
  approved_payments_sns_arn                      = "arn:aws:sns:${var.aws_region}:${var.account_id}:${var.approved_payments_sns_name}"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "sqs" {
  source                     = "./modules/sqs"
  project_name               = var.project_name
  lambda_role_arn            = module.lambda.lambda_role_arn
  approved_payments_sns_arn  = "arn:aws:sns:${var.aws_region}:${var.account_id}:${var.approved_payments_sns_name}"
  dlq_message_retention_days = var.dlq_message_retention_days
  batch_size                 = var.default_batch_size
  maximum_concurrency        = var.default_maximum_concurrency
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  max_retry_lambda           = var.max_retry_lambda
}
