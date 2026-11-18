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

module "lambda_email_sender" {
  source                                         = "./modules/lambda"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  token_lambda_layer_name                        = var.token_lambda_layer_name
  project_name                                   = var.project_name
  email_sender_queue_arn                         = module.sqs_email_sender.email_sender_queue_arn
  NODE_ENV                                       = var.NODE_ENV
  S3_BUCKET                                      = "hdv-carbon-email-${var.NODE_ENV}"
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "sqs_email_sender" {
  source                     = "./modules/sqs"
  project_name               = var.project_name
  process_lambda_role_arn    = module.lambda_email_sender.lambda_role_arn
  account_id                 = local.account_id
  dlq_message_retention_days = var.dlq_message_retention_days
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
}

module "s3_email_sender" {
  source                  = "./modules/s3"
  bucket_name             = "hdv-carbon-email-${var.NODE_ENV}"
  process_lambda_role_arn = module.lambda_email_sender.lambda_role_arn
}
