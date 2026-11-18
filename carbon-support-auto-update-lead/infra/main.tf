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
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  UPDATE_LEAD_ENDPOINT_URL                       = var.CARBON_UPDATE_LEAD_API_GATEWAY_URL
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
  source                     = "./modules/lambda-event-source"
  lambda_function_name       = module.lambda_module.lambda_function_name
  auto_update_lead_queue_arn = module.sqs_queue.queue_arn
  depends_on = [
    module.lambda_module,
    module.sqs_queue_polices
  ]
}

module "sqs_queue" {
  source                     = "./modules/sqs-queue"
  project_name               = var.project_name
  dlq_message_retention_days = var.dlq_message_retention_days
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
}

module "sqs_queue_polices" {
  source                             = "./modules/sqs-queue-polices"
  project_name                       = var.project_name
  inspection_request_lambda_role_arn = "arn:aws:iam::${var.account_id}:role/${var.inspection_request_lambda_role_name}"
  auto_quotation_lambda_role_arn     = "arn:aws:iam::${var.account_id}:role/${var.auto_quotation_lambda_role_name}"
  auto_update_lead_lambda_role_arn   = module.lambda_module.lambda_role_arn
  auto_update_lead_queue_arn         = module.sqs_queue.queue_arn
  auto_update_lead_queue_url         = module.sqs_queue.queue_url
  depends_on = [
    module.lambda_module,
    module.sqs_queue
  ]
}

