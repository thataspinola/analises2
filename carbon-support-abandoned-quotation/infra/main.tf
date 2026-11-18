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

module "lambda" {
  source                                         = "./modules/lambda-create-lead"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  max_memory_size                                = var.lambda_max_memory_size
  project_name                                   = var.project_name
  token_layer_name                               = var.token_layer_name
  dynamics_layer_name                            = var.dynamics_layer_name
  client_register_update_sns_topic_arn           = data.aws_sns_topic.register_update.arn
  NODE_ENV                                       = var.NODE_ENV
  REGISTER_COMPLETE_GATEWAY_URL                  = var.REGISTER_COMPLETE_GATEWAY_URL
  CREATE_LEAD_WITHOUT_BCC                        = var.CREATE_LEAD_WITHOUT_BCC
  LEAD_IN_PROGRESS_TTL_IN_MINUTES                = var.LEAD_IN_PROGRESS_TTL_IN_MINUTES
  LEAD_ORIGEM_HUB_SIMULADOR                      = var.LEAD_ORIGEM_HUB_SIMULADOR
  GOVERNANCA_DADOS_PESSOA_API_PATH               = var.GOVERNANCA_DADOS_PESSOA_API_PATH
  MULESOFT_URL                                   = var.MULESOFT_URL
  DEFAULT_SUSEP                                  = var.DEFAULT_SUSEP
  OPORTUNIDADE_ID                                = var.OPORTUNIDADE_ID
  trace_config_enable                            = var.trace_config_enable
  dynatrace_oneAgent_layer                       = var.dynatrace_oneAgent_layer
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
}

module "lambda-abandoned-quotation" {
  source                                         = "./modules/lambda-abandoned-quotation"
  account_id                                     = var.account_id
  vpc_subnet_ids                                 = var.vpc_subnet_ids
  vpc_security_group_id                          = var.vpc_security_group_id
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  lambda_timeout                                 = var.lambda_timeout
  project_name                                   = var.project_name_abandoned_quotation
  NODE_ENV                                       = var.NODE_ENV
  UPDATE_LEAD                                    = var.UPDATE_LEAD
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
  path_part                    = var.api_gateway_path_part
  stage_name                   = var.api_gateway_stage_name
  http_method                  = var.api_gateway_http_method
  api_gateway_execution_arn    = module.api_gateway.deployment_execution_arn
  process_lambda_function_name = module.lambda.lambda_function_name
  depends_on = [
    module.api_gateway,
    module.lambda,
  ]
}

module "lambda-abandoned-quotation-event-source" {
  source                                = "./modules/lambda-abandoned-quotation-event-source"
  process_lambda_function_name          = module.lambda-abandoned-quotation.lambda_function_name
  carbon_lead_in_progress_db_stream_arn = module.dynamodb_table.table_stream_arn
  process_lambda_maximum_retry_attempts = var.process_lambda_maximum_retry_attempts
  depends_on = [
    module.lambda-abandoned-quotation,
    module.dynamodb_table
  ]
}

module "api_gateway" {
  source                 = "./modules/api-gateway"
  account_id             = var.account_id
  vpce                   = var.vpce
  lambda_invoke_arn      = module.lambda.lambda_invoke_arn
  path_part              = var.api_gateway_path_part
  stage_name             = var.api_gateway_stage_name
  http_method            = var.api_gateway_http_method
  throttling_burst_limit = var.gateway_throttling_burst_limit
  throttling_rate_limit  = var.gateway_throttling_rate_limit
  project_name           = var.project_name
}

module "dynamodb_table" {
  source = "./modules/dynamodb-table"
}

module "dynamodb_table_policies" {
  source                                      = "./modules/dynamodb-table-policies"
  carbon_lead_in_progress_db_table_arn        = module.dynamodb_table.table_arn
  carbon_lead_in_progress_db_table_stream_arn = module.dynamodb_table.table_stream_arn
  carbon_lead_in_progress_db_table_name       = module.dynamodb_table.table_name
  lambda_producer_role_name                   = module.lambda.lambda_role_name
  lambda_producer_function_name               = module.lambda.lambda_function_name
  lambda_consumer_role_name                   = module.lambda-abandoned-quotation.lambda_role_name
  lambda_consumer_function_name               = module.lambda-abandoned-quotation.lambda_function_name
  depends_on = [
    module.lambda,
    module.dynamodb_table
  ]
}
