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
      hub-de-vendas      = "carbon"
      hub-de-vendas-temp = "carbon-wo-inspection-callback-auto"
    }
  }
}

# ------------------------------------------------
# MODULES
# ------------------------------------------------

module "check_inspection_request_lambda" {
  source                                                   = "./modules/check-inspection-request-lambda"
  account_id                                               = var.account_id
  vpc_subnet_ids                                           = var.vpc_subnet_ids
  vpc_security_group_id                                    = var.vpc_security_group_id
  lambda_cloudwatch_log_retention                          = var.lambda_cloudwatch_log_retention
  lambda_timeout                                           = var.lambda_timeout
  token_layer_name                                         = var.token_layer_name
  NODE_ENV                                                 = var.NODE_ENV
  SENSEDIACLOUD_URL                                        = var.SENSEDIACLOUD_URL
  SENSEDIA_URL                                             = var.SENSEDIA_URL
  SENSEDIA_API_TIMEOUT                                     = var.SENSEDIA_API_TIMEOUT
  PAYMENT_REGISTER_ENDPOINT_URL                            = "${var.PAYMENT_REGISTER_API_GATEWAY_STAGE_URL}/${var.PAYMENT_REGISTER_API_GATEWAY_RESOURCE_PATH_PART}"
  AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH = var.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
  AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV   = var.AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV
  dynatrace_oneAgent_layer                                 = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                        = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                      = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                  = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                         = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                       = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                   = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION           = var.dynatrace_open_telemetry_enable_integration
  UP_TO_FIFTEEN_MINUTES                                    = var.UP_TO_FIFTEEN_MINUTES
  UP_TO_TWENTY_FOUR_HOURS                                  = var.UP_TO_TWENTY_FOUR_HOURS
  MAX_LIMIT                                                = var.MAX_LIMIT
  UP_TO_FIFTEEN_MINUTES_TTL                                = var.UP_TO_FIFTEEN_MINUTES_TTL
  UP_TO_TWENTY_FOUR_HOURS_TTL                              = var.UP_TO_TWENTY_FOUR_HOURS_TTL
  MAX_LIMIT_TTL                                            = var.MAX_LIMIT_TTL
  INSPECTION_REQUEST_AUTO_DLQ_URL                          = var.INSPECTION_REQUEST_AUTO_DLQ_URL
}

module "inspection_request_auto_gather_schedule_db" {
  source = "./modules/inspection-request-auto-gather-schedule-db"
}

module "inspection_request_auto_gather_schedule_db_policies" {
  source                                                      = "./modules/inspection-request-auto-gather-schedule-db-policies"
  inspection_request_auto_gather_schedule_db_table_arn        = module.inspection_request_auto_gather_schedule_db.table_arn
  inspection_request_auto_gather_schedule_db_table_stream_arn = module.inspection_request_auto_gather_schedule_db.table_stream_arn
  inspection_request_auto_gather_schedule_db_table_name       = module.inspection_request_auto_gather_schedule_db.table_name
  check_inspection_request_lambda_role_name                   = module.check_inspection_request_lambda.lambda_role_name
  check_inspection_request_lambda_function_name               = module.check_inspection_request_lambda.lambda_function_name
  depends_on = [
    module.inspection_request_auto_gather_schedule_db,
    module.check_inspection_request_lambda
  ]
}


module "check_inspection_request_lambda_event_source" {
  source                                                = "./modules/check-inspection-request-lambda-event-source"
  inspection_request_auto_gather_schedule_db_stream_arn = module.inspection_request_auto_gather_schedule_db.table_stream_arn
  process_lambda_function_name                          = module.check_inspection_request_lambda.lambda_function_name
  process_lambda_maximum_retry_attempts                 = var.process_lambda_maximum_retry_attempts
  check_inspection_request_queue_arn                    = module.check_inspection_request_queue.queue_arn
  depends_on = [
    module.inspection_request_auto_gather_schedule_db,
    module.check_inspection_request_lambda,
    module.check_inspection_request_queue
  ]
}

module "check_inspection_request_queue" {
  source                                   = "./modules/check-inspection-request-queue"
  visibility_timeout_seconds               = var.check_inspection_request_queue_visibility_timeout_seconds
  delay_seconds                            = var.check_inspection_request_queue_message_delay_seconds
  dlq_message_retention_days               = var.dlq_message_retention_days
  check_inspection_request_lambda_role_arn = module.check_inspection_request_lambda.lambda_role_arn
  depends_on = [
    module.check_inspection_request_lambda,
  ]
}

module "check_inspection_request_queue-policies" {
  source                                   = "./modules/check-inspection-request-queue-policies"
  inspection_request_lambda_role_arn       = "arn:aws:iam::${var.account_id}:role/${var.inspection_request_lambda_role_name}"
  check_inspection_request_lambda_role_arn = module.check_inspection_request_lambda.lambda_role_arn
  check_inspection_request_queue_arn       = module.check_inspection_request_queue.queue_arn
  check_inspection_request_queue_url       = module.check_inspection_request_queue.queue_url
  check_inspection_request_dlq_queue_arn   = module.check_inspection_request_queue.queue_dlq_arn
  check_inspection_request_dlq_queue_url   = module.check_inspection_request_queue.queue_dlq_url
  depends_on = [
    module.check_inspection_request_lambda,
    module.check_inspection_request_queue,
  ]
}
