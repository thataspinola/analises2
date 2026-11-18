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
module "lambda_deals_data_layer" {
  source       = "./modules/lambda-deals-data-layer"
  project_name = var.deals_data_layer_name
}

module "gateway" {
  source                         = "./modules/api_gateway"
  api_gateway_name               = var.api_gateway_name
  vpce                           = var.vpce
  throttling_burst_limit         = var.api_gateway_throttling_burst_limit
  throttling_rate_limit          = var.api_gateway_throttling_rate_limit
  stage_name                     = var.api_gateway_stage_name
  create_deals_path_part         = var.api_gateway_path_part_create_deals
  create_deals_http_method       = var.api_gateway_http_method_create_deals
  find_deals_path_part           = var.api_gateway_path_part_find_deals
  find_deals_http_method         = var.api_gateway_http_method_find_deals
  create_deals_lambda_invoke_arn = module.lambda_create_deals.lambda_invoke_arn
  find_deals_lambda_invoke_arn   = module.lambda_find_deals.lambda_invoke_arn
  depends_on                     = [module.lambda_create_deals, module.lambda_find_deals]
}

module "create-deals-sns" {
  source                                    = "./modules/create-deals-sns"
  sns_logs_role_arn                         = module.create-deals-sns-roles-and-policies.sns_logs_role_arn
  sns_producer_create_deals_lambda_role_arn = "arn:aws:iam::${var.account_id}:role/${var.sns_producer_create_deals_lambda_role_name}"
  name                                      = var.sns_create_deals_name
}

module "create-deals-sns-roles-and-policies" {
  source     = "./modules/create-deals-sns-roles-and-policies"
  account_id = var.account_id
}

module "lambda_create_deals" {
  source                                         = "./modules/lambda-create-deals"
  project_name                                   = var.lambda_name_create_deals
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  NODE_ENV                                       = var.NODE_ENV
  lambda_timeout                                 = var.lambda_timeout
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "lambda_create_deals_event_source" {
  source                    = "./modules/lambda-create-deals-event-source"
  lambda_project_name       = var.lambda_name_create_deals
  api_gateway_stage_name    = var.api_gateway_stage_name
  api_gateway_path_part     = var.api_gateway_path_part_create_deals
  api_gateway_http_method   = var.api_gateway_http_method_create_deals
  api_gateway_execution_arn = module.gateway.execution_arn
  depends_on = [
    module.gateway,
    module.lambda_create_deals,
  ]
}

module "lambda_find_deals" {
  source                                         = "./modules/lambda-find-deals"
  project_name                                   = var.lambda_name_find_deals
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  NODE_ENV                                       = var.NODE_ENV
  lambda_timeout                                 = var.lambda_timeout
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on                                     = [module.lambda_deals_data_layer]
}

module "lambda_find_deals_event_source" {
  source                    = "./modules/lambda-find-deals-event-source"
  lambda_project_name       = var.lambda_name_find_deals
  api_gateway_stage_name    = var.api_gateway_stage_name
  api_gateway_path_part     = var.api_gateway_path_part_find_deals
  api_gateway_http_method   = var.api_gateway_http_method_find_deals
  api_gateway_execution_arn = module.gateway.execution_arn
  depends_on = [
    module.gateway,
    module.lambda_find_deals,
  ]
}

module "lambda_create_deals_eligibility" {
  source                                         = "./modules/lambda-create-deals-eligibility"
  project_name                                   = var.lambda_name_create_deals_eligibility
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_CLOUD_URL                             = var.SENSEDIA_CLOUD_URL
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  token_layer_name                               = var.token_layer_name
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on                                     = [module.lambda_deals_data_layer]
}

module "lambda_create_deals_eligibility_event_source" {
  source              = "./modules/lambda-create-deals-eligibility-event-source"
  lambda_project_name = var.lambda_name_create_deals_eligibility
  queue_arn           = module.lambda_create_deals_eligibility_queue.queue_arn
  depends_on = [
    module.lambda_create_deals_eligibility_queue,
    module.lambda_create_deals_eligibility,
  ]
}

module "lambda_create_deals_porto_pay_cards" {
  source                                         = "./modules/lambda-create-deals-porto-pay-cards"
  project_name                                   = var.lambda_name_create_deals_porto_pay_cards
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_CLOUD_URL                             = var.SENSEDIA_CLOUD_URL
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  token_layer_name                               = var.token_layer_name
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on                                     = [module.lambda_deals_data_layer]
}

module "lambda_create_deals_porto_pay_cards_event_source" {
  source              = "./modules/lambda-create-deals-porto-pay-cards-event-source"
  lambda_project_name = var.lambda_name_create_deals_porto_pay_cards
  queue_arn           = module.lambda_create_deals_porto_pay_cards_queue.queue_arn
  depends_on = [
    module.lambda_create_deals_porto_pay_cards_queue,
    module.lambda_create_deals_porto_pay_cards,
  ]
}

module "lambda_create_deals_good_card" {
  source                                         = "./modules/lambda-create-deals-good-card"
  project_name                                   = var.lambda_name_create_deals_good_card
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  token_layer_name                               = var.token_layer_name
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on                                     = [module.lambda_deals_data_layer]
}

module "lambda_create_deals_good_card_event_source" {
  source              = "./modules/lambda-create-deals-good-card-event-source"
  lambda_project_name = var.lambda_name_create_deals_good_card
  queue_arn           = module.lambda_create_deals_good_card_queue.queue_arn
  depends_on = [
    module.lambda_create_deals_good_card_queue,
    module.lambda_create_deals_good_card,
  ]
}

module "lambda_create_deals_card_proposals" {
  source                                         = "./modules/lambda-create-deals-card-proposals"
  project_name                                   = var.lambda_name_create_deals_card_proposals
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_CLOUD_URL                             = var.SENSEDIA_CLOUD_URL
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  token_layer_name                               = var.token_layer_name
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  depends_on                                     = [module.lambda_deals_data_layer]
}

module "lambda_create_deals_card_proposals_event_source" {
  source              = "./modules/lambda-create-deals-card-proposals-event-source"
  lambda_project_name = var.lambda_name_create_deals_card_proposals
  queue_arn           = module.lambda_create_deals_card_proposals_queue.queue_arn
  depends_on = [
    module.lambda_create_deals_card_proposals_queue,
    module.lambda_create_deals_card_proposals,
  ]
}

module "lambda_create_deals_porto_tag" {
  source                                         = "./modules/lambda-create-deals-porto-tag"
  project_name                                   = var.lambda_name_create_deals_porto_tag
  account_id                                     = var.account_id
  vpc_security_group_id                          = var.vpc_security_group_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  NODE_ENV                                       = var.NODE_ENV
  PORTOSEG_URL                                   = var.PORTOSEG_URL
  lambda_timeout                                 = var.lambda_timeout
  lambda_cloudwatch_log_retention                = var.lambda_cloudwatch_log_retention
  token_layer_name                               = var.token_layer_name
  deals_data_layer_name                          = var.deals_data_layer_name
  dynamodb_table_arn                             = "arn:aws:dynamodb:ca-central-1:${var.account_id}:table/${var.DEALS_TABLE}"
  CREATE_DEALS_SNS                               = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "lambda_create_deals_porto_tag_event_source" {
  source              = "./modules/lambda-create-deals-porto-tag-event-source"
  lambda_project_name = var.lambda_name_create_deals_porto_tag
  queue_arn           = module.lambda_create_deals_porto_tag_queue.queue_arn
  depends_on = [
    module.lambda_create_deals_porto_tag_queue,
    module.lambda_create_deals_porto_tag,
  ]
}

module "create_deals_dynamodb" {
  source      = "./modules/lambda-create-deals-dynamoDB"
  DEALS_TABLE = var.DEALS_TABLE
}

module "lambda_create_deals_eligibility_queue" {
  source                     = "./modules/lambda-create-deals-eligibility-queue"
  project_name               = var.lambda_name_create_deals_eligibility
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
  sns_arn_create_deals       = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
}

module "lambda_create_deals_good_card_queue" {
  source                     = "./modules/lambda-create-deals-good-card-queue"
  project_name               = var.lambda_name_create_deals_good_card
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
  sns_arn_create_deals       = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
}

module "lambda_create_deals_porto_pay_cards_queue" {
  source                     = "./modules/lambda-create-deals-porto-pay-cards-queue"
  project_name               = var.lambda_name_create_deals_porto_pay_cards
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
  sns_arn_create_deals       = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
}

module "lambda_create_deals_card_proposals_queue" {
  source                     = "./modules/lambda-create-deals-card-proposals-queue"
  project_name               = var.lambda_name_create_deals_card_proposals
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
  sns_arn_create_deals       = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
}

module "lambda_create_deals_porto_tag_queue" {
  source                     = "./modules/lambda-create-deals-porto-tag-queue"
  project_name               = var.lambda_name_create_deals_porto_tag
  visibility_timeout_seconds = var.queue_visibility_timeout_seconds
  dlq_message_retention_days = var.dlq_message_retention_days
  sns_arn_create_deals       = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
}

module "lambda_create_deals_eligibility_queue_policies" {
  source               = "./modules/lambda-create-deals-eligibility-queue-policies"
  project_name         = var.lambda_name_create_deals_eligibility
  lambda_role_arn      = module.lambda_create_deals_eligibility.lambda_role_arn
  queue_url            = module.lambda_create_deals_eligibility_queue.queue_url
  queue_arn            = module.lambda_create_deals_eligibility_queue.queue_arn
  sns_arn_create_deals = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  depends_on = [
    module.lambda_create_deals_eligibility,
    module.lambda_create_deals_eligibility_queue,
  ]
}

module "lambda_create_deals_good_card_queue_policies" {
  source               = "./modules/lambda-create-deals-good-card-queue-policies"
  project_name         = var.lambda_name_create_deals_good_card
  lambda_role_arn      = module.lambda_create_deals_good_card.lambda_role_arn
  queue_url            = module.lambda_create_deals_good_card_queue.queue_url
  queue_arn            = module.lambda_create_deals_good_card_queue.queue_arn
  sns_arn_create_deals = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  depends_on = [
    module.lambda_create_deals_good_card,
    module.lambda_create_deals_good_card_queue,
  ]
}

module "lambda_create_deals_porto_pay_cards_queue_policies" {
  source               = "./modules/lambda-create-deals-porto-pay-cards-queue-policies"
  project_name         = var.lambda_name_create_deals_porto_pay_cards
  lambda_role_arn      = module.lambda_create_deals_porto_pay_cards.lambda_role_arn
  queue_url            = module.lambda_create_deals_porto_pay_cards_queue.queue_url
  queue_arn            = module.lambda_create_deals_porto_pay_cards_queue.queue_arn
  sns_arn_create_deals = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  depends_on = [
    module.lambda_create_deals_porto_pay_cards,
    module.lambda_create_deals_porto_pay_cards_queue,
  ]
}

module "lambda_create_deals_card_proposals_queue_policies" {
  source               = "./modules/lambda-create-deals-card-proposals-queue-policies"
  project_name         = var.lambda_name_create_deals_card_proposals
  lambda_role_arn      = module.lambda_create_deals_card_proposals.lambda_role_arn
  queue_url            = module.lambda_create_deals_card_proposals_queue.queue_url
  queue_arn            = module.lambda_create_deals_card_proposals_queue.queue_arn
  sns_arn_create_deals = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  depends_on = [
    module.lambda_create_deals_card_proposals,
    module.lambda_create_deals_card_proposals_queue,
  ]
}

module "lambda_create_deals_porto_tag_queue_policies" {
  source               = "./modules/lambda-create-deals-porto-tag-queue-policies"
  project_name         = var.lambda_name_create_deals_porto_tag
  lambda_role_arn      = module.lambda_create_deals_porto_tag.lambda_role_arn
  queue_url            = module.lambda_create_deals_porto_tag_queue.queue_url
  queue_arn            = module.lambda_create_deals_porto_tag_queue.queue_arn
  sns_arn_create_deals = "arn:aws:sns:ca-central-1:${var.account_id}:carbon-create-deals"
  depends_on = [
    module.lambda_create_deals_porto_tag,
    module.lambda_create_deals_porto_tag_queue,
  ]
}
