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

module "lambda_module" {
  source                                         = "./modules/lambda"
  account_id                                     = var.account_id
  project_name                                   = var.project_name
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  token_layer_name                               = var.token_layer_name
  postponed_payment_data_name                    = var.postponed_payment_data_name
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  SENSEDIACLOUD_URL                              = var.SENSEDIACLOUD_URL
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.dynamo_table_name}"
  CHECK_INSPECTION_REQUEST_QUEUE_URL             = "https://sqs.${var.AWS_REGION}.amazonaws.com/${var.account_id}/${var.CHECK_INSPECTION_REQUEST_QUEUE_NAME}"
  AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE  = var.AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE
  VEHICLE_API_URL                                = var.VEHICLE_API_URL
  UPDATE_LEAD_API_URL                            = var.UPDATE_LEAD_API_URL
  V1_AUTO_VEHICLE_SEARCH_ENDPOINT                = var.V1_AUTO_VEHICLE_SEARCH_ENDPOINT
  V1_UPDATE_LEAD_ENDPOINT                        = var.V1_UPDATE_LEAD_ENDPOINT
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
  source                       = "./modules/lambda-event-source"
  lambda_function_name         = module.lambda_module.lambda_function_name
  inspection_request_queue_arn = module.sqs_queue.queue_arn
  depends_on = [
    module.lambda_module,
    module.sqs_queue_polices
  ]
}

module "sqs_queue" {
  source                     = "./modules/sqs-queue"
  project_name               = var.project_name
  sns_topic_subscription     = "arn:aws:sns:ca-central-1:${var.account_id}:${var.inspection_ready_sns_name}"
  dlq_message_retention_days = var.dlq_message_retention_days
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
}

module "sqs_queue_polices" {
  source                             = "./modules/sqs-queue-polices"
  project_name                       = var.project_name
  sns_topic_subscription_arn         = "arn:aws:sns:ca-central-1:${var.account_id}:${var.inspection_ready_sns_name}"
  inspection_request_lambda_role_arn = module.lambda_module.lambda_role_arn
  inspection_request_queue_arn       = module.sqs_queue.queue_arn
  inspection_request_queue_url       = module.sqs_queue.queue_url
  depends_on = [
    module.lambda_module,
    module.sqs_queue
  ]
}

