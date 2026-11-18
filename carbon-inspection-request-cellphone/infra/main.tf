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

module "lambda-inspection-request" {
  source                                         = "./modules/lambda-inspection-request"
  project_name                                   = "${var.project_base_name}-request-cellphone"
  account_id                                     = var.account_id
  token_lambda_layer_name                        = var.token_lambda_layer_name
  postponed_payment_data_name                    = var.postponed_payment_data_name
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_timeout                                 = var.request_lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  NODE_ENV                                       = var.NODE_ENV
  MULE_URL                                       = var.MULE_URL
  dynamodb_table_arn                             = "arn:aws:dynamodb:${var.aws_region}:${var.account_id}:table/${var.dynamo_table_name}"
  GOOGLE_ANALYTICS_COLLECT_QUEUE_URL             = "https://sqs.${var.aws_region}.amazonaws.com/${var.account_id}/${var.google_analytics_queue_name}"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "lambda-inspection-fail" {
  source                                         = "./modules/lambda-inspection-fail"
  project_name                                   = "${var.project_base_name}-fail-cellphone"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_timeout                                 = var.request_lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  NODE_ENV                                       = var.NODE_ENV
  INTERNAL_GTW_EMAIL_NOTIFICATION_URL            = var.INTERNAL_GTW_EMAIL_NOTIFICATION_URL
  INSPECTION_CELLPHONE_DLQ                       = "https://sqs.ca-central-1.amazonaws.com/${var.account_id}/carbon-inspection-request-cellphone-dead-letter"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "sqs-inspection-request" {
  source                     = "./modules/sqs-inspection-request"
  project_name               = "${var.project_base_name}-request-cellphone"
  lambda_name                = module.lambda-inspection-request.lambda_name
  inspection_ready_sns_arn   = "arn:aws:sns:ca-central-1:${var.account_id}:${var.inspection_ready_sns_name}"
  dlq_message_retention_days = var.dlq_message_retention_days
  request_fail_sqs_arn       = module.sqs-inspection-fail.sqs_arn
  depends_on = [
    module.lambda-inspection-request,
    module.sqs-inspection-fail
  ]
}

module "sqs-inspection-request-policy" {
  source                                  = "./modules/sqs-inspection-request-policy"
  project_name                            = "${var.project_base_name}-request-cellphone"
  lambda_role_arn                         = module.lambda-inspection-request.lambda_role_arn
  inspection_ready_sns_arn                = "arn:aws:sns:ca-central-1:${var.account_id}:${var.inspection_ready_sns_name}"
  producer_inpection_fail_lambda_role_arn = module.lambda-inspection-fail.lambda_role_arn
  sqs_inepection_request_arn              = module.sqs-inspection-request.sqs_arn
  dlq_inepection_request_arn              = module.sqs-inspection-request.sqs_dlq_arn
  sqs_inepection_request_id               = module.sqs-inspection-request.sqs_id
  dlq_inepection_request_id               = module.sqs-inspection-request.dlq_id
}

module "sqs-inspection-fail" {
  source                     = "./modules/sqs-inspection-fail"
  project_name               = "${var.project_base_name}-fail-cellphone"
  lambda_name                = module.lambda-inspection-fail.lambda_name
  dlq_message_retention_days = var.dlq_message_retention_days
  depends_on = [
    module.lambda-inspection-fail,
  ]
}

module "sqs-inspection-fail-policy" {
  source                     = "./modules/sqs-inspection-fail-policy"
  project_name               = "${var.project_base_name}-fail-cellphone"
  lambda_role_arn            = module.lambda-inspection-fail.lambda_role_arn
  sqs_inepection_request_arn = module.sqs-inspection-request.sqs_arn
  sqs_inepection_fail_arn    = module.sqs-inspection-fail.sqs_arn
  dlq_inepection_fail_arn    = module.sqs-inspection-fail.sqs_dlq_arn
  sqs_inepection_fail_id     = module.sqs-inspection-fail.sqs_id
  dlq_inepection_fail_id     = module.sqs-inspection-fail.dlq_id
}
