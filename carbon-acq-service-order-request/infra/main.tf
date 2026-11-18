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
module "failed_request_queue" {
  source                                           = "./modules/failed-request-queue"
  cloudwatch_metric_alarm_evaluation_periods_count = var.dead_letter_cloudwatch_metric_alarm_evaluation_periods_count
  message_visibility_timeout_seconds               = var.queue_message_visibility_timeout_seconds
  message_retention_days                           = var.dead_letter_message_retention_days
}

module "request_queue" {
  source                                   = "./modules/request-queue"
  queue_dead_letter_arn                    = module.failed_request_queue.queue_arn
  message_redrive_policy_max_receive_count = var.queue_message_redrive_policy_max_receive_count
  message_visibility_timeout_seconds       = var.queue_message_visibility_timeout_seconds
  depends_on = [
    module.failed_request_queue
  ]
}

module "common_layer" {
  source     = "./modules/common-layer"
  account_id = var.account_id
}

module "request_lambda" {
  source                                         = "./modules/request-lambda"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  token_layer_name                               = var.token_layer_name
  max_memory_size                                = var.lambda_max_memory_size
  cloudwatch_log_retention                       = var.lambda_cloudwatch_log_retention
  timeout                                        = var.lambda_timeout
  dynatrace_oneAgent_layer_arn                   = var.dynatrace_oneAgent_layer_arn
  common_layer_name                              = module.common_layer.layer_name
  service_order_layer_name                       = var.service_order_layer_name
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  NODE_ENV                                       = var.NODE_ENV
  API_PATH                                       = var.API_PATH
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  SENSEDIA_CLOUD_URL                             = var.SENSEDIA_CLOUD_URL
  SERVICEORDER_SNS_TOPIC_ARN                     = module.requested_sns_topic.topic_arn
  FISCAL_COMPANY_CODE                            = var.FISCAL_COMPANY_CODE
  GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL       = var.GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL
  depends_on = [
    module.common_layer,
    module.requested_sns_topic
  ]
}

module "failed_request_table" {
  source = "./modules/failed-request-table"
}

module "failed_request_table_policies" {
  source     = "./modules/failed-request-table-policies"
  account_id = var.account_id
  table_arn  = module.failed_request_table.table_arn
  depends_on = [
    module.failed_request_table
  ]
}
module "failed_request_lambda" {
  source                                                  = "./modules/failed-request-lambda"
  account_id                                              = var.account_id
  vpc_subnet_ids                                          = var.vpc_subnet_ids
  vpc_security_group_id                                   = var.vpc_security_group_id
  token_layer_name                                        = var.token_layer_name
  cloudwatch_log_retention                                = var.lambda_cloudwatch_log_retention
  timeout                                                 = var.lambda_timeout
  max_memory_size                                         = var.lambda_max_memory_size
  dynatrace_oneAgent_layer_arn                            = var.dynatrace_oneAgent_layer_arn
  common_layer_name                                       = module.common_layer.layer_name
  postponed_payment_data_layer_name                       = var.carbon_postponed_payment_data_layer_name
  service_order_layer_name                                = var.service_order_layer_name
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                       = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                     = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                 = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                        = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                      = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                  = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION          = var.dynatrace_open_telemetry_enable_integration
  FAILED_REQUEST_TABLE_NAME                               = module.failed_request_table.table_name
  NODE_ENV                                                = var.NODE_ENV
  API_PATH                                                = var.API_PATH
  SENSEDIA_URL                                            = var.SENSEDIA_URL
  SENSEDIA_CLOUD_URL                                      = var.SENSEDIA_CLOUD_URL
  SENDGRID_API_ENDPOINT_PATH                              = var.SENDGRID_API_ENDPOINT_PATH
  SENDGRID_API_URL                                        = var.SENDGRID_API_URL
  PORTOSERVICO_SENDGRID_AUTH_TOKEN                        = local.portoservico_sendgrid_auth_token
  PORTOSERVICO_SERVICEORDER_MAIL_SENDER                   = var.PORTOSERVICO_SERVICEORDER_MAIL_SENDER
  PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME              = var.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME
  PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT           = var.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT
  PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID        = var.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID
  CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL           = "https://${data.aws_api_gateway_rest_api.carbon_serviceorder_payment_checkout.id}.execute-api.${var.aws_region}.amazonaws.com"
  CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH = var.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH
  depends_on = [
    module.common_layer,
    module.failed_request_table,
    module.failed_request_table_policies
  ]
}

module "request_queue_policies" {
  source          = "./modules/request-queue-policies"
  account_id      = var.account_id
  queue_arn       = module.request_queue.queue_arn
  queue_url       = module.request_queue.queue_url
  queue_name      = module.request_queue.queue_name
  lambda_role_arn = module.request_lambda.lambda_role_arn
  depends_on = [
    module.request_queue,
    module.request_lambda
  ]
}

module "request_lambda_event_source" {
  source               = "./modules/request-lambda-event-source"
  lambda_function_name = module.request_lambda.function_name
  queue_arn            = module.request_queue.queue_arn
  depends_on = [
    module.request_lambda,
    module.request_queue,
    module.request_queue_policies
  ]
}

module "failed_request_queue_policies" {
  source          = "./modules/failed-request-queue-policies"
  queue_arn       = module.failed_request_queue.queue_arn
  queue_url       = module.failed_request_queue.queue_url
  queue_name      = module.failed_request_queue.queue_name
  lambda_role_arn = module.failed_request_lambda.lambda_role_arn
  depends_on = [
    module.failed_request_queue,
    module.failed_request_lambda
  ]
}

module "failed_request_lambda_event_source" {
  source               = "./modules/failed-request-lambda-event-source"
  lambda_function_name = module.failed_request_lambda.function_name
  queue_arn            = module.failed_request_queue.queue_arn
  depends_on = [
    module.failed_request_lambda,
    module.failed_request_queue,
    module.failed_request_queue_policies
  ]
}

module "requested_sns_topic" {
  source = "./modules/requested-sns-topic"
}

module "requested_sns_topic_policies" {
  source     = "./modules/requested-sns-topic-policies"
  topic_arn  = module.requested_sns_topic.topic_arn
  account_id = var.account_id
}
