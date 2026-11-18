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
  account_id                                     = local.account_id
  vpc_subnet_ids                                 = local.vpc_subnet_ids
  vpc_security_groups_ids                        = local.vpc_security_groups_ids
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.request_lambda_timeout
  project_name                                   = "${var.project_base_name}-request-portable-device"
  carbon_token_layer_arn                         = data.aws_lambda_layer_version.carbon_token.arn
  carbon_postponed_payment_layer_arn             = data.aws_lambda_layer_version.carbon_postponed_payment.arn
  dynamodb_table_arn                             = "arn:aws:dynamodb:${var.aws_region}:${local.account_id}:table/${var.dynamo_table_name}"
  NODE_ENV                                       = var.NODE_ENV
  MULESOFT_URL                                   = var.MULESOFT_URL
  GOOGLE_ANALYTICS_COLLECT_QUEUE_URL             = "https://sqs.${var.aws_region}.amazonaws.com/${local.account_id}/${var.google_analytics_queue_name}"
  dynatrace_oneAgent_layer_arn                   = var.dynatrace_oneAgent_layer_arn
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  max_memory_size                                = var.lambda_max_memory_size
  is_poc                                         = var.is_poc
  twistlock_layer_arn                            = var.twistlock_layer_arn
  TWISTLOCK_DISABLED                             = var.TWISTLOCK_DISABLED
  TWISTLOCK_POLICY                               = var.TWISTLOCK_POLICY
  ENABLE_DEBUG                                   = var.ENABLE_APP_DEBUG
}

module "lambda-inspection-fail" {
  source                                         = "./modules/lambda-inspection-fail"
  account_id                                     = local.account_id
  vpc_subnet_ids                                 = local.vpc_subnet_ids
  vpc_security_groups_ids                        = local.vpc_security_groups_ids
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.fail_lambda_timeout
  project_name                                   = "${var.project_base_name}-fail-portable-device"
  NODE_ENV                                       = var.NODE_ENV
  INTERNAL_GTW_EMAIL_NOTIFICATION_URL            = var.INTERNAL_GTW_EMAIL_NOTIFICATION_URL
  INSPECTION_PORTABLE_DEVICE_DLQ                 = "https://sqs.ca-central-1.amazonaws.com/${local.account_id}/carbon-inspection-request-portable-device-dead-letter"
  dynatrace_oneAgent_layer_arn                   = var.dynatrace_oneAgent_layer_arn
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  max_memory_size                                = var.lambda_max_memory_size
  is_poc                                         = var.is_poc
  twistlock_layer_arn                            = var.twistlock_layer_arn
  TWISTLOCK_DISABLED                             = var.TWISTLOCK_DISABLED
  TWISTLOCK_POLICY                               = var.TWISTLOCK_POLICY
  ENABLE_DEBUG                                   = var.ENABLE_APP_DEBUG
}

module "sqs-inspection-request" {
  source                     = "./modules/sqs-inspection-request"
  project_name               = "${var.project_base_name}-request-portable-device"
  lambda_name                = module.lambda-inspection-request.lambda_name
  inspection_ready_sns_arn   = "arn:aws:sns:ca-central-1:${local.account_id}:${var.inspection_ready_sns_name}"
  dlq_message_retention_days = var.dlq_message_retention_days
  request_fail_sqs_arn       = module.sqs-inspection-fail.sqs_arn
  depends_on = [
    module.lambda-inspection-request,
    module.sqs-inspection-fail
  ]
}

module "sqs-inspection-request-policy" {
  source                                  = "./modules/sqs-inspection-request-policy"
  project_name                            = "${var.project_base_name}-request-portable-device"
  lambda_role_arn                         = module.lambda-inspection-request.lambda_role_arn
  inspection_ready_sns_arn                = "arn:aws:sns:ca-central-1:${local.account_id}:${var.inspection_ready_sns_name}"
  producer_inpection_fail_lambda_role_arn = module.lambda-inspection-fail.lambda_role_arn
  sqs_inepection_request_arn              = module.sqs-inspection-request.sqs_arn
  dlq_inepection_request_arn              = module.sqs-inspection-request.sqs_dlq_arn
  sqs_inepection_request_id               = module.sqs-inspection-request.sqs_id
  dlq_inepection_request_id               = module.sqs-inspection-request.dlq_id
}

module "sqs-inspection-fail" {
  source                     = "./modules/sqs-inspection-fail"
  project_name               = "${var.project_base_name}-fail-portable-device"
  lambda_name                = module.lambda-inspection-fail.lambda_name
  dlq_message_retention_days = var.dlq_message_retention_days
  depends_on = [
    module.lambda-inspection-fail,
  ]
}

module "sqs-inspection-fail-policy" {
  source                     = "./modules/sqs-inspection-fail-policy"
  project_name               = "${var.project_base_name}-fail-portable-device"
  lambda_role_arn            = module.lambda-inspection-fail.lambda_role_arn
  sqs_inepection_request_arn = module.sqs-inspection-request.sqs_arn
  sqs_inepection_fail_arn    = module.sqs-inspection-fail.sqs_arn
  dlq_inepection_fail_arn    = module.sqs-inspection-fail.sqs_dlq_arn
  sqs_inepection_fail_id     = module.sqs-inspection-fail.sqs_id
  dlq_inepection_fail_id     = module.sqs-inspection-fail.dlq_id
}
