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

module "update_lead_queue" {
  source                            = "./modules/update-lead-queue"
  project_name                      = var.project_name
  project_name_camel_case           = var.project_name_camel_case
  lambda_role_arn                   = module.lambda.lambda_role_arn
  travel_proposal_step_function_arn = data.aws_sfn_state_machine.travel_proposal.arn
  dlq_message_retention_days        = var.dlq_message_retention_days
  batch_size                        = var.default_batch_size
  maximum_concurrency               = var.default_maximum_concurrency
  visibility_timeout_seconds        = var.queue_visibility_timeout_seconds
  max_retry_lambda                  = var.max_retry_lambda
}

module "lambda" {
  source                                         = "./modules/lambda"
  account_id                                     = local.account_id
  vpc_subnet_ids                                 = local.vpc_subnet_ids
  vpc_security_groups_ids                        = local.vpc_security_groups_ids
  max_memory_size                                = var.lambda_max_memory_size
  timeout                                        = var.lambda_timeout
  cloudwatch_log_retention                       = var.cloudwatch_log_retention
  project_name                                   = var.project_name
  dynamics_layer_arn                             = data.aws_lambda_layer_version.dynamics.arn
  lead_in_progress_dynamodb_table_arn            = data.aws_dynamodb_table.lead_in_progress.arn
  is_poc                                         = var.is_poc
  carbon_token_layer_arn                         = data.aws_lambda_layer_version.carbon_token.arn
  dynatrace_oneAgent_layer_arn                   = var.dynatrace_oneAgent_layer_arn
  twistlock_layer_arn                            = var.twistlock_layer_arn
  DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER              = var.dynatrace_aws_lambda_exec_wrapper
  DYNATRACE_DT_CLUSTER_ID                        = var.dynatrace_dt_cluster_id
  DYNATRACE_DT_CONNECTION_AUTH_TOKEN             = local.dynatrace_dt_connection_auth_token
  DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN         = local.dynatrace_dt_log_collection_auth_token
  DYNATRACE_DT_CONNECTION_BASE_URL               = var.dynatrace_dt_connection_base_url
  DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.dynatrace_open_telemetry_enable_integration
  DYNATRACE_DT_TENANT                            = var.dynatrace_dt_tenant
  TWISTLOCK_DISABLED                             = var.TWISTLOCK_DISABLED
  TWISTLOCK_POLICY                               = var.TWISTLOCK_POLICY
  NODE_ENV                                       = var.NODE_ENV
  SENSEDIA_URL                                   = var.SENSEDIA_URL
}

module "update_lead_queue_policy" {
  source                            = "./modules/update-lead-queue-policies"
  project_name_camel_case           = var.project_name_camel_case
  lambda_role_arn                   = module.lambda.lambda_role_arn
  api_gateway_arn                   = "${module.api_gateway.deployment_execution_arn}${var.api_gateway_stage_name}/${var.api_gateway_http_method}/${var.api_gateway_path_part}"
  update_lead_queue_arn             = module.update_lead_queue.sqs_arn
  queue_id                          = module.update_lead_queue.sqs_id
  travel_proposal_step_function_arn = data.aws_sfn_state_machine.travel_proposal.arn
  api_gateway_role_name             = module.api_gateway.api_gateway_role_name
  account_id                        = local.account_id
  project_name                      = var.project_name
  depends_on = [
    module.update_lead_queue,
    module.lambda,
    module.api_gateway
  ]
}

module "lambda_event_source" {
  source                               = "./modules/lambda-event-source"
  path_part                            = var.api_gateway_path_part
  stage_name                           = var.api_gateway_stage_name
  http_method                          = var.api_gateway_http_method
  api_gateway_deployment_execution_arn = module.api_gateway.deployment_execution_arn
  process_lambda_function_name         = module.lambda.lambda_function_name
  update_lead_queue_arn                = module.update_lead_queue.sqs_arn
  depends_on = [
    module.lambda,
    module.update_lead_queue,
    module.update_lead_queue_policy
  ]
}

module "api_gateway" {
  source                 = "./modules/api-gateway"
  account_id             = local.account_id
  vpce                   = local.vpce
  path_part              = var.api_gateway_path_part
  stage_name             = var.api_gateway_stage_name
  http_method            = var.api_gateway_http_method
  throttling_burst_limit = var.gateway_throttling_burst_limit
  throttling_rate_limit  = var.gateway_throttling_rate_limit
  project_name           = var.project_name
}

module "api_mapping" {
  source                = "./modules/api-mapping"
  stage_name            = module.api_gateway.stage_name
  api_custom_domain_fqn = var.carbon_api_custom_domain_fqn
  api_gateway_id        = module.api_gateway.api_gateway_id
  depends_on            = [module.api_gateway]
}
