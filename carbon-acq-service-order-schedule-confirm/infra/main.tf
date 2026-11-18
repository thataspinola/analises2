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
  source                                                               = "./modules/lambda"
  function_name                                                        = local.lambda_function_name
  account_id                                                           = var.account_id
  vpc_subnet_ids                                                       = var.vpc_subnet_ids
  vpc_security_group_id                                                = var.vpc_security_group_id
  token_layer_name                                                     = var.token_layer_name
  cloudwatch_log_retention                                             = var.lambda_cloudwatch_log_retention
  timeout                                                              = var.lambda_timeout
  max_memory_size                                                      = var.lambda_max_memory_size
  dynatrace_oneAgent_layer                                             = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER                                    = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                                                  = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                                              = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL                                     = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN                                   = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN                               = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                       = var.dynatrace_open_telemetry_enable_integration
  NODE_ENV                                                             = var.NODE_ENV
  HUB_VENDAS_CARBON_PRESTACAO_SERVICO_V1_AGENDAMENTO_API_ENDPOINT_PATH = var.HUB_VENDAS_CARBON_PRESTACAO_SERVICO_V1_AGENDAMENTO_API_ENDPOINT_PATH
  SENSEDIA_CLOUD_URL                                                   = var.SENSEDIA_CLOUD_URL
  carbon_acq_service_order_layer_name                                  = var.carbon_acq_service_order_layer_name
}

module "queue_dead_letter" {
  source                                           = "./modules/queue-dead-letter"
  queue_name                                       = local.queue_name
  message_retention_days                           = var.queue_dead_letter_message_retention_days
  message_visibility_timeout_seconds               = var.queue_visibility_timeout_seconds
  cloudwatch_metric_alarm_evaluation_periods_count = var.dead_letter_cloudwatch_metric_alarm_evaluation_periods_count
}

module "queue_dead_letter_policies" {
  source                = "./modules/queue-dead-letter-policies"
  queue_name            = local.queue_name
  queue_dead_letter_arn = module.queue_dead_letter.queue_arn
  queue_dead_letter_url = module.queue_dead_letter.queue_url
  depends_on            = [module.queue_dead_letter]
}

module "queue" {
  source                             = "./modules/queue"
  queue_name                         = local.queue_name
  message_visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  queue_dead_letter_arn              = module.queue_dead_letter.queue_arn
  depends_on                         = [module.queue_dead_letter]
}

module "queue_policies" {
  source                   = "./modules/queue-policies"
  consumer_lambda_role_arn = module.lambda.lambda_role_arn
  producer_sns_topic_arn   = data.aws_sns_topic.sns_topic_feed.arn
  queue_arn                = module.queue.queue_arn
  queue_url                = module.queue.queue_url
  queue_name               = local.queue_name
  depends_on = [
    module.lambda,
    module.queue
  ]
}

module "queue_topic_subscription" {
  source        = "./modules/queue-topic-subscription"
  queue_arn     = module.queue.queue_arn
  sns_topic_arn = data.aws_sns_topic.sns_topic_feed.arn
  depends_on    = [module.queue]
}

module "lambda_event_source" {
  source                              = "./modules/lambda-event-source"
  lambda_function_name                = local.lambda_function_name
  lambda_maximum_concurrency          = var.lambda_maximum_concurrency
  queue_arn                           = module.queue.queue_arn
  queue_message_processing_batch_size = var.queue_message_processing_batch_size
  depends_on = [
    module.lambda,
    module.queue
  ]
}
